/**
 * /api/sms/text-tony — Twilio inbound-SMS webhook for the "Text Tony" flow.
 *
 * Per market-intelligence.md §5 Gap 3 + §9 EXPLOIT #2:
 *   Every direct local competitor runs phone-only M-F 9-5. The Andover
 *   Upgrader does her research at 9pm Tuesday. After-hours auto-responder is
 *   a category-wide unowned slot.
 *
 * Behavior:
 *   - When TWILIO_ACCOUNT_SID is unset (demo mode): logs a "would log" message
 *     and returns the canonical TwiML <Response><Message> with the appropriate
 *     after-hours OR in-hours auto-responder body.
 *   - When TWILIO_ACCOUNT_SID is set (production): logs the inbound message
 *     and caller number for Tony's records, AND returns the same TwiML body.
 *
 * Twilio sends inbound SMS as application/x-www-form-urlencoded POST with
 * fields: From, Body, To, MessageSid, NumMedia, etc. We parse with
 * request.formData() (Web standard, supported by Next 16 route handlers).
 *
 * After-hours window matches the TextTonyCTA client-side indicator so the
 * dot color and the auto-reply text always tell the same story:
 *   In-hours  = Mon-Fri 7am-8pm local server time
 *   Out-hours = everything else (incl. weekends)
 *
 * Phase 2 Task 2A (orchestrator-owned, NOT this agent) provisions Anjo's
 * (978) 216-6455 number on Twilio and wires this webhook URL.
 */

import type { NextRequest } from "next/server";

const PHONE_DISPLAY = "(978) 216-6455";

const AUTO_REPLY_AFTER_HOURS =
  `Got your message! Tony's gonna call you back by 8am tomorrow. ` +
  `For emergencies, call ${PHONE_DISPLAY} directly.`;

const AUTO_REPLY_IN_HOURS =
  `Got it! Tony will call you within the hour during business hours.`;

/**
 * After-hours window. Mirrors the client-side `isAfterHours` helper in
 * TextTonyCTA.tsx — keep these two functions in sync if the window changes.
 *
 * Window expressed as INSIDE-hours: getDay() in 1..5 (Mon..Fri) AND
 * getHours() in 7..19 (7:00am up to but not including 8:00pm).
 */
function isAfterHours(now: Date = new Date()): boolean {
  const day = now.getDay();
  const hour = now.getHours();
  const isWeekday = day >= 1 && day <= 5;
  const isInHours = hour >= 7 && hour < 20;
  return !(isWeekday && isInHours);
}

/**
 * Build a TwiML <Response><Message> XML body. Twilio expects exactly this
 * shape on inbound-SMS webhooks; the <Message> element it returns becomes
 * the auto-reply SMS sent to the caller.
 *
 * XML-escape the body to be safe even though our canonical strings have no
 * angle brackets or ampersands today — defense against future copy edits.
 */
function twimlResponse(body: string): string {
  const escaped = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<Response>\n  <Message>${escaped}</Message>\n</Response>`;
}

export async function POST(request: NextRequest) {
  const afterHours = isAfterHours(new Date());
  const body = afterHours ? AUTO_REPLY_AFTER_HOURS : AUTO_REPLY_IN_HOURS;

  // Parse the inbound Twilio payload (form-encoded). Stub-safe: if parsing
  // fails (e.g. demo curl with empty body) we still return TwiML.
  let from = "[unknown]";
  let messageBody = "[unknown]";
  let messageSid = "[unknown]";
  try {
    const form = await request.formData();
    from = (form.get("From") as string | null) ?? from;
    messageBody = (form.get("Body") as string | null) ?? messageBody;
    messageSid = (form.get("MessageSid") as string | null) ?? messageSid;
  } catch {
    // Body wasn't form-encoded — likely a demo / curl ping. Fall through.
  }

  const isProvisioned = !!process.env.TWILIO_ACCOUNT_SID;

  if (isProvisioned) {
    // Production — log for Tony's records. Real persistence (Supabase row,
    // Resend email to Tony, etc.) is wired in Phase 2 Task 2A. Console log is
    // captured in Vercel runtime logs at minimum.
    console.log("[text-tony:inbound]", {
      from,
      messageSid,
      messageBody,
      afterHours,
      receivedAt: new Date().toISOString(),
    });
  } else {
    // Demo mode — Twilio not provisioned yet. Log so anyone testing locally
    // can see the route fired.
    console.log("[text-tony:demo] TWILIO_ACCOUNT_SID unset; returning stub TwiML.", {
      from,
      messageSid,
      afterHours,
    });
  }

  return new Response(twimlResponse(body), {
    status: 200,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

/**
 * GET handler — useful for sanity-pinging the route in a browser without a
 * Twilio webhook simulator. Returns a JSON status payload instead of TwiML.
 */
export async function GET() {
  const afterHours = isAfterHours(new Date());
  return Response.json({
    route: "/api/sms/text-tony",
    twilioProvisioned: !!process.env.TWILIO_ACCOUNT_SID,
    currentlyAfterHours: afterHours,
    sampleAutoReply: afterHours ? AUTO_REPLY_AFTER_HOURS : AUTO_REPLY_IN_HOURS,
  });
}
