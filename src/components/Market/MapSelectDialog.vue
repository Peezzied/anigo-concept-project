<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import MapBox from '../Market/MapBox.vue';
import DialogClose from '../ui/dialog/DialogClose.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { userLat, userLng } from '@/lib/userCoords';
import { useMarketSelectionStore } from '@/stores/useMarketSelectionStore';
import { palengkeMap } from '@/lib/palengkeMap';
import palengke from '@/assets/data/palengke.json'
import { PalengkeRawSchema, type Palengke, type PalengkeRaw } from '@/schemas/palengke';
import { z } from 'zod';

const isOpen = defineModel<boolean>('open')
const map = ref<InstanceType<typeof MapBox>>();

const marketSelection = useMarketSelectionStore()
const selectNear = async () => {
  const L = await import('leaflet');

  const userLatLng = L.latLng(userLat, userLng);

  const palengkeDistances: number[] = [];
  palengke.forEach((p) => {
    const palengkeLatLng = L.latLng(p.lat, p.lng);
    const distance = userLatLng.distanceTo(palengkeLatLng); // in meters

    palengkeDistances.push(distance);
  });

  const nearestIndex = palengkeDistances.indexOf(Math.min(...palengkeDistances));
  const nearestPalengke = palengke[nearestIndex];

  const palengkes: PalengkeRaw[] = z.array(PalengkeRawSchema).parse(palengke)

  return palengkeMap(palengkes.find(p => p.id === nearestPalengke!.id) as PalengkeRaw).palengkeMapped
}
defineExpose({
  selectNear
})
</script>
<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger :as-child="true">
      <slot />
    </DialogTrigger>
    <DialogContent class="max-w-[90vw]! grid-rows-[auto_1fr_auto] h-[90dvh] p-0">
      <DialogHeader class="mt-6 mx-6">
        <DialogTitle as-child>
          <h1 class="flex items-center justify-center gap-1">
            <span>
              <Icon icon="mdi:location" class="inline size-7" />
            </span>
            <span class="text-2xl">Select a Palengke</span>
          </h1>
        </DialogTitle>
      </DialogHeader>
      <MapBox ref="map" />
      <DialogFooter class="mb-6 mx-6">
        <DialogClose as-child>
          <button>Close</button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
