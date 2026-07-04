<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center space-x-4">
      <router-link
        to="/admin/configuration/pickup-locations"
        class="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </router-link>
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Add Pickup Location</h1>
        <p class="mt-1 text-sm text-slate-500">Create a new location for customer order pickups.</p>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8">
      
      <!-- Basic Info -->
      <section>
        <h2 class="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Location Basics</h2>
        <div class="grid grid-cols-1 gap-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Location Name</label>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="e.g. Lagos Central Hub"
              class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
             <p class="mt-1 text-xs text-slate-500">Internal name for this location.</p>
          </div>
          
          <div class="flex items-center">
            <input
              v-model="form.isActive"
              type="checkbox"
              id="isActive"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
            />
            <label for="isActive" class="ml-2 block text-sm text-slate-700">
              Active (Customers can select this location)
            </label>
          </div>
        </div>
      </section>

      <!-- Address -->
      <section>
        <h2 class="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Address Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-slate-700 mb-2">Street Address</label>
            <input
              v-model="form.address.street"
              type="text"
              required
              placeholder="e.g. 123 Broad Street"
              class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">City</label>
            <input
              v-model="form.address.city"
              type="text"
              required
              placeholder="e.g. Ikeja"
              class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">State</label>
            <input
              v-model="form.address.state"
              type="text"
              required
              placeholder="e.g. Lagos"
              class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Zip/Postal Code</label>
            <input
              v-model="form.address.zipCode"
              type="text"
              required
              placeholder="e.g. 100001"
              class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>

           <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Country</label>
            <input
              v-model="form.address.country"
              type="text"
              required
              readonly
              class="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
            />
          </div>

           <div class="md:col-span-2">
            <label class="block text-sm font-medium text-slate-700 mb-2">Landmark (Optional)</label>
            <input
              v-model="form.address.landmark"
              type="text"
              placeholder="e.g. Opposite City Hall"
              class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </section>

      <!-- Contact Info -->
      <section>
        <h2 class="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Contact Person</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input
              v-model="form.contact.name"
              type="text"
              required
              placeholder="e.g. John Doe"
              class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
            <input
              v-model="form.contact.phone"
              type="tel"
              required
              placeholder="e.g. +234 800 000 0000"
              class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Email Address (Optional)</label>
            <input
              v-model="form.contact.email"
              type="email"
              placeholder="e.g. hub@genory.com"
              class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </section>

      <!-- Shipping Configuration -->
      <section>
        <h2 class="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Shipping Rates</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Cost Per KM (₦)</label>
            <input
              v-model.number="form.costPerKm"
              type="number"
              min="0"
              placeholder="e.g. 100"
              class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
            <p class="mt-1 text-xs text-slate-500">Charge per kilometer distance.</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Cost Per Gram (₦)</label>
            <input
              v-model.number="form.costPerGram"
              type="number"
              min="0"
              placeholder="e.g. 0.5"
              step="0.01"
              class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
             <p class="mt-1 text-xs text-slate-500">Additional charge per gram of weight.</p>
          </div>
        </div>
      </section>

      <!-- Geolocation -->
      <section v-if="form.geolocation">
        <h2 class="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Geolocation</h2>
        <div class="space-y-6">
          <LocationPicker 
            :lat="form.geolocation.lat" 
            :lng="form.geolocation.lng" 
            @update:lat="form.geolocation.lat = $event" 
            @update:lng="form.geolocation.lng = $event" 
          />
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Latitude <span class="text-red-500">*</span></label>
              <input
                v-model.number="form.geolocation.lat"
                type="number"
                required
                step="any"
                placeholder="e.g. 6.5244"
                class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Longitude <span class="text-red-500">*</span></label>
              <input
                v-model.number="form.geolocation.lng"
                type="number"
                required
                step="any"
                placeholder="e.g. 3.3792"
                class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Delivery Zones -->
      <section>
        <div class="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div>
            <h2 class="text-lg font-bold text-slate-900">Delivery Zones</h2>
            <p class="text-xs text-slate-500 mt-0.5">
              Fee formula: (distance × cost/km) <span class="font-semibold text-slate-700">× multiplier</span> + (weight × cost/g). No matching zone → multiplier 1.0.
            </p>
          </div>
          <button
            type="button"
            @click="addZone"
            class="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 hover:bg-primary-100 text-primary-700 text-sm font-medium rounded-lg transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Zone
          </button>
        </div>

        <div v-if="form.zones.length === 0" class="flex flex-col items-center py-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-xl">
          <svg class="w-8 h-8 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p class="text-sm text-slate-500">No delivery zones configured.</p>
          <p class="text-xs text-slate-400 mt-1">All orders from this location will use a multiplier of 1.0.</p>
        </div>

        <div v-for="(zone, i) in form.zones" :key="i" class="border border-slate-200 rounded-xl p-5 mb-4 bg-slate-50/50">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-bold text-slate-700 uppercase tracking-wide">Zone {{ i + 1 }}</span>
            <button
              type="button"
              @click="removeZone(i)"
              class="text-rose-400 hover:text-rose-600 text-xs font-medium transition-colors"
            >
              Remove
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Zone Name</label>
              <input
                v-model="zone.name"
                type="text"
                placeholder="e.g. IKEJA DIVISION"
                class="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Multiplier</label>
              <input
                v-model.number="zone.multiplier"
                type="number"
                min="0.1"
                step="0.01"
                placeholder="e.g. 1.25"
                class="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
              />
              <p class="mt-1 text-xs text-slate-500">× base distance cost. 1.0 = no change. 1.25 = +25%.</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Areas / Cities</label>
            <div class="flex flex-wrap gap-2 p-3 bg-white border border-slate-200 rounded-xl min-h-[44px] focus-within:ring-2 focus-within:ring-primary-500 transition-all">
              <span
                v-for="(area, j) in zone.areas"
                :key="j"
                class="inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary-100 text-primary-800 text-xs font-medium rounded-full"
              >
                {{ area }}
                <button type="button" @click="removeArea(i, j)" class="text-primary-500 hover:text-primary-800 leading-none">×</button>
              </span>
              <input
                :placeholder="zone.areas.length === 0 ? 'Type area name, press Enter or comma to add…' : 'Add more…'"
                @keydown.enter.prevent="addArea(i, $event)"
                @keydown.exact.prevent.188="addArea(i, $event)"
                class="flex-1 min-w-[12rem] bg-transparent outline-none text-sm text-slate-700 placeholder-slate-300"
              />
            </div>
            <p class="mt-1 text-xs text-slate-500">
              Matched case-insensitively and partially against the delivery city (e.g. "Ikeja" matches "Ikeja GRA").
            </p>
          </div>
        </div>
      </section>

      <!-- Actions -->
      <div class="flex items-center justify-end space-x-4 pt-6 border-t border-slate-100">
        <router-link
          to="/admin/configuration/pickup-locations"
          class="px-6 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
        >
          Cancel
        </router-link>
        <button
          type="submit"
          :disabled="loading"
          class="flex items-center px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Creating...' : 'Create Location' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ConfigurationService, type CreatePickupLocationDto } from '@/services/admin/configuration.service';
import { SystemConfigService } from '@/services/admin/system-config.service';

const router = useRouter();
const loading = ref(false);

const form = reactive<CreatePickupLocationDto>({
  name: '',
  isActive: true,
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria',
    landmark: '',
  },
  contact: {
    name: '',
    phone: '',
    email: '',
  },
  geolocation: {
    lat: 0,
    lng: 0,
  },
  costPerKm: 0,
  costPerGram: 0,
  zones: [],
});

// Zone helpers
const addZone = () => {
  form.zones.push({ name: '', areas: [], multiplier: 1.0 });
};

const removeZone = (index: number) => {
  form.zones.splice(index, 1);
};

const addArea = (zoneIndex: number, event: Event) => {
  const input = event.target as HTMLInputElement;
  const value = input.value.replace(',', '').trim();
  if (value && !form.zones[zoneIndex].areas.includes(value)) {
    form.zones[zoneIndex].areas.push(value);
  }
  input.value = '';
};

const removeArea = (zoneIndex: number, areaIndex: number) => {
  form.zones[zoneIndex].areas.splice(areaIndex, 1);
};

onMounted(async () => {
    const defaultCountry = await SystemConfigService.getValue<string>('DEFAULT_COUNTRY');
    if (defaultCountry) {
        form.address.country = defaultCountry;
    }
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    await ConfigurationService.createPickupLocation(form);
    router.push('/admin/configuration/pickup-locations');
  } catch (error) {
    console.error('Failed to create location:', error);
    alert('Failed to create pickup location. Please try again.');
  } finally {
    loading.value = false;
  }
};
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
