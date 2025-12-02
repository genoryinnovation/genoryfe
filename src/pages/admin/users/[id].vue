<template>
  <div v-if="user">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">
        User Details
      </h1>
      <button
        @click="router.back()"
        class="text-gray-600 hover:text-gray-900"
      >
        Back to Users
      </button>
    </div>

    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ user.firstName }} {{ user.lastName }}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Full name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user.firstName }} {{ user.lastName }}</dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Email address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user.email }}</dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Phone number</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user.phone || 'N/A' }}</dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Joined</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ new Date(user.createdAt).toLocaleDateString() }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Wallet Section -->
    <div class="mt-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-900">Wallet</h2>
        <button
          @click="showTopUpModal = true"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          Top Up Wallet
        </button>
      </div>

      <!-- Wallet Balance -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-6">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dt class="text-sm font-medium text-gray-500 truncate">Naira Balance</dt>
            <dd class="mt-1 text-3xl font-semibold text-gray-900">NGN {{ (wallet?.nairaBalance || 0).toLocaleString() }}</dd>
            <dd v-if="wallet?.nairaLocked > 0" class="mt-1 text-sm text-gray-500">Locked: NGN {{ wallet.nairaLocked.toLocaleString() }}</dd>
          </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dt class="text-sm font-medium text-gray-500 truncate">Token Balance</dt>
            <dd class="mt-1 text-3xl font-semibold text-purple-600">{{ (wallet?.tokenBalance || 0).toLocaleString() }} TKN</dd>
            <dd v-if="wallet?.tokenLocked > 0" class="mt-1 text-sm text-gray-500">Locked: {{ wallet.tokenLocked.toLocaleString() }} TKN</dd>
          </div>
        </div>
      </div>

      <!-- Transactions -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Recent Transactions
          </h3>
        </div>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="tx in transactions" :key="tx._id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(tx.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                {{ tx.transactionType }} ({{ tx.reason.replace(/_/g, ' ') }})
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" :class="tx.transactionType === 'credit' ? 'text-green-600' : 'text-red-600'">
                {{ tx.transactionType === 'credit' ? '+' : '-' }} 
                <span v-if="tx.amountType === 'token'">{{ (tx.tokenAmount || 0).toLocaleString() }} TKN</span>
                <span v-else>NGN {{ (tx.nairaAmount || 0).toLocaleString() }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': tx.status === 'completed',
                    'bg-yellow-100 text-yellow-800': tx.status === 'pending',
                    'bg-red-100 text-red-800': tx.status === 'failed'
                  }"
                >
                  {{ tx.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ tx.reference }}
              </td>
            </tr>
            <tr v-if="transactions.length === 0">
              <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
                No transactions found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Top Up Modal -->
    <div v-if="showTopUpModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showTopUpModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Top Up Wallet
                </h3>
                <div class="mt-2">
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Currency</label>
                    <select v-model="topUpType" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                      <option value="naira">Naira (NGN)</option>
                      <option value="token">Token (TKN)</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Amount</label>
                    <input type="number" v-model="topUpAmount" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea v-model="topUpNotes" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="handleTopUp"
              :disabled="isProcessing"
            >
              {{ isProcessing ? 'Processing...' : 'Top Up' }}
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="showTopUpModal = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-12">
    <p class="text-gray-500">Loading user details...</p>
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
