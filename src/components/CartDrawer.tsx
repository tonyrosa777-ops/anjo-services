"use client";

/**
 * CartDrawer — slide-in cart for the Anjo Services shop.
 *
 * Anjo brand translation of the andrea-abella-marie reference drawer:
 *   - Background: var(--bg-elevated-dark) (#141414) + var(--bg-dark-overlay-radial)
 *   - Border: var(--border-card-dark)
 *   - Accent (price/totals/eyebrow): var(--accent) amber
 *   - Primary CTA (Checkout): var(--primary) red, var(--primary-muted) hover,
 *     squared var(--radius-md) per design-system.md line 505 (no pill buttons
 *     on the trade-authority archetype)
 *   - Display font: var(--font-display) Saira Condensed
 *   - Body font: var(--font-body) Inter
 *
 * Mounted once globally inside CartProvider in layout.tsx — useCart().isOpen
 * controls visibility from anywhere on the site (cart icon in nav, "Add to
 * Cart" buttons in ShopContent).
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    total,
    count,
    isOpen,
    closeCart,
  } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function handleCheckout() {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Checkout failed. Please try again.");
      }
    } catch {
      alert("Checkout failed. Please try again.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/60"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[80] flex flex-col"
            style={{
              background: "var(--bg-elevated-dark)",
              color: "var(--text-primary)",
            }}
          >
            {/* Mandatory radial overlay — dark surfaces never flat */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: "var(--bg-dark-overlay-radial)" }}
            />

            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid var(--border-card-dark)" }}
              >
                <div>
                  <h2
                    className="font-display"
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "var(--text-h3)",
                      fontWeight: 800,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Your Cart
                  </h2>
                  {count > 0 && (
                    <p
                      className="font-mono"
                      style={{
                        color: "var(--accent)",
                        fontSize: "var(--text-meta)",
                        marginTop: "0.125rem",
                      }}
                    >
                      {count} item{count !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
                <button
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="p-1 transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <svg
                      className="w-16 h-16 mb-4"
                      style={{ color: "var(--text-muted)", opacity: 0.4 }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <p
                      className="font-body"
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "var(--text-body-sm)",
                      }}
                    >
                      Your cart is empty
                    </p>
                    <button
                      onClick={closeCart}
                      className="mt-4 font-display font-bold uppercase transition-colors"
                      style={{
                        color: "var(--accent)",
                        fontSize: "var(--text-eyebrow)",
                        letterSpacing: "0.08em",
                        textDecoration: "underline",
                        textUnderlineOffset: "0.25rem",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--accent)";
                      }}
                    >
                      Continue shopping
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3"
                      style={{
                        background: "var(--bg-card-dark)",
                        border: "1px solid var(--border-card-dark)",
                        borderRadius: "var(--radius-md)",
                      }}
                    >
                      {/* Image */}
                      <div
                        className="w-16 h-16 shrink-0 relative overflow-hidden"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: "var(--radius-sm)",
                        }}
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg
                              className="w-6 h-6"
                              style={{ color: "var(--text-muted)" }}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                            >
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <path d="m21 15-5-5L5 21" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-display truncate"
                          style={{
                            color: "var(--text-primary)",
                            fontSize: "var(--text-body-sm)",
                            fontWeight: 700,
                            letterSpacing: "0.01em",
                          }}
                        >
                          {item.name}
                        </p>
                        {item.category && (
                          <p
                            className="font-mono"
                            style={{
                              color: "var(--text-muted)",
                              fontSize: "var(--text-meta)",
                              marginTop: "0.125rem",
                            }}
                          >
                            {item.category}
                          </p>
                        )}
                        <p
                          className="font-display"
                          style={{
                            color: "var(--accent)",
                            fontSize: "var(--text-body-sm)",
                            fontWeight: 800,
                            marginTop: "0.25rem",
                          }}
                        >
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Qty + Remove */}
                      <div className="flex flex-col items-end justify-between shrink-0">
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="transition-colors"
                          style={{ color: "var(--text-muted)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--primary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--text-muted)";
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18 6 6 18M6 6l12 12" />
                          </svg>
                        </button>
                        <div
                          className="flex items-center gap-2 px-2 py-1"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: "var(--radius-sm)",
                          }}
                        >
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                            className="w-4 h-4 flex items-center justify-center transition-colors"
                            style={{ color: "var(--text-secondary)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color =
                                "var(--text-primary)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color =
                                "var(--text-secondary)";
                            }}
                          >
                            −
                          </button>
                          <span
                            className="font-mono w-4 text-center"
                            style={{
                              color: "var(--text-primary)",
                              fontSize: "var(--text-meta)",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                            className="w-4 h-4 flex items-center justify-center transition-colors"
                            style={{ color: "var(--text-secondary)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color =
                                "var(--text-primary)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color =
                                "var(--text-secondary)";
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div
                  className="px-6 py-5 space-y-4"
                  style={{ borderTop: "1px solid var(--border-card-dark)" }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-display uppercase"
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "var(--text-eyebrow)",
                        letterSpacing: "0.12em",
                      }}
                    >
                      Subtotal
                    </span>
                    <span
                      className="font-display"
                      style={{
                        color: "var(--accent)",
                        fontSize: "var(--text-h3)",
                        fontWeight: 900,
                      }}
                    >
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <p
                    className="font-body text-center"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "var(--text-meta)",
                    }}
                  >
                    Shipping calculated at checkout. Print-on-demand fulfilled
                    by Printful.
                  </p>
                  <button
                    onClick={handleCheckout}
                    className="w-full font-display font-bold uppercase transition-colors"
                    style={{
                      background: "var(--primary)",
                      color: "var(--text-primary)",
                      padding: "0.875rem 1.5rem",
                      borderRadius: "var(--radius-md)",
                      fontSize: "var(--text-body-sm)",
                      letterSpacing: "0.08em",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "var(--primary-muted)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--primary)";
                    }}
                  >
                    Checkout with Stripe
                  </button>
                  <button
                    onClick={closeCart}
                    className="w-full font-display uppercase transition-colors text-center"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "var(--text-eyebrow)",
                      letterSpacing: "0.08em",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                    }}
                  >
                    Continue shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
