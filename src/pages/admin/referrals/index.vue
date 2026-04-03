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
        v-for="tab in ['Agents', 'Applications', 'Activation Codes', 'Invitations', 'Settings']" 
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
                <button 
                  @click="viewAgentReferrals(agent)"
                  class="text-sm font-medium text-primary-600 hover:text-primary-700 underline"
                >
                  {{ agent.agentConfig?.totalReferrals || 0 }}
                </button>
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

    <!-- Applications Table -->
    <div v-else-if="activeTab === 'Applications'" class="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 class="font-bold text-slate-900">Agent Applications</h3>
        <div class="flex space-x-2">
          <select 
            v-model="applicationStatusFilter"
            class="bg-slate-50 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all px-4 py-2"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-slate-50/50">
            <tr>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Applicant</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Applied At</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">ID Verification</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="app in applications" :key="app._id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                    {{ app.firstName.charAt(0) }}
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-semibold text-slate-900">{{ app.firstName }} {{ app.lastName }}</p>
                    <p class="text-xs text-slate-500">{{ app.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ new Date(app.agentApplication.appliedAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4">
                <span 
                  :class="[
                    'px-2.5 py-1 rounded-full text-xs font-bold',
                    app.agentApplication.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 
                    app.agentApplication.status === 'rejected' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                  ]"
                >
                  {{ app.agentApplication.status.toUpperCase() }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ app.agentApplication.kyc?.idType || 'N/A' }} 
                <span class="text-xs text-slate-400">({{ app.agentApplication.kyc?.idNumber || 'No ID' }})</span>
              </td>
              <td class="px-6 py-4 text-right">
                <button 
                  v-if="app.agentApplication.status === 'pending'"
                  @click="openReviewModal(app)"
                  class="px-4 py-2 bg-primary-600 text-white rounded-lg text-xs font-bold hover:bg-primary-700 transition-colors"
                >
                  Review
                </button>
                <button 
                  v-else
                  @click="openReviewModal(app)"
                  class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr v-if="applications.length === 0">
              <td colspan="5" class="px-6 py-10 text-center text-slate-500">
                No agent applications found.
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

    <!-- Referral List Modal -->
    <div v-if="selectedAgentForReferrals" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div class="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 class="text-xl font-bold text-slate-900">Referrals for {{ selectedAgentForReferrals.firstName }}</h3>
            <p class="text-sm text-slate-500">List of users who signed up using this agent's code.</p>
          </div>
          <button @click="selectedAgentForReferrals = null" class="p-2 hover:bg-slate-200 rounded-xl transition-colors">
            <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-6">
          <div v-if="loadingReferrals" class="flex justify-center py-10">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
          <table v-else-if="referredUsers.length > 0" class="w-full text-left">
            <thead class="bg-slate-50/50">
              <tr>
                <th class="px-4 py-3 text-xs font-bold text-slate-500 uppercase">User</th>
                <th class="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Email</th>
                <th class="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Joined At</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="user in referredUsers" :key="user._id">
                <td class="px-4 py-3 text-sm font-medium text-slate-900">{{ user.firstName }} {{ user.lastName }}</td>
                <td class="px-4 py-3 text-sm text-slate-600">{{ user.email }}</td>
                <td class="px-4 py-3 text-sm text-slate-500">{{ new Date(user.createdAt).toLocaleDateString() }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else class="text-center py-10 text-slate-500">No referrals found for this agent.</p>
        </div>
      </div>
    </div>

    <!-- Application Review Modal -->
    <div v-if="selectedApplication" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div class="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 class="text-xl font-bold text-slate-900">Review Agent Application</h3>
          <button @click="selectedApplication = null" class="p-2 hover:bg-slate-200 rounded-xl transition-colors">
            <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-8 space-y-8">
          <!-- Applicant Info -->
          <div class="grid grid-cols-2 gap-6">
            <div>
              <p class="text-xs font-bold text-slate-400 uppercase mb-1">Applicant Name</p>
              <p class="text-slate-900 font-semibold">{{ selectedApplication.firstName }} {{ selectedApplication.lastName }}</p>
            </div>
            <div>
              <p class="text-xs font-bold text-slate-400 uppercase mb-1">Email Address</p>
              <p class="text-slate-900 font-semibold">{{ selectedApplication.email }}</p>
            </div>
            <div>
              <p class="text-xs font-bold text-slate-400 uppercase mb-1">Phone Number</p>
              <p class="text-slate-900 font-semibold">
                {{ selectedApplication.phoneNumber?.countryCode }}{{ selectedApplication.phoneNumber?.number || 'N/A' }}
              </p>
            </div>
            <div>
              <p class="text-xs font-bold text-slate-400 uppercase mb-1">Applied At</p>
              <p class="text-slate-900 font-semibold">{{ new Date(selectedApplication.agentApplication.appliedAt).toLocaleString() }}</p>
            </div>
          </div>

          <!-- KYC Details -->
          <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 class="font-bold text-slate-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              KYC Documents
            </h4>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs font-bold text-slate-500 uppercase mb-2">ID Type</p>
                <p class="text-sm font-medium text-slate-900 p-3 bg-white rounded-xl border border-slate-200">{{ selectedApplication.agentApplication.kyc?.idType || 'N/A' }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-500 uppercase mb-2">ID Number</p>
                <p class="text-sm font-medium text-slate-900 p-3 bg-white rounded-xl border border-slate-200">{{ selectedApplication.agentApplication.kyc?.idNumber || 'N/A' }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p class="text-xs font-bold text-slate-500 uppercase mb-2">ID Image</p>
                <div class="aspect-video rounded-xl overflow-hidden border border-slate-200 bg-white">
                   <img v-if="selectedApplication.agentApplication.kyc?.idImage" :src="selectedApplication.agentApplication.kyc.idImage" class="w-full h-full object-contain" />
                   <div v-else class="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Image</div>
                </div>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-500 uppercase mb-2">Selfie Image</p>
                <div class="aspect-video rounded-xl overflow-hidden border border-slate-200 bg-white">
                  <img v-if="selectedApplication.agentApplication.kyc?.selfieImage" :src="selectedApplication.agentApplication.kyc.selfieImage" class="w-full h-full object-contain" />
                  <div v-else class="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Image</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Review Form -->
          <div v-if="selectedApplication.agentApplication.status === 'pending'" class="space-y-6">
            <div class="flex space-x-4">
              <button 
                @click="reviewStatus = 'approved'"
                :class="['flex-1 py-3 rounded-2xl font-bold transition-all border-2', reviewStatus === 'approved' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-200']"
              >
                Approve
              </button>
              <button 
                @click="reviewStatus = 'rejected'"
                :class="['flex-1 py-3 rounded-2xl font-bold transition-all border-2', reviewStatus === 'rejected' ? 'bg-rose-50 border-rose-500 text-rose-700' : 'bg-white border-slate-200 text-slate-500 hover:border-rose-200']"
              >
                Reject
              </button>
            </div>

            <div v-if="reviewStatus === 'approved'" class="grid grid-cols-2 gap-4 animate-fadeIn">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Commission Rate (%)</label>
                <input v-model="reviewForm.commissionRate" type="number" class="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Customer Discount (%)</label>
                <input v-model="reviewForm.customerDiscountRate" type="number" class="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>

            <div v-if="reviewStatus === 'rejected'" class="animate-fadeIn">
              <label class="block text-sm font-semibold text-slate-700 mb-2">Rejection Reason</label>
              <textarea v-model="reviewForm.rejectionReason" rows="3" class="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500" placeholder="Explain why this application was rejected..."></textarea>
            </div>

            <div class="flex space-x-3 pt-4">
              <button @click="selectedApplication = null" class="flex-1 px-4 py-4 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button 
                @click="submitReview"
                :disabled="isSubmitting"
                class="flex-1 px-4 py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25 disabled:opacity-50"
              >
                {{ isSubmitting ? 'Processing...' : 'Submit Review' }}
              </button>
            </div>
          </div>
          <div v-else class="p-6 bg-slate-100 rounded-2xl text-center">
            <p class="text-slate-600 font-semibold">This application has already been reviewed.</p>
            <p v-if="selectedApplication.agentApplication.rejectionReason" class="text-sm text-rose-600 mt-2">Reason: {{ selectedApplication.agentApplication.rejectionReason }}</p>
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
import { ReferralService, type Agent, type ActivationCode, type AgentApplication } from '../../../services/admin/referral.service';
import { SystemConfigService } from '../../../services/admin/system-config.service';

const router = useRouter();
const stats = ref<any>(null);
const agents = ref<Agent[]>([]);
const codes = ref<ActivationCode[]>([]);
const invitations = ref<any[]>([]);
const applications = ref<AgentApplication[]>([]);
const activeTab = ref('Agents');
const search = ref('');
const invitationSearch = ref('');
const applicationStatusFilter = ref('');
const showGenerateModal = ref(false);
const editingAgent = ref<Agent | null>(null);

// Application Review Refs
const selectedApplication = ref<AgentApplication | null>(null);
const reviewStatus = ref<'approved' | 'rejected'>('approved');
const isSubmitting = ref(false);
const reviewForm = ref({
  rejectionReason: '',
  commissionRate: 5,
  customerDiscountRate: 0
});

// Referral List Refs
const selectedAgentForReferrals = ref<Agent | null>(null);
const referredUsers = ref<any[]>([]);
const loadingReferrals = ref(false);

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
    const [statsRes, agentsRes, codesRes, invRes, appsRes, configRes] = await Promise.all([
      ReferralService.getStats(),
      ReferralService.getAgents({ search: search.value }),
      ReferralService.getActivationCodes(),
      ReferralService.getInvitations({ search: invitationSearch.value }),
      ReferralService.getAgentApplications({ status: applicationStatusFilter.value }),
      SystemConfigService.getAll('referral')
    ]);
    
    stats.value = statsRes.data;
    agents.value = agentsRes.data.agents;
    codes.value = codesRes.data.codes;
    invitations.value = invRes.data.invitations;
    applications.value = appsRes.data.applications;

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

const openReviewModal = (app: AgentApplication) => {
  selectedApplication.value = app;
  reviewStatus.value = 'approved';
  reviewForm.value = {
    rejectionReason: '',
    commissionRate: app.agentApplication?.kyc?.idType ? 5 : 5, // Default
    customerDiscountRate: 0
  };
};

const submitReview = async () => {
  if (!selectedApplication.value) return;
  
  isSubmitting.value = true;
  try {
    await ReferralService.reviewAgentApplication(selectedApplication.value._id, {
      status: reviewStatus.value,
      rejectionReason: reviewStatus.value === 'rejected' ? reviewForm.value.rejectionReason : undefined,
      commissionRate: reviewStatus.value === 'approved' ? reviewForm.value.commissionRate : undefined,
      customerDiscountRate: reviewStatus.value === 'approved' ? reviewForm.value.customerDiscountRate : undefined
    });
    
    selectedApplication.value = null;
    fetchData();
  } catch (err) {
    console.error('Failed to submit application review', err);
    alert('Failed to submit review');
  } finally {
    isSubmitting.value = false;
  }
};

const viewAgentReferrals = async (agent: Agent) => {
  selectedAgentForReferrals.value = agent;
  loadingReferrals.value = true;
  referredUsers.value = [];
  
  try {
    const res = await ReferralService.getReferredUsers(agent._id, { limit: 100 });
    referredUsers.value = res.data.users;
  } catch (err) {
    console.error('Failed to fetch referred users', err);
  } finally {
    loadingReferrals.value = false;
  }
};

import { watch } from 'vue';
watch([applicationStatusFilter, search, invitationSearch], () => {
  fetchData();
});

onMounted(fetchData);
</script>



<route lang="yaml">
meta:
  layout: admin
</route>
