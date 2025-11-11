<script setup lang="ts">
import HoverCard from './ui/hover-card/HoverCard.vue';
import HoverCardTrigger from './ui/hover-card/HoverCardTrigger.vue';
import HoverCardContent from './ui/hover-card/HoverCardContent.vue';
import { ref, type HTMLAttributes } from 'vue';
import { Icon } from '@iconify/vue';
import { reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'reka-ui';
import { cn } from '@/lib/utils';

const isHoverOpen = ref()
const props = defineProps<{
width?: string,
class?: HTMLAttributes["class"]
}>()

const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardPropsEmits(delegatedProps)
</script>
<template>
  <HoverCard v-model:open="isHoverOpen">
    <HoverCardTrigger as-child>
      <button @click="isHoverOpen = true">
        <Icon v-bind="forwarded" :class="props.class" :width="width ?? '20px'" icon="material-symbols:info-outline" />
      </button>
    </HoverCardTrigger>
    <HoverCardContent as-child>
      <slot />
    </HoverCardContent>
  </HoverCard>
</template>
