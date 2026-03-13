<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Food Gift Cards</h1>
        <p class="mt-1 text-sm text-slate-500">View and manage all issued food gift cards</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Total Issued</p>
            <p class="mt-2 text-3xl font-bold text-slate-900">{{ (stats.total || 0).toLocaleString() }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
            <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Active</p>
            <p class="mt-2 text-3xl font-bold text-primary-600">{{ (stats.active || 0).toLocaleString() }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Redeemed</p>
            <p class="mt-2 text-3xl font-bold text-emerald-600">{{ (stats.redeemed || 0).toLocaleString() }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200">
            <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Total Value</p>
            <p class="mt-2 text-2xl font-bold text-slate-900">₦{{ (stats.totalAmount || 0).toLocaleString() }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
            <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
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
          placeholder="Search by code, gifter, or recipient..."
          class="block w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
      </div>
      <select
        v-model="statusFilter"
        @change="fetchGiftCards"
        class="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all min-w-[160px]"
      >
        <option value="">All Statuses</option>
        <option value="active">Active</option>
        <option value="redeemed">Redeemed</option>
        <option value="cancelled">Cancelled</option>
        <option value="expired">Expired</option>
      </select>
    </div>

    <!-- Gift Cards Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead>
            <tr class="bg-slate-50">
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Code
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Gifter
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Recipient
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Items
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Created At
              </th>
              <th scope="col" class="relative px-6 py-4">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="card in giftCards" :key="card._id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">{{ card.code }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="ml-3">
                    <div class="text-sm font-medium text-slate-900">{{ card.gifterId?.firstName }} {{ card.gifterId?.lastName }}</div>
                    <div class="text-xs text-slate-500">{{ card.gifterId?.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-slate-900">{{ card.recipientInfo?.name || '---' }}</div>
                <div class="text-xs text-slate-500">{{ card.recipientInfo?.phone || card.recipientInfo?.email || '---' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-slate-600">{{ card.items?.length || 0 }} items</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-semibold text-slate-900">{{ card.currency }} {{ card.totalAmount.toLocaleString() }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="{
                    'bg-emerald-100 text-emerald-700': card.status === 'redeemed',
                    'bg-primary-100 text-primary-700': card.status === 'active',
                    'bg-slate-100 text-slate-600': ['cancelled', 'expired'].includes(card.status)
                  }"
                >
                  {{ card.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                {{ new Date(card.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button 
                    v-if="card.status === 'active'"
                    @click="handleCancel(card)"
                    class="text-rose-600 hover:text-rose-900 transition-colors p-1"
                    title="Cancel Gift Card"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div v-if="giftCards.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-4 text-sm font-medium text-slate-900">No gift cards found</h3>
        <p class="mt-1 text-sm text-slate-500">Try adjusting your search or filter criteria.</p>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.pages > 1" class="flex items-center justify-between">
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
          Previous
        </button>
        <button
          @click="changePage(pagination.page + 1)"
          :disabled="pagination.page === pagination.pages"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { GiftCardService, GiftCard } from '../../../services/admin/gift_card.service';

const giftCards = ref<GiftCard[]>([]);
const stats = ref<any>({});
const search = ref('');
const statusFilter = ref('');
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 1,
});

let debounceTimeout: any;

const fetchGiftCards = async () => {
  try {
    const [listRes, statsRes] = await Promise.all([
      GiftCardService.getGiftCards({
        page: pagination.value.page,
        limit: pagination.value.limit,
        status: statusFilter.value,
        search: search.value,
      }),
      GiftCardService.getGiftCardStats(),
    ]);
    giftCards.value = listRes.data.giftCards;
    pagination.value = listRes.data.pagination;
    stats.value = statsRes.data;
  } catch (error) {
    console.error('Failed to fetch gift cards', error);
  }
};

const debouncedFetch = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    pagination.value.page = 1;
    fetchGiftCards();
  }, 300);
};

const changePage = (page: number) => {
  if (page >= 1 && page <= pagination.value.pages) {
    pagination.value.page = page;
    fetchGiftCards();
  }
};

const handleCancel = async (card: GiftCard) => {
  if (window.confirm(`Are you sure you want to cancel gift card ${card.code}?`)) {
    try {
      await GiftCardService.cancelGiftCard(card._id);
      alert('Gift card cancelled successfully');
      fetchGiftCards();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to cancel gift card');
    }
  }
};

onMounted(() => {
  fetchGiftCards();
});
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
