import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartItems: [],
  totalQuantity: 0,

  setCart: (cart) =>
    set({
      cartItems: cart.items,
      totalQuantity: cart.items.length,
    }),

  clearCart: () =>
    set({
      cartItems: [],
      totalQuantity: 0,
    }),
}));
