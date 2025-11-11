<script setup lang="ts">
import type { NumberFieldIncrementProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Plus } from "lucide-vue-next"
import { NumberFieldIncrement, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"
import { Icon } from "@iconify/vue"

const props = defineProps<NumberFieldIncrementProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <NumberFieldIncrement data-slot="increment" v-bind="forwarded" :class="cn(' right-0 disabled:cursor-not-allowed disabled:opacity-20 cursor-pointer', props.class)">
    <slot>
      <Icon icon="material-symbols:add" class="text-white size-full" />
    </slot>
  </NumberFieldIncrement>
</template>
