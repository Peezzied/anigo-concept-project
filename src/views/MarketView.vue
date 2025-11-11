<script setup lang="ts">
import ProductCard from '@/components/Market/ProductCard.vue';
import { categories, type Category } from '@/assets/data/categories';
import { computed, onMounted, ref, type Ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue';
import GenericHeader from '@/components/GenericHeader.vue';
import MapSelectDialog from '@/components/Market/MapSelectDialog.vue';
import NavigationBar from '@/components/NavigationBar.vue';
import type { Product } from '@/schemas/product';
import { useMarketSelectionStore } from '@/stores/useMarketSelectionStore';
import { useCartStore } from '@/stores/useCartStore';
import MapPreview from '@/components/Market/MapPreview.vue';
import { useToast } from '@/components/ui/toast';
import { Icon } from '@iconify/vue';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useRoute, useRouter } from 'vue-router';
import InfoHover from '@/components/InfoHover.vue';
import { parseCategory } from '@/lib/utils';
import Input from '@/components/ui/input/Input.vue';

const { toast } = useToast()
const router = useRouter()
const route = useRoute()

const select = (cat: Category) => {
  if (cat.id === Number(route.query.category)) {
    const newQuery = { ...route.query }
    delete newQuery.category
    console.log(newQuery)
    router.replace({ query: newQuery })

    return
  }
  router.replace({ query: { ...route.query, category: cat.id } })
}
const isOpen = ref();
const mapPreview = ref<InstanceType<typeof MapPreview>>();
const mapSelectDialog = ref<InstanceType<typeof MapSelectDialog>>();

const marketSelection = useMarketSelectionStore()
marketSelection.$subscribe(() => {
  isOpen.value = false;
  mapPreview.value?.panCurrent();
  toast({
    title: 'Palengke Selected',
    description: `You have selected ${marketSelection.palengke?.name}`,
  })
})

const cart = useCartStore()

const onProductClick = (product: Product) => {
  console.log('product add to cart', product)
  const existing = cart.addToCart(product, marketSelection.palengke!.id);

  console.log('existing', existing)
  if (!existing) {
    toast({
      title: 'Already in cart',
      description: `Item ${product.name} is already in your cart.`,
    })
    return
  }
  toast({
    title: 'Added to Cart',
    description: `${product.name} has been added to your cart.`,
  })
}

const filtered = computed(() => {
  return marketSelection.palengke?.products.filter((product) => {
    if (!route.query) return true;

    const categoryFilter = product.category === Number(route.query.category) || !route.query.category
    const searchFilter = product.name.toLowerCase().includes(String(route.query.search).toLowerCase()) || !route.query.search
    console.log('filtered searcj', searchFilter)

    return searchFilter && categoryFilter;
  }).sort((a, b) => a.name.localeCompare(b.name));
})

const selectNear = async () => {
  const selected = await mapSelectDialog.value?.selectNear();
  console.log('Selected palengke', selected);

  marketSelection.set(selected!!!!!!!);
}

const searchTerm = ref(route.query?.search)
const onSearch = () => {
  router.replace({ query: { ...route.query, search: searchTerm.value } })
}
</script>

<template>
  <NavigationBar colored />
  <GenericHeader>
    <span><img src=".././assets/icons/Subtract.svg" class="inline"></span>
  </GenericHeader>
  <main class="max-w-11/12 grid grid-cols-[300px_auto] mx-auto gap-x-17 mb-30">
    <article class="relative h-full">
      <div class="sticky top-26 space-y-12">
        <section class="space-y-6 ">
          <h1 class="text-xl font-semibold font-body">Select Category</h1>
          <div class="flex flex-col gap-3">
            <button :disabled="!marketSelection.palengke"
              class="ml-6 flex rounded-[10px] font-medium bg-[#F3F1E1] p-3 border-l-4 disabled:cursor-not-allowed disabled:opacity-80 border-[var(--select-color)] data-[selected=true]:font-semibold data-[selected=true]:shadow-md hover:shadow-md transition-shadow"
              :data-selected="Number($route.query?.category) === cat.id"
              :style="{ '--select-color': Number($route.query?.category) === cat.id ? cat.color : '#F3F1E1' }"
              v-for="(cat, index) in categories" :key="index" @click="select(cat)">
              <span>{{ cat.title }}</span>
            </button>
          </div>
        </section>
        <section class="space-y-6">
          <div class="flex justify-between">
            <h1 class="text-xl font-semibold font-body">Product Curation</h1>
            <InfoHover>
              asads
            </InfoHover>
          </div>
          <div class="flex flex-col">
            <div class="h-46! bg-[#f8f4f0] shadow-sm rounded-t-md">
              <MapPreview ref="mapPreview" v-if="marketSelection.palengke" />
              <div class="flex flex-col justify-center items-center h-full text-gray-500 gap-2"
                v-if="!marketSelection.palengke">
                <h1 class="text-center mx-auto text-base! font-body font-medium">No Palengke Selected</h1>
                <p class="text-center text-sm max-w-50">Do you want to select the <a class="text-clickable text-accent"
                    @click="selectNear">palengke near you?</a></p>
              </div>
            </div>
            <MapSelectDialog ref="mapSelectDialog" v-model:open="isOpen">
              <button
                class="bg-secondary p-3 w-full text-white font-medium rounded-md flex items-center justify-center gap-2"><span>
                  <Icon class="inline size-6" icon="line-md:my-location" />
                </span>Find Palengke</button>
            </MapSelectDialog>
          </div>
        </section>
      </div>
    </article>
    <article class="space-y-7">
      <section class="flex justify-between">
        <h1 class="text-3xl font-semibold flex-2">Curated Products</h1>
        <div class="relative w-full max-w-sm items-center">
          <Input id="search" type="text" placeholder="Search a product.." class="pl-9" v-model:model-value="searchTerm" @update:model-value="onSearch"/>
          <span class="absolute -top-2 inset-y-0 flex items-center justify-center px-2">
            <Icon icon="ri:search-line" class="size-5 text-black/50" />
          </span>
        </div>
      </section>
      <section class="grid gap-6 gap-y-12 grid-cols-[repeat(auto-fill,minmax(180px,max-content))]">
        <ProductCard :category="parseCategory(product.category)!" @click="onProductClick(product)"
          v-for="(product, index) in filtered" :key="index" :name="product.name" :price="product.price"
          :unit="product.unit" />
      </section>
    </article>
  </main>
</template>
