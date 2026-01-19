<template>
  <div v-if="order" class="space-y-6">
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
          <h1 class="text-2xl font-bold text-slate-900">
            Order #{{ order.orderNumber }}
          </h1>
          <div class="flex items-center mt-1 space-x-3">
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
              :class="{
                'bg-emerald-100 text-emerald-700': order.orderStatus === 'delivered',
                'bg-blue-100 text-blue-700': order.orderStatus === 'shipped',
                'bg-amber-100 text-amber-700': order.orderStatus === 'pending',
                'bg-purple-100 text-purple-700': order.orderStatus === 'processing',
                'bg-indigo-100 text-indigo-700': order.orderStatus === 'ready_for_pickup',
                'bg-cyan-100 text-cyan-700': order.orderStatus === 'confirmed',
                'bg-rose-100 text-rose-700': order.orderStatus === 'cancelled'
              }"
            >
              <span 
                class="w-1.5 h-1.5 rounded-full mr-1.5"
                :class="{
                  'bg-emerald-500': order.orderStatus === 'delivered',
                  'bg-blue-500': order.orderStatus === 'shipped',
                  'bg-amber-500': order.orderStatus === 'pending',
                  'bg-purple-500': order.orderStatus === 'processing',
                  'bg-indigo-500': order.orderStatus === 'ready_for_pickup',
                  'bg-cyan-500': order.orderStatus === 'confirmed',
                  'bg-rose-500': order.orderStatus === 'cancelled'
                }"
              ></span>
              {{ order.orderStatus }}
            </span>
            <span class="text-sm text-slate-500">{{ new Date(order.createdAt).toLocaleDateString() }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Map Section -->
        <div v-if="order.deliveryAddress" class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
            <div class="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900">Delivery Location</h3>
          </div>
          <div class="p-4">
            <OrderTrackingMap
              :deliveryAddress="order.deliveryAddress"
              :orderStatus="order.orderStatus"
            />
          </div>
        </div>

        <!-- Items -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
            <div class="p-2 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900">Order Items</h3>
            <span class="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">{{ order.items?.length || 0 }} items</span>
          </div>
          <ul class="divide-y divide-slate-100">
            <li v-for="item in order.items" :key="item.product._id" class="p-4 flex items-center hover:bg-slate-50/50 transition-colors">
              <div class="h-16 w-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img :src="item.product.images[0] || 'https://via.placeholder.com/60'" class="h-full w-full object-cover" />
              </div>
              <div class="ml-4 flex-1 min-w-0">
                <div class="text-sm font-semibold text-slate-900 truncate">{{ item.product.title }}</div>
                <div class="mt-1 flex items-center space-x-2">
                  <span class="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">SKU: {{ item.product.sku }}</span>
                  <span class="text-xs text-slate-400">Qty: {{ item.quantity }}</span>
                </div>
              </div>
              <div class="text-right ml-4">
                <div class="text-sm font-semibold text-slate-900">
                  {{ order.currency }} {{ item.lineTotal?.toFixed(2) }}
                </div>
                <div class="text-xs text-slate-500">
                  {{ order.currency }} {{ item.price?.toFixed(2) }} each
                </div>
              </div>
            </li>
          </ul>
          
          <!-- Order Summary -->
          <div class="bg-slate-50 px-6 py-4 border-t border-slate-100">
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-slate-500">Subtotal</span>
                <span class="text-slate-900 font-medium">{{ order.currency }} {{ order.subtotal?.toFixed(2) || order.totalAmount?.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-slate-500">Delivery Fee</span>
                <span class="text-slate-900 font-medium">{{ order.currency }} {{ order.deliveryFee?.toFixed(2) || '0.00' }}</span>
              </div>
              <div class="pt-2 border-t border-slate-200 flex justify-between">
                <span class="text-base font-semibold text-slate-900">Total</span>
                <span class="text-lg font-bold text-primary-600">{{ order.currency }} {{ order.totalAmount?.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Status Update -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div class="flex items-center space-x-3 mb-5">
            <div class="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900">Update Status</h3>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Order Status</label>
              <select
                v-model="newStatus"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="ready_for_pickup">Ready for Pickup</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button
              @click="updateStatus"
              :disabled="updating"
              class="w-full inline-flex justify-center items-center py-3 px-4 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="updating" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ updating ? 'Updating...' : 'Update Status' }}
            </button>
          </div>
        </div>

        <!-- Customer Info -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div class="flex items-center space-x-3 mb-5">
            <div class="p-2 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900">Customer</h3>
          </div>
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-semibold text-lg">
              {{ order.userId?.firstName?.charAt(0) || 'C' }}
            </div>
            <div class="ml-3">
              <div class="text-sm font-semibold text-slate-900">{{ order.userId?.firstName }} {{ order.userId?.lastName }}</div>
              <div class="text-xs text-slate-500">Customer</div>
            </div>
          </div>
          <div class="space-y-3 pt-4 border-t border-slate-100">
            <div class="flex items-center text-sm">
              <svg class="w-4 h-4 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-slate-600 truncate">{{ order.userId?.email }}</span>
            </div>
            <div class="flex items-center text-sm">
              <svg class="w-4 h-4 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="text-slate-600">{{ order.userId?.phone || 'N/A' }}</span>
            </div>
          </div>
        </div>

        <!-- Delivery Address -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6" v-if="order.deliveryAddress">
          <div class="flex items-center space-x-3 mb-5">
            <div class="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900">Delivery Address</h3>
          </div>
          <div class="bg-slate-50 rounded-xl p-4">
            <p class="text-sm font-medium text-slate-900">{{ order.deliveryAddress.street }}</p>
            <p class="text-sm text-slate-600 mt-1">{{ order.deliveryAddress.city }}, {{ order.deliveryAddress.state }}</p>
            <p class="text-sm text-slate-500">{{ order.deliveryAddress.country }}</p>
          </div>
        </div>

        <!-- Pickup Location -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6" v-if="order.pickupLocationSnapshot">
          <div class="flex items-center space-x-3 mb-5">
            <div class="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900">Pickup Location</h3>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 space-y-3">
             <div>
              <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Name</p>
              <p class="text-sm font-semibold text-slate-900">{{ order.pickupLocationSnapshot.name }}</p>
             </div>
             <div>
              <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Address</p>
              <p class="text-sm text-slate-600">{{ order.pickupLocationSnapshot.address.street }}</p>
              <p class="text-xs text-slate-500">{{ order.pickupLocationSnapshot.address.city }}, {{ order.pickupLocationSnapshot.address.state }}</p>
             </div>
             <div v-if="order.pickupLocationSnapshot.contact">
                <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Contact</p>
                <div class="flex items-center mt-1">
                   <svg class="w-3.5 h-3.5 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                   </svg>
                   <p class="text-sm text-slate-600">{{ order.pickupLocationSnapshot.contact.name }}</p>
                </div>
                 <div class="flex items-center mt-1">
                   <svg class="w-3.5 h-3.5 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                   </svg>
                   <p class="text-sm text-slate-600">{{ order.pickupLocationSnapshot.contact.phone }}</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="flex flex-col items-center justify-center py-16">
    <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
    <p class="mt-4 text-sm text-slate-500">Loading order details...</p>
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

<route lang="yaml">
meta:
  layout: admin
</route>
