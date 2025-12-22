<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div class="bg-gradient-to-r from-primary-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
      <h1 class="text-3xl font-bold">Welcome back, {{ adminName }}!</h1>
      <p class="mt-2 text-primary-100 opacity-90">Here's what's happening with your company account today.</p>
      
      <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-4">
          <p class="text-xs text-primary-100 uppercase tracking-wider font-semibold">Total Employees</p>
          <p class="text-2xl font-bold mt-1">{{ stats.employeeCount }}</p>
        </div>
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-4">
          <p class="text-xs text-primary-100 uppercase tracking-wider font-semibold">Pending Orders</p>
          <p class="text-2xl font-bold mt-1">{{ stats.pendingOrders }}</p>
        </div>
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <p class="text-[10px] text-primary-100 uppercase tracking-widest font-bold">Wallet Balance</p>
          <p class="text-2xl font-black mt-1 text-white">₦{{ stats.walletBalance.toLocaleString() }}</p>
        </div>
        <div class="bg-primary-500/50 backdrop-blur-md rounded-xl p-4 border border-white/20 ring-4 ring-white/5">
          <p class="text-[10px] text-white uppercase tracking-widest font-black">This Month's Spend</p>
          <p class="text-2xl font-black mt-1 text-white">₦{{ stats.monthSpend.toLocaleString() }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Orders List -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
        <div class="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 class="font-bold text-slate-900">Recent Employee Activity</h3>
          <router-link to="/partner/orders" class="text-sm text-primary-600 font-medium hover:underline">View All</router-link>
        </div>
        <div class="p-6 space-y-6">
           <div v-if="recentOrders.length === 0" class="text-center py-8 text-slate-500 text-sm">
             No recent activity found.
           </div>
           <div v-for="req in recentOrders" :key="req._id" class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold uppercase">
                   {{ req.user?.firstName?.[0] || 'U' }}
                </div>
                <div>
                  <p class="font-medium text-slate-900">{{ req.order?.orderNumber || 'Order' }} by {{ req.user?.firstName }}</p>
                  <p class="text-xs text-slate-500">{{ new Date(req.createdAt).toLocaleTimeString() }} • Ref: #{{ req.order?.orderNumber?.slice(-8).toUpperCase() || 'ORD' }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-slate-900">₦{{ req.amount.toLocaleString() }}</p>
                <span 
                  :class="[
                    'text-[10px] uppercase font-bold px-1.5 py-0.5 rounded',
                    req.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 
                    req.status === 'rejected' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                  ]"
                >
                  {{ req.status }}
                </span>
              </div>
           </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="space-y-6">
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 class="font-bold text-slate-900 mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <button @click="$router.push('/partner/employees')" class="w-full flex items-center px-4 py-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-slate-700 font-medium">
              <svg class="w-5 h-5 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Add New Employee
            </button>
            <button @click="$router.push('/partner/wallet')" class="w-full flex items-center px-4 py-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-slate-700 font-medium">
              <svg class="w-5 h-5 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Fund Company Wallet
            </button>
          </div>
        </div>

        <!-- System Status -->
        <div class="bg-emerald-50 rounded-xl border border-emerald-100 p-6">
           <div class="flex items-center mb-3">
             <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
             <p class="text-sm font-bold text-emerald-800">Operational</p>
           </div>
           <p class="text-xs text-emerald-700">All systems are running smoothly. Automatic approvals are currently active.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AuthService } from '../../services/admin/auth.service';
import { PartnerPortalService } from '../../services/partner-portal.service';

const adminName = ref('Admin');
const stats = ref({
  employeeCount: 0,
  pendingOrders: 0,
  walletBalance: 0,
  todaySpend: 0,
  monthSpend: 0
});
const recentOrders = ref<any[]>([]);
const loading = ref(true);

const fetchDashboardData = async () => {
  try {
    loading.value = true;
    const [statsData, ordersData] = await Promise.all([
      PartnerPortalService.getStats(),
      PartnerPortalService.getOrderRequests({ limit: 5 })
    ]);
    stats.value = statsData;
    recentOrders.value = ordersData.data;
  } catch (error) {
    console.error('Failed to fetch dashboard data', error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const user = AuthService.getUser();
  if (user) {
    adminName.value = user.firstName;
  }
  await fetchDashboardData();
});
</script>

<route lang="yaml">
meta:
  layout: partner
</route>
