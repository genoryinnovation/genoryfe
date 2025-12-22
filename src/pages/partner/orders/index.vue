<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Employee Orders</h1>
        <p class="text-slate-500">Track and approve food and grocery orders.</p>
      </div>
      <div class="flex space-x-3">
        <div class="relative">
          <input 
            v-model="searchQuery" 
            @input="handleSearch"
            type="text" 
            placeholder="Search orders..." 
            class="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none w-64 transition-all"
          />
          <svg class="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="stat in orderStats" :key="stat.label" class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <p class="text-sm font-medium text-slate-500">{{ stat.label }}</p>
        <p :class="['text-2xl font-bold mt-1', stat.colorClass]">{{ stat.value }}</p>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
      <div v-if="loading" class="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-10">
        <svg class="animate-spin h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <table class="w-full text-left border-collapse">
        <thead class="bg-slate-50 border-b border-slate-200">
          <tr>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Order #</th>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Employee</th>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Amount</th>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr v-if="requests.length === 0 && !loading">
            <td colspan="6" class="px-6 py-12 text-center text-slate-500">No order requests found.</td>
          </tr>
          <tr v-for="req in requests" :key="req._id" class="hover:bg-slate-50 transition-colors">
            <td class="px-6 py-4 font-medium text-slate-900">{{ req.order?.orderNumber || 'N/A' }}</td>
            <td class="px-6 py-4">
              <p class="text-slate-900 font-medium">{{ req.user?.firstName }} {{ req.user?.lastName }}</p>
              <p class="text-xs text-slate-500">{{ req.user?.email }}</p>
            </td>
            <td class="px-6 py-4 font-bold text-slate-900">₦{{ req.amount.toLocaleString() }}</td>
            <td class="px-6 py-4 text-sm text-slate-500">{{ new Date(req.createdAt).toLocaleDateString() }}</td>
            <td class="px-6 py-4">
              <span 
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  statusClass(req.status)
                ]"
              >
                {{ req.status }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex space-x-2">
                <button 
                  v-if="req.status === 'pending'"
                  class="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors"
                  @click="initiateApproval(req)"
                >
                  Approve
                </button>
                <button 
                  v-if="req.status === 'pending'"
                  class="px-3 py-1 bg-white border border-rose-200 text-rose-600 rounded-lg text-sm hover:bg-rose-50 transition-colors"
                  @click="initiateRejection(req)"
                >
                  Reject
                </button>
                <router-link 
                  :to="`/partner/orders/${req._id}`"
                  class="px-3 py-1 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors font-bold text-slate-600"
                >
                  Details
                </router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div v-if="meta && meta.pages > 1" class="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between font-bold">
        <span class="text-sm text-slate-500">
          Showing <span class="text-slate-900">{{ meta.page * meta.limit - meta.limit + 1 }}</span> to 
          <span class="text-slate-900">{{ Math.min(meta.page * meta.limit, meta.total) }}</span> of 
          <span class="text-slate-900">{{ meta.total }}</span> entries
        </span>
        <div class="flex space-x-2">
          <button 
            @click="changePage(meta.page - 1)" 
            :disabled="!meta.hasPrevPage"
            class="px-3 py-1 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors"
          >
            Prev
          </button>
          <div class="flex space-x-1">
            <button 
              v-for="p in meta.pages" 
              :key="p"
              @click="changePage(p)"
              :class="['px-3 py-1 border rounded-lg transition-colors', meta.page === p ? 'bg-primary-600 text-white border-primary-600' : 'bg-white border-slate-200 hover:bg-slate-50']"
            >
              {{ p }}
            </button>
          </div>
          <button 
            @click="changePage(meta.page + 1)" 
            :disabled="!meta.hasNextPage"
            class="px-3 py-1 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Approval/Rejection Modal -->
    <div v-if="showProcessModal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div class="p-6 border-b border-slate-100">
          <h3 class="text-xl font-bold text-slate-900">{{ processAction === 'approve' ? 'Approve' : 'Reject' }} Order</h3>
        </div>
        <div class="p-6 space-y-4">
          <!-- API Feedback -->
          <div v-if="processError" class="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-sm font-medium animate-in fade-in slide-in-from-top-1">
            {{ processError }}
          </div>
          <div v-if="processSuccess" class="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-sm font-medium animate-in fade-in slide-in-from-top-1">
            {{ processSuccess }}
          </div>

          <p class="text-slate-600 text-sm">
            {{ processAction === 'approve' 
              ? 'Enter the company approval PIN to confirm this payment.' 
              : 'Please provide a reason for rejecting this order request.' }}
          </p>

          <div v-if="processAction === 'approve' && !requireOtp" class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Approval PIN</label>
            <input 
              v-model="pin" 
              type="password" 
              maxlength="6"
              placeholder="••••••"
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-center text-2xl tracking-widest"
              autofocus 
            />
          </div>

          <div v-if="requireOtp" class="space-y-1 animate-in slide-in-from-bottom-4 duration-300">
            <label class="text-sm font-medium text-slate-700">Email Verification Code (OTP)</label>
            <input 
              v-model="otp" 
              type="text" 
              maxlength="6"
              placeholder="000000"
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-center text-2xl tracking-widest font-mono"
              autofocus 
            />
            <p class="text-[10px] text-slate-500 text-center mt-2">Enter the 6-digit code sent to your email.</p>
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Internal Notes (Optional)</label>
            <textarea 
              v-model="notes" 
              rows="3"
              class="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none"
              placeholder="Add any comments here..."
            ></textarea>
          </div>

          <div class="pt-4 flex space-x-3">
            <button 
              @click="showProcessModal = false"
              class="flex-1 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="handleProcess"
              :disabled="loading"
              :class="[
                'flex-1 py-3 text-white font-bold rounded-xl transition-all',
                processAction === 'approve' ? 'bg-primary-600 hover:bg-primary-700' : 'bg-rose-600 hover:bg-rose-700'
              ]"
            >
              {{ loading ? 'Processing...' : (processAction === 'approve' ? 'Confirm Approval' : 'Confirm Rejection') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PartnerPortalService } from '../../../services/partner-portal.service';

const requests = ref<any[]>([]);
const loading = ref(true);
const orderStats = ref([
  { label: 'Total Requests', value: '0', colorClass: 'text-slate-900' },
  { label: 'Pending', value: '0', colorClass: 'text-amber-600' },
  { label: 'Approved', value: '0', colorClass: 'text-emerald-600' },
  { label: 'Rejected', value: '0', colorClass: 'text-rose-600' },
]);

// Modal State
const showProcessModal = ref(false);
const processAction = ref<'approve' | 'reject'>('approve');
const selectedRequest = ref<any>(null);
const pin = ref('');
const otp = ref('');
const notes = ref('');
const processError = ref('');
const processSuccess = ref('');
const requireOtp = ref(false);

// Pagination & Search
const searchQuery = ref('');
const meta = ref<any>(null);
const searchTimeout = ref<any>(null);

const fetchRequests = async (page = 1) => {
  try {
    loading.value = true;
    const res = await PartnerPortalService.getOrderRequests({ page, limit: 10, search: searchQuery.value });
    requests.value = res.data;
    meta.value = res.meta;
    
    // Update simple stats from the current list (limited but gives immediate feedback)
    const pending = requests.value.filter(r => r.status === 'pending').length;
    const approved = requests.value.filter(r => r.status === 'approved').length;
    const rejected = requests.value.filter(r => r.status === 'rejected').length;
    
    orderStats.value[0].value = meta.value?.total.toString() || '0';
    orderStats.value[1].value = pending.toString();
    orderStats.value[2].value = approved.toString();
    orderStats.value[3].value = rejected.toString();
  } catch (error) {
    console.error('Failed to fetch requests', error);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    fetchRequests(1);
  }, 500);
};

const changePage = (page: number) => {
  fetchRequests(page);
};

const statusClass = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-amber-100 text-amber-800';
    case 'approved': return 'bg-emerald-100 text-emerald-800';
    case 'rejected': return 'bg-rose-100 text-rose-800';
    default: return 'bg-slate-100 text-slate-800';
  }
};

const initiateApproval = (req: any) => {
  selectedRequest.value = req;
  processAction.value = 'approve';
  pin.value = '';
  otp.value = '';
  requireOtp.value = false;
  notes.value = '';
  showProcessModal.value = true;
};

const initiateRejection = (req: any) => {
  selectedRequest.value = req;
  processAction.value = 'reject';
  pin.value = '';
  notes.value = '';
  showProcessModal.value = true;
};

const handleProcess = async () => {
  if (!selectedRequest.value) return;
  
  try {
    processError.value = '';
    processSuccess.value = '';
    loading.value = true;
    
    const res = await PartnerPortalService.processOrder({
      requestId: selectedRequest.value._id,
      action: processAction.value,
      pin: pin.value,
      otp: otp.value,
      notes: notes.value
    });

    if (res && res.requireOtp) {
      requireOtp.value = true;
      processSuccess.value = 'Verification code sent to your email.';
      setTimeout(() => { processSuccess.value = ''; }, 3000);
      return;
    }
    
    processSuccess.value = `Order ${processAction.value === 'approve' ? 'approved' : 'rejected'} successfully!`;
    await fetchRequests();
    
    setTimeout(() => {
      showProcessModal.value = false;
      processSuccess.value = '';
    }, 1500);
  } catch (error: any) {
    console.error('Failed to process request', error);
    processError.value = error.response?.data?.message || `Failed to ${processAction.value} request.`;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchRequests);
</script>

<route lang="yaml">
meta:
  layout: partner
</route>
