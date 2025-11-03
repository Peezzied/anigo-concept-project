<script setup lang="ts">
import ProductCard from '@/components/Market/ProductCard.vue';
import { categories } from '@/assets/data/categories';
import { ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue';
import GenericHeader from '@/components/GenericHeader.vue';
import MapBox from '@/components/Market/MapBox.vue';
import MapSelectDialog from '@/components/My Market/MapSelectDialog.vue';
import PalengkeMarker from '@/components/My Market/PalengkeMarker.vue';
const selectedCategory = ref()
const select = (title: string) => {
  if (selectedCategory.value === title) return
  selectedCategory.value = title
}
const isOpen = ref();
</script>

<template>
  <GenericHeader>
    <span><img src=".././assets/icons/Subtract.svg" class="inline"></span>
  </GenericHeader>
  <main class="max-w-11/12 grid grid-cols-[300px_auto] mx-auto gap-x-17">
    <article>
      <section class="space-y-6">
        <h1 class="text-xl font-semibold font-body">Select Category</h1>
        <div class="flex flex-col gap-3">
          <button class="flex rounded-[10px] font-medium bg-[#F3F1E1] p-3 cursor-pointer"
            v-for="(cat, index) in categories" :key="index" :style="{
              backgroundColor: selectedCategory === cat.title ? cat.color : '#F3F1E1',
              color: selectedCategory === cat.title ? 'white' : 'black'
            }" @click="select(cat.title)">
            <span>{{ cat.title }}</span>
          </button>
        </div>
        <MapSelectDialog :open="isOpen">
          <button class="bg-secondary p-3 w-full text-white font-medium rounded-md">Find Palengke</button>
        </MapSelectDialog>
      </section>
    </article>
    <article class="space-y-7">
      <section class="flex justify-between">
        <h1 class="text-3xl font-semibold">Curated Products</h1>
        <SearchBar />
      </section>
      <section class="grid gap-6 place-items-center grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
        <ProductCard v-for="(item, index) in 14" :key="index" />
      </section>
    </article>
  </main>
</template>
