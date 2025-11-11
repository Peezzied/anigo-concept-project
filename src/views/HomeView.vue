<script setup lang="ts">
import AdSection from '@/components/Home/AdSection.vue';
import AboutCta from '@/components/Home/GenericCta.vue';
import ContactCta from '@/components/Home/GenericCta.vue';
import HeadingIconScroll from '@/components/Home/HeadingIconScroll.vue';
import StartBrowsing from '@/components/Home/StartBrowsing.vue';
import StepsSection from '@/components/Home/StepsSection.vue';
import NavigationBar from '@/components/NavigationBar.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';

const aboutImg = {
  img: new URL('@/assets/img/vendor-1.png', import.meta.url).href,
  icon: new URL('@/assets/icons/fingertip.svg', import.meta.url).href
}

const contactImg = {
  img: new URL('@/assets/img/market-1.png', import.meta.url).href,
  icon: new URL('@/assets/icons/grow.svg', import.meta.url).href
}


const excludeElement = ref();
const showStickyNav = ref(false);

const handleScroll = (): void => {
  if (excludeElement.value) {
    const rect: DOMRect = excludeElement.value.getBoundingClientRect();
    // Show sticky nav when original nav is out of view
    showStickyNav.value = rect.bottom < 0;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});


</script>

<template>
  <transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="-translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100" leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="translate-y-0 opacity-100" leave-to-class="-translate-y-full opacity-0">
    <nav v-if="showStickyNav" class="fixed top-0 left-0 right-0 z-50 w-full">
      <NavigationBar :colored="true" />
    </nav>
  </transition>
  <header ref="excludeElement" class="grid grid-rows-[auto_1fr] h-screen max-h-[1000px] mb-30">
    <NavigationBar />
    <section
      class="bg-radial from-primary to-[#10592B] from-[45%] to-[84%] relative overflow-hidden mx-8 mb-8 rounded-[56px] flex flex-col items-center justify-center after:absolute after:content-[''] after:bg-[url('.././assets/img/header_bg.png')] after:-z-0 after:bg-cover after:inset-0">
      <div class="text-primary-50 flex-1 flex items-center justify-center gap-10 mt-20 flex-col relative z-30">
        <h1 class="text-5xl font-heading font-semibold text-center">What's in my <span><img
              src=".././assets/icons/Subtract.svg" class="inline"></span> today?</h1>
        <SearchBar class="max-w-170"/>
        <p class="text-center max-w-xl mx-auto">Skip the commute, not the freshness. Browse products from your local
          palengke, order what you need, and choose
          delivery or pickup. Fresh ingredients from trusted vendors, now just a click away</p>
      </div>
      <HeadingIconScroll class="mb-14 opacity-86" />
    </section>
  </header>
  <main class="space-y-40">
    <StartBrowsing />
    <AboutCta title="AmiGos, your local market now at your fingertips!"
      description="Missing your weekend palengke run? We've brought the market to you. Explore fresh products from vendors in your area, enjoy the same quality you've always trusted, and keep your community thriving—all from the comfort of home"
      button="Learn More" :img="aboutImg.img" :icon="aboutImg.icon" />
    <StepsSection />
    <ContactCta title="Need help or want to partner with us?"
      description="Whether you have questions, feedback, or you're a vendor wanting to reach more customers, we're ready to connect. Join us in making local palengkes more accessible to everyone in the community"
      button="Get in Touch" :img="contactImg.img" :icon="contactImg.icon" />
    <AdSection />
  </main>
</template>
