import type { Palengke } from '@/schemas/palengke';
import type { Item, Product } from '@/schemas/product';
import { defineStore } from 'pinia';
import { ref, watch, type Ref } from 'vue';

export const useMarketSelectionStore = defineStore('market', () => {
  const palengke: Ref<Palengke | null> = ref(null);

  const set = (x: Palengke) => {
    palengke.value = x;
  }
  // Load from localStorage on initialization
    const storedCart = localStorage.getItem('market');
    if (storedCart) {
      console.log("Loading market from storage", storedCart);
      set(JSON.parse(storedCart));
    }


  watch(palengke, (newpalengke) => {
    localStorage.setItem('market', JSON.stringify(newpalengke));
  }, { deep: true });

  return { palengke, set };
});
