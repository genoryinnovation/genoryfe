<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <router-link 
          to="/partner/team" 
          class="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </router-link>
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Team Member Profile</h1>
          <p class="text-slate-500 text-sm">View details and activity for this staff member.</p>
        </div>
      </div>
      
      <div class="flex items-center space-x-3">
        <button 
          v-if="admin?.status !== 'revoked' && (admin?.role as any)?.key !== 'partner'"
          @click="handleToggleSuspension"
          :disabled="suspending"
          :class="[
            'px-6 py-2 rounded-xl font-bold transition-all shadow-lg',
            admin?.status === 'suspended' 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/25' 
              : 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/25'
          ]"
        >
          {{ suspending ? 'Processing...' : (admin?.status === 'suspended' ? 'Activate Admin' : 'Suspend Admin') }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm">
      <svg class="animate-spin h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="mt-4 text-slate-400 font-medium">Loading profile...</p>
    </div>

    <template v-else-if="admin">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profile Sidebar -->
        <div class="space-y-6">
          <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-400 text-3xl mx-auto mb-6">
              {{ admin.firstName[0] }}{{ admin.lastName[0] }}
            </div>
            <h2 class="text-2xl font-black text-slate-900 italic tracking-tight">{{ admin.firstName }} {{ admin.lastName }}</h2>
            <p class="text-slate-500 font-medium">{{ admin.email }}</p>
            
            <div class="mt-6 pt-6 border-t border-slate-100 space-y-4">
              <div class="flex justify-between items-center text-sm">
                <span class="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Role</span>
                <span class="px-3 py-1 bg-slate-100 text-slate-600 font-bold rounded-lg uppercase text-[10px]">
                  {{ (admin.role as any)?.name || 'Staff' }}
                </span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Status</span>
                <span :class="[
                  'px-3 py-1 font-bold rounded-lg uppercase text-[10px]',
                  admin.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 
                  admin.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                  admin.status === 'suspended' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
                ]">
                  {{ admin.status }}
                </span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Added</span>
                <span class="text-slate-700 font-bold">{{ new Date(admin.createdAt).toLocaleDateString() }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Info/Stats (Placeholder for future metrics) -->
          <div class="bg-slate-900 p-8 rounded-3xl text-white overflow-hidden relative group">
             <div class="relative z-10">
                <h3 class="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 italic">Quick Overview</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-2xl font-black italic">{{ activity.length }}</p>
                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Logs Found</p>
                  </div>
                </div>
             </div>
             <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>
        </div>

        <!-- Activity Logs -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
            <div class="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 class="text-xl font-black text-slate-900 italic tracking-tight">Activity History</h3>
            </div>
            
            <div class="divide-y divide-slate-50">
              <div v-if="activity.length === 0" class="p-12 text-center text-slate-400">
                No activity logs found for this member.
              </div>
              <div 
                v-for="log in activity" 
                :key="log._id"
                class="p-6 hover:bg-slate-50/50 transition-colors flex items-start space-x-4"
              >
                <div class="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 flex-shrink-0 border border-slate-100">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start">
                    <p class="text-slate-900 font-bold group-hover:text-primary-600 transition-colors capitalize">
                      {{ log.action.replace(/_/g, ' ').toLowerCase() }}
                    </p>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter bg-slate-100 px-2 py-1 rounded">
                      {{ new Date(log.createdAt).toLocaleString() }}
                    </span>
                  </div>
                  <p class="text-xs text-slate-500 mt-1">
                    Entity: <span class="text-slate-700 font-medium">{{ log.entityType }}</span> 
                    <template v-if="log.entityId">
                       | ID: <span class="text-slate-700 font-medium">{{ log.entityId }}</span>
                    </template>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="py-24 text-center bg-rose-50 rounded-3xl border border-rose-100">
      <p class="text-rose-600 font-bold">Team member not found or access denied.</p>
      <router-link to="/partner/team" class="mt-4 inline-block text-primary-600 font-bold underline">Back to Team</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { PartnerPortalService } from '../../../services/partner-portal.service';

const route = useRoute();
const adminId = route.params.id as string;

const admin = ref<any>(null);
const activity = ref<any[]>([]);
const loading = ref(true);
const suspending = ref(false);

const fetchData = async () => {
  try {
    loading.value = true;
    const [detailsData, activityData] = await Promise.all([
      PartnerPortalService.getTeamMemberDetails(adminId),
      PartnerPortalService.getTeamMemberActivity(adminId)
    ]);
    admin.value = detailsData;
    activity.value = activityData;
  } catch (error) {
    console.error('Failed to fetch team member data', error);
  } finally {
    loading.value = false;
  }
};

const handleToggleSuspension = async () => {
  const action = admin.value.status === 'suspended' ? 'activate' : 'suspend';
  if (!confirm(`Are you sure you want to ${action} this staff member?`)) return;

  try {
    suspending.value = true;
    await PartnerPortalService.toggleTeamMemberSuspension(adminId);
    await fetchData();
  } catch (error: any) {
    console.error('Failed to toggle suspension', error);
    alert(error.response?.data?.message || 'Failed to update status');
  } finally {
    suspending.value = false;
  }
};

onMounted(fetchData);
</script>

<route lang="yaml">
meta:
  layout: partner
</route>
