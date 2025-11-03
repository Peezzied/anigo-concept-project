<script setup lang="ts">
import MarketMarketIcon from '../icons/MarketMarketIcon.vue';
defineProps<{
  name: string,
  location: string
}>()
</script>

<template>
  <div class="flex items-center gap-2  hover:scale-105 transition-all duration-150 ease active:opacity-80">
    <div class="bg-[#d5eecf] rounded-full w-fit p-2 aspect- border-white border-3 shadow-md">
      <MarketMarketIcon class="size-7 text-primary"/>
    </div>
    <div class="bg-white p-2 rounded-sm px-3 shadow-xl">
      <h1 class="text-[16px]!">{{ name }}</h1>
      <h2 class="font-medium font-body">{{ location }}</h2>
    </div>
  </div>
</template>
