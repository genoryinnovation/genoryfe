<template>
  <div class="space-y-8 text-slate-900">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 font-montserrat">Withdrawal Requests</h1>
        <p class="mt-1 text-sm text-slate-500">Review and process partner payout requests</p>
      </div>
      <div class="mt-4 sm:mt-0 flex items-center space-x-3">
        <button 
          @click="fetchWithdrawals"
          class="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
        >
          <svg :class="['w-4 h-4 mr-2', loading ? 'animate-spin' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <p class="text-sm font-medium text-slate-500">Pending Requests</p>
        <p class="mt-2 text-3xl font-bold text-blue-600 font-montserrat">{{ pendingCount }}</p>
      </div>
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <p class="text-sm font-medium text-slate-500">Total volume</p>
        <p class="mt-2 text-3xl font-bold text-slate-900 font-montserrat">₦{{ totalVolume.toLocaleString() }}</p>
      </div>
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <p class="text-sm font-medium text-slate-500">Completed Payouts</p>
        <p class="mt-2 text-3xl font-bold text-emerald-600 font-montserrat">{{ completedCount }}</p>
      </div>
    </div>

    <!-- Withdrawals Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative min-h-[400px]">
      <div v-if="loading" class="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-10">
        <svg class="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead>
            <tr class="bg-slate-50">
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Reference</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Partner</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Bank Details</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
              <th scope="col" class="relative px-6 py-4"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="withdrawals.length === 0 && !loading">
              <td colspan="7" class="px-6 py-12 text-center text-slate-500">No withdrawal requests found.</td>
            </tr>
            <tr v-for="w in withdrawals" :key="w._id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-xs font-mono font-bold text-slate-900 uppercase">#{{ w.reference }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                    {{ w.user?.firstName?.charAt(0) || 'P' }}
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-semibold text-slate-900">{{ w.user?.firstName }} {{ w.user?.lastName }}</div>
                    <div class="text-xs text-slate-500 italic">{{ w.user?.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-slate-900">₦{{ w.amount.toLocaleString() }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-xs text-slate-900 font-medium">{{ w.bankDetails.bankName }}</div>
                <div class="text-xs text-slate-500">{{ w.bankDetails.accountNumber }} - {{ w.bankDetails.accountName }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider', getStatusColor(w.status)]">
                  {{ w.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-xs text-slate-500">{{ new Date(w.createdAt).toLocaleDateString() }}</div>
                <div class="text-[10px] text-slate-400 font-medium">{{ new Date(w.createdAt).toLocaleTimeString() }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div v-if="w.status === 'pending'" class="flex items-center justify-end space-x-2">
                  <button 
                    @click="handleApprove(w)"
                    :disabled="processingId === w._id"
                    class="px-3 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-sm disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button 
                    @click="promptReject(w)"
                    :disabled="processingId === w._id"
                    class="px-3 py-1.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-sm disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
                <div v-else-if="w.rejectionReason" class="text-xs text-rose-500 max-w-[150px] truncate" :title="w.rejectionReason">
                  {{ w.rejectionReason }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { WithdrawalService, Withdrawal } from '../../../services/admin/withdrawal.service';
const withdrawals = ref<Withdrawal[]>([]);
const loading = ref(true);
const processingId = ref<string | null>(null);

const fetchWithdrawals = async () => {
  try {
    loading.value = true;
    const response = await WithdrawalService.getAllWithdrawals();
    withdrawals.value = response.data;
  } catch (error) {
    console.error('Failed to fetch withdrawals', error);
  } finally {
    loading.value = false;
  }
};

const pendingCount = computed(() => withdrawals.value.filter(w => w.status === 'pending').length);
const totalVolume = computed(() => withdrawals.value.reduce((acc, w) => acc + w.amount, 0));
const completedCount = computed(() => withdrawals.value.filter(w => w.status === 'completed').length);

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    processing: 'bg-blue-100 text-blue-700',
    completed: 'bg-emerald-100 text-emerald-700',
    failed: 'bg-rose-100 text-rose-700',
    rejected: 'bg-slate-100 text-slate-700',
  };
  return colors[status.toLowerCase()] || 'bg-slate-100 text-slate-700';
};

const handleApprove = async (withdrawal: Withdrawal) => {
  const confirmed = window.confirm(`Are you sure you want to approve this withdrawal of ₦${withdrawal.amount.toLocaleString()}? This will initiate a Paystack transfer.`);

  if (confirmed) {
    try {
      processingId.value = withdrawal._id;
      await WithdrawalService.approveWithdrawal(withdrawal._id);
      alert('Withdrawal has been processed successfully.');
      fetchWithdrawals();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to approve withdrawal');
    } finally {
      processingId.value = null;
    }
  }
};

const promptReject = async (withdrawal: Withdrawal) => {
  const reason = window.prompt('Reason for rejection:');

  if (reason) {
    try {
      processingId.value = withdrawal._id;
      await WithdrawalService.rejectWithdrawal(withdrawal._id, reason);
      alert('Withdrawal has been rejected.');
      fetchWithdrawals();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to reject withdrawal');
    } finally {
      processingId.value = null;
    }
  }
};

onMounted(() => {
  fetchWithdrawals();
});
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
