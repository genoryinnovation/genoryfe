<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <router-link 
          to="/partner/employees" 
          class="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </router-link>
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Employee Overview</h1>
          <p class="text-slate-500 text-sm">View profile and order history for this employee.</p>
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm">
      <svg class="animate-spin h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="mt-4 text-slate-400 font-medium">Loading employee details...</p>
    </div>

    <template v-else-if="employee">
      <div class="flex space-x-6 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          @click="activeTab = 'overview'"
          :class="['px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap', activeTab === 'overview' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' : 'bg-white text-slate-500 hover:bg-slate-50']"
        >
          Overview
        </button>
        <button 
          @click="activeTab = 'settings'"
          :class="['px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap', activeTab === 'settings' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' : 'bg-white text-slate-500 hover:bg-slate-50']"
        >
          Company Settings
        </button>
      </div>

      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'" class="space-y-6">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Requests</p>
            <p class="text-3xl font-black italic text-slate-900">{{ totalOrders }}</p>
          </div>
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lifetime Spending</p>
            <p class="text-3xl font-black italic text-slate-900">₦{{ lifetimeSpend.toLocaleString() }}</p>
          </div>
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Single Order Limit</p>
            <p class="text-3xl font-black italic text-slate-900">₦{{ (employee as any).membership?.settings?.orderThreshold?.toLocaleString() || '0' }}</p>
          </div>
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Account Status</p>
            <div class="mt-1">
              <span :class="['px-3 py-1 font-bold rounded-lg uppercase text-[10px]', employee.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600']">
                {{ employee.isActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Order History Table -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 class="text-xl font-black text-slate-900 italic tracking-tight">Order Activity</h3>
            
            <div class="flex items-center space-x-3">
              <div class="relative">
                <input 
                  v-model="searchQuery" 
                  @input="handleSearch"
                  type="text" 
                  placeholder="Search orders..." 
                  class="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none w-64 transition-all text-sm"
                />
                <svg class="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select 
                v-model="statusFilter" 
                @change="handleFilter"
                class="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm font-medium"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-100">
                  <th class="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order Info</th>
                  <th class="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                  <th class="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th class="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-if="activities.length === 0" class="hover:bg-slate-50/50 transition-colors">
                  <td colspan="4" class="px-8 py-12 text-center text-slate-400 font-medium">
                    No order history found matching your criteria.
                  </td>
                </tr>
                <tr 
                  v-for="order in activities" 
                  :key="order._id"
                  class="hover:bg-slate-50/50 transition-colors group"
                >
                  <td class="px-8 py-4">
                    <p class="text-slate-900 font-bold">{{ order.order?.orderNumber || 'Pending Order' }}</p>
                    <p class="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">REF: {{ order._id.slice(-8).toUpperCase() }}</p>
                  </td>
                  <td class="px-8 py-4">
                    <p class="text-slate-900 font-black italic">₦{{ order.amount.toLocaleString() }}</p>
                  </td>
                  <td class="px-8 py-4">
                    <span :class="['px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter', statusClass(order.status)]">
                      {{ order.status }}
                    </span>
                  </td>
                  <td class="px-8 py-4 text-right">
                    <p class="text-xs text-slate-500 font-medium">{{ new Date(order.createdAt).toLocaleDateString() }}</p>
                    <p class="text-[10px] text-slate-400">{{ new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination -->
          <div v-if="meta && meta.pages > 1" class="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between font-bold">
            <span class="text-sm text-slate-500">
              Showing <span class="text-slate-900">{{ meta.page * meta.limit - meta.limit + 1 }}</span> to 
              <span class="text-slate-900">{{ Math.min(meta.page * meta.limit, meta.total) }}</span> of 
              <span class="text-slate-900">{{ meta.total }}</span> entries
            </span>
            <div class="flex space-x-2">
              <button 
                @click="changePage(meta.page - 1)" 
                :disabled="!meta.hasPrevPage"
                class="px-3 py-1 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors text-xs"
              >
                Prev
              </button>
              <button 
                @click="changePage(meta.page + 1)" 
                :disabled="!meta.hasNextPage"
                class="px-3 py-1 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors text-xs"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

          <!-- Settings Tab -->
          <div v-else class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-8">
            <h3 class="text-xl font-black text-slate-900 italic tracking-tight mb-8">Membership Settings</h3>
            
            <form @submit.prevent="saveSettings" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Single Order Limit (₦)</label>
                  <input 
                    v-model="membershipSettings.orderThreshold" 
                    type="number"
                    class="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Spend Limit (₦)</label>
                  <input 
                    v-model="membershipSettings.monthlySpendLimit" 
                    type="number"
                    placeholder="No limit"
                    class="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Requests Limit</label>
                  <input 
                    v-model="membershipSettings.monthlyRequestsLimit" 
                    type="number"
                    placeholder="No limit"
                    class="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Requires Approval</label>
                  <div class="flex items-center space-x-4 h-[50px]">
                    <button 
                      type="button"
                      @click="membershipSettings.requiresApproval = !membershipSettings.requiresApproval"
                      :class="['w-12 h-6 rounded-full transition-all relative', membershipSettings.requiresApproval ? 'bg-primary-600' : 'bg-slate-200']"
                    >
                      <div :class="['w-4 h-4 bg-white rounded-full absolute top-1 transition-all', membershipSettings.requiresApproval ? 'right-1' : 'left-1']"></div>
                    </button>
                    <span class="text-sm font-bold text-slate-600">{{ membershipSettings.requiresApproval ? 'Yes' : 'No' }}</span>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Membership Status</label>
                  <div class="flex items-center space-x-4 h-[50px]">
                    <button 
                      type="button"
                      @click="toggleStatus"
                      :disabled="toggling"
                      :class="['w-12 h-6 rounded-full transition-all relative', membershipStatus === 'active' ? 'bg-emerald-500' : 'bg-rose-500']"
                    >
                      <div :class="['w-4 h-4 bg-white rounded-full absolute top-1 transition-all', membershipStatus === 'active' ? 'right-1' : 'left-1']"></div>
                    </button>
                    <span :class="['text-sm font-bold', membershipStatus === 'active' ? 'text-emerald-600' : 'text-rose-600']">
                      {{ membershipStatus === 'active' ? 'Active' : 'Suspended' }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="pt-6 border-t border-slate-100 flex justify-end">
                <button 
                  type="submit"
                  :disabled="saving"
                  class="px-8 py-3 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/25 disabled:opacity-50 flex items-center space-x-2"
                >
                  <span v-if="saving">Updating...</span>
                  <span v-else>Save Settings</span>
                </button>
              </div>
            </form>
          </div>
    </template>

    <div v-else class="py-24 text-center bg-rose-50 rounded-3xl border border-rose-100">
      <p class="text-rose-600 font-bold">Employee not found or access denied.</p>
      <router-link to="/partner/employees" class="mt-4 inline-block text-primary-600 font-bold underline">Back to Employees</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { PartnerPortalService, Employee } from '../../../services/partner-portal.service';

const route = useRoute();
const employeeId = route.params.id as string;

const employee = ref<Employee | null>(null);
const activities = ref<any[]>([]);
const totalOrders = ref(0);
const loading = ref(true);
const saving = ref(false);
const toggling = ref(false);
const activeTab = ref('overview');

// Pagination & Search
const searchQuery = ref('');
const statusFilter = ref('');
const meta = ref<any>(null);
const searchTimeout = ref<any>(null);

const membershipStatus = ref<'active' | 'suspended'>('active');
const membershipSettings = ref({
  orderThreshold: 20000,
  monthlySpendLimit: 0,
  monthlyRequestsLimit: 0,
  requiresApproval: true
});

const lifetimeSpend = ref(0);

const fetchData = async (page = 1) => {
  try {
    if (page === 1) loading.value = true;
    const [details, activityRes] = await Promise.all([
      PartnerPortalService.getEmployeeDetails(employeeId),
      PartnerPortalService.getEmployeeActivity(employeeId, { 
        page, 
        limit: 10,
        search: searchQuery.value,
        status: statusFilter.value
      })
    ]);
    employee.value = details;
    activities.value = activityRes.data || [];
    meta.value = activityRes.meta;
    totalOrders.value = activityRes.meta?.total || 0;
    lifetimeSpend.value = activityRes.meta?.lifetimeSpend || 0;
    
    // Initialize settings and status from membership
    if ((details as any).membership) {
      membershipStatus.value = (details as any).membership.status || 'active';
      if ((details as any).membership.settings) {
        membershipSettings.value = { 
          ...membershipSettings.value,
          ...(details as any).membership.settings 
        };
      }
    }
  } catch (error) {
    console.error('Failed to fetch employee details', error);
  } finally {
    loading.value = false;
  }
};

const changePage = (page: number) => {
  fetchData(page);
};

const handleSearch = () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    fetchData(1);
  }, 500);
};

const handleFilter = () => {
  fetchData(1);
};

const statusClass = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-amber-100 text-amber-600';
    case 'approved': return 'bg-emerald-100 text-emerald-600';
    case 'rejected': return 'bg-rose-100 text-rose-600';
    default: return 'bg-slate-100 text-slate-600';
  }
};

const saveSettings = async () => {
  try {
    saving.value = true;
    await PartnerPortalService.updateEmployeeSettings(employeeId, membershipSettings.value);
    await fetchData(); // Refresh data
    activeTab.value = 'overview'; // Go back to overview
  } catch (error) {
    console.error('Failed to save settings', error);
  } finally {
    saving.value = false;
  }
};

const toggleStatus = async () => {
  try {
    toggling.value = true;
    const newStatus = membershipStatus.value === 'active' ? 'suspended' : 'active';
    await PartnerPortalService.toggleEmployeeMembershipStatus(employeeId, newStatus);
    membershipStatus.value = newStatus;
  } catch (error) {
    console.error('Failed to toggle status', error);
  } finally {
    toggling.value = false;
  }
};

onMounted(fetchData);
</script>

<route lang="yaml">
meta:
  layout: partner
</route>
