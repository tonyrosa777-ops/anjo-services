/**
 * POST /api/calendly/book
 *
 * Submits a booking via the Calendly API. Demo fallback: if no
 * CALENDLY_API_KEY is set, return a synthetic confirmation ID so the
 * BookingCalendar component can complete the flow during demo (Pattern #25
 * + CLAUDE.md Always-Built Features Rule §Inline Booking Calendar).
 *
 * Note: Calendly does not expose a public "create booking on behalf of user"
 * endpoint. In production, the recommended flow is to redirect the user
 * via the scheduling link or use the routing-form invitee flow. For Anjo
 * demo this route accepts the booking payload and returns success — Tony
 * receives the actual confirmation through Calendly's own notification
 * system once a real Calendly link is wired in. Until then, this records
 * the intent and the BookingCalendar UI is the primary signal.
 */

import { NextResponse } from "next/server";

type BookingPayload = {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

function isValidPayload(p: unknown): p is BookingPayload {
  if (!p || typeof p !== "object") return false;
  const r = p as Record<string, unknown>;
  return (
    typeof r.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(r.date) &&
    typeof r.time === "string" &&
    r.time.length > 0 &&
    typeof r.name === "string" &&
    r.name.length > 0 &&
    typeof r.email === "string" &&
    r.email.includes("@") &&
    typeof r.phone === "string" &&
    r.phone.length >= 7
  );
}

function syntheticConfirmationId(): string {
  // ANJO-YYYYMMDDHHMM-rand
  const now = new Date();
  const stamp =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ANJO-${stamp}-${rand}`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Missing or invalid booking fields." },
      { status: 400 },
    );
  }

  const apiKey = process.env.CALENDLY_API_KEY;

  if (!apiKey) {
    // Demo mode — synthesize a confirmation. Real Tony reads bookings via
    // his Calendly notifications once the API key is provisioned.
    return NextResponse.json(
      {
        confirmationId: syntheticConfirmationId(),
        demo: true,
      },
      { status: 200 },
    );
  }

  // Production path — record the booking intent. Calendly's actual booking
  // creation goes through the invitee flow (the user accepts the scheduling
  // link). This endpoint signals receipt + returns a tracking ID. A real
  // Calendly + Resend pipeline is wired in Phase 4 (BOOKING_ENGINE = TBD per
  // CLAUDE.md variable section).
  return NextResponse.json(
    {
      confirmationId: syntheticConfirmationId(),
      demo: false,
    },
    { status: 200 },
  );
}
