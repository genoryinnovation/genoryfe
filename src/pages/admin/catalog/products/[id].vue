<template>
  <div v-if="product">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">
        Product Details
      </h1>
      <div class="flex space-x-3">
        <button
          @click="router.back()"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Back
        </button>
        <router-link
          :to="`/admin/catalog/products/${product._id}/edit`"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Edit Product
        </router-link>
      </div>
    </div>

    <!-- Product Overview -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div class="px-4 py-5 sm:px-6 flex items-center">
        <div class="h-16 w-16 flex-shrink-0 mr-4">
          <img class="h-16 w-16 rounded-md object-cover" :src="product.images[0] || 'https://via.placeholder.com/64'" alt="" />
        </div>
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ product.title }}
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            SKU: {{ product.sku }} | Category: {{ product.category?.name }}
          </p>
        </div>
        <div class="ml-auto text-right">
           <span
            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
            :class="{
              'bg-green-100 text-green-800': product.status === 'active',
              'bg-gray-100 text-gray-800': product.status === 'inactive',
              'bg-red-100 text-red-800': product.status === 'discontinued'
            }"
          >
            {{ product.status }}
          </span>
          <div class="mt-1 text-lg font-bold text-gray-900">
            {{ product.currency }} {{ product.price.toFixed(2) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Metrics -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Total Sold</dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ metrics.totalSold || 0 }}</dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
          <dd class="mt-1 text-3xl font-semibold text-green-600">{{ product.currency }} {{ (metrics.totalRevenue || 0).toLocaleString() }}</dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Current Stock</dt>
          <dd class="mt-1 text-3xl font-semibold" :class="product.inventory.quantity <= product.inventory.reorderLevel ? 'text-red-600' : 'text-gray-900'">
            {{ product.inventory.quantity }} {{ product.inventory.unit }}
          </dd>
        </div>
      </div>
    </div>

    <!-- Recent Orders -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Recent Orders
        </h3>
      </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order #
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="order in metrics.recentOrders" :key="order._id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
              <router-link :to="`/admin/orders/${order._id}`">
                {{ order.orderNumber }}
              </router-link>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ order.userId?.firstName }} {{ order.userId?.lastName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ new Date(order.createdAt).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': order.orderStatus === 'delivered',
                  'bg-blue-100 text-blue-800': ['processing', 'shipped'].includes(order.orderStatus),
                  'bg-yellow-100 text-yellow-800': ['pending', 'confirmed'].includes(order.orderStatus),
                  'bg-gray-100 text-gray-800': order.orderStatus === 'cancelled'
                }"
              >
                {{ order.orderStatus }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <router-link :to="`/admin/orders/${order._id}`" class="text-blue-600 hover:text-blue-900">
                View
              </router-link>
            </td>
          </tr>
          <tr v-if="!metrics.recentOrders || metrics.recentOrders.length === 0">
            <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
              No recent orders found for this product.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else class="text-center py-12">
    <p class="text-gray-500">Loading product details...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CatalogService, Product } from '../../../../services/admin/catalog.service';

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
