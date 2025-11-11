<script setup lang="ts">
import Separator from './ui/separator/Separator.vue';

</script>

<template>
  <footer class="bg-[#59351F] text-[#F4F1EF] spikes mt-50">
    <section class="flex justify-between px-24 pt-20 pb-18">
      <h1 class="font-logo expanded leading-10 max-w-[555px]">bringing your local market at your fingertips</h1>
      <div class="flex gap-20">
        <div>
          <h2 class="text-3xl font-heading font-semibold leading-17">Get started with Anigo.</h2>
          <div class="space-x-3">
            <button class="bg-primary text-primary-50 font-semibold rounded-lg p-2 px-4"
              @click="$router.push('/market')">Start Browsing</button>
            <button
              class="bg-secondary/30 text-[#FFF0E9]! border border-secondary font-semibold rounded-lg p-2 px-4"
              @click="$router.push('/contacts')">Become a vendor</button>
          </div>
        </div>
        <div>
          <h2 class="font-heading font-semibold text-xs leading-10">MORE ON ANIGO APP</h2>
          <img src="../assets/img/app promotion array.png" alt="">
        </div>
      </div>
    </section>
    <Separator class="bg-[#83573C]!"/>
    <section class="text-[#D5BAA9] flex justify-between px-24 py-6">
      <span>©2025 Anigo PH <span class="text-sm">- CITE001 Project</span></span>
      <ul class="flex gap-10 *:text-clickable">
        <li>Help</li>
        <li>Terms of Service</li>
        <li>Privacy Policy</li>
      </ul>
    </section>
  </footer>
</template>
<style scoped>
.expanded {
  font-variation-settings: "wdth" 131.82;
}

.spikes {
  position: relative;

}

.spikes::before {
  content: '';
  position: absolute;
  right: 0;
  left: -0%;
  top: -63px;
  transform: scaleY(-1);
  z-index: 10;
  display: block;
  height: 65px;
  background-size: 65px 100%;
  background-image: linear-gradient(135deg, #59351F 25%, transparent 25%), linear-gradient(225deg, #59351F 25%, transparent 25%);
  background-position: 0 0;
}
</style>
