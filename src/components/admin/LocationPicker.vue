<template>
  <div class="space-y-4">
    <input
      ref="searchInput"
      type="text"
      placeholder="Search for a place..."
      class="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
    />
    <div 
      ref="mapContainer" 
      class="w-full h-[400px] rounded-xl border border-slate-200 shadow-sm bg-slate-50"
    ></div>
    <div v-if="error" class="text-sm text-red-500">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRefs } from 'vue';

const props = defineProps<{
  lat: number;
  lng: number;
}>();

const emit = defineEmits<{
  (e: 'update:lat', value: number): void;
  (e: 'update:lng', value: number): void;
}>();

const { lat, lng } = toRefs(props);
const mapContainer = ref<HTMLElement | null>(null);
const searchInput = ref<HTMLInputElement | null>(null);
const map = ref<any>(null);
const marker = ref<any>(null);
const error = ref<string>('');

const loadGoogleMaps = (): Promise<void> => {
// ... existing loadGoogleMaps code ...
  return new Promise((resolve, reject) => {
    if ((window as any).google && (window as any).google.maps) {
      resolve();
      return;
    }

    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Google Maps script')));
      return;
    }

    const apiKey = (import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      reject(new Error('Google Maps API Key is missing'));
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    // Ensure libraries=places is included
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps script'));
    document.head.appendChild(script);
  });
};

const initMap = () => {
  if (!mapContainer.value || !(window as any).google) return;

  const google = (window as any).google;
  
  const center = (props.lat === 0 && props.lng === 0) ? { lat: 6.5244, lng: 3.3792 } : { lat: props.lat, lng: props.lng };

  map.value = new google.maps.Map(mapContainer.value, {
    center: center,
    zoom: 13,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  });

  marker.value = new google.maps.Marker({
    position: center,
    map: map.value,
    draggable: true,
    animation: google.maps.Animation.DROP
  });

  // Initialize Autocomplete
  if (searchInput.value) {
    const autocomplete = new google.maps.places.Autocomplete(searchInput.value, {
      fields: ['geometry', 'name'],
      strictBounds: false,
    });
    
    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    autocomplete.bindTo('bounds', map.value);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.value.fitBounds(place.geometry.viewport);
      } else {
        map.value.setCenter(place.geometry.location);
        map.value.setZoom(17);
      }

      marker.value.setPosition(place.geometry.location);
      
      emit('update:lat', place.geometry.location.lat());
      emit('update:lng', place.geometry.location.lng());
    });
  }

  // Listen for drag end
  marker.value.addListener('dragend', () => {
    const position = marker.value.getPosition();
    if (position) {
      emit('update:lat', position.lat());
      emit('update:lng', position.lng());
    }
  });

  // Listen for map click
  map.value.addListener('click', (e: any) => {
    const position = e.latLng;
    if (position) {
      marker.value.setPosition(position);
      map.value.panTo(position);
      emit('update:lat', position.lat());
      emit('update:lng', position.lng());
    }
  });
};

// Update marker when props change (e.g. manual input)
watch([lat, lng], () => {
  if (map.value && marker.value && (window as any).google) {
    const newPos = { lat: props.lat, lng: props.lng };
    // Only update if distance significantly different to avoid loops or jitter during drag?
    // Actually standard is fine.
    const currentPos = marker.value.getPosition();
    // Use epsilon check or just update. 
    if (currentPos && Math.abs(currentPos.lat() - newPos.lat) < 0.00001 && Math.abs(currentPos.lng() - newPos.lng) < 0.00001) {
       return;
    }
    
    // Only pan if we are far away? OR always pan?
    // Let's pan if it's external update.
    marker.value.setPosition(newPos);
    map.value.panTo(newPos);
  }
});

onMounted(async () => {
  try {
    await loadGoogleMaps();
    initMap();
  } catch (err: any) {
    error.value = err.message;
    console.error(err);
  }
});
</script>
