<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Toaster from './components/ui/toast/Toaster.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <RouterView />
  <Footer />
  <Toaster/>
</template>
