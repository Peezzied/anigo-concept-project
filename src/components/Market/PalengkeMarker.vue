<script setup lang="ts">
import MarketMarketIcon from '../icons/MarketMarketIcon.vue';
defineProps<{
  name: string,
  location: string,
  size: "small" | "large"
}>()
</script>

<template>
  <div :class="`flex items-center gap-2 transition-all duration-150 ease active:opacity-80 ${size == 'large' ? 'hover:scale-105' : ''}`">
    <div :class="`rounded-full ${size === 'small' ? 'glow-blink-border border-2 border-accent' : ''}`">
      <div class="bg-[#d5eecf] rounded-full w-fit p-2 aspect- border-white border-3 shadow-md">
        <MarketMarketIcon class="size-7 text-primary"/>
      </div>
    </div>
    <div :class="`bg-white p-2 rounded-sm px-3 shadow-xl ${size == 'small' ? 'hidden!' : ''}`">
      <h1 :class="`${size == 'small' ? 'text-sm!' : 'text-[16px]!'} leading-normal`">{{ name }}</h1>
      <h2 :class="`font-medium font-body ${size == 'small' ? 'text-xs' : 'text-sm'}`">{{ location }}</h2>
    </div>
  </div>
</template>

<style scoped>
@keyframes glow-blink {
  0%, 100% {
    box-shadow: 0 0 4px rgb(2, 132, 197, 0.8);
  }
  50% {
    box-shadow: 0 0 12px rgb(2, 132, 197, 0.8);
  }
}

.glow-blink-border {
  animation: glow-blink 1.7s infinite ease;
}
</style>
