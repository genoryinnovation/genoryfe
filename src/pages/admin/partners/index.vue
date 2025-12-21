<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Partners</h1>
        <p class="mt-1 text-sm text-slate-500">Manage your business partners and vendors</p>
      </div>
      <div class="mt-4 sm:mt-0 flex items-center space-x-3">
        <router-link
          to="/admin/partners/create"
          class="inline-flex items-center px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Partner
        </router-link>
      </div>
    </div>

    <!-- Stats Grid -->
    <div v-if="stats" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Total Partners -->
      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between font-bold">
          <div>
            <p class="text-sm font-medium text-slate-500">Total Partners</p>
            <p class="mt-2 text-3xl font-bold text-slate-900 leading-none">{{ stats.totalPartners || 0 }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Active Partners -->
      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between font-bold">
          <div>
            <p class="text-sm font-medium text-slate-500">Active Partners</p>
            <p class="mt-2 text-3xl font-bold text-slate-900 leading-none">{{ stats.activePartners || 0 }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Employees -->
      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between font-bold">
          <div>
            <p class="text-sm font-medium text-slate-500">Total Employees</p>
            <p class="mt-2 text-3xl font-bold text-slate-900 leading-none">{{ stats.totalEmployees?.toLocaleString() || 0 }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg shadow-violet-500/20">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Top Industry -->
      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between font-bold">
          <div>
            <p class="text-sm font-medium text-slate-500">Top Industry</p>
            <p class="mt-2 text-xl font-bold text-slate-900 leading-tight truncate max-w-[150px]">{{ stats.industries?.[0]?.name || 'N/A' }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="relative max-w-sm w-full">
        <input 
          v-model="searchQuery" 
          @input="handleSearch"
          type="text" 
          placeholder="Search partners..." 
          class="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none w-full transition-all text-sm"
        />
        <svg class="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <select 
        v-model="statusFilter" 
        @change="fetchPartners(1)"
        class="px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none font-medium text-slate-700"
      >
        <option value="">All Statuses</option>
        <option value="true">Active Only</option>
        <option value="false">Suspended Only</option>
      </select>
    </div>

    <!-- Partners Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative min-h-[400px]">
      <div v-if="loading" class="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-10">
        <svg class="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead>
            <tr class="bg-slate-50">
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Company
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Industry
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Employees
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
            <tr v-if="partners.length === 0 && !loading">
              <td colspan="5" class="px-6 py-12 text-center text-slate-500">
                No partners found matching your criteria.
              </td>
            </tr>
            <tr v-for="partner in partners" :key="partner._id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/20 uppercase">
                    {{ partner.name.charAt(0) }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-semibold text-slate-900">{{ partner.name }}</div>
                    <div class="text-xs text-slate-500">{{ partner.registrationNumber || 'N/A' }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 capitalize">
                  {{ partner.industry || 'General' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center text-sm text-slate-600">
                  <svg class="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {{ partner.employeeCount?.toLocaleString() || 0 }} employees
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold', partner.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700']">
                  <span :class="['w-1.5 h-1.5 rounded-full mr-2', partner.isActive ? 'bg-emerald-500' : 'bg-rose-500']"></span>
                  {{ partner.isActive ? 'Active' : 'Suspended' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="flex items-center justify-end space-x-2 font-bold">
                  <router-link
                    :to="`/admin/partners/${partner._id}`"
                    class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors border border-transparent hover:border-primary-200"
                  >
                    View
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="pagination && pagination.pages > 1" class="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between font-bold">
        <span class="text-sm text-slate-500">
          Showing <span class="text-slate-900">{{ (pagination.page - 1) * pagination.limit + 1 }}</span> to 
          <span class="text-slate-900">{{ Math.min(pagination.page * pagination.limit, pagination.total) }}</span> of 
          <span class="text-slate-900">{{ pagination.total }}</span> entries
        </span>
        <div class="flex space-x-2">
          <button 
            @click="fetchPartners(pagination.page - 1)" 
            :disabled="pagination.page === 1"
            class="px-3 py-1 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors text-sm"
          >
            Prev
          </button>
          <div class="flex items-center px-4 text-sm font-bold text-slate-700">
            Page {{ pagination.page }} of {{ pagination.pages }}
          </div>
          <button 
            @click="fetchPartners(pagination.page + 1)" 
            :disabled="pagination.page === pagination.pages"
            class="px-3 py-1 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PartnerService, Partner, PartnerStats } from '../../../services/admin/partner.service';

const partners = ref<Partner[]>([]);
const stats = ref<PartnerStats | null>(null);
const pagination = ref<any>(null);
const loading = ref(true);
const searchQuery = ref('');
const statusFilter = ref('');

const fetchPartners = async (page = 1) => {
  try {
    loading.value = true;
    const response = await PartnerService.getPartners({
      page,
      limit: 10,
      search: searchQuery.value,
      isActive: statusFilter.value || undefined,
      sort: '-createdAt'
    });
    partners.value = response.data.partners;
    pagination.value = response.data.pagination;
  } catch (error) {
    console.error('Failed to fetch partners', error);
  } finally {
    loading.value = false;
  }
};

const fetchStats = async () => {
  try {
    stats.value = await PartnerService.getStats();
  } catch (error) {
    console.error('Failed to fetch stats', error);
  }
};

let searchTimeout: any = null;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchPartners(1);
  }, 500);
};

onMounted(() => {
  fetchPartners();
  fetchStats();
});
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
