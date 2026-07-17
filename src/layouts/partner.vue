<template>
  <div class="min-h-screen bg-slate-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-slate-900 flex flex-col flex-shrink-0">
      <!-- Logo -->
      <div class="px-5 pt-6 pb-4">
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span class="text-white font-black text-base leading-none">G</span>
          </div>
          <div class="min-w-0">
            <p class="text-white font-black text-sm leading-none">Genory</p>
            <p class="text-primary-400 text-[10px] font-semibold tracking-widest uppercase mt-0.5">HR Partner</p>
          </div>
        </div>
      </div>

      <!-- Company badge -->
      <div class="mx-3 mb-4 px-3 py-2.5 bg-white/5 rounded-xl border border-white/8">
        <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Company</p>
        <p class="text-white text-xs font-semibold truncate">{{ companyName || 'Your Company' }}</p>
        <span :class="['inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider', planType === 'postpaid' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400']">
          {{ planType === 'postpaid' ? 'Credit Plan' : 'Prepaid' }}
        </span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 space-y-0.5 overflow-y-auto">
        <!-- Main -->
        <p class="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-3 pt-2 pb-1.5">Main</p>

        <router-link
          to="/partner"
          class="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
          :class="$route.path === '/partner' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Dashboard</span>
        </router-link>

        <router-link
          v-if="can('canApproveOrders')"
          to="/partner/orders"
          class="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
          :class="$route.path.startsWith('/partner/orders') ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span>Order Approvals</span>
          <span v-if="pendingCount > 0" class="ml-auto bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">{{ pendingCount > 99 ? '99+' : pendingCount }}</span>
        </router-link>

        <router-link
          v-if="can('canManageEmployees')"
          to="/partner/employees"
          class="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
          :class="$route.path.startsWith('/partner/employees') ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Employees</span>
        </router-link>

        <!-- Finance -->
        <p v-if="can('canManageWallet') || can('canViewReports')" class="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-3 pt-4 pb-1.5">Finance</p>

        <router-link
          v-if="can('canManageWallet')"
          to="/partner/funding"
          class="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
          :class="$route.path.startsWith('/partner/funding') ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span>{{ planType === 'postpaid' ? 'Spending Ledger' : 'Wallet & Funding' }}</span>
        </router-link>

        <router-link
          v-if="can('canManageWallet')"
          to="/partner/earnings"
          class="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
          :class="$route.path.startsWith('/partner/earnings') ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Cashback</span>
        </router-link>

        <router-link
          v-if="can('canViewReports')"
          to="/partner/reports"
          class="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
          :class="$route.path.startsWith('/partner/reports') ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Reports & Billing</span>
        </router-link>

        <!-- Admin -->
        <p v-if="can('canManageTeam') || can('canManageSettings')" class="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-3 pt-4 pb-1.5">Admin</p>

        <router-link
          v-if="can('canManageTeam')"
          to="/partner/team"
          class="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
          :class="$route.path.startsWith('/partner/team') ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>Portal Team</span>
        </router-link>

        <router-link
          v-if="can('canManageSettings')"
          to="/partner/settings"
          class="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
          :class="$route.path.startsWith('/partner/settings') ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Configuration</span>
        </router-link>
      </nav>

      <!-- User Footer -->
      <div class="p-3 border-t border-white/8">
        <div class="flex items-center space-x-3 px-2 py-2.5">
          <div class="w-8 h-8 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center font-bold text-primary-400 text-xs flex-shrink-0 uppercase">
            {{ userName[0] || 'U' }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white text-xs font-semibold truncate">{{ userName }}</p>
            <p class="text-slate-500 text-[10px] truncate">{{ isStaff ? 'Staff Member' : 'Partner Admin' }}</p>
          </div>
          <button @click="logout" title="Sign out" class="p-1.5 text-slate-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-white/5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-screen overflow-hidden">
      <!-- Top bar -->
      <header class="bg-white border-b border-slate-200 px-8 h-14 flex items-center justify-between flex-shrink-0">
        <div class="flex items-center space-x-2 text-sm">
          <span class="text-slate-400">Partner Portal</span>
          <svg class="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="font-semibold text-slate-800">{{ $route.name || 'Dashboard' }}</span>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-1.5">
            <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">All systems operational</span>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-6 bg-slate-100">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService, type IStaffPermissions } from '../services/admin/auth.service';
import { PartnerPortalService } from '../services/partner-portal.service';

const router = useRouter();
const planType = ref<string>('prepaid');
const companyName = ref('');
const userName = ref('');
const isStaff = ref(false);
const pendingCount = ref(0);
const perms = ref<Partial<IStaffPermissions>>({});

const can = (permission: keyof IStaffPermissions) => {
  if (!isStaff.value) return true;
  return !!perms.value[permission];
};

onMounted(async () => {
  const token = AuthService.getToken();
  if (!token) { router.push('/login'); return; }

  const user = AuthService.getUser();
  if (!user?.partner) { router.push('/admin'); return; }
  if (user.mustChangePassword) { router.push('/change-password'); return; }

  const roleKey = (user.role as any)?.key ?? user.role;
  isStaff.value = roleKey === 'staff';
  perms.value = user.staffPermissions ?? {};
  userName.value = user.firstName || 'User';

  try {
    const stats = await PartnerPortalService.getStats();
    planType.value = stats.planType;
    companyName.value = stats.companyName || '';
    if (can('canApproveOrders')) {
      pendingCount.value = stats.pendingOrders || 0;
    }
  } catch (e) {
    console.error('Failed to load layout stats', e);
  }
});

const logout = () => {
  AuthService.logout();
  router.push('/login');
};
</script>

