"use client";

/**
 * /contact — get in touch with Tony.
 *
 * Architecture:
 *   - Page Header Standard (Fragment root, bg-[var(--primary)] pt-32 pb-20,
 *     ambient orbs inside header, content z-10, h1 = .hero-shimmer
 *     font-display text-h1 font-bold).
 *   - Two columns: left = React Hook Form + Zod-validated form posting to
 *     /api/contact, right = contact info card + Methuen Google Maps embed
 *     (Pattern #11 — free embed, no API key required).
 *   - Form fields: name, phone, email, projectType (select from services[]),
 *     message. Submit POSTs JSON to /api/contact, success state shows
 *     confirmation + soft suggest of /booking.
 *
 * Per Pattern #44 — Resend replyTo: /api/contact route sets replyTo to the
 * lead's email so Tony's reply lands in the customer's inbox. The frontend
 * does not need to wire that — it only needs to send the email field.
 */

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { siteConfig, services } from "@/data/site";

// ─── Zod schema (5 fields) ─────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  phone: z
    .string()
    .min(10, "Phone number looks too short.")
    .max(20, "Phone number looks too long."),
  email: z.string().email("That email address does not look right."),
  projectType: z.string().min(1, "Pick the closest project type."),
  message: z
    .string()
    .min(10, "Tell Tony a bit more about the project.")
    .max(2000, "Message is too long."),
});

type ContactInput = z.infer<typeof contactSchema>;

export default function ContactClient() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      projectType: "",
      message: "",
    },
    mode: "onTouched",
  });

  const [submitState, setSubmitState] = useState<
    | { kind: "idle" }
    | { kind: "success" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  const onSubmit = async (raw: ContactInput) => {
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      setSubmitState({
        kind: "error",
        message: "Please fix the highlighted fields.",
      });
      return;
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(j?.error || "Send failed");
      }
      setSubmitState({ kind: "success" });
      reset();
    } catch (err) {
      setSubmitState({
        kind: "error",
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Text Tony directly at " +
              siteConfig.phone +
              ".",
      });
    }
  };

  return (
    <>
      {/* ─── Page Header ───────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{ background: "var(--primary)" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="orb absolute"
            style={{
              top: "10%",
              left: "5%",
              width: "26rem",
              height: "26rem",
              background:
                "radial-gradient(circle, rgba(232,176,76,0.35) 0%, transparent 60%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="orb-2 absolute"
            style={{
              bottom: "8%",
              right: "6%",
              width: "30rem",
              height: "30rem",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 60%)",
              filter: "blur(50px)",
            }}
          />
          <div
            className="orb-3 absolute"
            style={{
              top: "30%",
              left: "55%",
              width: "20rem",
              height: "20rem",
              background:
                "radial-gradient(circle, rgba(154,25,34,0.4) 0%, transparent 60%)",
              filter: "blur(45px)",
            }}
          />
        </div>

        <div
          className="relative z-10 mx-auto px-6 lg:px-8"
          style={{ maxWidth: "var(--container-default)" }}
        >
          <p
            className="text-eyebrow font-display"
            style={{
              color: "rgba(255,255,255,0.85)",
              marginBottom: "var(--space-md)",
            }}
          >
            Quote within 24 hours
          </p>
          <h1
            className="hero-shimmer font-display text-h1 font-bold"
            style={{
              color: "var(--text-primary)",
              marginBottom: "var(--space-md)",
            }}
          >
            Get a Real Quote
          </h1>
          <p
            className="font-body text-body-lg"
            style={{
              color: "rgba(245,245,242,0.92)",
              maxWidth: "60ch",
            }}
          >
            Tell Tony about the project. Auto-reply confirms we got your
            message. Real reply from Tony, by phone or text, within 24 hours.
          </p>
        </div>
      </section>

      {/* ─── Body: form + info ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-light-overlay-radial)" }}
        />
        <div
          className="relative z-10 mx-auto px-6 lg:px-8"
          style={{ maxWidth: "var(--container-default)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left — form */}
            <div className="lg:col-span-7">
              {submitState.kind === "success" ? (
                <SuccessCard />
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="flex flex-col gap-5"
                  aria-label="Project inquiry form"
                >
                  <h2
                    className="font-display text-h2 font-bold"
                    style={{
                      color: "var(--text-primary-light)",
                      marginBottom: "var(--space-2xs)",
                    }}
                  >
                    Tell Tony about the project
                  </h2>
                  <p
                    className="font-body text-body"
                    style={{
                      color: "var(--text-secondary-light)",
                      marginBottom: "var(--space-md)",
                    }}
                  >
                    Five fields. Sixty seconds. He will write back personally.
                  </p>

                  <Field id="name" label="Your name" error={errors.name?.message}>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Sarah K."
                      {...register("name")}
                      className="w-full"
                      style={inputStyle}
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      id="phone"
                      label="Phone"
                      error={errors.phone?.message}
                    >
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(978) 555-1234"
                        {...register("phone")}
                        className="w-full"
                        style={inputStyle}
                      />
                    </Field>
                    <Field
                      id="email"
                      label="Email"
                      error={errors.email?.message}
                    >
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        {...register("email")}
                        className="w-full"
                        style={inputStyle}
                      />
                    </Field>
                  </div>

                  <Field
                    id="projectType"
                    label="Project type"
                    error={errors.projectType?.message}
                  >
                    <select
                      id="projectType"
                      {...register("projectType")}
                      className="w-full"
                      style={inputStyle}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Pick the closest fit
                      </option>
                      {services.map((svc) => (
                        <option key={svc.slug} value={svc.slug}>
                          {svc.emoji} {svc.name}
                        </option>
                      ))}
                      <option value="other">
                        🛠️ Something else, I will explain below
                      </option>
                    </select>
                  </Field>

                  <Field
                    id="message"
                    label="What is the project?"
                    error={errors.message?.message}
                  >
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="1992 colonial in Methuen, kitchen has oak cabinets and tile counters. Looking to refresh, not gut. Ballpark $30K. Hoping to start in 6 to 8 weeks."
                      {...register("message")}
                      className="w-full"
                      style={inputStyle}
                    />
                  </Field>

                  {submitState.kind === "error" && (
                    <p
                      role="alert"
                      className="font-body text-body-sm"
                      style={{ color: "var(--primary)" }}
                    >
                      {submitState.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center font-display font-bold uppercase"
                    style={{
                      background: "var(--primary)",
                      color: "var(--text-primary)",
                      padding: "0.875rem 1.5rem",
                      borderRadius: "var(--radius-md)",
                      letterSpacing: "0.06em",
                      width: "fit-content",
                      cursor: isSubmitting ? "wait" : "pointer",
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                  >
                    {isSubmitting ? "Sending…" : "Send to Tony"}
                  </button>

                  <p
                    className="font-mono text-meta"
                    style={{ color: "var(--text-muted-light)" }}
                  >
                    No spam. Your info goes to Tony's phone, not a CRM.
                  </p>
                </form>
              )}
            </div>

            {/* Right — info card + map */}
            <aside className="lg:col-span-5 flex flex-col gap-6">
              <div
                className="p-6 lg:p-7"
                style={{
                  background: "var(--bg-card-light)",
                  border: "1px solid var(--border-card-light)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <h2
                  className="font-display text-h3 font-bold"
                  style={{
                    color: "var(--text-primary-light)",
                    marginBottom: "var(--space-md)",
                  }}
                >
                  Or reach out directly
                </h2>

                <ul className="flex flex-col gap-4">
                  <ContactRow
                    emoji="📞"
                    label="Call Tony"
                    value={siteConfig.phone}
                    href={siteConfig.phoneHref}
                  />
                  <ContactRow
                    emoji="💬"
                    label="Text Tony (preferred after 6pm)"
                    value={siteConfig.phone}
                    href={siteConfig.smsHref}
                  />
                  <ContactRow
                    emoji="🕒"
                    label="Hours"
                    value="Mon–Sat 7am–7pm. Sunday by request."
                  />
                  <ContactRow
                    emoji="📍"
                    label="Based in"
                    value={`${siteConfig.baseCity} · serving ${siteConfig.serviceAreaCorridor}`}
                  />
                </ul>
              </div>

              {/* Pattern #11 — free Google Maps embed, no API key */}
              <div
                className="overflow-hidden"
                style={{
                  border: "1px solid var(--border-card-light)",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--bg-card-light)",
                }}
              >
                <iframe
                  title="Service area map: Methuen, MA"
                  src="https://maps.google.com/maps?q=Methuen,+MA&output=embed&hl=en"
                  width="100%"
                  height="320"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, display: "block" }}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Sub-components ──────────────────────────────────────────────────── */

const inputStyle: React.CSSProperties = {
  background: "var(--bg-card-light)",
  border: "1px solid var(--border-card-light)",
  borderRadius: "var(--radius-md)",
  padding: "0.75rem 1rem",
  color: "var(--text-primary-light)",
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-body)",
  outline: "none",
};

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-display text-eyebrow"
        style={{
          color: "var(--text-secondary-light)",
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          role="alert"
          className="font-body text-meta"
          style={{ color: "var(--primary)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

function ContactRow({
  emoji,
  label,
  value,
  href,
}: {
  emoji: string;
  label: string;
  value: string;
  href?: string;
}) {
  const valueNode = href ? (
    <a
      href={href}
      className="font-mono"
      style={{
        color: "var(--text-primary-light)",
        fontSize: "var(--text-body)",
      }}
    >
      {value}
    </a>
  ) : (
    <span
      className="font-body"
      style={{
        color: "var(--text-primary-light)",
        fontSize: "var(--text-body)",
      }}
    >
      {value}
    </span>
  );
  return (
    <li className="flex items-start gap-3">
      <span aria-hidden="true" className="text-2xl leading-none">
        {emoji}
      </span>
      <div className="flex flex-col">
        <span
          className="font-display text-eyebrow"
          style={{ color: "var(--text-muted-light)" }}
        >
          {label}
        </span>
        {valueNode}
      </div>
    </li>
  );
}

function SuccessCard() {
  return (
    <div
      className="flex flex-col gap-4 p-8"
      style={{
        background: "var(--bg-card-light)",
        border: "1px solid var(--border-card-light)",
        borderRadius: "var(--radius-lg)",
      }}
      role="status"
      aria-live="polite"
    >
      <span aria-hidden="true" className="text-4xl">
        ✅
      </span>
      <h2
        className="font-display text-h2 font-bold"
        style={{ color: "var(--text-primary-light)" }}
      >
        Got it. Tony will reach out personally.
      </h2>
      <p
        className="font-body text-body-lg"
        style={{ color: "var(--text-secondary-light)" }}
      >
        Auto-reply on the way to your inbox. Real reply from Tony, by phone or
        text, within 24 hours. Most weeknights it is sooner.
      </p>
      <p
        className="font-body text-body"
        style={{ color: "var(--text-secondary-light)" }}
      >
        Already have a date in mind? Pick a 30 minute on-site walkthrough on
        the booking page.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link
          href={siteConfig.ctaPrimary.href}
          className="inline-flex items-center justify-center font-display font-bold uppercase"
          style={{
            background: "var(--primary)",
            color: "var(--text-primary)",
            padding: "0.875rem 1.5rem",
            borderRadius: "var(--radius-md)",
            letterSpacing: "0.06em",
            width: "fit-content",
          }}
        >
          {siteConfig.ctaPrimary.label}
        </Link>
        <a
          href={siteConfig.smsHref}
          className="inline-flex items-center justify-center font-display font-bold uppercase"
          style={{
            background: "transparent",
            color: "var(--text-primary-light)",
            padding: "0.875rem 1.5rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--primary)",
            letterSpacing: "0.06em",
            width: "fit-content",
          }}
        >
          💬 Text Tony now
        </a>
      </div>
    </div>
  );
}
