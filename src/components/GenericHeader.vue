<script lang="ts" setup>
import NavigationBar from './NavigationBar.vue';
</script>

<template>
  <header>
    <NavigationBar :colored="true" />
    <section class="bg-primary flex justify-center items-center rounded-b-[56px] h-[25em] mb-16">
      <slot></slot>
    </section>
  </header>
</template>
