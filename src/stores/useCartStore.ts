import type { Item, Product } from "@/schemas/product";
import { defineStore } from "pinia";
import { ref, watch, type Ref } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items: Ref<Item[]> = ref([]);
  const selection: Ref<Item[]> = ref([]);

  // Load from localStorage on initialization
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    items.value = JSON.parse(storedCart);
  }
  const storedSelection = localStorage.getItem("cart_selection");
  if (storedSelection) {
    selection.value = JSON.parse(storedSelection);
  }

  const updateSelection = (item: Item[]) => {
    selection.value = item;
  };

  const addToCart = (product: Product, palengke: number) => {
    const existing = items.value.find((item) => item.product.id === product.id);
    if (existing) {
      return false;
    } else {
      items.value.push({ product: product, qty: 1, factor: 1, palengke_id: palengke } as Item);
      return true;
    }
  };

  const updateQuantity = (productId: number, qty: number) => {
    const item = items.value.find((item) => item.product.id === productId);
    if (item) {
      item.qty = qty;
    }
  };

  const updateFactor = (productId: number, factor: number) => {
    const item = items.value.find((item) => item.product.id === productId);
    if (item) {
      item.factor = factor;
    }
  };

  const removeFromCart = (productId: number) => {
    items.value = items.value.filter((item) => item.product.id !== productId)
    selection.value = selection.value.filter((item) => item.product.id !== productId)
  };

  const clearCart = () => {
    items.value = [];
  };

  // Watch cart and persist to localStorage
  watch(
    items,
    (newItems) => {
      localStorage.setItem("cart", JSON.stringify(newItems));
    },
    { deep: true }
  );

  watch(
    selection,
    (newItems) => {
      localStorage.setItem("cart_selection", JSON.stringify(newItems));
    },
    { deep: true }
  );

  return {
    items,
    selection,
    updateSelection,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    updateFactor,
  };
});
