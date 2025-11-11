<script setup lang="ts">
import type { Category } from '@/assets/data/categories';
import { parsePrice } from '@/lib/utils';

defineProps<{
  category: Category;
  name: string;
  unit: string;
  price: number[];
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>();

</script>

<template>
  <div class="space-y-4 max-w-fit">
    <div class="bg-background-80 max-w-fit p-4 rounded-[17px]">
      <img src="../../assets/img/chicken.png" class="aspect-square" alt=""/>
    </div>
    <div class="font-medium">
      <span class="px-2 text-background rounded-md text-sm font-medium inline" :style="{backgroundColor: category.color}">{{ category.title }}</span>
      <h2 class="mt-1">{{ name }}</h2>
      <h2 class="text-xl">₱{{ parsePrice(price) }}/{{ unit }}</h2>
    </div>
    <div class="space-y-1">
      <button @click="emit('click')" class="flex bg-primary text-background rounded-[7px] p-2 w-full justify-center gap-2 items-center cursor-pointer">
        <img src="../../assets/icons/add-basket.svg" alt="" class="aspect-square w-6"/>
        <span class="font-semibold">Add to Basket</span>
      </button>
        <span class="opacity-60 font-medium text-[13px]">10+ Vendors</span>
    </div>
  </div>
</template>
