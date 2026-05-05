/**
 * /api/contact — POST endpoint for the contact form.
 *
 * Validates body with Zod (server-side, never trust the client).
 * Demo mode: if RESEND_API_KEY is unset, log and return { ok: true, demo: true }
 * so the form still functions during pitch + before Phase 2 Task 2A wires the
 * real key.
 *
 * Live mode: sends two emails through Resend in parallel:
 *   1) Owner notification → siteConfig.email || "anjoservices.tony@gmail.com"
 *      with replyTo = lead's email (Pattern #44 — Tony's reply lands in the
 *      customer's inbox without manual address copying).
 *   2) Auto-reply → lead's email with replyTo = owner email so the lead can
 *      reply directly back to Tony.
 *
 * Body strings tagged [DEMO COPY — pending client review] until client signs
 * off.
 */

import { z } from "zod";
import { siteConfig, services } from "@/data/site";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(10).max(20),
  email: z.string().email(),
  projectType: z.string().min(1).max(64),
  message: z.string().min(10).max(2000),
});

const OWNER_EMAIL_FALLBACK = "anjoservices.tony@gmail.com";

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        error: "Validation failed.",
        issues: parsed.error.issues,
      },
      { status: 400 },
    );
  }

  const lead = parsed.data;
  const ownerEmail = siteConfig.email || OWNER_EMAIL_FALLBACK;
  const apiKey = process.env.RESEND_API_KEY;

  // Resolve service label for human-readable email body
  const matched = services.find((s) => s.slug === lead.projectType);
  const projectLabel = matched
    ? `${matched.emoji} ${matched.name}`
    : lead.projectType === "other"
      ? "Other"
      : lead.projectType;

  // ── Demo mode (no Resend key) ────────────────────────────────────────
  if (!apiKey) {
    console.log("[contact] demo mode (no RESEND_API_KEY) — payload:", {
      to: ownerEmail,
      replyTo: lead.email,
      lead,
    });
    return Response.json({ ok: true, demo: true });
  }

  // ── Live mode ────────────────────────────────────────────────────────
  // [DEMO COPY — pending client review] for the body strings below.
  const ownerSubject = `New ${projectLabel} inquiry from ${lead.name}`;
  const ownerHtml = `
    <h2>New project inquiry</h2>
    <p><strong>Name:</strong> ${escape(lead.name)}</p>
    <p><strong>Phone:</strong> ${escape(lead.phone)}</p>
    <p><strong>Email:</strong> ${escape(lead.email)}</p>
    <p><strong>Project type:</strong> ${escape(projectLabel)}</p>
    <p><strong>Message:</strong></p>
    <p>${escape(lead.message).replace(/\n/g, "<br/>")}</p>
    <hr/>
    <p style="color:#666;font-size:12px">
      Reply directly to this email and your message will go to ${escape(lead.email)}.
    </p>
  `.trim();

  // [DEMO COPY — pending client review]
  const autoReplySubject = `Got your message, ${lead.name.split(" ")[0]}. Tony will reply within 24 hours.`;
  const autoReplyHtml = `
    <p>Hi ${escape(lead.name.split(" ")[0])},</p>
    <p>This is the auto-confirmation from Anjo Services. Tony got your message about <strong>${escape(projectLabel)}</strong> and will reach out personally within 24 hours, by phone or text.</p>
    <p>Most weeknights, the real reply lands much sooner. If you need an answer faster, text Tony at <a href="${siteConfig.smsHref}">${siteConfig.phone}</a>.</p>
    <p>Thanks for reaching out.</p>
    <p>Tony Squillini<br/>Owner, Anjo Services, LLC<br/>${siteConfig.baseCity}<br/><a href="tel:${siteConfig.phoneHref.replace("tel:", "")}">${siteConfig.phone}</a></p>
  `.trim();

  try {
    const [ownerRes, replyRes] = await Promise.all([
      sendResendEmail({
        apiKey,
        from: "Anjo Services <noreply@anjoservices.com>",
        to: ownerEmail,
        replyTo: lead.email,
        subject: ownerSubject,
        html: ownerHtml,
      }),
      sendResendEmail({
        apiKey,
        from: "Tony Squillini <tony@anjoservices.com>",
        to: lead.email,
        replyTo: ownerEmail,
        subject: autoReplySubject,
        html: autoReplyHtml,
      }),
    ]);

    if (!ownerRes.ok || !replyRes.ok) {
      throw new Error(
        `Resend failure (owner: ${ownerRes.status}, reply: ${replyRes.status})`,
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] Resend send failed:", err);
    return Response.json(
      { ok: false, error: "Email send failed. Try texting Tony directly." },
      { status: 502 },
    );
  }
}

/**
 * Minimal Resend REST client. We avoid taking on the resend npm package as a
 * dep — single endpoint, single Authorization header. If we adopt Resend
 * elsewhere we can swap to the SDK.
 */
async function sendResendEmail(args: {
  apiKey: string;
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  html: string;
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${args.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: args.from,
      to: [args.to],
      reply_to: args.replyTo,
      subject: args.subject,
      html: args.html,
    }),
  });
  return { ok: res.ok, status: res.status };
}

/** Tiny HTML escape — sanitizes the lead-supplied strings before they land
 *  inside the email HTML body. Resend renders HTML, not Markdown. */
function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
