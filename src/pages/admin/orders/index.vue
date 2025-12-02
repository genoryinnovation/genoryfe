<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900 mb-6">Orders</h1>

    <!-- Stats -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.total || 0 }}</dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Pending</dt>
          <dd class="mt-1 text-3xl font-semibold text-yellow-600">{{ stats.pending || 0 }}</dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Delivered</dt>
          <dd class="mt-1 text-3xl font-semibold text-green-600">{{ stats.delivered || 0 }}</dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Revenue</dt>
          <dd class="mt-1 text-3xl font-semibold text-blue-600">NGN {{ (stats.revenue || 0).toLocaleString() }}</dd>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-6 flex gap-4">
      <input
        v-model="search"
        @input="debouncedFetch"
        type="text"
        placeholder="Search orders..."
        class="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <select
        v-model="statusFilter"
        @change="fetchOrders"
        class="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
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

    <!-- Order List -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
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
              Total
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment
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
          <tr v-for="order in orders" :key="order._id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
              <router-link :to="`/admin/orders/${order._id}`">
                {{ order.orderNumber }}
              </router-link>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ order.userId?.firstName }} {{ order.userId?.lastName }}
              <div class="text-xs text-gray-500">{{ order.userId?.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ new Date(order.createdAt).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ order.currency }} {{ order.totalAmount.toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span class="capitalize">{{ order.paymentMethod }}</span>
              <span
                class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': order.paymentStatus === 'paid',
                  'bg-yellow-100 text-yellow-800': order.paymentStatus === 'pending',
                  'bg-red-100 text-red-800': order.paymentStatus === 'failed'
                }"
              >
                {{ order.paymentStatus }}
              </span>
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
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex justify-between items-center">
      <div class="text-sm text-gray-700">
        Showing page {{ pagination.page }} of {{ pagination.pages }} ({{ pagination.total }} results)
      </div>
      <div class="flex space-x-2">
        <button
          @click="changePage(pagination.page - 1)"
          :disabled="pagination.page === 1"
          class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          @click="changePage(pagination.page + 1)"
          :disabled="pagination.page === pagination.pages"
          class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Next
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
