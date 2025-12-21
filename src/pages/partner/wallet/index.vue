<template>
  <div class="space-y-8 max-w-7xl mx-auto pb-12">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div class="flex items-center space-x-4">
        <div class="w-14 h-14 bg-primary-50 text-primary-500 rounded-2xl flex items-center justify-center shadow-sm">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">Vault History</h1>
          <p class="text-slate-500 font-medium text-sm italic">Monitor liquidity injection & consumption</p>
        </div>
      </div>
      <button 
        @click="showTopupModal = true"
        class="group relative px-8 py-5 bg-primary-500 text-white font-black rounded-2xl hover:bg-primary-600 transition-all shadow-2xl shadow-primary-500/20 flex items-center space-x-3 overflow-hidden"
      >
        <span class="text-sm uppercase tracking-widest italic font-black">Inject Capital</span>
        <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-primary-100 transition-all cursor-default">
        <div class="space-y-1">
          <p class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Available Balance</p>
          <h3 class="text-4xl font-black text-primary-500 italic tabular-nums leading-none">₦{{ walletStats.balance.toLocaleString() }}</h3>
          <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-2">Net change: ₦{{ walletStats.netChange.toLocaleString() }}</p>
        </div>
        <div class="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-50 group-hover:text-primary-500 transition-all shadow-sm">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
      </div>

      <div class="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-all cursor-default">
        <div class="space-y-1">
          <p class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Total Transactions</p>
          <h3 class="text-4xl font-black text-slate-900 tabular-nums leading-none">{{ walletStats.totalTransactions.toLocaleString() }}</h3>
          <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Activity Count</p>
        </div>
        <div class="w-12 h-12 bg-indigo-50/50 text-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all shadow-sm">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>

      <div class="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-100 transition-all cursor-default">
        <div class="space-y-1">
          <p class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Total Deposits</p>
          <h3 class="text-3xl font-black text-slate-900 tabular-nums leading-none">₦{{ walletStats.totalDeposits.toLocaleString() }}</h3>
          <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">{{ walletStats.depositCount }} Completed</p>
        </div>
        <div class="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all shadow-sm">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>

      <div class="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-rose-100 transition-all cursor-default">
        <div class="space-y-1">
          <p class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Total Deductions</p>
          <h3 class="text-3xl font-black text-slate-900 tabular-nums leading-none">₦{{ walletStats.totalDeductions.toLocaleString() }}</h3>
          <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">{{ walletStats.deductionCount }} Consumed</p>
        </div>
        <div class="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all shadow-sm">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Ledger Controls -->
    <div class="flex flex-col md:flex-row gap-4 items-center">
      <div class="flex-1 relative group w-full">
        <svg class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          v-model="searchQuery"
          @input="handleSearch"
          type="text" 
          placeholder="Filter by reference, reason, or notes..." 
          class="w-full pl-14 pr-6 py-6 bg-white border border-slate-200 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500 transition-all text-sm font-medium placeholder:text-slate-300 shadow-sm"
        />
      </div>
      
      <div class="relative group w-full md:w-auto">
        <select 
          v-model="statusFilter"
          @change="fetchData(1)"
          class="appearance-none w-full px-8 py-6 bg-white border border-slate-200 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500 transition-all text-sm font-black text-slate-600 shadow-sm min-w-[200px] pr-14 cursor-pointer"
        >
          <option value="">Status: All items</option>
          <option value="completed">Status: Completed</option>
          <option value="pending">Status: Pending</option>
          <option value="failed">Status: Failed</option>
        </select>
        <div class="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
           </svg>
        </div>
      </div>

      <button class="w-full md:w-auto px-8 py-6 bg-primary-500 text-white font-black rounded-[1.5rem] flex items-center justify-center space-x-3 hover:bg-primary-600 transition-all shadow-xl shadow-primary-500/10 uppercase tracking-[0.1em] text-[10px] italic">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span>Apply Filters</span>
      </button>
    </div>

    <!-- Transaction Ledger -->
    <div class="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
              <th class="px-10 py-6">Reference ID</th>
              <th class="px-10 py-6">Transaction Detail</th>
              <th class="px-10 py-6">Category</th>
              <th class="px-10 py-6">Value</th>
              <th class="px-10 py-6">Status</th>
              <th class="px-10 py-6 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50/50">
            <tr v-if="loading" v-for="i in 5" :key="i" class="animate-pulse">
               <td v-for="j in 6" :key="j" class="px-10 py-8">
                 <div class="h-4 bg-slate-50 rounded"></div>
               </td>
            </tr>
            <tr v-else v-for="tx in transactions" :key="tx._id" class="group hover:bg-slate-50/30 transition-colors">
              <td class="px-10 py-8">
                <span class="text-[11px] font-black text-slate-300 group-hover:text-primary-400 transition-colors tabular-nums tracking-tighter">#{{ tx.providerReference?.slice(-6).toUpperCase() || tx._id.slice(-6).toUpperCase() }}</span>
              </td>
              <td class="px-10 py-8">
                <div class="flex flex-col">
                  <p class="text-sm font-black text-slate-900 group-hover:text-primary-600 transition-colors capitalize">
                    {{ tx.reason?.split('_').join(' ') || 'General entry' }}
                  </p>
                  <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tight truncate max-w-[300px] mt-0.5">{{ tx.remarks }}</p>
                </div>
              </td>
              <td class="px-10 py-8">
                <span :class="[
                  'px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic',
                  tx.transactionType === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                ]">
                  {{ tx.transactionType === 'credit' ? 'Inward' : 'Outward' }}
                </span>
              </td>
              <td class="px-10 py-8 tabular-nums">
                <p :class="['text-base font-black tracking-tight', tx.transactionType === 'credit' ? 'text-emerald-500' : 'text-slate-900']">
                  {{ tx.transactionType === 'credit' ? '+' : '-' }}₦{{ tx.nairaAmount.toLocaleString() }}
                </p>
              </td>
              <td class="px-10 py-8">
                <div class="flex items-center space-x-3">
                  <div class="flex items-center space-x-2">
                    <div :class="['w-1.5 h-1.5 rounded-full', 
                      tx.status === 'completed' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                      tx.status === 'failed' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 'bg-amber-500 animate-pulse']"></div>
                    <span class="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">{{ tx.status }}</span>
                  </div>
                  
                  <button 
                    v-if="tx.status === 'pending' && tx.reason === 'wallet_deposit'"
                    @click="manualVerify(tx.providerReference)"
                    :disabled="verifyingRef === tx.providerReference"
                    class="px-3 py-1.5 bg-primary-50 text-primary-600 hover:bg-primary-500 hover:text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 shadow-sm"
                  >
                    {{ verifyingRef === tx.providerReference ? '...' : 'Re-verify' }}
                  </button>
                </div>
              </td>
              <td class="px-10 py-8 text-right">
                <p class="text-[11px] font-black text-slate-900 italic leading-none">{{ new Date(tx.createdAt).toLocaleDateString() }}</p>
                <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">{{ new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</p>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="!loading && transactions.length === 0" class="py-32 flex flex-col items-center justify-center space-y-4">
          <div class="w-20 h-20 bg-slate-50 text-slate-200 rounded-[2rem] flex items-center justify-center">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p class="text-xs font-black text-slate-300 uppercase tracking-[0.2em] italic">No transaction records found</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="txMeta && txMeta.pages > 1" class="mt-auto px-10 py-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/10">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
          Viewing {{ transactions.length }} of {{ txMeta.total }} records
        </p>
        <div class="flex items-center space-x-3">
          <button 
            @click="changeTxPage(txMeta.page - 1)" 
            :disabled="!txMeta.hasPrevPage"
            class="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm"
          >
            <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div class="flex items-center space-x-2 px-2">
             <span class="text-xs font-black text-slate-900 tabular-nums italic">{{ txMeta.page }}</span>
             <span class="text-[10px] font-bold text-slate-300">/</span>
             <span class="text-[10px] font-black text-slate-400 tabular-nums">{{ txMeta.pages }}</span>
          </div>

          <button 
            @click="changeTxPage(txMeta.page + 1)" 
            :disabled="!txMeta.hasNextPage"
            class="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-xl hover:bg-primary-500 disabled:opacity-20 transition-all shadow-lg"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Fund Wallet Modal -->
    <div v-if="showTopupModal" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xl flex items-center justify-center z-[100] p-4">
      <div class="bg-white rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-500">
        <div class="p-10 text-center relative">
          <button @click="showTopupModal = false" class="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="w-20 h-20 bg-primary-50 text-primary-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm shadow-primary-500/10">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-3xl font-black text-slate-900 italic">Inject Liquidity</h3>
          <p class="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Capital Funding Portal</p>
        </div>
        
        <!-- Step 1: Input Amount -->
        <form v-if="topupStep === 'input'" @submit.prevent="handleCalculate" class="px-10 pb-12 space-y-8">
          <div v-if="errorMessage" class="p-5 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-[10px] font-black uppercase tracking-widest italic animate-bounce">
            {{ errorMessage }}
          </div>

          <div class="space-y-3">
            <label class="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] pl-1">Injection Value (₦)</label>
            <div class="relative group">
              <input 
                v-model="topupAmount" 
                type="number" 
                required
                min="1000"
                placeholder="50,000"
                class="w-full px-8 py-10 bg-slate-50 border border-slate-100 rounded-[2rem] focus:bg-white focus:border-primary-500 focus:ring-8 focus:ring-primary-500/5 outline-none transition-all text-5xl font-black text-center tabular-nums placeholder:text-slate-200 group-hover:bg-slate-100"
              />
              <div class="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                <span class="text-3xl font-black text-slate-200">₦</span>
              </div>
            </div>
            <div class="grid grid-cols-4 gap-3 pt-4">
               <button v-for="val in [50000, 100000, 250000, 500000]" :key="val" @click="topupAmount = val" type="button" class="py-3 bg-slate-50 hover:bg-primary-500 border border-slate-100 hover:border-primary-500 rounded-2xl text-[11px] font-black text-slate-500 hover:text-white transition-all transform hover:-translate-y-1 active:scale-95 shadow-sm">
                 {{ val/1000 }}K
               </button>
            </div>
          </div>

          <button 
            type="submit"
            :disabled="requesting"
            class="w-full py-6 bg-slate-900 text-white font-black rounded-[1.5rem] hover:bg-primary-500 transition-all shadow-2xl shadow-slate-900/10 flex items-center justify-center space-x-3 disabled:opacity-50 uppercase tracking-[0.2em] text-xs italic"
          >
            <span v-if="!requesting">Execute Breakdown</span>
            <div v-else class="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </button>
          <p class="text-center text-[9px] font-bold text-slate-200 uppercase tracking-widest">7.5% Regulatory VAT Inclusive</p>
        </form>

        <!-- Step 2: Review & Pay -->
        <div v-else-if="topupStep === 'review' && breakdown" class="px-10 pb-12 space-y-8 animate-in slide-in-from-right-10 duration-500">
          <div class="bg-slate-50 rounded-[2rem] p-8 space-y-4 border border-slate-100 shadow-inner">
            <div class="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span class="text-slate-400">Net Injection</span>
              <span class="text-slate-900 italic">₦{{ (breakdown.baseAmount || 0).toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span class="text-slate-400">Service VAT</span>
              <span class="text-slate-900 italic">₦{{ (breakdown.vatAmount || 0).toLocaleString() }}</span>
            </div>
            <div class="h-px bg-slate-200/50 my-2"></div>
            <div class="flex justify-between items-center">
              <span class="text-xs font-black uppercase text-slate-900 tracking-tighter">Gross Payable</span>
              <span class="text-3xl font-black text-primary-500 tabular-nums italic">₦{{ (breakdown.totalAmount || 0).toLocaleString() }}</span>
            </div>
          </div>

          <div class="flex flex-col space-y-4">
            <button 
              @click="handleInitiatePayment"
              :disabled="requesting"
              class="w-full py-6 bg-primary-500 text-white font-black rounded-[1.5rem] hover:bg-primary-600 transition-all shadow-2xl shadow-primary-500/20 flex items-center justify-center space-x-3 uppercase tracking-[0.2em] text-xs italic"
            >
              <span v-if="!requesting">Initialize Secure Gateway</span>
              <div v-else class="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </button>
            <button 
              @click="topupStep = 'input'; breakdown = null"
              :disabled="requesting"
              class="w-full py-3 text-slate-300 hover:text-slate-900 font-black uppercase tracking-[0.15em] text-[10px] transition-colors italic"
            >
              Back to modify
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { PartnerPortalService } from '../../../services/partner-portal.service';
import { AuthService } from '../../../services/admin/auth.service';

const transactions = ref<any[]>([]);
const walletStats = reactive({
  totalTransactions: 0,
  totalDeposits: 0,
  depositCount: 0,
  totalDeductions: 0,
  deductionCount: 0,
  netChange: 0,
  balance: 0
});

const loading = ref(true);
const requesting = ref(false);
const showTopupModal = ref(false);
const topupAmount = ref(50000);
const errorMessage = ref('');
const successMessage = ref('');
const verifyingRef = ref('');
const searchQuery = ref('');
const statusFilter = ref('');

const txMeta = ref<any>(null);

const fetchData = async (txPage = 1) => {
  try {
    loading.value = true;
    const [stats, txRes] = await Promise.all([
      PartnerPortalService.getWalletStats(),
      PartnerPortalService.getTransactions({ 
        page: txPage, 
        limit: 15,
        search: searchQuery.value,
        status: statusFilter.value || undefined
      })
    ]);
    
    Object.assign(walletStats, stats);
    transactions.value = txRes.data;
    txMeta.value = txRes.meta;
  } catch (error) {
    console.error('Failed to fetch wallet data', error);
  } finally {
    loading.value = false;
  }
};

let searchTimeout: any = null;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchData(1);
  }, 500);
};

const changeTxPage = (page: number) => {
  fetchData(page);
};

/**
 * Script injection for Paystack
 */
const loadPaystack = () => {
  return new Promise((resolve) => {
    if ((window as any).PaystackPop) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => resolve(true);
    document.body.appendChild(script);
  });
};

const topupStep = ref<'input' | 'review'>('input');
const breakdown = ref<any>(null);

const handleCalculate = async () => {
  try {
    errorMessage.value = '';
    requesting.value = true;
    const data = await PartnerPortalService.initializeWalletFunding(topupAmount.value);
    breakdown.value = data;
    topupStep.value = 'review';
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Failed to calculate payload.';
  } finally {
    requesting.value = false;
  }
};

const handleInitiatePayment = async () => {
  try {
    requesting.value = true;
    await loadPaystack();
    
    const user = AuthService.getUser();
    const paystackKey = breakdown.value.paystackPublicKey || (import.meta as any).env.VITE_PAYSTACK_PUBLIC_KEY;
    const userEmail = user?.email || ((user as any)?.firstName ? `${(user as any).firstName}@genory.co` : 'partner@genory.co');

    const handler = (window as any).PaystackPop.setup({
      key: paystackKey,
      email: userEmail,
      amount: Math.round(breakdown.value.totalAmount * 100),
      ref: breakdown.value.reference,
      callback: function(response: any) {
        showTopupModal.value = false;
        topupStep.value = 'input';
        breakdown.value = null;
        successMessage.value = 'Payment captured! Verifying...';
        manualVerify(response.reference);
      },
      onClose: function() {
        requesting.value = false;
        fetchData();
      }
    });
    
    handler.openIframe();
  } catch (error: any) {
    console.error('Failed to initiate payment', error);
    errorMessage.value = error.response?.data?.message || 'Gateway connection failed.';
    requesting.value = false;
  }
};

const manualVerify = async (reference: string) => {
  try {
    verifyingRef.value = reference;
    await PartnerPortalService.verifyWalletFunding(reference);
    successMessage.value = 'Vault balance updated successfully!';
    setTimeout(() => { successMessage.value = ''; }, 5000);
    await fetchData();
  } catch (e: any) {
    console.error('Verification failed', e);
    errorMessage.value = e.response?.data?.message || 'Transaction verification failed.';
    setTimeout(() => { errorMessage.value = ''; }, 5000);
  } finally {
    verifyingRef.value = '';
  }
};

onMounted(() => {
  fetchData();
  loadPaystack();
});
</script>

<route lang="yaml">
meta:
  layout: partner
</route>
