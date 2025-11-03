<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import MapBox from '../Market/MapBox.vue';
import DialogClose from '../ui/dialog/DialogClose.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const isOpen = defineModel<boolean>('open')
const map = ref<InstanceType<typeof MapBox>>();


</script>
<template>
  <Dialog :open="isOpen">
    <DialogTrigger :as-child="true">
      <slot />
    </DialogTrigger>
    <DialogContent class="max-w-[90vw]! grid-rows-[auto_1fr_auto] h-[90dvh] p-0">
      <DialogHeader class="mt-6 mx-6">
        <DialogTitle as-child>
          <h1 class="flex items-center justify-center gap-1">
            <span>
              <Icon icon="mdi:location" class="inline size-7"/>
            </span>
            <span class="text-2xl">Select a Palengke</span>
          </h1>
        </DialogTitle>
      </DialogHeader>
      <MapBox ref="map"/>
      <DialogFooter class="mb-6 mx-6">
        <DialogClose as-child>
          <button>Close</button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
