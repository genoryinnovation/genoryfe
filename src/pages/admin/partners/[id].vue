<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { PartnerService } from '../../../services/admin/partner.service';
import { UserService } from '../../../services/admin/user.service';
import { OrderService } from '../../../services/admin/order.service';
import { watchDebounced } from '@vueuse/core';

const route = useRoute();
const partnerId = route.params.id as string;

// Data Refs
const overview = ref<any>(null);
const employees = ref<any[]>([]);
const orders = ref<any[]>([]);
const transactions = ref<any[]>([]);
const partner = ref<any>(null);

// UI State
const activeTab = ref('overview');
const loading = ref(true);
const saving = ref(false);
const alertMessage = ref('');
const alertType = ref<'success' | 'error'>('success');

// Pagination State
const empPage = ref(1);
const empTotal = ref(0);
const orderPage = ref(1);
const orderTotal = ref(0);
const txPage = ref(1);
const txTotal = ref(0);

// Filter State
const orderSearch = ref('');
const orderStatus = ref('all');
const orderSort = ref('-createdAt');

const tabs = [
  { id: 'overview', name: 'Overview', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { id: 'employees', name: 'Employees', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { id: 'orders', name: 'Orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { id: 'wallet', name: 'Wallet', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { id: 'config', name: 'Configuration', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
];

const ensurePaymentSettings = (partnerObj: any) => {
  if (!partnerObj.paymentSettings) {
    partnerObj.paymentSettings = {
      dailyLimit: 0,
      monthlyLimit: 0,
      negativeBalanceLimit: 0
    };
  }
};

const fetchData = async () => {
  try {
    loading.value = true;
    if (activeTab.value === 'overview') {
      const resp = await PartnerService.getPartnerOverview(partnerId);
      overview.value = resp.data;
      partner.value = resp.data.partner;
      ensurePaymentSettings(partner.value);
    } else if (activeTab.value === 'employees') {
      const resp = await UserService.getUsers({ hrCompany: partnerId, page: empPage.value, limit: 10 });
      employees.value = resp.data.users;
      empTotal.value = resp.data.pagination.total;
    } else if (activeTab.value === 'orders') {
      const resp = await OrderService.getOrders({ 
        hrCompany: partnerId, 
        page: orderPage.value, 
        limit: 10,
        search: orderSearch.value,
        status: orderStatus.value,
        sort: orderSort.value
      });
      orders.value = resp.data.orders;
      orderTotal.value = resp.data.pagination.total;
    } else if (activeTab.value === 'wallet') {
      const resp = await PartnerService.getPartnerTransactions(partnerId, { page: txPage.value, limit: 10 });
      transactions.value = resp.data.transactions;
      txTotal.value = resp.data.pagination.total;
    } else if (activeTab.value === 'config') {
      if (!partner.value) {
        const resp = await PartnerService.getPartner(partnerId);
        partner.value = resp.data;
      }
      ensurePaymentSettings(partner.value);
    }
  } catch (error) {
    console.error('Failed to fetch data', error);
  } finally {
    loading.value = false;
  }
};

const handleSaveConfig = async () => {
  try {
    alertMessage.value = '';
    saving.value = true;
    const payload = {
      name: partner.value.name,
      industry: partner.value.industry,
      registrationNumber: partner.value.registrationNumber,
      isActive: partner.value.isActive,
      paymentSettings: partner.value.paymentSettings
    };
    await PartnerService.updatePartner(partnerId, payload);
    alertMessage.value = 'Configuration updated successfully';
    alertType.value = 'success';
    setTimeout(() => { alertMessage.value = ''; }, 3000);
  } catch (error: any) {
    alertMessage.value = error.response?.data?.message || 'Failed to update';
    alertType.value = 'error';
  } finally {
    saving.value = false;
  }
};

onMounted(fetchData);
watch(activeTab, fetchData);
watch([empPage, orderPage, txPage], fetchData);

// Filter Watchers
watchDebounced(orderSearch, () => {
  orderPage.value = 1;
  fetchData();
}, { debounce: 500 });

watch(orderStatus, () => {
  orderPage.value = 1;
  fetchData();
});

watch(orderSort, () => {
  orderPage.value = 1;
  fetchData();
});

const formatDate = (d: string) => new Date(d).toLocaleDateString();
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
};
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-6 pb-20">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <router-link to="/admin/partners" class="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
          <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </router-link>
        <div>
          <h1 class="text-2xl font-bold text-slate-900" v-if="partner">{{ partner.name }}</h1>
          <p class="text-sm text-slate-500">Partner Management & Overview</p>
        </div>
      </div>
      <div v-if="partner" :class="['px-4 py-1.5 rounded-full text-xs font-bold border', partner.isActive ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600']">
        {{ partner.isActive ? 'Active' : 'Suspended' }}
      </div>
    </div>

    <!-- API Feedback Banner -->
    <div v-if="alertMessage" :class="['p-4 rounded-xl border font-bold text-sm animate-in fade-in slide-in-from-top-4 duration-300', alertType === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600']">
      {{ alertMessage }}
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center space-x-1 bg-slate-100 p-1 rounded-2xl w-fit">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="['px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center', activeTab === tab.id ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-white/50']">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.icon" />
        </svg>
        {{ tab.name }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="relative min-h-[400px]">
      <div v-if="loading" class="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-2xl">
        <svg class="animate-spin h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>

      <!-- OVERVIEW TAB -->
      <div v-if="activeTab === 'overview' && overview" class="space-y-6 animate-in fade-in duration-300">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Active Employees</p>
            <p class="text-2xl font-black text-slate-900">{{ overview.stats.activeEmployees }}</p>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Pending Orders</p>
            <p class="text-2xl font-black text-slate-900">{{ overview.stats.pendingOrders }}</p>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Wallet Balance</p>
            <p class="text-2xl font-black text-primary-600">{{ formatCurrency(overview.stats.walletBalance) }}</p>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Spend</p>
            <p class="text-2xl font-black text-slate-900">{{ formatCurrency(overview.stats.totalSpend) }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Recent Orders -->
          <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 class="font-bold text-slate-900">Recent Orders</h3>
              <button @click="activeTab = 'orders'" class="text-xs font-bold text-primary-600 hover:underline">View All</button>
            </div>
            <div class="flex-1">
              <div v-if="overview.recentOrders.length" class="divide-y divide-slate-100">
                <div v-for="order in overview.recentOrders" :key="order._id" class="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <p class="text-sm font-bold text-slate-900">{{ order.orderNumber }}</p>
                    <p class="text-xs text-slate-500">{{ order.userId.firstName }} {{ order.userId.lastName }} • {{ formatDate(order.createdAt) }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-black text-slate-900">{{ formatCurrency(order.totalAmount) }}</p>
                    <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full uppercase', order.orderStatus === 'delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700']">
                      {{ order.orderStatus }}
                    </span>
                  </div>
                </div>
              </div>
              <div v-else class="p-12 text-center text-slate-400">No orders yet.</div>
            </div>
          </div>

          <!-- Recent Wallet Activity -->
          <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 class="font-bold text-slate-900">Recent Transactions</h3>
              <button @click="activeTab = 'wallet'" class="text-xs font-bold text-primary-600 hover:underline">View All</button>
            </div>
            <div class="flex-1">
              <div v-if="overview.recentTransactions.length" class="divide-y divide-slate-100">
                <div v-for="tx in overview.recentTransactions" :key="tx._id" class="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <p class="text-sm font-bold text-slate-900 capitalize">{{ tx.reason.replace('_', ' ') }}</p>
                    <p class="text-xs text-slate-500">{{ formatDate(tx.createdAt) }}</p>
                  </div>
                  <div class="text-right">
                    <p :class="['text-sm font-black', tx.transactionType === 'credit' ? 'text-emerald-600' : 'text-rose-600']">
                      {{ tx.transactionType === 'credit' ? '+' : '-' }}{{ formatCurrency(tx.nairaAmount) }}
                    </p>
                    <span class="text-[10px] text-slate-400 uppercase font-black tracking-tight">{{ tx.status }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="p-12 text-center text-slate-400">No transactions yet.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- EMPLOYEES TAB -->
      <div v-if="activeTab === 'employees'" class="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-in fade-in duration-300">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-slate-50 border-b border-slate-100 font-bold text-xs text-slate-500 uppercase">
              <tr>
                <th class="px-6 py-4">Employee</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4 text-right">Joined</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              <tr v-for="user in employees" :key="user._id" class="hover:bg-slate-50/50 transition-colors cursor-pointer">
                <td class="px-6 py-4">
                  <p class="font-bold text-slate-900">{{ user.firstName }} {{ user.lastName }}</p>
                  <p class="text-xs text-slate-500">{{ user.email }}</p>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase">Active</span>
                </td>
                <td class="px-6 py-4 text-right text-slate-500">{{ formatDate(user.createdAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination -->
        <div class="p-4 border-t border-slate-100 flex items-center justify-between">
          <p class="text-xs text-slate-500 font-bold">Total: {{ empTotal }} employees</p>
          <div class="flex items-center space-x-2">
            <button @click="empPage--" :disabled="empPage === 1" class="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold disabled:opacity-50">Prev</button>
            <span class="text-xs font-bold px-2">Page {{ empPage }} of {{ Math.ceil(empTotal / 10) || 1 }}</span>
            <button @click="empPage++" :disabled="empPage >= Math.ceil(empTotal / 10)" class="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      <!-- ORDERS TAB -->
      <div v-if="activeTab === 'orders'" class="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-in fade-in duration-300">
        <!-- Filters -->
        <div class="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="relative flex-1">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input v-model="orderSearch" type="text" placeholder="Search order reference..." class="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all" />
          </div>
          <div class="flex items-center space-x-3">
            <select v-model="orderSort" class="px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option value="-createdAt">Newest First</option>
              <option value="createdAt">Oldest First</option>
              <option value="-totalAmount">Highest Amount</option>
              <option value="totalAmount">Lowest Amount</option>
            </select>
            <select v-model="orderStatus" class="px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-slate-50 border-b border-slate-100 font-bold text-xs text-slate-500 uppercase">
              <tr>
                <th class="px-6 py-4">Order Ref</th>
                <th class="px-6 py-4">Staff Member</th>
                <th class="px-6 py-4 text-right">Amount</th>
                <th class="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              <tr v-for="order in orders" :key="order._id" class="hover:bg-slate-50/50 transition-colors cursor-pointer">
                <td class="px-6 py-4 font-bold text-slate-900">{{ order.orderNumber }}</td>
                <td class="px-6 py-4">
                  <div v-if="order.userId">
                    <p class="font-bold text-slate-900">{{ order.userId.firstName }} {{ order.userId.lastName }}</p>
                    <p class="text-[10px] text-slate-500">{{ order.userId.email }}</p>
                  </div>
                  <span v-else class="text-slate-400 italic text-xs">Deleted User</span>
                </td>
                <td class="px-6 py-4 text-right font-black">{{ formatCurrency(order.totalAmount) }}</td>
                <td class="px-6 py-4 text-center text-[10px] font-bold">
                  <span :class="['px-2 py-0.5 rounded-full uppercase', order.orderStatus === 'delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700']">
                    {{ order.orderStatus }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="p-4 border-t border-slate-100 flex items-center justify-between">
          <p class="text-xs text-slate-500 font-bold">Total: {{ orderTotal }} orders</p>
          <div class="flex items-center space-x-2">
            <button @click="orderPage--" :disabled="orderPage === 1" class="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold disabled:opacity-50">Prev</button>
            <span class="text-xs font-bold px-2">Page {{ orderPage }} of {{ Math.ceil(orderTotal / 10) || 1 }}</span>
            <button @click="orderPage++" :disabled="orderPage >= Math.ceil(orderTotal / 10)" class="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      <!-- WALLET TAB -->
      <div v-if="activeTab === 'wallet'" class="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-in fade-in duration-300">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-slate-50 border-b border-slate-100 font-bold text-xs text-slate-500 uppercase">
              <tr>
                <th class="px-6 py-4">Date</th>
                <th class="px-6 py-4">Description</th>
                <th class="px-6 py-4 text-right">Amount</th>
                <th class="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              <tr v-for="tx in transactions" :key="tx._id" class="hover:bg-slate-50/50 transition-colors">
                <td class="px-6 py-4 text-slate-500">{{ formatDate(tx.createdAt) }}</td>
                <td class="px-6 py-4">
                  <p class="font-bold text-slate-900 capitalize">{{ tx.reason.replace('_', ' ') }}</p>
                  <p class="text-[10px] text-slate-400 font-mono">{{ tx.reference }}</p>
                </td>
                <td class="px-6 py-4 text-right font-black" :class="tx.transactionType === 'credit' ? 'text-emerald-600' : 'text-rose-600'">
                  {{ tx.transactionType === 'credit' ? '+' : '-' }}{{ formatCurrency(tx.nairaAmount) }}
                </td>
                <td class="px-6 py-4 text-center text-[10px] font-bold">
                  <span :class="['px-2 py-0.5 rounded-full uppercase', tx.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700']">
                    {{ tx.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="p-4 border-t border-slate-100 flex items-center justify-between">
          <p class="text-xs text-slate-500 font-bold">Total: {{ txTotal }} transactions</p>
          <div class="flex items-center space-x-2">
            <button @click="txPage--" :disabled="txPage === 1" class="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold disabled:opacity-50">Prev</button>
            <span class="text-xs font-bold px-2">Page {{ txPage }} of {{ Math.ceil(txTotal / 10) || 1 }}</span>
            <button @click="txPage++" :disabled="txPage >= Math.ceil(txTotal / 10)" class="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      <!-- CONFIG TAB -->
      <div v-if="activeTab === 'config' && partner" class="space-y-6 animate-in fade-in duration-300">
        <!-- Account Status -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="p-6 border-b border-slate-100 bg-slate-50/50 font-bold text-slate-900">Partner Access</div>
          <div class="p-6 flex items-center justify-between">
            <div><p class="font-bold text-slate-900">Portal Access</p><p class="text-xs text-slate-500">Enable or disable partner portal dashboard.</p></div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="partner.isActive" class="sr-only peer">
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>

        <!-- Identity -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="p-6 border-b border-slate-100 bg-slate-50/50 font-bold text-slate-900">Company Identity</div>
          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1"><label class="text-xs font-bold text-slate-500 uppercase">Company Name</label><input v-model="partner.name" class="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" /></div>
            <div class="space-y-1"><label class="text-xs font-bold text-slate-500 uppercase">Industry</label><input v-model="partner.industry" class="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" /></div>
            <div class="space-y-1 md:col-span-2"><label class="text-xs font-bold text-slate-500 uppercase">Registration Number</label><input v-model="partner.registrationNumber" class="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" /></div>
          </div>
        </div>

        <!-- Limits -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="p-6 border-b border-slate-100 bg-slate-50/50 font-bold text-slate-900">Spending Controls</div>
          <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="space-y-1"><label class="text-xs font-bold text-slate-500 uppercase">Daily Limit</label><input type="number" v-model="partner.paymentSettings.dailyLimit" class="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 font-bold" /></div>
            <div class="space-y-1"><label class="text-xs font-bold text-slate-500 uppercase">Monthly Limit</label><input type="number" v-model="partner.paymentSettings.monthlyLimit" class="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 font-bold" /></div>
            <div class="space-y-1"><label class="text-xs font-bold text-slate-500 uppercase">Overdraft Limit</label><input type="number" v-model="partner.paymentSettings.negativeBalanceLimit" class="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 font-bold" /></div>
          </div>
        </div>

        <div class="flex justify-end">
          <button @click="handleSaveConfig" :disabled="saving" class="px-6 py-3 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 shadow-lg shadow-primary-500/25 disabled:opacity-50">
            {{ saving ? 'Saving...' : 'Save Configuration' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
