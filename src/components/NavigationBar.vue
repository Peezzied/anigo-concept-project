<script setup lang="ts">
import { RouterLink } from 'vue-router'
import router from '@/router';
import { computed } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import Logo from './icons/Logo.vue';
import Basket from './icons/basket.vue';

defineProps<{
  colored?: boolean
}>()
const routes = computed(() =>
  router.getRoutes().filter(r => r.meta.isNavigation)
);

const cart = useCartStore()

</script>
<template>
  <nav :class="colored ? 'bg-neutral text-background sticky top-0 z-50' : ''">
    <div :class="[
      'max-w-7xl mx-auto flex items-center justify-between',
      colored ? 'p-3' : 'p-5'
    ]">
      <button class="flex gap-1" @click="router.push('/')">
        <Logo :class="`w-7 h-auto ${colored ? 'text-background' : ''}`"/>
        <h1 class="font-logo text-3xl">Anigo</h1>
      </button>
      <ul class="flex gap-12 text-xl font-medium ">
        <li v-for="r in routes" :key="r.path" class="text-clickable">
          <RouterLink active-class="text-accent! font-semibold" :to="r.path">{{ r.name }}</RouterLink>
        </li>
      </ul>
      <div>
        <RouterLink class="border p-2 corner rounded-xl font-medium flex gap-2 items-center relative" to="/my-basket"
          active-class="bg-accent border-black/0 text-white">
          <span v-if="cart.items.length !== 0"
            class="absolute -top-2 -right-2 bg-accent text-white text-xs font-semibold rounded-full w-5 aspect-square flex items-center justify-center">
            {{ cart.items.length }}
          </span>
          <Basket :class="`${colored ? 'text-background' : ''} `" />
          <span>My Basket</span>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
