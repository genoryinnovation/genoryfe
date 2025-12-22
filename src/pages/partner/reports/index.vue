<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Reports & Billing</h1>
        <p class="mt-1 text-sm text-slate-500">Track monthly expenditures and reconcile balances</p>
      </div>
    </div>

    <!-- Monthly Summary Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead>
            <tr class="bg-slate-50">
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Billing Month</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Total Orders</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Total Spent</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Last Activity</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="loading" v-for="i in 3" :key="i">
              <td colspan="5" class="px-6 py-8">
                <div class="h-4 bg-slate-50 rounded animate-pulse w-full"></div>
              </td>
            </tr>
            <tr v-else-if="reports.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-slate-500">No reports generated yet.</td>
            </tr>
            <tr v-for="report in reports" :key="`${report._id.year}-${report._id.month}`" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mr-3 font-bold text-xs uppercase">
                    {{ getMonthName(report._id.month).slice(0, 3) }}
                  </div>
                  <div>
                    <p class="font-bold text-slate-900">{{ getMonthName(report._id.month) }} {{ report._id.year }}</p>
                    <p class="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{{ report.planType }} billing cycle</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                {{ report.orderCount }} Orders
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm font-black text-slate-900">₦{{ report.totalSpent.toLocaleString() }}</p>
              </td>
               <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                {{ new Date(report.lastTransactionAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest',
                  report.status === 'settled' ? 'bg-emerald-100 text-emerald-800' : 
                  report.status === 'overdue' ? 'bg-rose-100 text-rose-800' :
                  report.status === 'due' ? 'bg-amber-100 text-amber-800' :
                  'bg-slate-100 text-slate-600'
                ]">
                  {{ 
                    report.status === 'settled' ? 'Settled' : 
                    report.status === 'overdue' ? 'Overdue' :
                    report.status === 'due' ? 'Payment Due' :
                    'Open Cycle'
                  }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right space-x-2">
                <button 
                  @click="handleExport(report._id.year, report._id.month)"
                  class="inline-flex items-center px-3 py-1.5 border border-slate-200 text-xs font-bold text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export CSV
                </button>
                <button 
                  @click="handleReconcile(report)"
                  :disabled="report.status === 'settled' || report.status === 'open'"
                  :class="[
                    'inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-lg transition-colors',
                    (report.status === 'settled' || report.status === 'open') ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'
                  ]"
                >
                  {{ 
                    report.status === 'settled' ? 'Settled' : 
                    report.status === 'open' ? 'Cycle Open' : 
                    'Trigger Payment' 
                  }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Reconciliation Alert -->
      <div class="p-6 bg-slate-50 border-t border-slate-100">
        <div class="flex items-start space-x-4">
          <div class="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900">About Monthly Reconciliation</h4>
            <p class="mt-1 text-xs text-slate-500 leading-relaxed max-w-2xl">
              Monthly reports aggregate all employee spendings. The "Trigger Payment" action allows you to fund your company wallet with the total amount for that month, ensuring your account remains in good standing. Cleared status is automatically updated when your wallet balance covers the monthly expenditure.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Instructions -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-indigo-600 rounded-2xl p-8 text-white shadow-lg overflow-hidden relative">
        <div class="relative z-10">
          <h3 class="text-xl font-bold mb-2">Need a Custom Report?</h3>
          <p class="text-indigo-100 text-sm mb-6 opacity-80">Contact our support team if you require specialized data formats or reconciliation assistance.</p>
          <button class="px-6 py-2.5 bg-white text-indigo-600 font-bold rounded-xl text-xs hover:bg-indigo-50 transition-colors">
            Contact Support
          </button>
        </div>
        <svg class="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { PartnerPortalService } from '../../../services/partner-portal.service';

const router = useRouter();
const reports = ref<any[]>([]);
const loading = ref(true);

const fetchReports = async () => {
  try {
    loading.value = true;
    const data = await PartnerPortalService.getMonthlyReports();
    reports.value = data;
  } catch (error) {
    console.error('Failed to fetch monthly reports', error);
  } finally {
    loading.value = false;
  }
};

const getMonthName = (month: number) => {
  return new Date(2000, month - 1).toLocaleString('default', { month: 'long' });
};

const handleExport = async (year: number, month: number) => {
  try {
    const blob = await PartnerPortalService.exportMonthlyReport(year, month);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Monthly_Report_${year}_${month}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Failed to export report', error);
    alert('Failed to generate CSV. Please try again later.');
  }
};

const handleReconcile = (report: any) => {
  // Pass the amount and month details to the wallet page for funding
  router.push({
    path: '/partner/wallet',
    query: { 
      amount: report.totalSpent.toString(), 
      autoFund: 'true',
      year: report._id.year.toString(),
      month: report._id.month.toString()
    }
  });
};

onMounted(fetchReports);
</script>

<route lang="yaml">
meta:
  layout: partner
</route>
