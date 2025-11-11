<template>
  <div ref="mapContainer" class="h-full w-full"></div>
</template>
<script setup lang="ts">
import { userLat, userLng } from '@/lib/userCoords';
import { useMarketSelectionStore } from '@/stores/useMarketSelectionStore';
import { marker, Marker, Point, type Map } from 'leaflet';
import { h } from 'vue';
import { onMounted, onUnmounted, ref } from 'vue';
import PalengkeMarker from './PalengkeMarker.vue';
import { renderToString } from 'vue/server-renderer';

const market = useMarketSelectionStore();
let map: Map | null = null;
const markers: Marker[] = [];
const mapContainer = ref<HTMLElement | null>(null);

const createMarkerIcon = async (name: string, location: string) => {
  const vnode = h(PalengkeMarker, { name, location, size: 'small' });
  const html = await renderToString(vnode);
  const L = await import('leaflet');
  return L.divIcon({
    className: '',
    html,
    iconAnchor: [20, 20]
  });
};

const initMap = async () => {
  const L = await import('leaflet');

  map = L.map(mapContainer.value!, {
    center: [userLat, userLng],
    zoom: 13,
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    tapHold: false,
    touchZoom: false,
    attributionControl: false,
  });

  L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png').addTo(map);

  markers.push(L.marker([market.palengke?.lat ?? userLat, market.palengke?.lng ?? userLng], {
    icon: await createMarkerIcon(market.palengke!.name, market.palengke!.location)
  }).bindTooltip(`
    <span class="text-sm font-semibold text-black/80">${market.palengke!.name}</span>
    <br><span class="text-xs font-medium">${market.palengke!.location}</span>
  `, { direction: 'top', offset: new Point(6, 0), className: "font-body" }).addTo(map));
};

const panCurrent = async () => {
  const L = await import('leaflet');

  if (map) {
    markers.forEach(marker => marker.remove());
    map.setView([market.palengke?.lat ?? userLat, market.palengke?.lng ?? userLng], 16.4, { animate: true, duration: 0.7 });
    markers.push(L.marker([market.palengke?.lat ?? userLat, market.palengke?.lng ?? userLng], {
      icon: await createMarkerIcon(market.palengke!.name, market.palengke!.location)
    }).bindTooltip(`
    <span class="text-sm font-semibold text-black/80">${market.palengke!.name}</span>
    <br><span class="text-xs font-medium">${market.palengke!.location}</span>
  `, { direction: 'top', offset: new Point(6, 0), className: "font-body" }).addTo(map))
  }
}

defineExpose({
  panCurrent,
});

onMounted(() => {
  initMap();
  panCurrent()
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});
</script>
