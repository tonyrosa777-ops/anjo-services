import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { BreadcrumbSchema } from "@/components/seo";

/**
 * /contact — server wrapper.
 *
 * The contact form uses react-hook-form + Zod (client-side state), so the
 * form lives in ContactClient. The server shell here owns metadata +
 * Breadcrumb schema.
 *
 * NOTE: GeneralContractor schema is NOT duplicated here. The homepage
 * already emits it once with @id "https://anjoservices.com/#org" — Google
 * follows that canonical reference. Per agent-file constraint "Homepage
 * must have exactly ONE GeneralContractor schema."
 */

export const metadata: Metadata = {
  title: "Contact Tony at Anjo Services | (978) 216-6455",
  description:
    "Text or call Tony at (978) 216-6455. Five-field form. Auto-reply confirms receipt. Real reply from Tony, by phone or text, within 24 hours. Methuen MA + North Shore + southern NH.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "https://anjoservices.com/contact",
    siteName: "Anjo Services, LLC",
    locale: "en_US",
    title: "Contact Tony at Anjo Services | (978) 216-6455",
    description:
      "Five-field form, auto-reply confirms, real reply within 24 hours. Or text Tony directly at (978) 216-6455.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Tony at Anjo Services | (978) 216-6455",
    description:
      "Five-field form, auto-reply confirms, real reply within 24 hours.",
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />
      <ContactClient />
    </>
  );
}
