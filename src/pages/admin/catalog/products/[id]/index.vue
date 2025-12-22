<template>
  <div v-if="product" class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center space-x-4">
        <button
          @click="router.back()"
          class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Product Details</h1>
          <p class="mt-1 text-sm text-slate-500">View product information and metrics</p>
        </div>
      </div>
      <router-link
        :to="`/admin/catalog/products/${product._id}/edit`"
        class="mt-4 sm:mt-0 inline-flex items-center px-4 py-2.5 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 transition-all"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit Product
      </router-link>
    </div>

    <!-- Product Overview Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="px-6 py-5 flex flex-col sm:flex-row sm:items-center">
        <div class="h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
          <img class="h-full w-full object-cover" :src="product.images[0] || 'https://via.placeholder.com/80'" alt="" />
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-5 flex-1">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-xl font-bold text-slate-900">
                {{ product.title }}
              </h3>
              <div class="mt-2 flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg font-mono">SKU: {{ product.sku }}</span>
                <span class="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg">{{ product.category?.name }}</span>
              </div>
            </div>
            <div class="text-right">
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                :class="{
                  'bg-emerald-100 text-emerald-700': product.status === 'active',
                  'bg-slate-100 text-slate-600': product.status === 'inactive',
                  'bg-rose-100 text-rose-700': product.status === 'discontinued'
                }"
              >
                <span 
                  class="w-1.5 h-1.5 rounded-full mr-1.5"
                  :class="{
                    'bg-emerald-500': product.status === 'active',
                    'bg-slate-400': product.status === 'inactive',
                    'bg-rose-500': product.status === 'discontinued'
                  }"
                ></span>
                {{ product.status }}
              </span>
              <div class="mt-2 text-2xl font-bold text-primary-600">
                {{ product.currency }} {{ product.price.toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Metrics Cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center">
          <div class="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-500">Total Sold</p>
            <p class="text-2xl font-bold text-slate-900">{{ metrics.totalSold || 0 }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center">
          <div class="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-500">Total Revenue</p>
            <p class="text-2xl font-bold text-emerald-600">{{ product.currency }} {{ (metrics.totalRevenue || 0).toLocaleString() }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-xl" :class="product.inventory.quantity <= product.inventory.reorderLevel ? 'bg-gradient-to-br from-rose-500 to-rose-600' : 'bg-gradient-to-br from-violet-500 to-violet-600'">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-500">Current Stock</p>
            <p class="text-2xl font-bold" :class="product.inventory.quantity <= product.inventory.reorderLevel ? 'text-rose-600' : 'text-slate-900'">
              {{ product.inventory.quantity }} {{ product.inventory.unit }}
            </p>
            <p v-if="product.inventory.quantity <= product.inventory.reorderLevel" class="text-xs text-rose-500 mt-1">Low stock warning</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Orders Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
        <div class="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-slate-900">Recent Orders</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead>
            <tr class="bg-slate-50">
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Order #</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th scope="col" class="relative px-6 py-4">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="order in metrics.recentOrders" :key="order._id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <router-link :to="`/admin/orders/${order._id}`" class="text-sm font-semibold text-primary-600 hover:text-primary-700">
                  {{ order.orderNumber }}
                </router-link>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white font-medium text-xs">
                    {{ order.userId?.firstName?.charAt(0) || 'C' }}
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-slate-900">{{ order.userId?.firstName }} {{ order.userId?.lastName }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                {{ new Date(order.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                  :class="{
                    'bg-emerald-100 text-emerald-700': order.orderStatus === 'delivered',
                    'bg-blue-100 text-blue-700': ['processing', 'shipped'].includes(order.orderStatus),
                    'bg-amber-100 text-amber-700': ['pending', 'confirmed'].includes(order.orderStatus),
                    'bg-slate-100 text-slate-600': order.orderStatus === 'cancelled'
                  }"
                >
                  <span 
                    class="w-1.5 h-1.5 rounded-full mr-1.5"
                    :class="{
                      'bg-emerald-500': order.orderStatus === 'delivered',
                      'bg-blue-500': ['processing', 'shipped'].includes(order.orderStatus),
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
            <tr v-if="!metrics.recentOrders || metrics.recentOrders.length === 0">
              <td colspan="5" class="px-6 py-12 text-center">
                <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p class="mt-4 text-sm text-slate-500">No recent orders found for this product.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="flex flex-col items-center justify-center py-16">
    <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
    <p class="mt-4 text-sm text-slate-500">Loading product details...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CatalogService, Product } from '../../../../../services/admin/catalog.service';

const route = useRoute();
const router = useRouter();
const product = ref<Product | null>(null);
const metrics = ref<any>({});

const fetchProductData = async () => {
  try {
    const id = route.params.id as string;
    const [productRes, metricsRes] = await Promise.all([
      CatalogService.getProduct(id),
      CatalogService.getProductMetrics(id),
    ]);
    product.value = productRes.data;
    metrics.value = metricsRes.data;
  } catch (error) {
    console.error('Failed to fetch product data', error);
  }
};

onMounted(() => {
  fetchProductData();
});
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
