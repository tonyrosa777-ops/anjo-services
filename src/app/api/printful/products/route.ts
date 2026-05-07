import { NextResponse } from "next/server";
import { getSyncProducts } from "@/lib/printful";
import seededProducts from "@/lib/printful-seeded-products.json";

/**
 * GET /api/printful/products
 *
 * Live mode: hits Printful sync-products API (requires PRINTFUL_API_KEY).
 * Demo mode: any error (missing key, 401, network) falls back to the seeded
 * 10-item lineup so the shop grid always renders. Per CLAUDE.md
 * Always-Built Features Rule → Shop ("a working calendar closes the sale"
 * applied to the shop grid).
 */
export async function GET() {
  try {
    const storeId = seededProducts.storeId as number;
    if (!storeId) throw new Error("storeId is 0 — using seeded fallback");
    const products = await getSyncProducts(storeId);
    return NextResponse.json(products);
  } catch (err) {
    console.warn("[printful/products] Falling back to seeded data:", err);
    return NextResponse.json(seededProducts.products);
  }
}
