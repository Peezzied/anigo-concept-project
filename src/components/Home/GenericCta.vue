<script lang="ts" setup>

defineProps<{
  title: string,
  description: string,
  img: string,
  button: string,
  icon: string
}>()

</script>

<template>
  <article class="flex gap-20 container items-center">
    <div class="grid gap-x-3">
      <div class="col-1">
        <img :src="icon" alt="">
      </div>
      <div class="col-2 space-y-6">
        <h1 class="max-w-xl leading-13">{{title}}</h1>
        <p>
          {{ description }}
        </p>
        <button class="rounded-[10px] p-2 px-4 cursor-pointer bg-secondary font-semibold text-white">{{button}}</button>
      </div>
    </div>
    <img :src="img" alt="">
  </article>
</template>
