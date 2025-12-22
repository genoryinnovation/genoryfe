<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Wallet History</h1>
        <p class="mt-1 text-sm text-slate-500">Manage your wallet and view transaction history</p>
      </div>
      <div class="flex items-center space-x-3">
        <button
          @click="showTopUpModal = true"
          class="inline-flex items-center px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Fund Wallet
        </button>
      </div>
    </div>

    <!-- Summary Statistics Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Available Balance -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-slate-500">Available Balance</p>
          <div class="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-slate-900">₦{{ walletStats.balance?.toLocaleString() || 0 }}</h3>
        <p class="mt-2 text-xs font-medium" :class="walletStats.netChange >= 0 ? 'text-emerald-600' : 'text-rose-600'">
          {{ walletStats.netChange >= 0 ? '+' : '' }}₦{{ Math.abs(walletStats.netChange || 0).toLocaleString() }} Net Change
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

      <!-- Total Deposits -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-slate-500">Total Deposits</p>
          <div class="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-slate-900">₦{{ walletStats.totalDeposits?.toLocaleString() || 0 }}</h3>
        <p class="mt-2 text-xs text-slate-400 font-medium">{{ walletStats.depositCount || 0 }} Completed</p>
      </div>

      <!-- Total Deductions -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-slate-500">Total Deductions</p>
          <div class="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 16V10m0 0l3 3m-3-3l-3 3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-slate-900">₦{{ walletStats.totalDeductions?.toLocaleString() || 0 }}</h3>
        <p class="mt-2 text-xs text-slate-400 font-medium">{{ walletStats.deductionCount || 0 }} Requests</p>
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
              <th scope="col" class="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="loadingTransactions" v-for="i in 5" :key="i">
              <td colspan="7" class="px-6 py-4 text-center">
                <div class="h-4 bg-slate-50 rounded animate-pulse w-full"></div>
              </td>
            </tr>
            <tr v-else-if="transactions.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-slate-500">No transactions found.</td>
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
                  {{ tx.transactionType === 'credit' ? 'Deposit' : 'Debit' }}
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
              <td class="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                <button 
                  v-if="tx.status === 'pending'"
                  @click="handleRequery(tx)"
                  :disabled="tx.loadingRequery"
                  class="text-primary-600 hover:text-primary-900 font-bold flex items-center justify-end ml-auto"
                >
                  <svg v-if="tx.loadingRequery" class="animate-spin h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ tx.loadingRequery ? 'Syncing...' : 'Requery' }}
                </button>
                <span v-else class="text-slate-300">-</span>
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

    <!-- Fund Wallet Modal -->
    <div v-if="showTopUpModal" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="showTopUpModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full border border-slate-100">
          <div class="px-8 pt-8 pb-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-slate-900">Fund Wallet</h3>
              <button @click="showTopUpModal = false" class="text-slate-400 hover:text-slate-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l18 18" />
                </svg>
              </button>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Deposit Amount (NGN)</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₦</span>
                  <input 
                    v-model="topUpAmount" 
                    type="number" 
                    placeholder="Enter amount" 
                    class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-bold"
                  />
                </div>
              </div>

              <div class="bg-primary-50 p-4 rounded-xl border border-primary-100">
                <div class="flex items-start space-x-3 text-primary-700">
                  <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-xs font-medium leading-relaxed">
                    Deposits are processed securely via Paystack. Funds will be credited to your available balance instantly.
                  </p>
                </div>
              </div>

              <button 
                @click="initiateTopUp"
                :disabled="!topUpAmount || topUpAmount <= 0 || loadingTopUp"
                class="w-full py-4 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 disabled:opacity-50 transition-all shadow-lg shadow-primary-500/25 flex items-center justify-center space-x-2"
              >
                <svg v-if="loadingTopUp" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ loadingTopUp ? 'Initializing Secure Payment...' : 'Proceed to Payment' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { PartnerPortalService } from '../../../services/partner-portal.service';

const route = useRoute();

// State
const walletStats = ref<any>({
  balance: 0,
  netChange: 0,
  totalTransactions: 0,
  totalDeposits: 0,
  depositCount: 0,
  totalDeductions: 0,
  deductionCount: 0
});
const transactions = ref<any[]>([]);
const pagination = ref<any>(null);
const loadingTransactions = ref(true);
const showTopUpModal = ref(false);
const topUpAmount = ref<number | null>(null);
const loadingTopUp = ref(false);
const searchQuery = ref('');
const statusFilter = ref('');

// Data Fetching
const fetchStats = async () => {
  try {
    const data = await PartnerPortalService.getWalletStats();
    walletStats.value = data || walletStats.value;
  } catch (error) {
    console.error('Failed to fetch wallet stats', error);
  }
};

const fetchTransactions = async (page = 1) => {
  try {
    loadingTransactions.value = true;
    const response = await PartnerPortalService.getTransactions({
      page,
      limit: 10,
      search: searchQuery.value,
      status: statusFilter.value || undefined
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

const handleRequery = async (tx: any) => {
  try {
    tx.loadingRequery = true;
    await PartnerPortalService.requeryTransaction(tx._id);
    fetchData(); // Refresh everything on success
  } catch (error) {
    console.error('Requery failed', error);
    alert('Requery failed. The transaction might still be processing on Paystack.');
  } finally {
    tx.loadingRequery = false;
  }
};

// Funding Logic
const initiateTopUp = async () => {
  if (!topUpAmount.value) return;
  try {
    loadingTopUp.value = true;
    
    if (!(window as any).PaystackPop) {
      throw new Error('Payment service is currently unavailable. Please refresh the page.');
    }

    const response = await PartnerPortalService.initializeWalletFunding(
      topUpAmount.value,
      route.query.year ? Number(route.query.year) : undefined,
      route.query.month ? Number(route.query.month) : undefined
    );
    
    // Use Paystack Inline
    const handler = (window as any).PaystackPop.setup({
      key: response.paystackPublicKey || (import.meta as any).env.VITE_PAYSTACK_PUBLIC_KEY,
      email: response.email,
      amount: Math.round(response.totalAmount * 100), // Ensure it's in kobo
      ref: response.reference,
      callback: (paymentResponse: any) => {
        // Use a standard function to satisfy Paystack's validator
        (async () => {
          try {
            await PartnerPortalService.verifyWalletFunding(paymentResponse.reference);
            showTopUpModal.value = false;
            topUpAmount.value = null;
            fetchData();
          } catch (e) {
            console.error('Payment verification failed', e);
          }
        })();
      },
      onClose: () => {
        loadingTopUp.value = false;
      }
    });
    handler.openIframe();
  } catch (error) {
    console.error('Funding failed', error);
    loadingTopUp.value = false;
  }
};

onMounted(() => {
  fetchData();
  
  // Handle auto-funding from reports
  if (route.query.autoFund === 'true' && route.query.amount) {
    topUpAmount.value = Number(route.query.amount);
    showTopUpModal.value = true;
  }
});
</script>

<route lang="yaml">
meta:
  layout: partner
</route>
