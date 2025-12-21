<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Portal Access (Team)</h1>
        <p class="text-slate-500">Manage who has access to your company's partner portal.</p>
      </div>
      <div class="flex space-x-3">
        <div class="relative">
          <input 
            v-model="searchQuery" 
            @input="handleSearch"
            type="text" 
            placeholder="Search members..." 
            class="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none w-64 transition-all"
          />
          <svg class="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button 
          @click="showInviteModal = true"
          class="px-6 py-2 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/25"
        >
          Invite Member
        </button>
      </div>
    </div>

    <!-- Team List Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative min-h-[400px]">
       <div v-if="loading" class="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-10 transition-all">
        <svg class="animate-spin h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <table class="w-full text-left">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-100">
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Member</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Added</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="team.length === 0 && !loading">
            <td colspan="4" class="px-6 py-12 text-center text-slate-400">
              No team members found. Invite your first team member!
            </td>
          </tr>
          <tr v-for="member in team" :key="member._id" class="hover:bg-slate-50/50 transition-colors group">
            <td class="px-6 py-4">
              <router-link :to="`/partner/team/${member._id}`" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div class="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 text-xs">
                  {{ member.firstName[0] }}{{ member.lastName[0] }}
                </div>
                <div>
                  <p class="font-bold text-slate-900">{{ member.firstName }} {{ member.lastName }}</p>
                  <p class="text-xs text-slate-500">{{ member.email }}</p>
                </div>
              </router-link>
            </td>
            <td class="px-6 py-4">
              <span class="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-md uppercase tracking-wider">
                {{ member.role?.name || 'Staff' }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span v-if="member.status === 'active'" class="flex items-center space-x-1">
                <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span class="text-xs font-medium text-emerald-600">Active</span>
              </span>
              <span v-else-if="member.status === 'pending'" class="flex items-center space-x-1">
                <span class="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                <span class="text-xs font-medium text-amber-600">Pending</span>
              </span>
              <span v-else-if="member.status === 'revoked'" class="flex items-center space-x-1">
                <span class="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                <span class="text-xs font-medium text-rose-600">Revoked</span>
              </span>
              <span v-else class="flex items-center space-x-1">
                <span class="w-1.5 h-1.5 bg-slate-500 rounded-full"></span>
                <span class="text-xs font-medium text-slate-600">{{ member.isActive ? 'Active' : 'Inactive' }}</span>
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center justify-end space-x-2">
                <button 
                  v-if="member.status === 'pending' || member.status === 'revoked'"
                  @click="handleResend(member._id)"
                  :disabled="processingId === member._id"
                  class="text-xs font-bold text-primary-600 hover:text-primary-700 disabled:opacity-50 transition-colors"
                >
                  {{ processingId === member._id ? 'Sending...' : 'Reinvite' }}
                </button>
                <button 
                  v-if="member.status !== 'revoked' && member.role?.key !== 'partner'"
                  @click="handleRevoke(member._id)"
                  :disabled="processingId === member._id"
                  class="text-xs font-bold text-rose-600 hover:text-rose-700 disabled:opacity-50 transition-colors"
                >
                  Revoke
                </button>
                <p class="text-[10px] text-slate-400 font-medium ml-4">{{ new Date(member.createdAt).toLocaleDateString() }}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div v-if="meta && meta.pages > 1" class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between font-bold">
        <span class="text-sm text-slate-500">
          Showing <span class="text-slate-900">{{ meta.page * meta.limit - meta.limit + 1 }}</span> to 
          <span class="text-slate-900">{{ Math.min(meta.page * meta.limit, meta.total) }}</span> of 
          <span class="text-slate-900">{{ meta.total }}</span> entries
        </span>
        <div class="flex space-x-2">
          <button 
            @click="changePage(meta.page - 1)" 
            :disabled="!meta.hasPrevPage"
            class="px-3 py-1 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors"
          >
            Prev
          </button>
          <div class="flex space-x-1">
            <button 
              v-for="p in meta.pages" 
              :key="p"
              @click="changePage(p)"
              :class="['px-3 py-1 border rounded-lg transition-colors', meta.page === p ? 'bg-primary-600 text-white border-primary-600' : 'bg-white border-slate-200 hover:bg-slate-50']"
            >
              {{ p }}
            </button>
          </div>
          <button 
            @click="changePage(meta.page + 1)" 
            :disabled="!meta.hasNextPage"
            class="px-3 py-1 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Invite Modal -->
    <div v-if="showInviteModal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div class="p-8 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 class="text-2xl font-black text-slate-900 italic">Invite Member</h3>
            <p class="text-slate-500 text-sm mt-1">Provide access to the portal for a staff member.</p>
          </div>
          <button @click="showInviteModal = false" class="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="handleInvite" class="p-8 space-y-6">
          <div v-if="errorMessage" class="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
            {{ successMessage }}
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">First Name</label>
              <input 
                v-model="newMember.firstName" 
                type="text" 
                required
                placeholder="John"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
              />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Last Name</label>
              <input 
                v-model="newMember.lastName" 
                type="text" 
                required
                placeholder="Doe"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
              />
            </div>
          </div>
          
          <div class="space-y-1">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Work Email</label>
            <input 
              v-model="newMember.email" 
              type="email" 
              required
              placeholder="john.doe@company.com"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            />
          </div>

          <div class="pt-4 flex space-x-3">
             <button 
              type="button"
              @click="showInviteModal = false"
              class="flex-1 py-4 border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
             >
              Cancel
             </button>
             <button 
              type="submit"
              :disabled="inviting"
              class="flex-1 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center space-x-2 disabled:opacity-50"
             >
              <span v-if="!inviting">Send Invitation</span>
              <svg v-else class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
             </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PartnerPortalService } from '../../../services/partner-portal.service';

const team = ref<any[]>([]);
const loading = ref(true);
const inviting = ref(false);
const processingId = ref<string | null>(null);
const showInviteModal = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

// Pagination & Search
const searchQuery = ref('');
const meta = ref<any>(null);
const searchTimeout = ref<any>(null);

const newMember = ref({
  firstName: '',
  lastName: '',
  email: '',
});

const fetchTeam = async (page = 1) => {
  try {
    loading.value = true;
    const res = await PartnerPortalService.getTeam({ page, limit: 10, search: searchQuery.value });
    team.value = res.data;
    meta.value = res.meta;
  } catch (error) {
    console.error('Failed to fetch team', error);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    fetchTeam(1);
  }, 500);
};

const changePage = (page: number) => {
  fetchTeam(page);
};

const handleInvite = async () => {
  try {
    errorMessage.value = '';
    successMessage.value = '';
    inviting.value = true;
    
    await PartnerPortalService.inviteTeamMember(newMember.value);
    
    successMessage.value = 'Team member invited successfully!';
    await fetchTeam();
    
    setTimeout(() => {
      showInviteModal.value = false;
      successMessage.value = '';
      newMember.value = { firstName: '', lastName: '', email: '' };
    }, 1500);
  } catch (error: any) {
    console.error('Failed to invite team member', error);
    errorMessage.value = error.response?.data?.message || 'Failed to invite team member. Please try again.';
  } finally {
    inviting.value = false;
  }
};

const handleResend = async (adminId: string) => {
  try {
    processingId.value = adminId;
    await PartnerPortalService.resendTeamInvitation(adminId);
    // Optional: add a tiny toast or success state per row?
    // For now, simple refresh or just alert.
    await fetchTeam();
  } catch (error: any) {
    console.error('Failed to resend invitation', error);
    alert(error.response?.data?.message || 'Failed to resend invitation');
  } finally {
    processingId.value = null;
  }
};

const handleRevoke = async (adminId: string) => {
  if (!confirm('Are you sure you want to revoke this invitation? This member will lose all access.')) return;
  
  try {
    processingId.value = adminId;
    await PartnerPortalService.revokeTeamInvitation(adminId);
    await fetchTeam();
  } catch (error: any) {
    console.error('Failed to revoke invitation', error);
    alert(error.response?.data?.message || 'Failed to revoke invitation');
  } finally {
    processingId.value = null;
  }
};

onMounted(fetchTeam);
</script>

<route lang="yaml">
meta:
  layout: partner
</route>
