<template>
  <div class="relative w-full h-full overflow-hidden">
    <!-- Map Container -->
    <div ref="mapContainer" class="w-full h-full"></div>

    <!-- Palengke Info Card (shows when marker clicked) -->
    <transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100" leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-full opacity-0">
      <div v-if="selectedPalengke && !showProducts"
        class="absolute bottom-6 left-6 right-6 md:left-auto md:w-96 bg-white rounded-lg shadow-2xl p-6 z-1000">
        <button @click="selectedPalengke = null" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          ✕
        </button>

        <h3 class="text-2xl font-bold text-gray-800 mb-2">
          {{ selectedPalengke.name }}
        </h3>
        <p class="text-gray-600 mb-4">{{ selectedPalengke.location }}</p>

        <div class="space-y-2 mb-4">
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <span>📍</span>
            <span>{{ selectedPalengke.distance }} away</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <span>🛒</span>
            <span>{{ selectedPalengke.products.length }} products available</span>
          </div>
        </div>

        <button @click="selectProductsHandler"
          class="w-full bg-secondary text-white font-semibold py-3 rounded-lg transition-colors">
          Select Palengke
        </button>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, h } from 'vue';
import type { Ref } from 'vue';
import { renderToString } from 'vue/server-renderer';
import PalengkeMarker from './PalengkeMarker.vue';
import type { Map, Marker } from 'leaflet';
import { PalengkeRawSchema, type Palengke, type PalengkeRaw } from '@/schemas/palengke';
import palengke from '@/assets/data/palengke.json'
import baseProducts from '@/assets/data/base_products.json'
import { z } from 'zod';
import { ProductSchema, type Item, type Product } from '@/schemas/product';
import { useMarketSelectionStore } from '@/stores/useMarketSelectionStore';
import { userLat, userLng } from '@/lib/userCoords';
import { palengkeMap } from '@/lib/palengkeMap';

interface PalengkeRelative extends Palengke {
  distance: string;
}

const mapContainer: Ref<HTMLElement | null> = ref(null);
const selectedPalengke: Ref<PalengkeRelative | null> = ref(null);
const showProducts: Ref<boolean> = ref(false);

let map: Map | null = null;

const markers: Marker[] = [];
const palengkes = z.array(PalengkeRawSchema).parse(palengke)

const marketSelection = useMarketSelectionStore()

const emit = defineEmits<{
  (e: 'select'): void
}>();

const selectProductsHandler = () => {
  showProducts.value = true;
  marketSelection.set(selectedPalengke.value!!!!!!!);
  emit('select');
};

const initMap = async () => {
  const L = await import('leaflet');

  const createMarkerIcon = async (name: string, location: string) => {
    const vnode = h(PalengkeMarker, { name, location, size: 'large' });
    const html = await renderToString(vnode);

    return L.divIcon({
      className: '',
      html,
      iconSize: [350, 40],
      iconAnchor: [20, 20]
    });
  };

  const getDistance = (p: PalengkeRaw): string => {
    const userLatLng = L.latLng(userLat, userLng);
    const marketLatLng = L.latLng(p.lat, p.lng);

    const distanceMeters = userLatLng.distanceTo(marketLatLng); // returns meters

    if (distanceMeters < 1000) {
      return `${distanceMeters.toFixed(0)} m`; // show meters if less than 1 km
    } else {
      const distanceKm = (distanceMeters / 1000).toFixed(1);
      return `${distanceKm} km`;
    }
  };

  if (!mapContainer.value) return;

  map = L.map(mapContainer.value).setView([userLat, userLng], 14);

  // Add OpenStreetMap tiles
  L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png?api_key=64442ba5-f649-4b06-bbc2-5f7d408e01de', {
    attribution: '© OpenStreetMap contributors',
    minZoom: 14,
    maxZoom: 18
  }).addTo(map);

  L.marker([userLat, userLng], {
    icon: L.divIcon({
      className: '',
      html: `
          <svg xmlns="http://www.w3.org/2000/svg" class="text-accent size-14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"/></svg>
        `,
      iconAnchor: [28, 56]
    })
  }).addTo(map).on('click', () => {
    map!.flyTo([userLat, userLng], 16, {
      duration: .4
    })
  }).bindTooltip('You are here', {
    direction: 'top',
    offset: [0, -40],
    className: 'palengke-label'
  });

  const allPalengkeMapped: Palengke[] = [];

  // Add markers for each palengke
  palengkes.forEach(async (palengke: PalengkeRaw) => {
    const distance = getDistance(palengke)
    const marker = L.marker([palengke.lat, palengke.lng], {
      icon: await createMarkerIcon(palengke.name, palengke.location), riseOnHover: true
    })
      .addTo(map!)

    marker.on('click', () => {
      const { palengkeMapped, baseProductsParsed } = palengkeMap(palengke)

      allPalengkeMapped.push(palengkeMapped);

      if (palengkeMapped.products.length === 0) {
        palengkeMapped.products = baseProductsParsed;
      }

      selectedPalengke.value = {
        ...palengkeMapped,
        distance: distance
      };
      showProducts.value = false;



      map!.flyTo([palengke.lat, palengke.lng], 16, {
        duration: .4
      });
    });

    marker.on('mouseover', () => {
      markers.forEach(m => {
        const el = m.getElement();
        if (!el) return;
        el.style.opacity = m === marker ? '1' : '0.6';

      });
    });
    marker.on('mouseout', () => {
      markers.forEach(m => {
        const el = m.getElement();
        if (!el) return;
        el.style.opacity = '1';
      });
    });

    markers.push(marker);
  });
};

onMounted(() => {
  initMap();
  
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});

</script>

<style>
@import 'leaflet/dist/leaflet.css';

.custom-marker:hover div {
  transform: scale(1.2);
}

.leaflet-control-attribution {
  font-size: 10px;
  opacity: 0.5;
}

.palengke-label {
  background: white;
  border-radius: 4px;
  padding: 2px 6px;
  font-weight: 600;
  color: #333;
  font-size: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.leaflet-marker-icon {
  transition: opacity 0.15s ease-in-out;
}
</style>
