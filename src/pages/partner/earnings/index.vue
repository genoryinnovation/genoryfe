<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Earnings</h1>
        <p class="mt-1 text-sm text-slate-500">Track your earnings and view transaction history</p>
      </div>
      <div class="flex items-center space-x-3">
        <!-- Future: Withdraw Button -->
      </div>
    </div>

    <!-- Summary Statistics Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Total Earnings Balance -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-slate-500">Available Balance</p>
          <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-50 text-emerald-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-slate-900">
          ₦{{ walletStats.balance?.toLocaleString() || 0 }}
        </h3>
        <p class="mt-2 text-xs font-medium text-emerald-600">
          Total Available for Withdrawal
        </p>
      </div>

      <!-- Total Transactions -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-slate-500">Transactions</p>
          <div class="w-10 h-10 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-slate-900">{{ walletStats.totalTransactions || 0 }}</h3>
        <p class="mt-2 text-xs text-slate-400 font-medium">Activity Count</p>
      </div>

      <!-- Total Earned (Deposits) -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-slate-500">Total Earned</p>
          <div class="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-slate-900">₦{{ walletStats.totalDeposits?.toLocaleString() || 0 }}</h3>
        <p class="mt-2 text-xs text-slate-400 font-medium">{{ walletStats.depositCount || 0 }} Credits</p>
      </div>

      <!-- Total Withdrawn (Deductions) -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-slate-500">Total Withdrawn</p>
          <div class="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-slate-900">₦{{ walletStats.totalDeductions?.toLocaleString() || 0 }}</h3>
        <p class="mt-2 text-xs text-slate-400 font-medium">{{ walletStats.deductionCount || 0 }} Withdrawals</p>
      </div>
    </div>

    <!-- Ledger Controls -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-2">
      <div class="relative flex-1 max-w-md">
        <input 
          v-model="searchQuery"
          @input="handleSearch"
          type="text" 
          placeholder="Filter by reference or notes..." 
          class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm"
        />
        <svg class="absolute left-3.5 top-3.5 w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <div class="flex items-center space-x-3">
        <select 
          v-model="statusFilter"
          @change="fetchData"
          class="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-slate-700"
        >
          <option value="">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>
    </div>

    <!-- Ledger Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto text-sm">
        <table class="min-w-full divide-y divide-slate-200">
          <thead>
            <tr class="bg-slate-50">
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Reference ID</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Detail</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Value</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Timestamp</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="loadingTransactions" v-for="i in 5" :key="i">
              <td colspan="6" class="px-6 py-4 text-center">
                <div class="h-4 bg-slate-50 rounded animate-pulse w-full"></div>
              </td>
            </tr>
            <tr v-else-if="transactions.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-slate-500">No transactions found.</td>
            </tr>
            <tr v-for="tx in transactions" :key="tx._id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap font-medium text-slate-900">#{{ tx.reference?.toUpperCase() || 'N/A' }}</td>
              <td class="px-6 py-4">
                <div class="text-slate-900 font-semibold mb-0.5">{{ tx.reason }}</div>
                <div class="text-[11px] text-slate-400 truncate max-w-[200px]">{{ tx.metadata?.notes || 'System transaction' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    'px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider',
                    tx.transactionType === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'
                  ]"
                >
                  {{ tx.transactionType === 'credit' ? 'Earnings' : 'Withdrawal' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="font-bold tabular-nums" :class="tx.transactionType === 'credit' ? 'text-emerald-600' : 'text-slate-900'">
                  {{ tx.transactionType === 'credit' ? '+' : '-' }}₦{{ tx.nairaAmount?.toLocaleString() || 0 }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    'inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium',
                    tx.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                    tx.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                  ]"
                >
                  <span class="w-1 h-1 rounded-full mr-1.5" :class="tx.status === 'completed' ? 'bg-emerald-500' : tx.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'"></span>
                  {{ tx.status?.toUpperCase() }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-500 tabular-nums">
                {{ new Date(tx.createdAt).toLocaleDateString('en-GB') }}<br/>
                {{ new Date(tx.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="pagination && pagination.pages > 1" class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs text-slate-500">Page {{ pagination.page }} of {{ pagination.pages }}</span>
        <div class="flex space-x-2">
          <button 
            @click="fetchTransactions(pagination.page - 1)" 
            :disabled="pagination.page === 1"
            class="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            Prev
          </button>
          <button 
            @click="fetchTransactions(pagination.page + 1)" 
            :disabled="pagination.page === pagination.pages"
            class="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PartnerPortalService } from '../../../services/partner-portal.service';

// State
const walletStats = ref<any>({
  balance: 0,
  netChange: 0,
  totalTransactions: 0,
  totalDeposits: 0,
  depositCount: 0,
  totalDeductions: 0,
  deductionCount: 0,
  planType: 'prepaid' // Not strictly used for earnings logic but kept for consistency
});
const transactions = ref<any[]>([]);
const pagination = ref<any>(null);
const loadingTransactions = ref(true);
const searchQuery = ref('');
const statusFilter = ref('');

// Data Fetching
const fetchStats = async () => {
  try {
    const data = await PartnerPortalService.getWalletStats('earnings');
    walletStats.value = data || walletStats.value;
  } catch (error) {
    console.error('Failed to fetch earnings stats', error);
  }
};

const fetchTransactions = async (page = 1) => {
  try {
    loadingTransactions.value = true;
    const response = await PartnerPortalService.getTransactions({
      page,
      limit: 10,
      search: searchQuery.value,
      status: statusFilter.value || undefined,
      walletType: 'earnings'
    });
    transactions.value = response.data;
    pagination.value = response.meta;
  } catch (error) {
    console.error('Failed to fetch transactions', error);
  } finally {
    loadingTransactions.value = false;
  }
};

const fetchData = () => {
  fetchStats();
  fetchTransactions(1);
};

// Search Debounce
let searchTimeout: any = null;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchTransactions(1);
  }, 500);
};

onMounted(() => {
  fetchData();
});
</script>

<route lang="yaml">
meta:
  layout: partner
</route>
