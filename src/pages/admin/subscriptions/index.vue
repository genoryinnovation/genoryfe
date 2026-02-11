<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Subscriptions</h1>
        <p class="mt-1 text-sm text-slate-500">Manage all customer subscriptions</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1 relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          v-model="search"
          @input="debouncedFetch"
          type="text"
          placeholder="Search subscriptions..."
          class="block w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
      </div>
      <select
        v-model="statusFilter"
        @change="fetchSubscriptions"
        class="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all min-w-[160px]"
      >
        <option value="">All Statuses</option>
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>

    <!-- Subscriptions Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead>
            <tr class="bg-slate-50">
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                User
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Plan
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Frequency
              </th>
               <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Next Delivery
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
            <tr v-for="sub in subscriptions" :key="sub._id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-sm font-medium text-slate-600">
                    {{ sub.userId?.firstName?.charAt(0) || 'U' }}
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-slate-900">{{ sub.userId?.firstName }} {{ sub.userId?.lastName }}</div>
                    <div class="text-xs text-slate-500">{{ sub.userId?.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-slate-900">{{ sub.name }}</div>
                <div class="text-xs text-slate-500">{{ sub.items?.length || 0 }} items</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-slate-600 capitalize">{{ sub.frequency }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-slate-900">{{ new Date(sub.nextDeliveryDate).toLocaleDateString() }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                  :class="{
                    'bg-emerald-100 text-emerald-700': sub.status === 'active',
                    'bg-amber-100 text-amber-700': sub.status === 'paused',
                    'bg-slate-100 text-slate-600': sub.status === 'cancelled'
                  }"
                >
                  <span 
                    class="w-1.5 h-1.5 rounded-full mr-2"
                    :class="{
                      'bg-emerald-500': sub.status === 'active',
                      'bg-amber-500': sub.status === 'paused',
                      'bg-slate-400': sub.status === 'cancelled'
                    }"
                  ></span>
                  {{ sub.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <router-link 
                  :to="`/admin/subscriptions/${sub._id}`" 
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

       <!-- Empty State -->
      <div v-if="subscriptions.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 class="mt-4 text-sm font-medium text-slate-900">No subscriptions found</h3>
        <p class="mt-1 text-sm text-slate-500">Try adjusting your search or filter criteria.</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between">
      <p class="text-sm text-slate-600">
        Showing page <span class="font-medium">{{ pagination.page }}</span> of <span class="font-medium">{{ pagination.pages }}</span>
        <span class="text-slate-400 ml-1">({{ pagination.total }} results)</span>
      </p>
      <div class="flex items-center space-x-2">
        <button
          @click="changePage(pagination.page - 1)"
          :disabled="pagination.page === 1"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          @click="changePage(pagination.page + 1)"
          :disabled="pagination.page === pagination.pages"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { SubscriptionService, Subscription } from '../../../services/admin/subscription.service';

const subscriptions = ref<Subscription[]>([]);
const search = ref('');
const statusFilter = ref('');
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 1,
});

let debounceTimeout: any;

const fetchSubscriptions = async () => {
  try {
    const res = await SubscriptionService.getSubscriptions({
        page: pagination.value.page,
        limit: pagination.value.limit,
        status: statusFilter.value,
        search: search.value
    });
    subscriptions.value = res.data.subscriptions;
    pagination.value = res.data.pagination;
  } catch (error) {
    console.error('Failed to fetch subscriptions', error);
  }
};

const debouncedFetch = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    pagination.value.page = 1;
    fetchSubscriptions();
  }, 300);
};

const changePage = (page: number) => {
  if (page >= 1 && page <= pagination.value.pages) {
    pagination.value.page = page;
    fetchSubscriptions();
  }
};

onMounted(() => {
  fetchSubscriptions();
});
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
