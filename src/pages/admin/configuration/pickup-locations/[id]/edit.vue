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
        <h1 class="text-2xl font-bold text-slate-900">Edit Pickup Location</h1>
        <p class="mt-1 text-sm text-slate-500">Update location details and contact information.</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loadingData" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit" class="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8">
      
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
      <section>
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
          {{ loading ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ConfigurationService } from '@/services/admin/configuration.service';
import LocationPicker from '@/components/admin/LocationPicker.vue';

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const loadingData = ref(true);

const form = reactive<any>({
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
});

const loadData = async () => {
    try {
        const id = route.params.id as string;
        const response = await ConfigurationService.getPickupLocation(id);
        const location = response.data;
        
        form.name = location.name;
        form.isActive = location.isActive;
        form.address = { ...location.address };
        form.contact = { ...location.contact };
        
        if (location.geolocation) {
            form.geolocation = { ...location.geolocation };
        } else {
             // Ensure geolocation object exists even if empty from backend
             form.geolocation = { lat: 0, lng: 0 };
        }

        form.costPerKm = location.costPerKm || 0;
        form.costPerGram = location.costPerGram || 0;
    } catch (error) {
        console.error('Failed to load location:', error);
        alert('Failed to load location details.');
        router.push('/admin/configuration/pickup-locations');
    } finally {
        loadingData.value = false;
    }
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    const id = route.params.id as string;
    await ConfigurationService.updatePickupLocation(id, form);
    router.push('/admin/configuration/pickup-locations');
  } catch (error) {
    console.error('Failed to update location:', error);
    alert('Failed to update pickup location. Please try again.');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
    loadData();
});
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
