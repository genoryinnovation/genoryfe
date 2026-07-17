<template>
  <div class="space-y-5">

    <!-- Back nav -->
    <router-link to="/partner/team" class="inline-flex items-center space-x-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors font-medium">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span>Portal Team</span>
    </router-link>

    <!-- Loading -->
    <div v-if="loading" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 flex flex-col items-center justify-center">
      <svg class="animate-spin h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="mt-3 text-sm text-slate-400">Loading profile…</p>
    </div>

    <!-- Not found -->
    <div v-else-if="!admin" class="bg-rose-50 border border-rose-100 rounded-2xl p-12 text-center">
      <p class="text-rose-600 font-semibold">Team member not found or access denied.</p>
      <router-link to="/partner/team" class="mt-3 inline-block text-sm font-semibold text-primary-600 hover:underline">Back to Team</router-link>
    </div>

    <template v-else>
      <!-- Profile hero card -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <!-- Tinted top strip -->
        <div class="h-2 w-full" :class="admin.status === 'suspended' ? 'bg-rose-400' : admin.status === 'pending' ? 'bg-amber-400' : 'bg-primary-500'"></div>

        <div class="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-5">
          <!-- Avatar -->
          <div class="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-500 text-xl flex-shrink-0 uppercase">
            {{ admin.firstName[0] }}{{ admin.lastName[0] }}
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <h1 class="text-lg font-bold text-slate-900">{{ admin.firstName }} {{ admin.lastName }}</h1>
              <span :class="[
                'px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest',
                admin.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                admin.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                admin.status === 'suspended' ? 'bg-rose-100 text-rose-700' :
                'bg-slate-100 text-slate-500'
              ]">{{ admin.status }}</span>
              <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                {{ (admin.role as any)?.name || 'Staff' }}
              </span>
            </div>
            <p class="text-sm text-slate-500 mt-0.5">{{ admin.email }}</p>
            <p class="text-xs text-slate-400 mt-1">Member since {{ new Date(admin.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 flex-shrink-0" v-if="admin.status !== 'revoked' && (admin.role as any)?.key !== 'partner'">
            <button
              v-if="admin.status === 'pending'"
              @click="handleResend"
              :disabled="resending"
              class="px-4 py-2 text-sm font-semibold border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              {{ resending ? 'Sending…' : 'Resend Invite' }}
            </button>
            <button
              @click="handleToggleSuspension"
              :disabled="suspending"
              :class="[
                'px-4 py-2 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50',
                admin.status === 'suspended'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-900 text-white hover:bg-slate-700'
              ]"
            >
              {{ suspending ? 'Updating…' : admin.status === 'suspended' ? 'Reactivate' : 'Suspend' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Stats row -->
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Activity Logs</p>
          <p class="text-2xl font-black text-slate-900 mt-1">{{ activity.length }}</p>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Permissions</p>
          <p class="text-2xl font-black text-slate-900 mt-1">{{ activePermissionsCount }}<span class="text-sm font-semibold text-slate-400">/6</span></p>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account Age</p>
          <p class="text-2xl font-black text-slate-900 mt-1">{{ accountAgeDays }}<span class="text-sm font-semibold text-slate-400">d</span></p>
        </div>
      </div>

      <!-- Permissions + Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-5">

        <!-- Permissions panel -->
        <div v-if="(admin.role as any)?.key === 'staff'" class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 class="text-sm font-bold text-slate-900">Permissions</h2>
              <p class="text-[11px] text-slate-400 mt-0.5">Controls what this member can access</p>
            </div>
            <transition name="fade">
              <span v-if="permissionsSaved" class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Saved</span>
            </transition>
          </div>

          <div class="divide-y divide-slate-50">
            <div
              v-for="perm in permissionOptions"
              :key="perm.key"
              class="flex items-center px-5 py-3.5 gap-3"
            >
              <!-- Icon -->
              <div :class="['w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', permissions[perm.key] ? perm.activeIconBg : 'bg-slate-100']">
                <svg :class="['w-4 h-4', permissions[perm.key] ? perm.activeIconColor : 'text-slate-400']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" :d="perm.icon" />
                </svg>
              </div>
              <!-- Label -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-slate-800 leading-tight">{{ perm.label }}</p>
                <p class="text-[11px] text-slate-400 leading-tight mt-0.5">{{ perm.description }}</p>
              </div>
              <!-- Toggle -->
              <button
                type="button"
                :disabled="savingPermissions"
                @click="togglePermission(perm.key)"
                :class="[
                  'relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 disabled:opacity-50 focus:outline-none',
                  permissions[perm.key] ? 'bg-primary-500' : 'bg-slate-200'
                ]"
              >
                <span :class="['inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200', permissions[perm.key] ? 'translate-x-4' : 'translate-x-0']"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Activity History -->
        <div :class="(admin.role as any)?.key === 'staff' ? 'lg:col-span-3' : 'lg:col-span-5'" class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-slate-100">
            <h2 class="text-sm font-bold text-slate-900">Activity History</h2>
            <p class="text-[11px] text-slate-400 mt-0.5">Actions performed by this member on the portal</p>
          </div>

          <!-- Empty -->
          <div v-if="activity.length === 0" class="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-sm font-semibold text-slate-500">No activity yet</p>
            <p class="text-xs text-slate-400 mt-1">Logs will appear here once this member takes actions</p>
          </div>

          <!-- Timeline -->
          <div v-else class="divide-y divide-slate-50 max-h-[520px] overflow-y-auto">
            <div
              v-for="log in activity"
              :key="log._id"
              class="flex items-start gap-3 px-5 py-4 hover:bg-slate-50/60 transition-colors"
            >
              <div :class="['w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5', actionStyle(log.action).bg]">
                <svg :class="['w-3.5 h-3.5', actionStyle(log.action).color]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="actionStyle(log.action).icon" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-slate-800 capitalize leading-tight">{{ log.action.replace(/_/g, ' ').toLowerCase() }}</p>
                <p class="text-[11px] text-slate-400 mt-0.5">
                  {{ log.entityType }}
                  <span v-if="log.entityId" class="font-mono text-slate-300"> · {{ log.entityId.toString().slice(-8) }}</span>
                </p>
              </div>
              <span class="text-[10px] font-medium text-slate-400 flex-shrink-0 mt-0.5">
                {{ formatDate(log.createdAt) }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { PartnerPortalService } from '../../../services/partner-portal.service';

const route = useRoute();
const adminId = route.params.id as string;

const admin = ref<any>(null);
const activity = ref<any[]>([]);
const loading = ref(true);
const suspending = ref(false);
const resending = ref(false);
const savingPermissions = ref(false);
const permissionsSaved = ref(false);

const permissionOptions = [
  {
    key: 'canApproveOrders',
    label: 'Approve Orders',
    description: 'Review and approve HR Pay requests',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    activeIconBg: 'bg-amber-50',
    activeIconColor: 'text-amber-500',
  },
  {
    key: 'canManageEmployees',
    label: 'Manage Employees',
    description: 'Invite and manage employee accounts',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    activeIconBg: 'bg-violet-50',
    activeIconColor: 'text-violet-500',
  },
  {
    key: 'canManageTeam',
    label: 'Manage Team',
    description: 'Invite and manage portal team members',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    activeIconBg: 'bg-indigo-50',
    activeIconColor: 'text-indigo-500',
  },
  {
    key: 'canManageWallet',
    label: 'Wallet & Funding',
    description: 'View wallet, fund account, track cashback',
    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
    activeIconBg: 'bg-primary-50',
    activeIconColor: 'text-primary-500',
  },
  {
    key: 'canViewReports',
    label: 'View Reports & Billing',
    description: 'View monthly reports and export data',
    icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    activeIconBg: 'bg-slate-100',
    activeIconColor: 'text-slate-600',
  },
  {
    key: 'canManageSettings',
    label: 'Manage Settings',
    description: 'Update company settings and approval PIN',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    activeIconBg: 'bg-rose-50',
    activeIconColor: 'text-rose-500',
  },
];

const permissions = ref<Record<string, boolean>>({
  canApproveOrders: false,
  canManageEmployees: false,
  canManageTeam: false,
  canManageWallet: false,
  canViewReports: false,
  canManageSettings: false,
});

const activePermissionsCount = computed(() =>
  Object.values(permissions.value).filter(Boolean).length
);

const accountAgeDays = computed(() => {
  if (!admin.value?.createdAt) return 0;
  return Math.floor((Date.now() - new Date(admin.value.createdAt).getTime()) / 86400000);
});

const actionStyle = (action: string) => {
  const a = action.toLowerCase();
  if (a.includes('approve') || a.includes('activate')) return { bg: 'bg-emerald-50', color: 'text-emerald-500', icon: 'M5 13l4 4L19 7' };
  if (a.includes('reject') || a.includes('suspend') || a.includes('revoke')) return { bg: 'bg-rose-50', color: 'text-rose-500', icon: 'M6 18L18 6M6 6l12 12' };
  if (a.includes('invite') || a.includes('create')) return { bg: 'bg-primary-50', color: 'text-primary-500', icon: 'M12 4v16m8-8H4' };
  if (a.includes('update') || a.includes('edit') || a.includes('permission')) return { bg: 'bg-amber-50', color: 'text-amber-500', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' };
  return { bg: 'bg-slate-100', color: 'text-slate-400', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' };
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const fetchData = async () => {
  try {
    loading.value = true;
    const [detailsData, activityData] = await Promise.all([
      PartnerPortalService.getTeamMemberDetails(adminId),
      PartnerPortalService.getTeamMemberActivity(adminId),
    ]);
    admin.value = detailsData;
    activity.value = activityData;
    if (detailsData.staffPermissions) {
      permissions.value = { ...detailsData.staffPermissions };
    }
  } catch (err) {
    console.error('Failed to load team member', err);
  } finally {
    loading.value = false;
  }
};

const togglePermission = async (key: string) => {
  const k = key as keyof typeof permissions.value;
  permissions.value[k] = !permissions.value[k];
  try {
    savingPermissions.value = true;
    await PartnerPortalService.updateTeamMemberPermissions(adminId, permissions.value);
    permissionsSaved.value = true;
    setTimeout(() => { permissionsSaved.value = false; }, 2000);
  } catch (err: any) {
    permissions.value[k] = !permissions.value[k];
    alert(err.response?.data?.message || 'Failed to update permissions');
  } finally {
    savingPermissions.value = false;
  }
};

const handleToggleSuspension = async () => {
  const isSuspended = admin.value.status === 'suspended';
  if (!confirm(`${isSuspended ? 'Reactivate' : 'Suspend'} ${admin.value.firstName}?`)) return;
  try {
    suspending.value = true;
    await PartnerPortalService.toggleTeamMemberSuspension(adminId);
    await fetchData();
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to update status');
  } finally {
    suspending.value = false;
  }
};

const handleResend = async () => {
  try {
    resending.value = true;
    await PartnerPortalService.resendTeamInvitation(adminId);
    alert('Invitation resent successfully.');
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to resend invitation');
  } finally {
    resending.value = false;
  }
};

onMounted(fetchData);
</script>

<route lang="yaml">
meta:
  layout: partner
</route>
