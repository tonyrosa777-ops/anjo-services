import type { Metadata } from "next";
import ServiceAreasClient from "./ServiceAreasClient";

export const metadata: Metadata = {
  title: "Service Areas | Anjo Services, LLC",
  description:
    "Trusted home improvement contractor serving Methuen, Andover, Haverhill, Lawrence, North Andover MA, and Salem, Derry, Windham, Londonderry NH.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return <ServiceAreasClient />;
}
