"use client";

/**
 * cart.tsx — CartProvider context + useCart hook for the Anjo Services shop.
 *
 * Per CLAUDE.md Always-Built Features Rule → Shop. Mirrors the andrea-abella-marie
 * reference cart, with STORAGE_KEY renamed to "anjo-cart" so two demos sharing
 * the same browser don't collide on localStorage.
 *
 * Behaviors:
 *   - localStorage-persisted across reloads (silently no-ops if storage unavailable)
 *   - addItem auto-opens the drawer (key UX cue: action → confirmation in 1 frame)
 *   - removing the last quantity removes the item entirely (no negative qty state)
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  printful_variant_id?: number;
  size?: string;
  color?: string;
  category?: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "anjo-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = useCallback(
    (incoming: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === incoming.id);
        if (existing) {
          return prev.map((i) =>
            i.id === incoming.id
              ? { ...i, quantity: i.quantity + (incoming.quantity ?? 1) }
              : i,
          );
        }
        return [...prev, { ...incoming, quantity: incoming.quantity ?? 1 }];
      });
      setIsOpen(true);
    },
    [],
  );

  const removeItem = useCallback((id: string | number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string | number, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        count,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
