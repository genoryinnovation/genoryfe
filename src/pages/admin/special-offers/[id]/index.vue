<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center space-x-3 mb-1">
          <router-link to="/admin/special-offers" class="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </router-link>
          <h1 class="text-2xl font-bold text-slate-900" v-if="offer">{{ offer.title }}</h1>
        </div>
        <p class="text-sm text-slate-500 ml-9">View details and order history for this special offer</p>
      </div>
      <div v-if="offer" class="mt-4 sm:mt-0 flex space-x-3">
        <button
          @click="toggleStatus"
          :class="[
            'inline-flex items-center px-4 py-2.5 text-sm font-semibold rounded-xl transition-all shadow-sm border',
            offer.isActive 
              ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' 
              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
          ]"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="offer.isActive" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
          {{ offer.isActive ? 'Pause Offer' : 'Resume Offer' }}
        </button>
        <router-link
          :to="`/admin/special-offers/${offer._id}/edit`"
          class="inline-flex items-center px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-all shadow-sm"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Edit
        </router-link>
      </div>
    </div>

    <!-- Stats & Details Grid -->
    <div v-if="offer" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column: Summary -->
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <img :src="offer.image" class="w-full h-48 object-cover" />
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="px-2.5 py-1 text-xs font-bold rounded-lg uppercase tracking-wider bg-primary-50 text-primary-600">
                {{ offer.type }}
              </span>
              <span 
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                :class="offer.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'"
              >
                {{ offer.isActive ? 'Active' : 'Paused' }}
              </span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">{{ offer.title }}</h3>
            <p class="text-sm text-slate-500 mb-6">{{ offer.description }}</p>
            
            <div class="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
              <div>
                <p class="text-xs text-slate-400 font-medium uppercase mb-1">Offer Price</p>
                <p class="text-lg font-bold text-primary-600">₦{{ offer.price?.toLocaleString() }}</p>
              </div>
              <div>
                <p class="text-xs text-slate-400 font-medium uppercase mb-1">Original Value</p>
                <p class="text-lg font-bold text-slate-400 line-through text-sm">₦{{ offer.originalPrice?.toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h4 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Included Products</h4>
          <div class="space-y-3">
             <div v-for="item in offer.items" :key="item.product?._id" class="flex items-center space-x-3 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <img :src="item.product?.images?.[0]" class="w-10 h-10 rounded-lg object-cover" />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-slate-900 truncate">{{ item.product?.title }}</p>
                  <p class="text-xs text-slate-500">Qty: {{ item.quantity }}</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Orders -->
      <div class="lg:col-span-2 space-y-6">
         <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
           <div class="p-6 border-b border-slate-50 flex items-center justify-between">
             <h4 class="text-lg font-bold text-slate-900">Purchase History</h4>
             <span class="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
               {{ pagination.total }} Orders
             </span>
           </div>
           
           <div class="overflow-x-auto">
             <table class="min-w-full divide-y divide-slate-200">
               <thead>
                 <tr class="bg-slate-50/50">
                   <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Order#</th>
                   <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Customer</th>
                   <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Date</th>
                   <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Amount</th>
                   <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                 </tr>
               </thead>
               <tbody class="divide-y divide-slate-100">
                 <tr v-for="order in orders" :key="order._id" class="hover:bg-slate-50/50 transition-colors cursor-pointer" @click="viewOrder(order._id)">
                   <td class="px-6 py-4 whitespace-nowrap">
                     <span class="text-sm font-bold text-primary-600">#{{ order.orderNumber }}</span>
                   </td>
                   <td class="px-6 py-4 whitespace-nowrap">
                     <div class="text-sm font-medium text-slate-900">{{ order.userId?.firstName }} {{ order.userId?.lastName }}</div>
                     <div class="text-xs text-slate-500">{{ order.userId?.email }}</div>
                   </td>
                   <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                     {{ new Date(order.createdAt).toLocaleDateString() }}
                   </td>
                   <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                     ₦{{ order.totalAmount.toLocaleString() }}
                   </td>
                   <td class="px-6 py-4 whitespace-nowrap">
                     <span class="px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider" :class="getStatusClass(order.orderStatus)">
                       {{ order.orderStatus }}
                     </span>
                   </td>
                 </tr>
                 <tr v-if="orders.length === 0">
                    <td colspan="5" class="px-6 py-12 text-center text-slate-400 italic">
                      No purchases found for this offer yet.
                    </td>
                 </tr>
               </tbody>
             </table>
           </div>

           <!-- Pagination -->
           <div v-if="pagination.pages > 1" class="p-4 border-t border-slate-50 flex items-center justify-between">
              <p class="text-xs text-slate-500">Page {{ pagination.page }} of {{ pagination.pages }}</p>
              <div class="flex space-x-2">
                <button 
                  @click="changePage(pagination.page - 1)" 
                  :disabled="pagination.page === 1"
                  class="p-2 border border-slate-200 rounded-lg disabled:opacity-50"
                >
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button 
                  @click="changePage(pagination.page + 1)" 
                  :disabled="pagination.page === pagination.pages"
                  class="p-2 border border-slate-200 rounded-lg disabled:opacity-50"
                >
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
           </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { SpecialOfferService } from '../../../../services/admin/special_offer.service';

const route = useRoute();
const router = useRouter();

const offer = ref<any>(null);
const orders = ref<any[]>([]);
const pagination = reactive({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0
});

const fetchDetails = async () => {
  try {
    const res = await SpecialOfferService.getOffer(route.params.id as string);
    offer.value = res.data;
  } catch (error) {
    console.error('Error fetching offer details', error);
  }
};

const fetchOrders = async (page = 1) => {
  try {
    const res = await SpecialOfferService.getOfferOrders(route.params.id as string, page, pagination.limit);
    orders.value = res.data.orders;
    pagination.page = res.data.pagination.page;
    pagination.total = res.data.pagination.total;
    pagination.pages = res.data.pagination.pages;
  } catch (error) {
    console.error('Error fetching offer orders', error);
  }
};

const toggleStatus = async () => {
  if (!offer.value) return;
  try {
    await SpecialOfferService.updateOffer(offer.value._id, { isActive: !offer.value.isActive });
    offer.value.isActive = !offer.value.isActive;
  } catch (error) {
    console.error('Error toggling status', error);
  }
};

const viewOrder = (id: string) => {
  router.push(`/admin/orders/${id}`);
};

const changePage = (page: number) => {
  if (page < 1 || page > pagination.pages) return;
  fetchOrders(page);
};

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
    case 'completed': return 'bg-emerald-50 text-emerald-600';
    case 'pending': return 'bg-amber-50 text-amber-600';
    case 'cancelled': return 'bg-rose-50 text-rose-600';
    case 'delivering':
    case 'processing': return 'bg-blue-50 text-blue-600';
    default: return 'bg-slate-100 text-slate-600';
  }
};

onMounted(() => {
  fetchDetails();
  fetchOrders();
});
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
