<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Special Offers</h1>
        <p class="mt-1 text-sm text-slate-500">Manage promotional offers and deals</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <router-link
          to="/admin/special-offers/create"
          class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Special Offer
        </router-link>
      </div>
    </div>

    <!-- Offers List -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead>
            <tr class="bg-slate-50">
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Offer
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Validity
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="relative px-6 py-4">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="offer in offers" :key="offer._id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-slate-100">
                    <img 
                      class="w-12 h-12 object-cover" 
                      :src="offer.image || 'https://via.placeholder.com/48'" 
                      alt="" 
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-semibold text-slate-900">{{ offer.title }}</div>
                    <div class="text-xs text-slate-500 truncate max-w-xs">{{ offer.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-lg bg-blue-50 text-blue-700">
                  {{ offer.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-slate-900">₦{{ offer.price.toLocaleString() }}</div>
                <div v-if="offer.originalPrice" class="text-xs text-slate-500 line-through">
                  ₦{{ offer.originalPrice.toLocaleString() }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-xs text-slate-600">
                  <div>From: {{ new Date(offer.validFrom).toLocaleDateString() }}</div>
                  <div>To: {{ new Date(offer.validUntil).toLocaleDateString() }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                  :class="offer.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'"
                >
                  <span 
                    class="w-1.5 h-1.5 rounded-full mr-1.5"
                    :class="offer.isActive ? 'bg-emerald-500' : 'bg-slate-500'"
                  ></span>
                  {{ offer.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="flex items-center justify-end space-x-1">
                  <router-link 
                    :to="`/admin/special-offers/${offer._id}`" 
                    class="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </router-link>
                  <router-link 
                    :to="`/admin/special-offers/${offer._id}/edit`" 
                    class="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </router-link>
                  <button 
                    @click="toggleStatus(offer)" 
                    :class="[
                      'p-2 rounded-lg transition-colors',
                      offer.isActive ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50' : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                    ]"
                    :title="offer.isActive ? 'Pause' : 'Resume'"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="offer.isActive" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                  </button>
                  <button 
                    @click="deleteOffer(offer._id)" 
                    class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Cancel Offer"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="offers.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
        <h3 class="mt-4 text-sm font-medium text-slate-900">No special offers</h3>
        <p class="mt-1 text-sm text-slate-500">Create your first special offer to get started.</p>
        <router-link
          to="/admin/special-offers/create"
          class="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Offer
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { SpecialOfferService, SpecialOffer } from '../../../services/admin/special_offer.service';

const offers = ref<SpecialOffer[]>([]);

const fetchOffers = async () => {
  try {
    const response = await SpecialOfferService.getOffers();
    offers.value = response.data.offers;
  } catch (error) {
    console.error('Failed to fetch special offers', error);
  }
};

const deleteOffer = async (id: string) => {
  if (!confirm('Are you sure you want to cancel and delete this offer? This cannot be undone.')) return;
  try {
    await SpecialOfferService.deleteOffer(id);
    await fetchOffers();
  } catch (error) {
    console.error('Failed to delete offer', error);
  }
};

const toggleStatus = async (offer: any) => {
  try {
    const newStatus = !offer.isActive;
    await SpecialOfferService.updateOffer(offer._id, { isActive: newStatus });
    offer.isActive = newStatus;
  } catch (error) {
    console.error('Failed to toggle status', error);
  }
};

onMounted(() => {
  fetchOffers();
});
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
