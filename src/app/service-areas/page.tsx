import type { Metadata } from "next";
import ServiceAreasClient from "./ServiceAreasClient";
import { BreadcrumbSchema } from "@/components/seo";

export const metadata: Metadata = {
  title: "Service Areas: Methuen MA + North Shore + Southern NH",
  description:
    "Trusted home improvement contractor serving Methuen, Andover, Haverhill, North Andover, Lawrence MA and Salem, Derry, Windham, Londonderry NH. Free quote in 24 hours.",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    type: "website",
    url: "https://anjoservices.com/service-areas",
    siteName: "Anjo Services, LLC",
    locale: "en_US",
    title: "Service Areas: Methuen MA + North Shore + Southern NH",
    description:
      "Nine cities across North Shore MA and southern NH. Same-week walkthroughs, no travel fee within 20 miles of Methuen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Areas: Methuen MA + North Shore + Southern NH",
    description:
      "Nine cities across North Shore MA and southern NH. Same-week walkthroughs.",
  },
};

export default function ServiceAreasPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
        ]}
      />
      <ServiceAreasClient />
    </>
  );
}
