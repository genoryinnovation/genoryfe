<template>
  <div v-if="user" class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center space-x-4">
        <button
          @click="router.back()"
          class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 class="text-2xl font-bold text-slate-900">User Details</h1>
          <p class="mt-1 text-sm text-slate-500">View user information and manage wallet</p>
        </div>
      </div>
    </div>

    <!-- User Profile Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-8">
        <div class="flex items-center">
          <div class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold border-4 border-white/30">
            {{ user.firstName?.charAt(0) }}{{ user.lastName?.charAt(0) }}
          </div>
          <div class="ml-5">
            <h3 class="text-2xl font-bold text-white">
              {{ user.firstName }} {{ user.lastName }}
            </h3>
            <p class="text-primary-100 mt-1">
              Member since {{ new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }}
            </p>
          </div>
        </div>
      </div>
      <div class="px-6 py-5">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex items-center space-x-3">
            <div class="p-2 bg-slate-100 rounded-lg">
              <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-slate-500">Email</p>
              <p class="text-sm font-medium text-slate-900">{{ user.email }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="p-2 bg-slate-100 rounded-lg">
              <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-slate-500">Phone</p>
              <p class="text-sm font-medium text-slate-900">{{ user.phone || 'N/A' }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="p-2 bg-slate-100 rounded-lg">
              <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-slate-500">Joined</p>
              <p class="text-sm font-medium text-slate-900">{{ new Date(user.createdAt).toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wallet Section -->
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold text-slate-900">Wallet</h2>
        <button
          @click="showTopUpModal = true"
          class="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/25 transition-all"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Top Up Wallet
        </button>
      </div>

      <!-- Wallet Balance Cards -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-emerald-100 text-sm font-medium">Naira Balance</p>
              <p class="mt-2 text-3xl font-bold">NGN {{ (wallet?.nairaBalance || 0).toLocaleString() }}</p>
              <p v-if="wallet?.nairaLocked > 0" class="mt-2 text-sm text-emerald-200 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Locked: NGN {{ wallet.nairaLocked.toLocaleString() }}
              </p>
            </div>
            <div class="p-3 bg-white/20 rounded-xl">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-violet-100 text-sm font-medium">Token Balance</p>
              <p class="mt-2 text-3xl font-bold">{{ (wallet?.tokenBalance || 0).toLocaleString() }} TKN</p>
              <p v-if="wallet?.tokenLocked > 0" class="mt-2 text-sm text-violet-200 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Locked: {{ wallet.tokenLocked.toLocaleString() }} TKN
              </p>
            </div>
            <div class="p-3 bg-white/20 rounded-xl">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
          <div class="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900">Recent Transactions</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200">
            <thead>
              <tr class="bg-slate-50">
                <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Reference</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="tx in transactions" :key="tx._id" class="hover:bg-slate-50/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {{ new Date(tx.createdAt).toLocaleDateString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 capitalize">
                    {{ tx.transactionType }} ({{ tx.reason.replace(/_/g, ' ') }})
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold" :class="tx.transactionType === 'credit' ? 'text-emerald-600' : 'text-rose-600'">
                  {{ tx.transactionType === 'credit' ? '+' : '-' }} 
                  <span v-if="tx.amountType === 'token'">{{ (tx.tokenAmount || 0).toLocaleString() }} TKN</span>
                  <span v-else>NGN {{ (tx.nairaAmount || 0).toLocaleString() }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                    :class="{
                      'bg-emerald-100 text-emerald-700': tx.status === 'completed',
                      'bg-amber-100 text-amber-700': tx.status === 'pending',
                      'bg-rose-100 text-rose-700': tx.status === 'failed'
                    }"
                  >
                    <span 
                      class="w-1.5 h-1.5 rounded-full mr-1.5"
                      :class="{
                        'bg-emerald-500': tx.status === 'completed',
                        'bg-amber-500': tx.status === 'pending',
                        'bg-rose-500': tx.status === 'failed'
                      }"
                    ></span>
                    {{ tx.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                  {{ tx.reference }}
                </td>
              </tr>
              <tr v-if="transactions.length === 0">
                <td colspan="5" class="px-6 py-12 text-center">
                  <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p class="mt-4 text-sm text-slate-500">No transactions found.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Top Up Modal -->
    <Teleport to="body">
      <div v-if="showTopUpModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-screen items-center justify-center p-4">
          <div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" @click="showTopUpModal = false"></div>
          <div class="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all">
            <div class="flex items-center space-x-3 mb-6">
              <div class="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-slate-900">Top Up Wallet</h3>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                <select v-model="topUpType" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                  <option value="naira">Naira (NGN)</option>
                  <option value="token">Token (TKN)</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Amount</label>
                <input type="number" v-model="topUpAmount" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" placeholder="Enter amount">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Notes</label>
                <textarea v-model="topUpNotes" rows="3" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none" placeholder="Add a note (optional)"></textarea>
              </div>
            </div>

            <div class="flex space-x-3 mt-6">
              <button
                type="button"
                class="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                @click="showTopUpModal = false"
              >
                Cancel
              </button>
              <button
                type="button"
                class="flex-1 inline-flex justify-center items-center px-4 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
                @click="handleTopUp"
                :disabled="isProcessing"
              >
                <svg v-if="isProcessing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isProcessing ? 'Processing...' : 'Top Up' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>

  <!-- Loading State -->
  <div v-else class="flex flex-col items-center justify-center py-16">
    <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
    <p class="mt-4 text-sm text-slate-500">Loading user details...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { UserService, User } from '../../../services/admin/user.service';
import { WalletService } from '../../../services/admin/wallet.service';

const route = useRoute();
const router = useRouter();
const user = ref<User | null>(null);
const wallet = ref<any>(null);
const transactions = ref<any[]>([]);
const showTopUpModal = ref(false);
const topUpAmount = ref(0);
const topUpType = ref<'naira' | 'token'>('naira');
const topUpNotes = ref('');
const isProcessing = ref(false);

const fetchUser = async () => {
  try {
    const id = route.params.id as string;
    const response = await UserService.getUser(id);
    user.value = response.data;
    await fetchWalletData(id);
  } catch (error) {
    console.error('Failed to fetch user', error);
  }
};

const fetchWalletData = async (userId: string) => {
  try {
    const [walletRes, txRes] = await Promise.all([
      WalletService.getWallet(userId),
      WalletService.getTransactions(userId),
    ]);
    wallet.value = walletRes.data;
    transactions.value = txRes.data.transactions;
  } catch (error) {
    console.error('Failed to fetch wallet data', error);
  }
};

const handleTopUp = async () => {
  if (topUpAmount.value <= 0) {
    alert('Please enter a valid amount');
    return;
  }

  isProcessing.value = true;
  try {
    await WalletService.topUpWallet(
      route.params.id as string,
      topUpAmount.value,
      topUpType.value,
      topUpNotes.value
    );
    alert('Wallet topped up successfully');
    showTopUpModal.value = false;
    topUpAmount.value = 0;
    topUpType.value = 'naira';
    topUpNotes.value = '';
    await fetchWalletData(route.params.id as string);
  } catch (error) {
    console.error('Failed to top up wallet', error);
    alert('Failed to top up wallet');
  } finally {
    isProcessing.value = false;
  }
};

onMounted(() => {
  fetchUser();
});
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
