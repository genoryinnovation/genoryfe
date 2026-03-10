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
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/50">
        <div class="flex items-center justify-between mb-4">
          <div class="p-2 bg-blue-50 rounded-xl text-blue-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <p class="text-sm font-medium text-slate-500 mb-1">Total Referrals</p>
        <p class="text-2xl font-bold text-slate-900">{{ stats?.totalReferrals || 0 }}</p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/50">
        <div class="flex items-center justify-between mb-4">
          <div class="p-2 bg-purple-50 rounded-xl text-purple-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
        <p class="text-sm font-medium text-slate-500 mb-1">Active Agents</p>
        <p class="text-2xl font-bold text-slate-900">{{ stats?.totalAgents || 0 }}</p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/50">
        <div class="flex items-center justify-between mb-4">
          <div class="p-2 bg-emerald-50 rounded-xl text-emerald-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-sm font-medium text-slate-500 mb-1">Total Commissions Paid</p>
        <p class="text-2xl font-bold text-slate-900">₦{{ (stats?.totalBonusesPaid || 0).toLocaleString() }}</p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/50">
        <div class="flex items-center justify-between mb-4">
          <div class="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
        </div>
        <p class="text-sm font-medium text-slate-500 mb-1">Total Discounts Given</p>
        <p class="text-2xl font-bold text-slate-900">₦{{ (stats?.totalDiscountsGiven || 0).toLocaleString() }}</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex space-x-1 bg-slate-100 p-1 rounded-xl w-fit">
      <button 
        v-for="tab in ['Agents', 'Activation Codes', 'Invitations', 'Settings']" 
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
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Agt. %</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Cust. %</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Earnings</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Discounts</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="agent in agents" :key="agent._id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center cursor-pointer group" @click="router.push(`/admin/users/${agent._id}`)">
                  <div class="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center font-bold group-hover:bg-primary-200 transition-colors">
                    {{ agent.firstName.charAt(0) }}
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">{{ agent.firstName }} {{ agent.lastName }}</p>
                    <p class="text-xs text-slate-500">{{ agent.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span v-if="agent.referralCode" class="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-mono font-medium">
                  {{ agent.referralCode }}
                </span>
                <span v-else class="text-xs text-slate-400 italic">No code</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-sm font-medium text-slate-700">{{ agent.agentConfig?.totalReferrals || 0 }}</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-sm font-medium text-slate-700">{{ agent.agentConfig?.commissionRate || 0 }}%</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-sm font-medium text-slate-700">{{ agent.agentConfig?.customerDiscountRate || 0 }}%</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm font-bold text-emerald-600">₦{{ (agent.agentConfig?.totalEarnings || 0).toLocaleString() }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm font-bold text-indigo-600">₦{{ (agent.agentConfig?.totalDiscountsGiven || 0).toLocaleString() }}</span>
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
    <div v-else-if="activeTab === 'Activation Codes'" class="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
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

    <div v-else-if="activeTab === 'Invitations'" class="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 class="font-bold text-slate-900">Agent Invitations</h3>
        <div class="relative w-64">
          <input 
            v-model="invitationSearch"
            type="text" 
            placeholder="Search phone number..." 
            class="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-slate-50/50">
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Agent</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Invitee Number</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Invited At</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Completed At</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Expires At</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="invitation in invitations" :key="invitation._id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex flex-col">
                  <span class="text-sm font-semibold text-slate-900">{{ invitation.agentId?.firstName }} {{ invitation.agentId?.lastName }}</span>
                  <span class="text-xs text-slate-500">{{ invitation.agentId?.email }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600 text-center">
                {{ invitation.phoneNumber?.countryCode }}{{ invitation.phoneNumber?.number }}
              </td>
              <td class="px-6 py-4 text-center">
                <span 
                  :class="[
                    'px-2.5 py-1 rounded-full text-xs font-bold',
                    invitation.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 
                    invitation.status === 'expired' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                  ]"
                >
                  {{ invitation.status.toUpperCase() }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600 text-center">
                {{ new Date(invitation.invitedAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600 text-center">
                {{ invitation.completedAt ? new Date(invitation.completedAt).toLocaleDateString() : '-' }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600 text-center text-rose-500">
                {{ new Date(invitation.expiresAt).toLocaleDateString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Settings Tab -->
    <div v-else-if="activeTab === 'Settings'" class="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden p-8">
      <h3 class="text-xl font-bold text-slate-900 mb-6">Referral System Settings</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Agent Fixed Commission (₦)</label>
            <p class="text-xs text-slate-500 mb-3">Paid to agents on every referred order.</p>
            <input 
              v-model="settings.AGENT_FIXED_COMMISSION"
              type="number" 
              class="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Regular Referral Bonus (₦)</label>
            <p class="text-xs text-slate-500 mb-3">One-time bonus for regular user referrals.</p>
            <input 
              v-model="settings.REFERRAL_BONUS_FIXED"
              type="number" 
              class="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>
        </div>
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Min Order for Referral Bonus (₦)</label>
            <p class="text-xs text-slate-500 mb-3">Minimum amount required for referral bonuses to trigger.</p>
            <input 
              v-model="settings.MIN_ORDER_FOR_REFERRAL_BONUS"
              type="number" 
              class="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>
          <div class="flex items-end justify-end pt-8">
            <button 
              @click="saveSettings"
              class="px-8 py-3 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25"
            >
              Save Global Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Agent Modal -->
    <div v-if="editingAgent" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div class="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        <div class="p-8">
          <h3 class="text-xl font-bold text-slate-900 mb-6">Edit Agent Config</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Agent Commission (%)</label>
                <input 
                  v-model="editForm.commissionRate"
                  type="number" 
                  class="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Cust. Discount (%)</label>
                <input 
                  v-model="editForm.customerDiscountRate"
                  type="number" 
                  class="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Max Comm. (₦)</label>
                <input 
                  v-model="editForm.maxCommissionPerOrder"
                  type="number" 
                  class="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Min Order (₦)</label>
                <input 
                  v-model="editForm.minOrderAmount"
                  type="number" 
                  class="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>
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
import { useRouter } from 'vue-router';
import { ReferralService, type Agent, type ActivationCode } from '../../../services/admin/referral.service';
import { SystemConfigService } from '../../../services/admin/system-config.service';

const router = useRouter();
const stats = ref<any>(null);
const agents = ref<Agent[]>([]);
const codes = ref<ActivationCode[]>([]);
const invitations = ref<any[]>([]);
const activeTab = ref('Agents');
const search = ref('');
const invitationSearch = ref('');
const showGenerateModal = ref(false);
const editingAgent = ref<Agent | null>(null);

const settings = ref({
  AGENT_FIXED_COMMISSION: 100,
  REFERRAL_BONUS_FIXED: 500,
  MIN_ORDER_FOR_REFERRAL_BONUS: 2000
});

const editForm = ref({
  commissionRate: 5,
  customerDiscountRate: 0,
  maxCommissionPerOrder: 0,
  minOrderAmount: 0
});

const generateForm = ref({
  expiresAfterDays: 30
});

const fetchData = async () => {
  try {
    const [statsRes, agentsRes, codesRes, invRes, configRes] = await Promise.all([
      ReferralService.getStats(),
      ReferralService.getAgents({ search: search.value }),
      ReferralService.getActivationCodes(),
      ReferralService.getInvitations({ search: invitationSearch.value }),
      SystemConfigService.getAll('referral')
    ]);
    
    stats.value = statsRes.data;
    agents.value = agentsRes.data.agents;
    codes.value = codesRes.data.codes;
    invitations.value = invRes.data.invitations;

    // Map config settings
    if (configRes.data) {
      configRes.data.forEach(item => {
        if (item.key in settings.value) {
          (settings.value as any)[item.key] = item.value;
        }
      });
    }
  } catch (err) {
    console.error('Failed to fetch referral data', err);
  }
};

const saveSettings = async () => {
  try {
    const promises = Object.entries(settings.value).map(([key, value]) => {
      return SystemConfigService.upsert({
        key,
        value,
        group: 'referral',
        type: typeof value === 'number' ? 'number' : 'string'
      });
    });
    
    await Promise.all(promises);
    alert('Settings saved successfully');
    fetchData();
  } catch (err) {
    console.error('Failed to save referral settings', err);
  }
};

const editAgent = (agent: Agent) => {
  editingAgent.value = agent;
  editForm.value = {
    commissionRate: agent.agentConfig?.commissionRate || 5,
    customerDiscountRate: agent.agentConfig?.customerDiscountRate || 0,
    maxCommissionPerOrder: agent.agentConfig?.maxCommissionPerOrder || 0,
    minOrderAmount: agent.agentConfig?.minOrderAmount || 0,
  };
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



<route lang="yaml">
meta:
  layout: admin
</route>
