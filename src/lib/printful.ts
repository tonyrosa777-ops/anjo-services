/**
 * printful.ts — Printful API client + types.
 *
 * Bearer-auth fetch wrapper + paginated catalog/store helpers + order creation.
 * Direct port of the andrea-abella-marie reference. No Anjo-specific edits —
 * the Printful API surface is the same regardless of which client uses it.
 *
 * Demo mode: when PRINTFUL_API_KEY is missing or invalid, every call throws,
 * which the route handlers catch and fall back to seeded data. ShopContent
 * never sees the error — the seed JSON is the safety net.
 */

const PRINTFUL_API_BASE = "https://api.printful.com";

function getHeaders(storeId?: number) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
    "Content-Type": "application/json",
  };
  if (storeId) {
    headers["X-PF-Store-Id"] = String(storeId);
  }
  return headers;
}

async function pfetch<T>(
  path: string,
  options?: RequestInit & { storeId?: number },
): Promise<T> {
  const { storeId, ...fetchOptions } = options ?? {};
  const res = await fetch(`${PRINTFUL_API_BASE}${path}`, {
    ...fetchOptions,
    headers: {
      ...getHeaders(storeId),
      ...(fetchOptions.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Printful API ${res.status} on ${path}: ${text}`);
  }

  const json = await res.json();
  return json.result ?? json;
}

// ─── Types ─────────────────────────────────────────────────────────────────

export interface PrintfulStore {
  id: number;
  name: string;
  type: string;
  website: string;
  currency: string;
}

export interface CatalogProduct {
  id: number;
  main_category_id: number;
  type: string;
  type_name: string;
  title: string;
  brand: string | null;
  model: string | null;
  image: string;
  variant_count: number;
  currency: string;
  files: unknown[];
  options: unknown[];
  is_discontinued: boolean;
  avg_fulfillment_time: number | null;
  description: string;
  techniques: unknown[];
  origin_country: string | null;
}

export interface CatalogVariant {
  id: number;
  product_id: number;
  name: string;
  size: string;
  color: string;
  color_code: string;
  color_code2: string | null;
  image: string;
  price: string;
  in_stock: boolean;
}

export interface UploadedFile {
  id: number;
  type: string;
  hash: string;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
  width: number;
  height: number;
  dpi: number;
  status: string;
  created: number;
  thumbnail_url: string;
  preview_url: string;
  visible: boolean;
}

export interface SyncVariantFile {
  type: string;
  id: number;
}

export interface SyncVariantInput {
  variant_id: number;
  retail_price: string;
  files: SyncVariantFile[];
}

export interface CreateProductData {
  sync_product: {
    name: string;
    thumbnail?: string;
    is_ignored?: boolean;
  };
  sync_variants: SyncVariantInput[];
}

export interface SyncProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
  is_ignored: boolean;
}

export interface SyncProductDetail {
  sync_product: SyncProduct;
  sync_variants: SyncVariantDetail[];
}

export interface SyncVariantDetail {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  is_ignored: boolean;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files: Array<{
    id: number;
    type: string;
    hash: string;
    url: string;
    filename: string;
    mime_type: string;
    size: number;
    width: number;
    height: number;
    dpi: number;
    status: string;
    created: number;
    thumbnail_url: string;
    preview_url: string;
    visible: boolean;
  }>;
  options: unknown[];
  sku: string | null;
  availability_status: string;
}

export interface OrderRecipient {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
  email?: string;
  phone?: string;
}

export interface OrderItem {
  sync_variant_id: number;
  quantity: number;
}

export interface OrderData {
  recipient: OrderRecipient;
  items: OrderItem[];
  confirm?: boolean;
  retail_costs?: {
    currency: string;
    subtotal: string;
    discount?: string;
    shipping?: string;
    tax?: string;
  };
}

export interface Order {
  id: number;
  external_id: string;
  store: number;
  status: string;
  shipping: string;
  created: number;
  updated: number;
  recipient: OrderRecipient;
  items: unknown[];
  costs: unknown;
  retail_costs: unknown;
  shipments: unknown[];
}

// ─── API Functions ─────────────────────────────────────────────────────────

export async function getStores(): Promise<PrintfulStore[]> {
  return pfetch<PrintfulStore[]>("/stores");
}

export async function getCatalogProducts(): Promise<CatalogProduct[]> {
  const allProducts: CatalogProduct[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const page = await pfetch<CatalogProduct[]>(
      `/products?limit=${limit}&offset=${offset}`,
    );
    if (!page || page.length === 0) break;
    allProducts.push(...page);
    if (page.length < limit) break;
    offset += limit;
  }

  return allProducts;
}

export async function getCatalogVariants(
  blueprintId: number,
): Promise<CatalogVariant[]> {
  return pfetch<CatalogVariant[]>(`/products/${blueprintId}/variants`);
}

export async function uploadFile(
  filename: string,
  base64Content: string,
  mimeType = "image/png",
): Promise<UploadedFile> {
  return pfetch<UploadedFile>("/files", {
    method: "POST",
    body: JSON.stringify({
      type: "default",
      filename,
      url: `data:${mimeType};base64,${base64Content}`,
    }),
  });
}

export async function uploadFileFromUrl(
  filename: string,
  url: string,
): Promise<UploadedFile> {
  return pfetch<UploadedFile>("/files", {
    method: "POST",
    body: JSON.stringify({
      type: "default",
      filename,
      url,
    }),
  });
}

export async function createSyncProduct(
  storeId: number,
  data: CreateProductData,
): Promise<SyncProductDetail> {
  return pfetch<SyncProductDetail>("/store/products", {
    method: "POST",
    storeId,
    body: JSON.stringify(data),
  });
}

export async function getSyncProducts(
  storeId: number,
): Promise<SyncProduct[]> {
  const allProducts: SyncProduct[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const page = await pfetch<{ result: SyncProduct[] }>(
      `/store/products?limit=${limit}&offset=${offset}`,
      { storeId },
    );
    const results =
      (page as unknown as { result: SyncProduct[] }).result ??
      (page as unknown as SyncProduct[]);
    if (!results || results.length === 0) break;
    allProducts.push(...results);
    if (results.length < limit) break;
    offset += limit;
  }

  return allProducts;
}

export async function getSyncProductDetail(
  storeId: number,
  productId: number,
): Promise<SyncProductDetail> {
  return pfetch<SyncProductDetail>(`/store/products/${productId}`, { storeId });
}

export async function createOrder(
  storeId: number,
  orderData: OrderData,
): Promise<Order> {
  const { confirm, ...body } = orderData;
  const path = confirm ? "/orders?confirm=true" : "/orders";
  return pfetch<Order>(path, {
    method: "POST",
    storeId,
    body: JSON.stringify(body),
  });
}
