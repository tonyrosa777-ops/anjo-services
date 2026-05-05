/**
 * Root opengraph-image.tsx — minimal OG image template.
 *
 * Pattern #12 (knowledge/patterns/nextjs-og-image-readfilesync-base64.md):
 * Uses Next.js native ImageResponse, no external service.
 *
 * Output: 1200x630 PNG, the OG + Twitter summary_large_image standard.
 */

import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const runtime = "nodejs";
export const alt = "Anjo Services, LLC";
export const size = { width: 1200, height: 630 } as const;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#0A0A0A",
          color: "#F5F5F2",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 800,
            color: "#C8202C",
            textTransform: "uppercase",
            letterSpacing: 4,
            marginBottom: 24,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1.05,
            color: "#F5F5F2",
            marginBottom: 36,
            maxWidth: 1000,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#B8B5AE",
          }}
        >
          {siteConfig.baseCity} . {siteConfig.serviceAreaCorridor} . since{" "}
          {siteConfig.yearFounded}
        </div>
      </div>
    ),
    { ...size }
  );
}
