/**
 * GET /api/calendly/slots?date=YYYY-MM-DD
 *
 * Returns available walkthrough windows for the given date by querying the
 * Calendly API on behalf of the booking calendar component. CALENDLY_API_KEY
 * stays server-side only (never NEXT_PUBLIC).
 *
 * Demo-mode contract (CLAUDE.md Always-Built Features Rule §Inline Booking
 * Calendar): if no key is set, return 503. The client component hash-seeds
 * a fake list of slots so the calendar feels live during demo. A blank
 * calendar kills the demo.
 *
 * Pattern #25 reference: server returns the source-of-truth signal, client
 * does deterministic seeded fallback.
 */

import { NextResponse } from "next/server";

const NEXT_PUBLIC_EVENT_TYPE_URI = process.env.NEXT_PUBLIC_CALENDLY_EVENT_TYPE_URI;

type CalendlyAvailableTime = {
  start_time: string; // ISO
  status?: string;
};

function formatTimeLabel(iso: string): string {
  const d = new Date(iso);
  let h = d.getHours();
  const m = d.getMinutes();
  const mer = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  const mStr = m < 10 ? `0${m}` : `${m}`;
  return `${h}:${mStr} ${mer}`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Invalid date. Expected YYYY-MM-DD." },
      { status: 400 },
    );
  }

  const apiKey = process.env.CALENDLY_API_KEY;
  if (!apiKey || !NEXT_PUBLIC_EVENT_TYPE_URI) {
    // Demo mode — client falls back to seeded availability.
    return NextResponse.json(
      {
        error: "calendly_not_configured",
        message:
          "CALENDLY_API_KEY or NEXT_PUBLIC_CALENDLY_EVENT_TYPE_URI not set. Client renders seeded demo slots.",
      },
      { status: 503 },
    );
  }

  try {
    // Calendly v2 API — get available times for a single date.
    // We request a 24-hour window starting at the given date (UTC).
    const start = new Date(`${date}T00:00:00.000Z`);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);

    const params = new URLSearchParams({
      event_type: NEXT_PUBLIC_EVENT_TYPE_URI,
      start_time: start.toISOString(),
      end_time: end.toISOString(),
    });

    const calendlyRes = await fetch(
      `https://api.calendly.com/event_type_available_times?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        // Don't cache — availability changes minute to minute.
        cache: "no-store",
      },
    );

    if (!calendlyRes.ok) {
      const text = await calendlyRes.text();
      return NextResponse.json(
        {
          error: "calendly_request_failed",
          status: calendlyRes.status,
          detail: text.slice(0, 500),
        },
        { status: 502 },
      );
    }

    const data = (await calendlyRes.json()) as {
      collection?: CalendlyAvailableTime[];
    };

    const open = (data.collection ?? []).filter(
      (t) => !t.status || t.status === "available",
    );

    const slots = open.map((t) => formatTimeLabel(t.start_time));

    return NextResponse.json({ slots }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        error: "calendly_request_threw",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 502 },
    );
  }
}
