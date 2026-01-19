<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Pickup Locations</h1>
        <p class="mt-1 text-sm text-slate-500">Manage order pickup locations for your customers.</p>
      </div>
      <router-link
        to="/admin/configuration/pickup-locations/create"
        class="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-primary-500/30"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Location
      </router-link>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span class="text-sm font-medium text-slate-500">Total Locations</span>
        </div>
        <div class="flex items-baseline space-x-2">
          <h3 class="text-3xl font-bold text-slate-900">{{ stats.total }}</h3>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span class="text-sm font-medium text-slate-500">Active</span>
        </div>
        <div class="flex items-baseline space-x-2">
          <h3 class="text-3xl font-bold text-slate-900">{{ stats.active }}</h3>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <span class="text-sm font-medium text-slate-500">Inactive</span>
        </div>
        <div class="flex items-baseline space-x-2">
          <h3 class="text-3xl font-bold text-slate-900">{{ stats.inactive }}</h3>
        </div>
      </div>
    </div>

    <!-- Filters & Table -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <!-- Filters -->
      <div class="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <!-- Search -->
        <div class="relative max-w-md w-full">
          <input
            v-model="filters.search"
            @input="handleSearch"
            type="text"
            placeholder="Search locations..."
            class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- Status Filter -->
        <select
          v-model="filters.status"
          @change="fetchData"
          class="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm text-slate-700 font-medium cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th class="px-6 py-4">Name</th>
              <th class="px-6 py-4">Address</th>
              <th class="px-6 py-4">Contact</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-if="loading" class="animate-pulse">
              <td colspan="5" class="px-6 py-8 text-center text-slate-500">
                <div class="flex justify-center items-center space-x-2">
                  <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                  <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </td>
            </tr>
            <tr v-else-if="locations.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-slate-500">
                No locations found matching your criteria.
              </td>
            </tr>
            <tr v-for="location in locations" :key="location._id" class="hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4">
                <span class="font-medium text-slate-900">{{ location.name }}</span>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                <p>{{ location.address.street }}</p>
                <p class="text-xs text-slate-400">{{ location.address.city }}, {{ location.address.state }}</p>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                <p class="font-medium">{{ location.contact.name }}</p>
                <p class="text-xs">{{ location.contact.phone }}</p>
              </td>
              <td class="px-6 py-4">
                <span 
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    location.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                  ]"
                >
                  {{ location.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-3">
                  <router-link 
                    :to="`/admin/configuration/pickup-locations/${location._id}/edit`"
                    class="text-slate-400 hover:text-primary-600 transition-colors"
                    title="Edit"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </router-link>
                  <button 
                    @click="deleteLocation(location._id)"
                    class="text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="meta.pages > 1" class="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
        <p class="text-sm text-slate-500">
          Showing <span class="font-medium">{{ (meta.page - 1) * meta.limit + 1 }}</span> to <span class="font-medium">{{ Math.min(meta.page * meta.limit, meta.total) }}</span> of <span class="font-medium">{{ meta.total }}</span> results
        </p>
        <div class="flex space-x-2">
          <button
            @click="changePage(meta.page - 1)"
            :disabled="!meta.hasPrevPage"
            class="px-3 py-1 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            @click="changePage(meta.page + 1)"
            :disabled="!meta.hasNextPage"
            class="px-3 py-1 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { debounce } from 'lodash';
import { ConfigurationService, type PickupLocation, type PaginationMeta, type PickupLocationStats } from '@/services/admin/configuration.service';

const loading = ref(true);
const locations = ref<PickupLocation[]>([]);
const stats = ref<PickupLocationStats>({ total: 0, active: 0, inactive: 0 });

const meta = ref<PaginationMeta>({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0,
  hasNextPage: false,
  hasPrevPage: false,
});

const filters = reactive({
  search: '',
  status: '',
});

const fetchData = async () => {
  loading.value = true;
  try {
    const params: any = {
      page: meta.value.page,
      limit: meta.value.limit,
    };

    if (filters.search) params.search = filters.search;
    if (filters.status) {
       // Assuming backend supports filtering by status or isActive via query param
       // We might need to map 'active'/'suspended' to boolean if backend requires it
       // Based on user controller example, we might need a custom mapping in backend or here
       // But for now let's pass it as is or map to isActive
       if (filters.status === 'active') params.isActive = true;
       if (filters.status === 'inactive') params.isActive = false;
    }

    const { data, meta: pagination } = await ConfigurationService.getPickupLocations(params);
    locations.value = data;
    if (pagination) {
      meta.value = pagination;
    }
  } catch (error) {
    console.error('Failed to fetch locations:', error);
  } finally {
    loading.value = false;
  }
};

const fetchStats = async () => {
  try {
    const response = await ConfigurationService.getPickupLocationStats();
    stats.value = response.data;
  } catch (error) {
    console.error('Failed to fetch stats:', error);
  }
};

const handleSearch = debounce(() => {
  meta.value.page = 1;
  fetchData();
}, 300);

const changePage = (page: number) => {
  meta.value.page = page;
  fetchData();
};

const deleteLocation = async (id: string) => {
  if (!confirm('Are you sure you want to delete this location?')) return;
  
  try {
    await ConfigurationService.deletePickupLocation(id);
    fetchData(); // Refresh list
    fetchStats(); // Refresh stats
  } catch (error) {
    console.error('Failed to delete location:', error);
    alert('Failed to delete location');
  }
};

onMounted(() => {
  fetchData();
  fetchStats();
});
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
