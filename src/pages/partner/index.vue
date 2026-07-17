<template>
  <div class="space-y-6">

    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-slate-900">Good {{ greeting }}, {{ adminName }}</h1>
        <p class="text-sm text-slate-500 mt-0.5">{{ today }} · {{ companyName }}</p>
      </div>
      <div v-if="stats.planType" :class="['px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest', stats.planType === 'postpaid' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700']">
        {{ stats.planType === 'postpaid' ? 'Credit Plan' : 'Prepaid Plan' }}
      </div>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">

      <!-- Employees -->
      <div v-if="can('canManageEmployees')" class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Employees</p>
          <div class="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
            <svg class="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <p class="text-2xl font-black text-slate-900">{{ loading ? '—' : stats.employeeCount }}</p>
        <router-link to="/partner/employees" class="mt-2 text-[11px] font-semibold text-violet-600 hover:text-violet-700 flex items-center">
          Manage <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </router-link>
      </div>

      <!-- Pending Orders -->
      <div v-if="can('canApproveOrders')" class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending</p>
          <div class="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
            <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div class="flex items-end space-x-2">
          <p class="text-2xl font-black text-slate-900">{{ loading ? '—' : stats.pendingOrders }}</p>
          <span v-if="!loading && stats.pendingOrders > 0" class="mb-0.5 text-[10px] font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">needs action</span>
        </div>
        <router-link to="/partner/orders" class="mt-2 text-[11px] font-semibold text-amber-600 hover:text-amber-700 flex items-center">
          Review <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </router-link>
      </div>

      <!-- Wallet / Amount Owed -->
      <div v-if="can('canManageWallet')" class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">{{ stats.planType === 'postpaid' ? 'Amount Owed' : 'Balance' }}</p>
          <div :class="['w-8 h-8 rounded-xl flex items-center justify-center', stats.planType === 'postpaid' ? 'bg-rose-50' : 'bg-primary-50']">
            <svg :class="['w-4 h-4', stats.planType === 'postpaid' ? 'text-rose-500' : 'text-primary-500']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        </div>
        <p class="text-2xl font-black text-slate-900">
          {{ loading ? '—' : '₦' + (stats.planType === 'postpaid' ? Math.abs(stats.walletBalance) : stats.walletBalance).toLocaleString() }}
        </p>
        <!-- Credit usage bar for postpaid -->
        <div v-if="!loading && stats.planType === 'postpaid' && stats.paymentSettings?.monthlyLimit" class="mt-2">
          <div class="h-1 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full bg-rose-400 rounded-full transition-all duration-700" :style="{ width: Math.min(100, (Math.abs(stats.walletBalance) / stats.paymentSettings.monthlyLimit) * 100) + '%' }"></div>
          </div>
          <p class="text-[10px] text-slate-400 mt-1">of ₦{{ stats.paymentSettings.monthlyLimit.toLocaleString() }} limit</p>
        </div>
        <router-link v-else-if="!loading" to="/partner/funding" class="mt-2 text-[11px] font-semibold text-primary-600 hover:text-primary-700 flex items-center">
          {{ stats.planType === 'postpaid' ? 'View ledger' : 'Fund wallet' }} <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </router-link>
      </div>

      <!-- Month Spend -->
      <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Month Spend</p>
          <div class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <p class="text-2xl font-black text-slate-900">{{ loading ? '—' : '₦' + stats.monthSpend.toLocaleString() }}</p>
        <p class="mt-2 text-[11px] text-slate-400">{{ new Date().toLocaleString('default', { month: 'long' }) }} total</p>
      </div>

      <!-- Cashback (conditional) -->
      <div v-if="!loading && stats.earningsSettings?.enabled" class="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <p class="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Cashback</p>
          <div class="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
            <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-2xl font-black text-emerald-800">₦{{ (stats.earningsBalance || 0).toLocaleString() }}</p>
        <router-link to="/partner/earnings" class="mt-2 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center">
          View cashback <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </router-link>
      </div>
    </div>

    <!-- Bottom section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Recent order requests -->
      <div v-if="can('canApproveOrders')" class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 class="font-bold text-slate-900 text-sm">Recent Requests</h2>
            <p class="text-[11px] text-slate-400 mt-0.5">Latest HR Pay order submissions</p>
          </div>
          <router-link to="/partner/orders" class="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center">
            View all <svg class="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </router-link>
        </div>

        <div v-if="loading" class="divide-y divide-slate-50">
          <div v-for="i in 4" :key="i" class="px-6 py-4 flex items-center space-x-3">
            <div class="w-8 h-8 rounded-full bg-slate-100 animate-pulse flex-shrink-0"></div>
            <div class="flex-1 space-y-1.5">
              <div class="h-3 bg-slate-100 rounded animate-pulse w-2/3"></div>
              <div class="h-2.5 bg-slate-50 rounded animate-pulse w-1/3"></div>
            </div>
            <div class="h-3 bg-slate-100 rounded animate-pulse w-16"></div>
          </div>
        </div>

        <div v-else-if="recentOrders.length === 0" class="px-6 py-12 text-center">
          <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p class="text-sm font-medium text-slate-500">No recent requests</p>
          <p class="text-xs text-slate-400 mt-1">Employee orders will appear here</p>
        </div>

        <div v-else class="divide-y divide-slate-50">
          <router-link
            v-for="req in recentOrders"
            :key="req._id"
            :to="`/partner/orders/${req._id}`"
            class="px-6 py-4 flex items-center space-x-3 hover:bg-slate-50/60 transition-colors group"
          >
            <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs flex-shrink-0 uppercase">
              {{ req.user?.firstName?.[0] || 'U' }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-slate-900 truncate">{{ req.user?.firstName }} {{ req.user?.lastName }}</p>
              <p class="text-[11px] text-slate-400 truncate">{{ req.order?.orderNumber }} · {{ new Date(req.createdAt).toLocaleDateString() }}</p>
            </div>
            <div class="text-right flex-shrink-0">
              <p class="text-sm font-black text-slate-900">₦{{ req.amount.toLocaleString() }}</p>
              <span :class="['text-[9px] uppercase font-black px-1.5 py-0.5 rounded-full', req.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : req.status === 'rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700']">
                {{ req.status }}
              </span>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Right column -->
      <div class="space-y-4">

        <!-- Quick navigate cards -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-slate-100">
            <h2 class="font-bold text-slate-900 text-sm">Quick Access</h2>
          </div>
          <div class="p-3 space-y-1">
            <router-link
              v-if="can('canManageEmployees')"
              to="/partner/employees"
              class="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div class="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
                <svg class="w-3.5 h-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <span class="text-sm font-medium text-slate-700 group-hover:text-slate-900">Add Employee</span>
              <svg class="w-3.5 h-3.5 text-slate-300 ml-auto group-hover:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </router-link>

            <router-link
              v-if="can('canManageWallet') && stats.planType !== 'postpaid'"
              to="/partner/funding"
              class="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div class="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                <svg class="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span class="text-sm font-medium text-slate-700 group-hover:text-slate-900">Fund Wallet</span>
              <svg class="w-3.5 h-3.5 text-slate-300 ml-auto group-hover:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </router-link>

            <router-link
              v-if="can('canViewReports')"
              to="/partner/reports"
              class="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div class="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span class="text-sm font-medium text-slate-700 group-hover:text-slate-900">Billing Reports</span>
              <svg class="w-3.5 h-3.5 text-slate-300 ml-auto group-hover:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </router-link>

            <router-link
              v-if="can('canManageTeam')"
              to="/partner/team"
              class="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div class="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <svg class="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span class="text-sm font-medium text-slate-700 group-hover:text-slate-900">Manage Team</span>
              <svg class="w-3.5 h-3.5 text-slate-300 ml-auto group-hover:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </router-link>

            <router-link
              v-if="can('canManageSettings')"
              to="/partner/settings"
              class="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div class="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span class="text-sm font-medium text-slate-700 group-hover:text-slate-900">Configuration</span>
              <svg class="w-3.5 h-3.5 text-slate-300 ml-auto group-hover:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </router-link>
          </div>
        </div>

        <!-- Auto-approval status -->
        <div v-if="!loading" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div class="flex items-center space-x-3">
            <div :class="['w-2 h-2 rounded-full flex-shrink-0', stats.paymentSettings?.autoApprovalEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300']"></div>
            <div>
              <p class="text-xs font-bold text-slate-900">Auto-approval {{ stats.paymentSettings?.autoApprovalEnabled ? 'on' : 'off' }}</p>
              <p class="text-[11px] text-slate-400 mt-0.5">
                <template v-if="stats.paymentSettings?.autoApprovalEnabled">
                  Orders under ₦{{ (stats.paymentSettings?.autoApprovalThreshold || 0).toLocaleString() }} are approved instantly
                </template>
                <template v-else>
                  All orders require manual review
                </template>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { AuthService } from '../../services/admin/auth.service';
import { PartnerPortalService } from '../../services/partner-portal.service';

const adminName = ref('');
const companyName = ref('');
const stats = ref<any>({
  employeeCount: 0,
  pendingOrders: 0,
  walletBalance: 0,
  monthSpend: 0,
  planType: 'prepaid',
  paymentSettings: null,
  earningsSettings: null,
  earningsBalance: 0,
});
const recentOrders = ref<any[]>([]);
const loading = ref(true);

const user = AuthService.getUser();
const roleKey = (user?.role as any)?.key ?? user?.role;
const isStaff = roleKey === 'staff';
const perms = user?.staffPermissions;

const can = (p: keyof NonNullable<typeof perms>) => {
  if (!isStaff) return true;
  return !!perms?.[p];
};

const greeting = computed(() => {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
});

const today = computed(() =>
  new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
);

const fetchData = async () => {
  try {
    loading.value = true;
    const promises: Promise<any>[] = [PartnerPortalService.getStats()];
    if (can('canApproveOrders')) {
      promises.push(PartnerPortalService.getOrderRequests({ limit: 5 }));
    }
    const [statsData, ordersData] = await Promise.all(promises);
    stats.value = statsData;
    companyName.value = statsData.companyName || '';
    if (ordersData) recentOrders.value = ordersData.data;
  } catch (err) {
    console.error('Dashboard fetch error', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (user) adminName.value = user.firstName || 'there';
  fetchData();
});
</script>

<route lang="yaml">
meta:
  layout: partner
</route>
