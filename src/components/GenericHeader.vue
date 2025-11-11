<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { reactiveOmit } from '@vueuse/core';
import type { HTMLAttributes } from "vue"

const props = defineProps<{class?: HTMLAttributes["class"], firstSection?: HTMLAttributes["class"]}>()
const delegatedProps = reactiveOmit(props, "class")

</script>

<template>
  <header :class="cn(` mb-16`, props.class)" v-bind="delegatedProps">
    <section :class="cn(`bg-radial from-primary to-[#10592B] from-[25%] to-[82%] relative overflow-hidden flex justify-center items-center rounded-b-[56px] h-[25em] after:absolute after:content-[''] after:bg-[url('.././assets/img/header_bg-2.png')] after:z-0 after:bg-cover after:inset-0 *:relative *:z-20`, props.firstSection)">
      <slot/>
    </section>
    <slot name="section"/>
  </header>
</template>
