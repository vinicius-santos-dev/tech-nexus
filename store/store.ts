import { Product } from "@/sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string, onRemove?: () => void) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getTotalItems: () => number;
  getGroupedItems: () => CartItem[];
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              items: [...state.items, { product, quantity: 1 }],
            };
          }
        }),
      removeItem: (productId: string, onRemove?: () => void) =>
        set((state) => {
          const item = state.items.find(
            (item) => item.product._id === productId
          );
          if (item?.quantity === 1) {
            onRemove?.();
          }
          return {
            items: state.items
              .map((item) =>
                item.product._id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
              .filter((item) => item.quantity > 0),
          };
        }),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        ),
      getItemCount: (productId: string) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item?.quantity ?? 0;
      },
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
      getGroupedItems: () => get().items,
    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;
