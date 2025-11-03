<script setup lang="ts">

type Step = {
  title: string,
  description: string,
  img: URL
}

const steps: Step[] = [
  {
    title: 'Browse & Discover',
    description: 'Explore fresh products from local palengke vendors in your area. Filter by category or search for exactly what you need.',
    img: new URL('@/assets/img/magnifying glass.png', import.meta.url)
  },
  {
    title: 'Add to Basket',
    description: 'Select your items, choose quantities, and add them to your basket. Review your order anytime before checkout.',
    img: new URL('@/assets/img/bayong.png', import.meta.url)
  },
  {
    title: 'Checkout & Receive',
    description: 'Complete your order and choose delivery or pickup. Get fresh ingredients delivered to your doorstep or pick them.',
    img: new URL('@/assets/img/bigas.png', import.meta.url)
  }
]
</script>

<template>
  <article class="container space-y-12">
    <h1 class="mb-3">How does it works<span class="text-secondary">?</span></h1>
    <p>Getting fresh ingredients from your local palengke is as easy as 1-2-3. Browse quality products, support local
      vendors, and enjoy convenient delivery or pickup—all from the comfort of your home</p>
    <div class="flex gap-5">
      <div v-for="(i, index) in steps" :key="index" :style="{
        '--after-bg': `url(${i.img.href})`
      }"
        class="bg-[#ece9d2] flex-1 p-8 rounded-xl h-120 space-y-7 py-17 pseudo-container relative after:bg-no-repeat after:bg-center after:bg-cover after:bottom-0 after:right-0 after:w-[210px] after:h-[210px] overflow-hidden">
        <div class="flex">
          <div
            class="bg-primary text-primary-50 aspect-square w-20 h-20 mr-3 rounded-full flex items-center justify-center">
            <h2 class="font-semibold font-head text-5xl">{{ index + 1 }}</h2>
          </div>
          <h2 class="font-semibold text-3xl">{{ i.title }}</h2>
        </div>
        <p class="mx-3">{{ i.description }}</p>
      </div>
    </div>
  </article>
</template>

<style lang="css" scoped>
.pseudo-container::after {
  background-image: var(--after-bg);
}
</style>
