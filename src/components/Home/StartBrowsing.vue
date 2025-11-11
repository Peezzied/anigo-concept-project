<script lang="ts" setup>
import { categories, type Category } from '@/assets/data/categories';
import { useRouter } from 'vue-router';

const router = useRouter()

const select = (cat: Category) => {
  router.push({name: 'Market', query: { category: cat.id }})
}
</script>

<template>
  <article class="space-y-12">
    <div>
      <h1 class="text-center my-3">Start Browsing</h1>
      <p class="text-center max-w-xl mx-auto">
        Whether you have questions, feedback, or you're a vendor wanting to reach more customers, we're ready to connect
      </p>
    </div>
    <div class="flex gap-4 mx-auto max-w-7xl h-30 cursor-pointer">
      <div v-for="i in categories" :key="i.color" @click="select(i)" :style="{ 'background-color': i.color }" class="flex-1 rounded-xl p-5">
        <h2 class="text-2xl font-semibold text-white">{{ i.title }}</h2>
      </div>
    </div>
  </article>
</template>
