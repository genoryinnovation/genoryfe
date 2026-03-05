<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Referral & Agent Management</h1>
        <p class="text-slate-500">Track referrals, manage agents, and generate activation codes.</p>
      </div>
      <div class="flex items-center space-x-3">
        <button 
          @click="showGenerateModal = true"
          class="flex items-center px-4 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Generate Code
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <p class="text-sm font-medium text-slate-500">Total Referrals</p>
        <p class="text-2xl font-bold text-slate-900 mt-1">{{ stats?.totalReferrals || 0 }}</p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
        <p class="text-sm font-medium text-slate-500">Active Agents</p>
        <p class="text-2xl font-bold text-slate-900 mt-1">{{ stats?.totalAgents || 0 }}</p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
        <p class="text-sm font-medium text-slate-500">Total Commissions Paid</p>
        <p class="text-2xl font-bold text-slate-900 mt-1">₦{{ (stats?.totalBonusesPaid || 0).toLocaleString() }}</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex space-x-1 bg-slate-100 p-1 rounded-xl w-fit">
      <button 
        v-for="tab in ['Agents', 'Activation Codes']" 
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'px-6 py-2 text-sm font-medium rounded-lg transition-all',
          activeTab === tab ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Agents Table -->
    <div v-if="activeTab === 'Agents'" class="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 class="font-bold text-slate-900">Manage Agents</h3>
        <div class="relative w-64">
          <input 
            v-model="search"
            type="text" 
            placeholder="Search agents..." 
            class="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-slate-50/50">
            <tr>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Agent</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Referral Code</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Referrals</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Comm. Rate</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Earnings</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="agent in agents" :key="agent._id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                    {{ agent.firstName.charAt(0) }}
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-semibold text-slate-900">{{ agent.firstName }} {{ agent.lastName }}</p>
                    <p class="text-xs text-slate-500">{{ agent.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-mono font-medium">
                  {{ agent.referralCode }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-sm font-medium text-slate-700">{{ agent.agentConfig?.totalReferrals || 0 }}</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-sm font-medium text-slate-700">{{ agent.agentConfig?.commissionRate || 0 }}%</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm font-bold text-emerald-600">₦{{ (agent.agentConfig?.totalEarnings || 0).toLocaleString() }}</span>
              </td>
              <td class="px-6 py-4 text-right">
                <button 
                  @click="editAgent(agent)"
                  class="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Activation Codes Table -->
    <div v-else class="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 class="font-bold text-slate-900">Activation Codes</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-slate-50/50">
            <tr>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Code</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Created By</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Expires At</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Used By</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Used At</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="code in codes" :key="code._id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-mono font-bold">
                  {{ code.code }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ code.createdBy?.firstName || 'Admin' }}
              </td>
              <td class="px-6 py-4">
                <span v-if="code.isUsed" class="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-semibold">Used</span>
                <span v-else-if="new Date(code.expiresAt) < new Date()" class="px-2 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-semibold">Expired</span>
                <span v-else class="px-2 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-xs font-semibold">Active</span>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600 text-center">
                {{ new Date(code.expiresAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ code.usedBy ? `${code.usedBy.firstName} ${code.usedBy.lastName}` : '-' }}
              </td>
               <td class="px-6 py-4 text-sm text-slate-600">
                {{ code.usedAt ? new Date(code.usedAt).toLocaleDateString() : '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit Agent Modal -->
    <div v-if="editingAgent" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div class="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        <div class="p-8">
          <h3 class="text-xl font-bold text-slate-900 mb-6">Edit Agent Config</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Commission Rate (%)</label>
              <input 
                v-model="editForm.commissionRate"
                type="number" 
                class="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
          </div>
          <div class="flex items-center space-x-3 mt-8">
            <button @click="editingAgent = null" class="flex-1 px-4 py-3 border border-slate-200 text-slate-600 font-semibold rounded-2xl hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button @click="saveAgentConfig" class="flex-1 px-4 py-3 bg-primary-600 text-white font-semibold rounded-2xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Generate Modal -->
    <div v-if="showGenerateModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div class="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        <div class="p-8">
          <h3 class="text-xl font-bold text-slate-900 mb-6">Generate Activation Code</h3>
          <p class="text-slate-500 text-sm mb-6">This code can be shared with users to promote them to Agent status.</p>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Expires After (Days)</label>
              <input 
                v-model="generateForm.expiresAfterDays"
                type="number" 
                class="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
          </div>
          <div class="flex items-center space-x-3 mt-8">
            <button @click="showGenerateModal = false" class="flex-1 px-4 py-3 border border-slate-200 text-slate-600 font-semibold rounded-2xl hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button @click="generateCode" class="flex-1 px-4 py-3 bg-primary-600 text-white font-semibold rounded-2xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25">
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ReferralService, type Agent, type ActivationCode } from '../../../services/admin/referral.service';

const stats = ref<any>(null);
const agents = ref<Agent[]>([]);
const codes = ref<ActivationCode[]>([]);
const activeTab = ref('Agents');
const search = ref('');
const showGenerateModal = ref(false);
const editingAgent = ref<Agent | null>(null);

const editForm = ref({
  commissionRate: 5
});

const generateForm = ref({
  expiresAfterDays: 30
});

const fetchData = async () => {
  try {
    const [statsRes, agentsRes, codesRes] = await Promise.all([
      ReferralService.getStats(),
      ReferralService.getAgents({ search: search.value }),
      ReferralService.getActivationCodes()
    ]);
    
    stats.value = statsRes.data;
    agents.value = agentsRes.data.agents;
    codes.value = codesRes.data.codes;
  } catch (err) {
    console.error('Failed to fetch referral data', err);
  }
};

const editAgent = (agent: Agent) => {
  editingAgent.value = agent;
  editForm.value.commissionRate = agent.agentConfig?.commissionRate || 5;
};

const saveAgentConfig = async () => {
  if (!editingAgent.value) return;
  try {
    await ReferralService.updateAgentConfig(editingAgent.value._id, editForm.value);
    editingAgent.value = null;
    fetchData();
  } catch (err) {
    console.error('Failed to update agent config', err);
  }
};

const generateCode = async () => {
  try {
    await ReferralService.generateActivationCode(generateForm.value);
    showGenerateModal.value = false;
    fetchData();
  } catch (err) {
    console.error('Failed to generate activation code', err);
  }
};

onMounted(fetchData);
</script>
