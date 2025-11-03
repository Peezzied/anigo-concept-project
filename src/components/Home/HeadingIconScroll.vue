<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee'
type SourceItem = {
  alt: string
  src: URL
}

const source: SourceItem[] = [
  {
    alt: "chicken",
    src: new URL('@/assets/icons/chicken.svg', import.meta.url)
  },
  {
    alt: "rice",
    src: new URL('@/assets/icons/rice.svg', import.meta.url)
  },
  {
    alt: "other",
    src: new URL('@/assets/icons/other.svg', import.meta.url)
  },
  {
    alt: "pig",
    src: new URL('@/assets/icons/pig.svg', import.meta.url)
  },
  {
    alt: "vegetable",
    src: new URL('@/assets/icons/vegetable.svg', import.meta.url)
  },
  {
    alt: "fruit",
    src: new URL('@/assets/icons/fruit.svg', import.meta.url)
  }
]
</script>

<template>
    <Vue3Marquee :clone="true">
      <div v-for="item in source" :key="item.alt" class="ml-10">
        <img :src="item.src.href" :alt="item.alt" />
      </div>
    </Vue3Marquee>
</template>
