<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Delivery Partners</h1>
        <p class="mt-1 text-sm text-slate-500">Manage your delivery fleet and track performance</p>
      </div>
      
      <!-- Search -->
      <div class="relative w-full sm:w-80">
        <input 
          v-model="filters.search"
          type="text" 
          placeholder="Search name or email..." 
          class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm"
        />
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-4">
      <select 
        v-model="filters.status" 
        class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all min-w-[160px] shadow-sm"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="suspended">Suspended</option>
      </select>
      <select 
        v-model="filters.type" 
        class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all min-w-[160px] shadow-sm"
      >
        <option value="">All Types</option>
        <option value="rider">Rider</option>
        <option value="errander">Errander</option>
      </select>
    </div>

    <!-- Partners Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead>
            <tr class="bg-slate-50">
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer group" @click="toggleSort('firstName')">
                <div class="flex items-center">
                   Partner
                   <svg class="w-3 h-3 ml-1 transition-colors" :class="filters.sort === 'firstName' ? 'text-primary-500' : 'text-slate-300 group-hover:text-slate-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path :d="filters.order === 'desc' ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                   </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Vehicle
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer group" @click="toggleSort('partner.earnings.total')">
                <div class="flex items-center">
                   Earnings
                   <svg class="w-3 h-3 ml-1 transition-colors" :class="filters.sort === 'partner.earnings.total' ? 'text-primary-500' : 'text-slate-300 group-hover:text-slate-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path :d="filters.order === 'desc' ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                   </svg>
                </div>
              </th>
              <th scope="col" class="relative px-6 py-4">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <template v-if="loading">
              <tr v-for="i in 5" :key="i">
                <td colspan="6" class="px-6 py-4">
                  <div class="animate-pulse flex space-x-4">
                    <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div class="flex-1 space-y-4 py-1">
                      <div class="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div class="h-4 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            <tr v-for="partner in partners" :key="partner._id" v-else class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-medium">
                    {{ partner.user.firstName?.charAt(0) || 'P' }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-semibold text-slate-900">{{ partner.user.firstName }} {{ partner.user.lastName }}</div>
                    <div class="text-xs text-slate-500">{{ partner.user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 capitalize">
                  <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="partner.type === 'rider'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1-1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {{ partner.type || 'N/A' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                  :class="{
                    'bg-emerald-100 text-emerald-700': partner.status === 'approved',
                    'bg-amber-100 text-amber-700': partner.status === 'pending',
                    'bg-rose-100 text-rose-700': partner.status === 'rejected',
                    'bg-slate-100 text-slate-600': partner.status === 'suspended'
                  }"
                >
                  <span 
                    class="w-1.5 h-1.5 rounded-full mr-1.5"
                    :class="{
                      'bg-emerald-500': partner.status === 'approved',
                      'bg-amber-500': partner.status === 'pending',
                      'bg-rose-500': partner.status === 'rejected',
                      'bg-slate-400': partner.status === 'suspended'
                    }"
                  ></span>
                  {{ partner.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center text-sm text-slate-600">
                  <svg class="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                  <span v-if="partner.vehicle">{{ partner.vehicle.make }} {{ partner.vehicle.model }}</span>
                  <span v-else class="text-slate-400">No vehicle</span>
                </div>
                <div v-if="partner.vehicle" class="text-xs text-slate-500 ml-6">{{ partner.vehicle.plateNumber }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-emerald-600">₦{{ partner.earnings?.total?.toLocaleString() || 0 }}</div>
                <div class="text-xs text-slate-500">Total earnings</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <router-link 
                  :to="`/admin/delivery-partners/${partner._id}`" 
                  class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  View
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.pages > 1" class="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        <div class="text-sm text-slate-500">
          Showing <span class="font-medium text-slate-900">{{ (pagination.page - 1) * pagination.limit + 1 }}</span> to 
          <span class="font-medium text-slate-900">{{ Math.min(pagination.page * pagination.limit, pagination.total) }}</span> of 
          <span class="font-medium text-slate-900">{{ pagination.total }}</span> partners
        </div>
        <div class="flex items-center space-x-2">
          <button 
            @click="changePage(pagination.page - 1)"
            :disabled="pagination.page === 1"
            class="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div class="flex items-center space-x-1">
            <button 
              v-for="p in pagination.pages" 
              :key="p"
              @click="changePage(p)"
              :class="[
                'px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors',
                pagination.page === p ? 'bg-primary-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              ]"
            >
              {{ p }}
            </button>
          </div>
          <button 
            @click="changePage(pagination.page + 1)"
            :disabled="pagination.page === pagination.pages"
            class="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && partners.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
        <h3 class="mt-4 text-sm font-medium text-slate-900">No delivery partners found</h3>
        <p class="mt-1 text-sm text-slate-500">Try adjusting your filter or search criteria.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue';
import api from '../../../services/api';
import debounce from 'lodash/debounce';

const partners = ref<any[]>([]);
const loading = ref(true);
const filters = reactive({
  status: '',
  type: '',
  search: '',
  sort: 'createdAt',
  order: 'desc',
  page: 1,
  limit: 10
});

const pagination = reactive({
  total: 0,
  page: 1,
  limit: 10,
  pages: 1
});

const fetchPartners = async () => {
  loading.value = true;
  try {
    const response = await api.get('/admin/delivery-partners', {
      params: filters
    });
    partners.value = response.data.data.partners;
    Object.assign(pagination, response.data.data.pagination);
  } catch (error) {
    console.error('Failed to fetch partners', error);
  } finally {
    loading.value = false;
  }
};

const debouncedFetch = debounce(() => {
  filters.page = 1;
  fetchPartners();
}, 500);

const changePage = (page: number) => {
  filters.page = page;
  fetchPartners();
};

const toggleSort = (field: string) => {
  if (filters.sort === field) {
    filters.order = filters.order === 'asc' ? 'desc' : 'asc';
  } else {
    filters.sort = field;
    filters.order = 'asc';
  }
  filters.page = 1;
  fetchPartners();
};

watch(() => filters.status, () => { filters.page = 1; fetchPartners(); });
watch(() => filters.type, () => { filters.page = 1; fetchPartners(); });
watch(() => filters.search, debouncedFetch);

onMounted(() => {
  fetchPartners();
});
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
