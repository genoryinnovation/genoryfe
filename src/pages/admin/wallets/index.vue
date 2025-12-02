<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900 mb-6">Wallets</h1>

    <!-- Stats -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Total Naira Balance</dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">NGN {{ (stats.totalNairaBalance || 0).toLocaleString() }}</dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Total Token Balance</dt>
          <dd class="mt-1 text-3xl font-semibold text-purple-600">{{ (stats.totalTokenBalance || 0).toLocaleString() }} TKN</dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Total Wallets</dt>
          <dd class="mt-1 text-3xl font-semibold text-blue-600">{{ stats.totalWallets || 0 }}</dd>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div class="mb-6">
      <input
        v-model="search"
        @input="debouncedFetch"
        type="text"
        placeholder="Search by user name or email..."
        class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <!-- Wallet List -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Naira Balance
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Token Balance
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="wallet in wallets" :key="wallet._id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                  {{ wallet.userDetails?.firstName?.charAt(0) }}{{ wallet.userDetails?.lastName?.charAt(0) }}
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ wallet.userDetails?.firstName }} {{ wallet.userDetails?.lastName }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ wallet.userDetails?.email }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
              NGN {{ (wallet.nairaBalance || 0).toLocaleString() }}
              <span v-if="wallet.nairaLocked > 0" class="text-xs text-gray-500 block">Locked: {{ wallet.nairaLocked.toLocaleString() }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">
              {{ (wallet.tokenBalance || 0).toLocaleString() }} TKN
              <span v-if="wallet.tokenLocked > 0" class="text-xs text-gray-500 block">Locked: {{ wallet.tokenLocked.toLocaleString() }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ new Date(wallet.updatedAt).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <router-link :to="`/admin/users/${wallet.user}`" class="text-blue-600 hover:text-blue-900">
                View User
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex justify-between items-center">
      <div class="text-sm text-gray-700">
        Showing page {{ pagination.page }} of {{ pagination.pages }} ({{ pagination.total }} results)
      </div>
      <div class="flex space-x-2">
        <button
          @click="changePage(pagination.page - 1)"
          :disabled="pagination.page === 1"
          class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          @click="changePage(pagination.page + 1)"
          :disabled="pagination.page === pagination.pages"
          class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { WalletService } from '../../../services/admin/wallet.service';

const wallets = ref<any[]>([]);
const stats = ref<any>({});
const search = ref('');
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 1,
});

let debounceTimeout: any;

const fetchWallets = async () => {
  try {
    const [listRes, statsRes] = await Promise.all([
      WalletService.getWallets(
        pagination.value.page,
        pagination.value.limit,
        search.value
      ),
      WalletService.getWalletStats(),
    ]);
    wallets.value = listRes.data.wallets;
    pagination.value = listRes.data.pagination;
    stats.value = statsRes.data;
  } catch (error) {
    console.error('Failed to fetch wallets', error);
  }
};

const debouncedFetch = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    pagination.value.page = 1;
    fetchWallets();
  }, 300);
};

const changePage = (page: number) => {
  if (page >= 1 && page <= pagination.value.pages) {
    pagination.value.page = page;
    fetchWallets();
  }
};

onMounted(() => {
  fetchWallets();
});
</script>
