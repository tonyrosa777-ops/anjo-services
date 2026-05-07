import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { getSyncProductDetail, createOrder } from "@/lib/printful";
import seededProducts from "@/lib/printful-seeded-products.json";
import { siteConfig } from "@/data/site";

export const dynamic = "force-dynamic";

/**
 * POST /api/stripe/webhook
 *
 * Stripe checkout.session.completed handler. Resolves sync_variant_ids from
 * Printful, creates the Printful order, and emails Tony via Resend.
 *
 * No Resilience-Collection split here — Anjo is pure POD, no manual fulfillment
 * tier (unlike the andrea-abella-marie reference). Every cart item is a Printful
 * sync product.
 *
 * Demo mode: if STRIPE_WEBHOOK_SECRET is missing, returns 200 + skips
 * verification. If RESEND_API_KEY or siteConfig.email is missing, the email
 * step is a no-op. If PRINTFUL_API_KEY is missing, the order-creation step
 * fails gracefully with a logged error (payment is not affected).
 */

const SEEDED_ID_MAP: Record<number, string> = {};
seededProducts.products.forEach((p) => {
  SEEDED_ID_MAP[p.printful_id] = p.slug;
});

interface CartItem {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
  printful_variant_id?: number;
}

async function sendOrderAlertToTony(
  session: Stripe.Checkout.Session,
  cart: CartItem[],
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[webhook] RESEND_API_KEY not set — skipping order alert");
    return;
  }
  if (!siteConfig.email) {
    console.warn(
      "[webhook] siteConfig.email is empty — skipping order alert (set in /data/site.ts when client provides)",
    );
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const total = ((session.amount_total ?? 0) / 100).toFixed(2);
  const customer = session.customer_details;
  const itemLines = cart
    .map((i) => `  • ${i.name} x${i.quantity} — $${i.price.toFixed(2)}`)
    .join("\n");

  const body = `New Anjo Crew Merch order on ${siteConfig.domain}.

Customer: ${customer?.name ?? "Unknown"} <${customer?.email ?? "no email"}>
Total: $${total}

Items:
${itemLines}

Stripe Session: ${session.id}
View in Stripe: https://dashboard.stripe.com/payments/${session.payment_intent}
`;

  try {
    await resend.emails.send({
      from: `orders@${siteConfig.domain}`,
      to: siteConfig.email,
      subject: `New Anjo Order — $${total}`,
      text: body,
    });
    console.log("[webhook] Order alert sent to", siteConfig.email);
  } catch (err) {
    console.error("[webhook] Failed to send order alert:", err);
  }
}

async function resolveSyncVariantId(
  syncProductId: number,
): Promise<number | null> {
  try {
    const detail = await getSyncProductDetail(
      seededProducts.storeId,
      syncProductId,
    );
    const available = detail.sync_variants.find(
      (v) => v.availability_status !== "discontinued",
    );
    if (!available) {
      console.error(
        `[webhook] No available variants for sync product ${syncProductId}`,
      );
      return null;
    }
    return available.id;
  } catch (err) {
    console.error(
      `[webhook] Failed to fetch sync product ${syncProductId}:`,
      err,
    );
    return null;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || webhookSecret.includes("REPLACE_WITH")) {
    console.warn(
      "[webhook] Stripe webhook secret not configured — skipping verification",
    );
    return NextResponse.json({ received: true });
  }

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Webhook verification failed";
    console.error("[webhook] Stripe signature error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  console.log("[webhook] Event received:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(
      "[webhook] checkout.session.completed — session ID:",
      session.id,
    );

    let cart: CartItem[] = [];
    try {
      cart = JSON.parse(session.metadata?.cart ?? "[]");
    } catch {
      console.error(
        "[webhook] Failed to parse cart metadata for session:",
        session.id,
      );
      return NextResponse.json({ received: true });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionAny = session as any;
    const shipping =
      sessionAny.collected_information?.shipping_details ??
      sessionAny.shipping_details;

    if (cart.length > 0) {
      if (!shipping?.address) {
        console.error(
          "[webhook] No shipping address — cannot create Printful order:",
          session.id,
        );
        await sendOrderAlertToTony(session, cart);
        return NextResponse.json({ received: true });
      }

      const resolvedItems: Array<{
        sync_variant_id: number;
        quantity: number;
        name: string;
      }> = [];

      for (const item of cart) {
        if (item.printful_variant_id) {
          resolvedItems.push({
            sync_variant_id: item.printful_variant_id,
            quantity: item.quantity,
            name: item.name,
          });
          continue;
        }

        const syncProductId = Number(item.id);
        if (isNaN(syncProductId) || !SEEDED_ID_MAP[syncProductId]) {
          console.error(
            `[webhook] Variant not found for product ID "${item.id}" — skipping`,
          );
          continue;
        }

        const variantId = await resolveSyncVariantId(syncProductId);
        if (!variantId) continue;

        resolvedItems.push({
          sync_variant_id: variantId,
          quantity: item.quantity,
          name: item.name,
        });
      }

      if (resolvedItems.length === 0) {
        console.warn(
          "[webhook] No resolvable Printful variants for session:",
          session.id,
        );
      } else {
        const orderPayload = {
          recipient: {
            name:
              shipping.name ?? session.customer_details?.name ?? "Customer",
            address1: shipping.address.line1 ?? "",
            address2: shipping.address.line2 ?? undefined,
            city: shipping.address.city ?? "",
            state_code: shipping.address.state ?? "",
            country_code: shipping.address.country ?? "US",
            zip: shipping.address.postal_code ?? "",
            email: session.customer_details?.email ?? undefined,
          },
          items: resolvedItems.map((i) => ({
            sync_variant_id: i.sync_variant_id,
            quantity: i.quantity,
          })),
          confirm: true,
          retail_costs: {
            currency: "USD",
            subtotal: ((session.amount_subtotal ?? 0) / 100).toFixed(2),
            shipping: (
              (session.shipping_cost?.amount_total ?? 0) / 100
            ).toFixed(2),
          },
        };

        try {
          const order = await createOrder(
            seededProducts.storeId,
            orderPayload,
          );
          console.log(
            `[webhook] Printful order created — order ID: ${order.id}, Stripe session: ${session.id}`,
          );
        } catch (err) {
          console.error(
            "[webhook] Failed to create Printful order for session",
            session.id,
            "—",
            err,
          );
        }
      }
    }

    await sendOrderAlertToTony(session, cart);
  }

  return NextResponse.json({ received: true });
}
