<template>
  <div class="w-full h-96 bg-gray-100 rounded-lg overflow-hidden relative">
    <div ref="mapContainer" class="w-full h-full"></div>
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    <div v-if="error" class="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
      <p class="text-red-600">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
// @ts-ignore
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

const props = defineProps<{
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
  orderStatus: string;
}>();

const mapContainer = ref<HTMLElement | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
let map: google.maps.Map | null = null;
let marker: google.maps.Marker | null = null;

const GOOGLE_MAPS_API_KEY = 'AIzaSyBkZraD0rt4dP0TslLVMexomnye48jFcW0'; // Provided by user

const initMap = async () => {
  if (!mapContainer.value) return;

  loading.value = true;
  error.value = null;

  try {
    setOptions({
      key: GOOGLE_MAPS_API_KEY,
      v: 'weekly',
      libraries: ['places'],
    });

    const { Map } = await importLibrary('maps') as google.maps.MapsLibrary;
    const { Marker } = await importLibrary('marker') as google.maps.MarkerLibrary;

    // Default center (Lagos, Nigeria) if no address
    const defaultCenter = { lat: 6.5244, lng: 3.3792 };
    
    map = new Map(mapContainer.value, {
      center: defaultCenter,
      zoom: 12,
      mapId: 'DEMO_MAP_ID', // Required for advanced markers if used, or just good practice
    });

    if (props.deliveryAddress) {
      await updateMapLocation(map, Marker);
    } else {
      loading.value = false;
    }

  } catch (e) {
    console.error('Error loading Google Maps:', e);
    error.value = 'Failed to load map.';
    loading.value = false;
  }
};

const updateMapLocation = async (map: google.maps.Map, Marker: any) => {
  if (!props.deliveryAddress) return;

  let position: google.maps.LatLngLiteral | null = null;

  // Use coordinates if available
  if (props.deliveryAddress.latitude && props.deliveryAddress.longitude) {
    position = {
      lat: props.deliveryAddress.latitude,
      lng: props.deliveryAddress.longitude,
    };
  } else {
    // Geocode address
    const addressString = `${props.deliveryAddress.street}, ${props.deliveryAddress.city}, ${props.deliveryAddress.state}, ${props.deliveryAddress.country}`;
    try {
      const { Geocoder } = await importLibrary('geocoding') as google.maps.GeocodingLibrary;
      const geocoder = new Geocoder();
      const result = await geocoder.geocode({ address: addressString });
      if (result.results && result.results.length > 0) {
        position = result.results[0].geometry.location.toJSON();
      } else {
        error.value = 'Could not find location for this address.';
      }
    } catch (e) {
      console.error('Geocoding error:', e);
      error.value = 'Error finding location.';
    }
  }

  if (position) {
    map.setCenter(position);
    map.setZoom(15);

    if (marker) {
      marker.setMap(null);
    }

    marker = new Marker({
      position,
      map,
      title: 'Delivery Location',
      animation: google.maps.Animation.DROP,
    });
  }
  
  loading.value = false;
};

onMounted(() => {
  initMap();
});

// Watch for prop changes if needed (e.g. if address loads late)
watch(() => props.deliveryAddress, () => {
  if (map) {
      initMap();
  }
}, { deep: true });

</script>
