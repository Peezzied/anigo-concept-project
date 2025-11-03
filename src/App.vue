<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
// import NavigationBar from './components/NavigationBar.vue'
import { computed } from 'vue'

const route = useRoute()
// const isHome = computed(() => route.path === '/')

</script>

<template>

  <RouterView />
</template>
