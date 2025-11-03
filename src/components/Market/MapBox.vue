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

        <button @click="showProducts = true"
          class="w-full bg-secondary text-white font-semibold py-3 rounded-lg transition-colors">
          View Products
        </button>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, h } from 'vue';
import type { Ref } from 'vue';
import { renderToString } from 'vue/server-renderer';
import PalengkeMarker from '../My Market/PalengkeMarker.vue';
import type { Map, Marker } from 'leaflet';

const [userlat, userLng] = [14.713188, 120.956063]

interface Product {
  id: number;
  name: string;
  vendor: string;
  price: string;
  image: string;
}

interface PalengkeRelative extends Palengke {
  distance: string;
}

interface Palengke {
  id: number;
  name: string;
  location: string;
  lat: number;
  lng: number;
  products: Product[];
}
const mapContainer: Ref<HTMLElement | null> = ref(null);
const selectedPalengke: Ref<PalengkeRelative | null> = ref(null);
defineExpose({selectedPalengke})
const showProducts: Ref<boolean> = ref(false);
let map: Map | null = null;
const markers: Marker[] = [];


// 5 Palengke locations with their products
const palengkes: Palengke[] = [
  {
    id: 1,
    name: 'Commonwealth Market',
    location: 'Commonwealth Ave, Quezon City',
    lat: 14.6760,
    lng: 121.0437,
    products: [
      { id: 1, name: 'Fresh Tomatoes', vendor: 'Aling Rosa', price: '₱40/kg', image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=200&q=80' },
      { id: 2, name: 'Native Chicken', vendor: 'Mang Juan', price: '₱280/kg', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=200&q=80' },
      { id: 3, name: 'Pako (Fern)', vendor: 'Aling Rosa', price: '₱30/bundle', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&q=80' },
      { id: 4, name: 'Sitaw (String Beans)', vendor: 'Aling Nena', price: '₱50/kg', image: 'https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=200&q=80' },
      { id: 5, name: 'Fresh Eggs', vendor: 'Mang Jose', price: '₱7/piece', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&q=80' },
    ]
  },
  {
    id: 2,
    name: 'Balintawak Market',
    location: 'Balintawak, Quezon City',
    lat: 14.6547,
    lng: 121.0051,
    products: [
      { id: 6, name: 'Fresh Bangus', vendor: 'Mang Pedro', price: '₱180/kg', image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=200&q=80' },
      { id: 7, name: 'Tilapia', vendor: 'Mang Pedro', price: '₱120/kg', image: 'https://images.unsplash.com/photo-1534389668764-3116ad39f2bb?w=200&q=80' },
      { id: 8, name: 'Shrimp (Hipon)', vendor: 'Fish Corner', price: '₱350/kg', image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=200&q=80' },
      { id: 9, name: 'Crab (Alimango)', vendor: 'Fish Corner', price: '₱400/kg', image: 'https://images.unsplash.com/photo-1580217593608-61931cefc821?w=200&q=80' },
      { id: 10, name: 'Squid (Pusit)', vendor: 'Mang Pedro', price: '₱250/kg', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=200&q=80' },
    ]
  },
  {
    id: 3,
    name: 'Farmer\'s Market Cubao',
    location: 'Cubao, Quezon City',
    lat: 14.6191,
    lng: 121.0515,
    products: [
      { id: 11, name: 'Organic Lettuce', vendor: 'Green Farm', price: '₱60/head', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=200&q=80' },
      { id: 12, name: 'Fresh Mangoes', vendor: 'Fruit Corner', price: '₱120/kg', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200&q=80' },
      { id: 13, name: 'Ginger (Luya)', vendor: 'Herbal Shop', price: '₱100/kg', image: 'https://images.unsplash.com/photo-1580281658223-9e6db1d8f398?w=200&q=80' },
      { id: 14, name: 'Organic Carrots', vendor: 'Green Farm', price: '₱80/kg', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&q=80' },
      { id: 15, name: 'Cherry Tomatoes', vendor: 'Green Farm', price: '₱150/kg', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&q=80' },
    ]
  },
  {
    id: 4,
    name: 'Tandang Sora Market',
    location: 'Tandang Sora Ave, Quezon City',
    lat: 14.6812,
    lng: 121.0324,
    products: [
      { id: 16, name: 'Pork Liempo', vendor: 'Mang Tomas', price: '₱320/kg', image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=200&q=80' },
      { id: 17, name: 'Beef Bulalo', vendor: 'Mang Tomas', price: '₱450/kg', image: 'https://images.unsplash.com/photo-1588347818036-8abaa2d1a8f7?w=200&q=80' },
      { id: 18, name: 'Chorizo', vendor: 'Aling Lucing', price: '₱280/kg', image: 'https://images.unsplash.com/photo-1627363795416-5cd1bd0e4326?w=200&q=80' },
      { id: 19, name: 'Longganisa', vendor: 'Aling Lucing', price: '₱250/kg', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=200&q=80' },
      { id: 20, name: 'Ground Pork', vendor: 'Mang Tomas', price: '₱280/kg', image: 'https://images.unsplash.com/photo-1603048588665-791ca8eff206?w=200&q=80' },
    ]
  },
  {
    id: 5,
    name: 'Muñoz Market',
    location: 'Muñoz, Quezon City',
    lat: 14.6589,
    lng: 121.0274,
    products: [
      { id: 21, name: 'Calamansi', vendor: 'Fruit Stand', price: '₱40/kg', image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=200&q=80' },
      { id: 22, name: 'Sili (Chili)', vendor: 'Aling Maria', price: '₱60/kg', image: 'https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=200&q=80' },
      { id: 23, name: 'Garlic (Bawang)', vendor: 'Aling Maria', price: '₱180/kg', image: 'https://images.unsplash.com/photo-1580281658223-9e6db1d8f398?w=200&q=80' },
      { id: 24, name: 'Onion (Sibuyas)', vendor: 'Aling Maria', price: '₱120/kg', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&q=80' },
      { id: 25, name: 'Kangkong', vendor: 'Veggie Corner', price: '₱30/bundle', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&q=80' },
    ]
  }
];

  const initMap = async () => {
    const L = await import('leaflet');

    const createMarkerIcon = async (name: string, location: string) => {
      const vnode = h(PalengkeMarker, { name, location });
      const html = await renderToString(vnode);

      return L.divIcon({
        className: '',
        html,
        iconSize: [350, 40],
        iconAnchor: [20, 20]
      });
    };

    const getDistance = (p: Palengke): string => {
      const userLatLng = L.latLng(userlat, userLng);
      const marketLatLng = L.latLng(p.lat, p.lng);
      const distanceKm = (userLatLng.distanceTo(marketLatLng) / 1000).toFixed(1);
      return `${distanceKm} km`
    };


    if (!mapContainer.value) return;

    map = L.map(mapContainer.value).setView([userlat, userLng], 14);

    // Add OpenStreetMap tiles
    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors',
      minZoom: 14,
      maxZoom: 18
    }).addTo(map);

    L.marker([userlat, userLng], {
      icon: L.divIcon({
        className: '',
        html: `
          <svg xmlns="http://www.w3.org/2000/svg" class="text-accent size-14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"/></svg>
        `,
        iconAnchor: [28, 56]
      })
    }).addTo(map).on('click', () => {
      map!.flyTo([userlat, userLng], 16, {
        duration: .4
      })
    })

    // Add markers for each palengke
    palengkes.forEach(async (palengke) => {
      const distance = await getDistance(palengke)
      const marker = L.marker([palengke.lat, palengke.lng], {
        icon: await createMarkerIcon(palengke.name, palengke.location), riseOnHover: true
      })
        .addTo(map!)

      marker.on('click', () => {
        selectedPalengke.value = {
          ...palengke,
          distance: distance
        };
        showProducts.value = false;
        // Animate map to center on selected marker
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
