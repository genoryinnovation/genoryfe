<template>
  <div v-if="order">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">
        Order #{{ order.orderNumber }}
      </h1>
      <button
        @click="router.back()"
        class="text-gray-600 hover:text-gray-900"
      >
        Back to Orders
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Map Section -->
        <div v-if="order.deliveryAddress" class="bg-white shadow rounded-lg overflow-hidden">
          <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Delivery Location</h3>
          </div>
          <div class="p-4">
            <OrderTrackingMap
              :deliveryAddress="order.deliveryAddress"
              :orderStatus="order.orderStatus"
            />
          </div>
        </div>

        <!-- Items -->
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Items</h3>
          </div>
          <ul class="divide-y divide-gray-200">
            <li v-for="item in order.items" :key="item.product._id" class="p-4 flex items-center">
              <img :src="item.product.images[0] || 'https://via.placeholder.com/60'" class="h-16 w-16 object-cover rounded" />
              <div class="ml-4 flex-1">
                <div class="text-sm font-medium text-gray-900">{{ item.product.title }}</div>
                <div class="text-sm text-gray-500">SKU: {{ item.product.sku }}</div>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900">
                  {{ order.currency }} {{ item.price.toFixed(2) }} x {{ item.quantity }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ order.currency }} {{ item.lineTotal.toFixed(2) }}
                </div>
              </div>
            </li>
          </ul>
          <div class="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between items-center border-t border-gray-200">
            <span class="text-base font-medium text-gray-900">Total</span>
            <span class="text-lg font-bold text-gray-900">{{ order.currency }} {{ order.totalAmount.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Status -->
        <div class="bg-white shadow rounded-lg p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Status</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Order Status</label>
              <select
                v-model="newStatus"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button
              @click="updateStatus"
              :disabled="updating"
              class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {{ updating ? 'Updating...' : 'Update Status' }}
            </button>
          </div>
        </div>

        <!-- Customer Info -->
        <div class="bg-white shadow rounded-lg p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Customer</h3>
          <div class="text-sm text-gray-600 space-y-2">
            <p><span class="font-medium text-gray-900">Name:</span> {{ order.userId?.firstName }} {{ order.userId?.lastName }}</p>
            <p><span class="font-medium text-gray-900">Email:</span> {{ order.userId?.email }}</p>
            <p><span class="font-medium text-gray-900">Phone:</span> {{ order.userId?.phone || 'N/A' }}</p>
          </div>
        </div>

        <!-- Delivery Address -->
        <div class="bg-white shadow rounded-lg p-6" v-if="order.deliveryAddress">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Delivery Address</h3>
          <div class="text-sm text-gray-600">
            <p>{{ order.deliveryAddress.street }}</p>
            <p>{{ order.deliveryAddress.city }}, {{ order.deliveryAddress.state }}</p>
            <p>{{ order.deliveryAddress.country }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-12">
    <p class="text-gray-500">Loading order details...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { OrderService, Order } from '../../../services/admin/order.service';
import OrderTrackingMap from '../../../components/admin/OrderTrackingMap.vue';

const route = useRoute();
const router = useRouter();
const order = ref<Order | null>(null);
const newStatus = ref('');
const updating = ref(false);

const fetchOrder = async () => {
  try {
    const response = await OrderService.getOrder(route.params.id as string);
    order.value = response.data;
    newStatus.value = response.data.orderStatus;
  } catch (error) {
    console.error('Failed to fetch order', error);
  }
};

const updateStatus = async () => {
  if (!order.value) return;
  updating.value = true;
  try {
    await OrderService.updateOrderStatus(order.value._id, newStatus.value);
    await fetchOrder();
    alert('Order status updated');
  } catch (error) {
    console.error('Failed to update status', error);
    alert('Failed to update status');
  } finally {
    updating.value = false;
  }
};

onMounted(() => {
  fetchOrder();
});
</script>
