<script lang="ts" setup>
import Label from '@/components/Label.vue';
import GenericHeader from '@/components/GenericHeader.vue';
import NavigationBar from '@/components/NavigationBar.vue';
import Accordion from '@/components/ui/accordion/Accordion.vue';
import AccordionContent from '@/components/ui/accordion/AccordionContent.vue';
import AccordionItem from '@/components/ui/accordion/AccordionItem.vue';
import AccordionTrigger from '@/components/ui/accordion/AccordionTrigger.vue';
import { Icon } from '@iconify/vue';

</script>

<template>
  <NavigationBar colored/>
  <GenericHeader class="grid" first-section="col-1 row-span-3">
    <h1 class="text-5xl text-primary-50 ">About us</h1>
    <template #section>
      <section class="col-1 row-span-4 items-center flex -mt-25 mb-25 container-medium [&_img]:h-80 [&_img]:flex-1 [&_img]:object-cover [&_img]:rounded-lg [&_img]:w-full [&_img:nth-child(even)]:h-[80%] [&_img]: w-full gap-3 relative z-20">
        <img src="../assets/img/placeholder.png"  />
        <img src="../assets/img/placeholder.png"  />
        <img src="../assets/img/placeholder.png" />
      </section>
    </template>
  </GenericHeader>
  <main class="space-y-70 mb-20">
    <section class="space-y-14 container-medium">
      <div class="flex justify-between items-center">
        <h1 class="max-w-3xl">We empower local vendors, bringing the palengke to every home.</h1>
        <img src="../assets/icons/dots-decorator.svg">
      </div>
      <div class="flex gap-7">
        <section class="space-y-10 bg-[#f7f3e0] rounded-[17px] p-9 py-15 flex-1" v-for="index in 2">
          <div class="space-y-2">
            <Icon icon="mingcute:target-fill" class="size-11" />
            <h2 class="font-semibold text-3xl">Our Mission</h2>
          </div>
          <p class="text-xl">To empower local palengke vendors by connecting them directly with customers through
            technology, while preserving the authentic Filipino market experience. We provide vendors with free tools to
            reach more customers and give families easy access to fresh, quality products from their neighborhood
            palengke</p>
        </section>
      </div>
    </section>
    <section class="container-medium grid grid-cols-[1fr_auto] gap-14">
      <div class="row-1">
        <Label>Our Impact</Label>
        <h1 class="mt-4">Growing Local Markets Through Digital Innovation, One Order at a Time</h1>
      </div>
      <p class="text-xl row-2">A thriving marketplace where every local palengke vendor can compete in the digital age
        without
        barriers. We envision communities where fresh, local products are always accessible, vendors earn sustainable
        livelihoods, and the Filipino palengke tradition flourishes for generations to come We started with just five
        vendors in one palengke. We gave them a simple app, trained them on how to use it, and launched to a small group
        of customers. The response was overwhelming. Vendors were thrilled to reach new customers. Families loved the
        coA thriving marketplace where every local palengke vendor can compete in the digital age without barriers. We
        envision communities where fresh, local products are always accessible A thriving marketplace where every local
        palengke vendor can compete in the digital age without barriers. We envision communities where fresh, local
        products are always accessible,</p>
      <img src="../assets/img/meat cover.png" class="object-cover w-full h-50 rounded-[27px] row-3">
      <div class="bg-[#f7f3e0] row-span-3 rounded-[17px]">
        <div class="flex">
          <div class="bg-linear-to-r from-[#F6E8A3]/0 from-[-20%] to-[#F6E8A3] border border-black/25 rounded-xl rounded-l-none">📺</div>
          <div class="*:font-medium">
            <h2 class="text-3xl">500+</h2>
            <p class="text-xl">Vendors Empowered</p>
          </div>
        </div>
      </div>
    </section>
    <section class="container-medium space-y-10">
      <div class="flex flex-col">
        <Label class="mx-auto">Our team</Label>
        <h1 class="mx-auto mt-4">Who made this initiative possible?</h1>
      </div>
      <div class="flex gap-5">
        <div class="flex-1 space-y-5" v-for="index in 3">
          <img src="../assets/img/placeholder.png" class="object-cover w-full h-110 rounded-xl">
          <div>
            <h2 class="font-semibold text-2xl">Karol John Dela Cruz</h2>
            <p class="text-xl font-medium">Founder</p>
          </div>
        </div>
      </div>
    </section>
    <section class="container-medium space-y-10">
      <h1>Frequently Asked Questions</h1>
      <div class="flex gap-20">
        <div class="flex-10">
          <Accordion collapsible type="multiple" class="space-y-5 w-full">
            <AccordionItem :value="index" v-for="index in 6">
              <AccordionTrigger class="text-xl font-medium">Accordion {{ index }}
                <template #icon>
                  <Icon icon="ic:baseline-plus" width="25"/>
                </template>
              </AccordionTrigger>
              <AccordionContent>
                taina
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div class="w-full flex-6 bg-[#F2EFDD] h-fit p-12 space-y-6 rounded-2xl">
          <h2 class="font-semibold text-2xl">Ready to experience fresh from your local palengke?</h2>
          <p>Whether you're looking for fresh products or wanting to grow your business, we're here to help</p>
          <div class="space-y-3">
            <div class="space-x-3">
              <button class="bg-primary text-primary-50 font-semibold rounded-lg p-2 px-4" @click="$router.push('/market')">Start Browsing</button>
              <button class="bg-secondary/6 text-primary-50 text-secondary! border border-secondary font-semibold rounded-lg p-2 px-4" @click="$router.push('/contacts')">Become a vendor</button>
            </div>
            <div>
              <span>Questions? </span>
              <RouterLink to="/contacts" class="underline">
                <span class="inline font-semibold text-clickable">Contact Us </span>
                <Icon icon="mdi:arrow-right" class="inline"/>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
