import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export interface CartItemPayload {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  printful_variant_id?: number;
}

/**
 * POST /api/stripe/checkout
 *
 * Creates a Stripe Checkout session for the cart payload. Demo mode (no
 * STRIPE_SECRET_KEY or placeholder value) returns 503 — the CartDrawer
 * surfaces a friendly alert. Cart items are stuffed into session.metadata.cart
 * so the webhook can resolve sync_variant_ids server-side and create the
 * Printful order on checkout.session.completed.
 *
 * apiVersion is intentionally omitted — uses the SDK's pinned default,
 * which moves with the installed stripe library version.
 */
export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItemPayload[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    if (
      !process.env.STRIPE_SECRET_KEY ||
      process.env.STRIPE_SECRET_KEY.includes("REPLACE_WITH")
    ) {
      return NextResponse.json(
        { error: "Stripe is not configured yet." },
        { status: 503 },
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      req.headers.get("origin") ??
      "http://localhost:3000";

    try {
      new URL(siteUrl);
    } catch {
      throw new Error(`Missing or invalid NEXT_PUBLIC_SITE_URL: "${siteUrl}"`);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            // Stripe requires absolute URLs for product images
            ...(item.image && item.image.startsWith("http")
              ? { images: [item.image] }
              : {}),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "NZ"],
      },
      customer_creation: "always",
      success_url: `${siteUrl}/shop?success=true`,
      cancel_url: `${siteUrl}/shop`,
      metadata: {
        cart: JSON.stringify(
          items.map((i) => ({
            id: i.id,
            name: i.name,
            quantity: i.quantity,
            price: i.price,
            printful_variant_id: i.printful_variant_id,
          })),
        ),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
