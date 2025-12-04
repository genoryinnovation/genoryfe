<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Orders</h1>
        <p class="mt-1 text-sm text-slate-500">Manage and track all customer orders</p>
      </div>
      <div class="mt-4 sm:mt-0 flex items-center space-x-3">
        <button class="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Total Orders</p>
            <p class="mt-2 text-3xl font-bold text-slate-900">{{ (stats.total || 0).toLocaleString() }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
            <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Pending</p>
            <p class="mt-2 text-3xl font-bold text-amber-600">{{ (stats.pending || 0).toLocaleString() }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200">
            <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Delivered</p>
            <p class="mt-2 text-3xl font-bold text-emerald-600">{{ (stats.delivered || 0).toLocaleString() }}</p>
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
            <p class="text-sm font-medium text-slate-500">Revenue</p>
            <p class="mt-2 text-2xl font-bold text-primary-600">₦{{ (stats.revenue || 0).toLocaleString() }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          placeholder="Search orders by number, customer..."
          class="block w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
      </div>
      <select
        v-model="statusFilter"
        @change="fetchOrders"
        class="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all min-w-[160px]"
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead>
            <tr class="bg-slate-50">
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Order
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Payment
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
            <tr v-for="order in orders" :key="order._id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <router-link :to="`/admin/orders/${order._id}`" class="text-sm font-semibold text-primary-600 hover:text-primary-700">
                  #{{ order.orderNumber }}
                </router-link>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-sm font-medium text-slate-600">
                    {{ order.userId?.firstName?.charAt(0) || 'U' }}
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-slate-900">{{ order.userId?.firstName }} {{ order.userId?.lastName }}</div>
                    <div class="text-xs text-slate-500">{{ order.userId?.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-slate-900">{{ new Date(order.createdAt).toLocaleDateString() }}</div>
                <div class="text-xs text-slate-500">{{ new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-semibold text-slate-900">{{ order.currency }} {{ order.totalAmount.toFixed(2) }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="text-sm text-slate-600 capitalize">{{ order.paymentMethod }}</span>
                  <span
                    class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="{
                      'bg-emerald-100 text-emerald-700': order.paymentStatus === 'paid',
                      'bg-amber-100 text-amber-700': order.paymentStatus === 'pending',
                      'bg-rose-100 text-rose-700': order.paymentStatus === 'failed'
                    }"
                  >
                    {{ order.paymentStatus }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                  :class="{
                    'bg-emerald-100 text-emerald-700': order.orderStatus === 'delivered',
                    'bg-primary-100 text-primary-700': ['processing', 'shipped'].includes(order.orderStatus),
                    'bg-amber-100 text-amber-700': ['pending', 'confirmed'].includes(order.orderStatus),
                    'bg-slate-100 text-slate-600': order.orderStatus === 'cancelled'
                  }"
                >
                  <span 
                    class="w-1.5 h-1.5 rounded-full mr-2"
                    :class="{
                      'bg-emerald-500': order.orderStatus === 'delivered',
                      'bg-primary-500': ['processing', 'shipped'].includes(order.orderStatus),
                      'bg-amber-500': ['pending', 'confirmed'].includes(order.orderStatus),
                      'bg-slate-400': order.orderStatus === 'cancelled'
                    }"
                  ></span>
                  {{ order.orderStatus }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <router-link 
                  :to="`/admin/orders/${order._id}`" 
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
      <div v-if="orders.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h3 class="mt-4 text-sm font-medium text-slate-900">No orders found</h3>
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
import { OrderService, Order } from '../../../services/admin/order.service';

const orders = ref<Order[]>([]);
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

const fetchOrders = async () => {
  try {
    const [listRes, statsRes] = await Promise.all([
      OrderService.getOrders(
        pagination.value.page,
        pagination.value.limit,
        statusFilter.value,
        search.value
      ),
      OrderService.getOrderStats(),
    ]);
    orders.value = listRes.data.orders;
    pagination.value = listRes.data.pagination;
    stats.value = statsRes.data;
  } catch (error) {
    console.error('Failed to fetch orders', error);
  }
};

const debouncedFetch = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    pagination.value.page = 1;
    fetchOrders();
  }, 300);
};

const changePage = (page: number) => {
  if (page >= 1 && page <= pagination.value.pages) {
    pagination.value.page = page;
    fetchOrders();
  }
};

onMounted(() => {
  fetchOrders();
});
</script>
