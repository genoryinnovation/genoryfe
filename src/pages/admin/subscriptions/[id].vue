<template>
  <div v-if="subscription" class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div class="flex items-center space-x-3">
            <router-link to="/admin/subscriptions" class="p-2 -ml-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </router-link>
            <h1 class="text-2xl font-bold text-slate-900">{{ subscription.name }}</h1>
             <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                  :class="{
                    'bg-emerald-100 text-emerald-700': subscription.status === 'active',
                    'bg-amber-100 text-amber-700': subscription.status === 'paused',
                    'bg-slate-100 text-slate-600': subscription.status === 'cancelled'
                  }"
                >
                  <span 
                    class="w-1.5 h-1.5 rounded-full mr-2"
                    :class="{
                      'bg-emerald-500': subscription.status === 'active',
                      'bg-amber-500': subscription.status === 'paused',
                      'bg-slate-400': subscription.status === 'cancelled'
                    }"
                  ></span>
                  {{ subscription.status }}
            </span>
        </div>
        <p class="mt-1 text-sm text-slate-500 ml-9">ID: <span class="font-mono text-xs">{{ subscription._id }}</span></p>
      </div>
      
      <div class="flex items-center space-x-3 ml-9 sm:ml-0">
          <!-- Status Actions -->
        <button 
           v-if="subscription.status === 'active'"
           @click="updateStatus('paused')"
           class="inline-flex items-center px-4 py-2 border border-slate-200 shadow-sm text-sm font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
            <svg class="w-4 h-4 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pause Subscription
        </button>
        
        <button 
           v-if="subscription.status === 'paused'"
           @click="updateStatus('active')"
           class="inline-flex items-center px-4 py-2 border border-slate-200 shadow-sm text-sm font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
            <svg class="w-4 h-4 mr-2 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Resume Subscription
        </button>

         <button 
           v-if="subscription.status !== 'cancelled'"
           @click="manualRenew"
           class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
           <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
           </svg>
            Trigger Renewal
        </button>

        <button 
           v-if="subscription.status !== 'cancelled'"
           @click="confirmCancel"
           class="inline-flex items-center px-4 py-2 border border-rose-200 shadow-sm text-sm font-medium rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
        >
           Cancel
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
            <!-- Items -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 class="text-base font-semibold text-slate-900">Subscription Items</h3>
                </div>
                <ul role="list" class="divide-y divide-slate-100">
                    <li v-for="item in subscription.items" :key="item.product._id" class="p-4 sm:px-6 flex items-center">
                         <div class="flex-shrink-0 h-16 w-16 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                             <img v-if="item.image" :src="item.image" class="h-full w-full object-cover">
                             <div v-else class="h-full w-full flex items-center justify-center text-slate-400">
                                 <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                 </svg>
                             </div>
                         </div>
                         <div class="ml-4 flex-1">
                             <h4 class="text-sm font-medium text-slate-900">{{ item.title }}</h4>
                             <p class="text-xs text-slate-500">Qty: {{ item.quantity }}</p>
                         </div>
                         <div class="text-sm font-medium text-slate-900">
                             ₦{{ ((item.price || 0) * item.quantity).toLocaleString() }}
                         </div>
                    </li>
                    <li class="p-4 sm:px-6 bg-slate-50 flex justify-between items-center">
                         <span class="text-sm font-medium text-slate-600">Total Value</span>
                         <span class="text-lg font-bold text-primary-700">
                             ₦{{ subscription.items.reduce((acc, i) => acc + (i.price || 0) * i.quantity, 0).toLocaleString() }}
                         </span>
                    </li>
                </ul>
            </div>
            
            <!-- Subscription Stats -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <p class="text-sm font-medium text-slate-500">Total Spend</p>
                    <p class="mt-1 text-2xl font-bold text-slate-900">₦{{ stats.totalSpend.toLocaleString() }}</p>
                </div>
                <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <p class="text-sm font-medium text-slate-500">Total Orders</p>
                    <p class="mt-1 text-2xl font-bold text-slate-900">{{ stats.totalOrders }}</p>
                </div>
                 <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <p class="text-sm font-medium text-slate-500">Avg. Order Value</p>
                    <p class="mt-1 text-2xl font-bold text-slate-900">₦{{ stats.avgOrderValue.toLocaleString() }}</p>
                </div>
            </div>

            <!-- History / Related Orders -->
             <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h3 class="text-base font-semibold text-slate-900">Order History</h3>
                </div>
                 <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-slate-200">
                    <thead>
                        <tr class="bg-slate-50">
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Order</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Total</th>
                        <th scope="col" class="relative px-6 py-3"><span class="sr-only">View</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr v-for="order in orders" :key="order._id" class="hover:bg-slate-50/50">
                        <td class="px-6 py-3 whitespace-nowrap text-sm font-medium text-primary-600">#{{ order.orderNumber }}</td>
                        <td class="px-6 py-3 whitespace-nowrap text-sm text-slate-600">{{ new Date(order.createdAt).toLocaleDateString() }}</td>
                        <td class="px-6 py-3 whitespace-nowrap">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 capitalize">
                            {{ order.orderStatus }}
                            </span>
                        </td>
                        <td class="px-6 py-3 whitespace-nowrap text-sm font-medium text-slate-900">₦{{ order.totalAmount.toLocaleString() }}</td>
                        <td class="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <router-link :to="`/admin/orders/${order._id}`" class="text-primary-600 hover:text-primary-900">View</router-link>
                        </td>
                        </tr>
                        <tr v-if="orders.length === 0">
                            <td colspan="5" class="px-6 py-10 text-center text-sm text-slate-500">No orders found for this subscription yet.</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
            <!-- Customer Info -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 class="text-base font-semibold text-slate-900">Customer</h3>
                </div>
                <div class="p-6">
                    <div class="flex items-center mb-4">
                         <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                             {{ subscription.userId?.firstName?.charAt(0) }}
                         </div>
                         <div class="ml-3">
                             <p class="text-sm font-medium text-slate-900">{{ subscription.userId?.firstName }} {{ subscription.userId?.lastName }}</p>
                             <p class="text-xs text-slate-500">Customer</p>
                         </div>
                    </div>
                    <div class="space-y-3 text-sm">
                        <div class="flex items-start">
                             <svg class="w-4 h-4 text-slate-400 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                             </svg>
                             <span class="text-slate-600">{{ subscription.userId?.email }}</span>
                        </div>
                         <div class="flex items-start">
                             <svg class="w-4 h-4 text-slate-400 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                             </svg>
                             <span class="text-slate-600">{{ subscription.userId?.phone || 'No phone' }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Schedule -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 class="text-base font-semibold text-slate-900">Schedule</h3>
                </div>
                <div class="p-6 space-y-4">
                     <div>
                         <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Frequency</p>
                         <p class="mt-1 text-sm font-medium text-slate-900 capitalize">{{ subscription.frequency }}</p>
                     </div>
                     <div>
                         <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Start Date</p>
                         <p class="mt-1 text-sm font-medium text-slate-900">{{ new Date(subscription.startDate).toLocaleDateString() }}</p>
                     </div>
                     <div>
                         <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Next Delivery</p>
                         <p class="mt-1 text-sm font-medium text-primary-700">{{ new Date(subscription.nextDeliveryDate).toLocaleDateString() }}</p>
                     </div>
                     <div>
                         <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Next Billing</p>
                         <p class="mt-1 text-sm font-medium text-slate-900">{{ new Date(subscription.nextBillingDate).toLocaleDateString() }}</p>
                     </div>
                </div>
            </div>

             <!-- Delivery Address -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 class="text-base font-semibold text-slate-900">Delivery Address</h3>
                </div>
                 <div class="p-6 text-sm text-slate-600">
                    <p class="font-medium text-slate-900 mb-1">{{ subscription.deliveryAddress.firstName }} {{ subscription.deliveryAddress.lastName }}</p>
                    <p>{{ subscription.deliveryAddress.street }}</p>
                    <p>{{ subscription.deliveryAddress.city }}, {{ subscription.deliveryAddress.state }}</p>
                    <p>{{ subscription.deliveryAddress.phone }}</p>
                </div>
            </div>
        </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { SubscriptionService, Subscription } from '../../../services/admin/subscription.service';
import { OrderService, Order } from '../../../services/admin/order.service';

const route = useRoute();
const subscription = ref<Subscription | null>(null);
const orders = ref<Order[]>([]);

const stats = computed(() => {
    const totalOrders = orders.value.length;
    const totalSpend = orders.value.reduce((acc, order) => acc + order.totalAmount, 0);
    const avgOrderValue = totalOrders > 0 ? totalSpend / totalOrders : 0;
    
    return {
        totalOrders,
        totalSpend,
        avgOrderValue
    };
});

const fetchSubscription = async () => {
  try {
    const [subRes, ordersRes] = await Promise.all([
        SubscriptionService.getSubscription(route.params.id as string),
        OrderService.getOrders({ subscriptionId: route.params.id, limit: 100 }) // Fetch last 100 orders
    ]);
    
    subscription.value = subRes.data;
    orders.value = ordersRes.data.orders;
    
  } catch (error) {
    console.error('Failed to fetch subscription details', error);
  }
};

const updateStatus = async (status: string) => {
    if (!confirm(`Are you sure you want to ${status} this subscription?`)) return;
    
    try {
        await SubscriptionService.updateStatus(subscription.value!._id, status);
        await fetchSubscription();
    } catch (error) {
        alert('Failed to update status');
        console.error(error);
    }
};

const manualRenew = async () => {
    if (!confirm('This will create a new order immediately. Continue?')) return;

     try {
        await SubscriptionService.manualRenew(subscription.value!._id);
        alert('Renewal order created successfully');
        await fetchSubscription(); // Refresh to potentially show new dates or logs
    } catch (error) {
        alert('Failed to trigger renewal');
        console.error(error);
    }
};

const confirmCancel = () => {
    updateStatus('cancelled');
};

onMounted(() => {
  fetchSubscription();
});
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
