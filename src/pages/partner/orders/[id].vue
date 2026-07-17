<template>
  <div class="pb-12">
    <!-- Status Strip -->
    <div :class="['h-1 w-full', statusStripClass]"></div>

    <div class="space-y-6 max-w-5xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between px-4 pt-8">
        <div class="flex items-center space-x-4">
          <router-link to="/partner/orders" class="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-900">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </router-link>
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Request</p>
            <h1 class="text-lg font-black text-slate-900 italic">{{ request?.order?.orderNumber || 'Loading...' }}</h1>
          </div>
        </div>
        <p class="text-[10px] font-bold text-slate-400">{{ request?.createdAt ? new Date(request.createdAt).toLocaleDateString() : '—' }}</p>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center py-24 space-y-4">
        <div class="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
        <p class="text-slate-400 font-medium animate-pulse">Retrieving order details...</p>
      </div>

      <div v-else-if="request" class="grid grid-cols-1 lg:grid-cols-5 gap-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <!-- Left Column: Financial & Delivery Info -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Financial Summary Card -->
          <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 class="font-black text-slate-900 uppercase text-sm tracking-widest">Order Amount</h3>
              <span :class="['px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest', statusClass]">
                {{ request.status }}
              </span>
            </div>
            <div class="p-8 space-y-6">
              <!-- Privacy notice -->
              <div class="flex items-center space-x-2 px-3 py-2 bg-slate-50 rounded-full border border-slate-100 text-[10px] text-slate-500">
                <svg class="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Item details are private. Review based on amount and policy.</span>
              </div>

              <!-- Receipt-style breakdown -->
              <div class="space-y-3">
                <!-- Items count -->
                <div class="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span class="text-slate-600 font-medium">{{ request.order?.items?.length || 0 }} {{ request.order?.items?.length === 1 ? 'Item' : 'Items' }}</span>
                  <span class="text-slate-400 text-sm">—</span>
                </div>

                <!-- Base amount -->
                <div class="flex justify-between items-center">
                  <span class="text-slate-600 font-medium">Base Amount</span>
                  <span class="text-slate-900 font-bold">₦{{ (request.metadata?.baseAmount || request.amount).toLocaleString() }}</span>
                </div>

                <!-- Service fee breakdown -->
                <div v-if="request.metadata?.totalServiceFeeAmount > 0" class="space-y-2 pb-3 border-b border-slate-100">
                  <div class="flex justify-between items-center">
                    <span class="text-slate-600 font-medium">Service Fee</span>
                    <span class="text-slate-900 font-bold">₦{{ request.metadata.totalServiceFeeAmount.toLocaleString() }} <span class="text-[10px] text-slate-400 ml-1">({{ request.metadata.totalServiceFeePercentage || 0 }}%)</span></span>
                  </div>
                  <!-- Platform fee sub-row -->
                  <div v-if="request.metadata.platformServiceFeeAmount > 0" class="flex justify-between items-center ml-4">
                    <span class="text-slate-500 text-sm">Platform</span>
                    <span class="text-slate-700 text-sm">₦{{ request.metadata.platformServiceFeeAmount.toLocaleString() }}</span>
                  </div>
                  <!-- Company fee sub-row -->
                  <div v-if="request.metadata.companyServiceFeeAmount > 0" class="flex justify-between items-center ml-4">
                    <span class="text-slate-500 text-sm">Company</span>
                    <span class="text-slate-700 text-sm">₦{{ request.metadata.companyServiceFeeAmount.toLocaleString() }}</span>
                  </div>
                </div>

                <!-- Total -->
                <div class="flex justify-between items-center pt-2 border-t-2 border-slate-200">
                  <span class="font-black text-slate-900 uppercase tracking-widest text-sm">Total</span>
                  <span class="text-3xl font-black text-primary-600">₦{{ request.amount.toLocaleString() }}</span>
                </div>
              </div>

              <!-- Wallet balance check (prepaid) -->
              <div v-if="planType === 'prepaid'" class="pt-4 border-t border-slate-100 space-y-2">
                <div class="flex justify-between items-center text-[10px] font-bold">
                  <span class="text-slate-400 uppercase tracking-widest">Wallet Balance</span>
                  <span :class="walletBalance < request.amount ? 'text-rose-600' : 'text-emerald-600'">
                    ₦{{ walletBalance.toLocaleString() }}
                  </span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-2">
                  <div :class="['h-full rounded-full transition-all', walletBalance < request.amount ? 'bg-rose-500' : 'bg-emerald-500']" :style="{ width: Math.min((walletBalance / request.amount) * 100, 100) + '%' }"></div>
                </div>
                <p v-if="walletBalance < request.amount" class="text-[10px] text-rose-600 font-bold">⚠️ Insufficient balance by ₦{{ (request.amount - walletBalance).toLocaleString() }}</p>
              </div>
            </div>
          </div>

          <!-- Delivery Card -->
          <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm font-bold text-slate-900 mb-4">
                  {{ request.order?.deliveryAddress?.street || 'N/A' }}<br>
                  {{ request.order?.deliveryAddress?.city }}, {{ request.order?.deliveryAddress?.state || '' }}
                </p>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Contact</p>
                    <p class="text-sm font-bold text-slate-900">{{ request.order?.deliveryAddress?.contactName || request.user?.firstName }}</p>
                  </div>
                  <div>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Phone</p>
                    <p class="text-sm font-bold text-slate-900">{{ request.order?.deliveryAddress?.phone || 'N/A' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Employee & Decision -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Employee Profile Card -->
          <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div :class="['h-1 w-full', 'bg-primary-500']"></div>
            <div class="p-8 text-center">
              <div class="w-16 h-16 bg-primary-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-primary-500/20">
                {{ request.user?.firstName[0] }}{{ request.user?.lastName[0] }}
              </div>
              <h3 class="text-lg font-black text-slate-900 italic">{{ request.user?.firstName }} {{ request.user?.lastName }}</h3>
              <p class="text-sm text-slate-500 font-medium mt-1">{{ request.user?.email }}</p>

              <div class="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 text-left">
                <div>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Staff ID</p>
                  <p class="text-xs font-bold text-slate-900">{{ request.user?.hrEmployeeId || 'N/A' }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Requested</p>
                  <p class="text-xs font-bold text-slate-900">{{ new Date(request.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Decision Panel (pending) -->
          <div v-if="request.status === 'pending'" class="space-y-3">
            <button
              @click="openApprovalModal('approve')"
              class="w-full py-4 bg-emerald-500 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>APPROVE</span>
            </button>
            <button
              @click="openApprovalModal('reject')"
              class="w-full py-4 bg-slate-900 text-rose-400 font-bold rounded-2xl hover:bg-slate-800 transition-all border border-rose-400/20"
            >
              REJECT
            </button>
          </div>

          <!-- Resolution Card (processed) -->
          <div v-else class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div :class="['flex items-center space-x-3 mb-6 pb-6 border-b', request.status === 'approved' ? 'border-emerald-100' : 'border-rose-100']">
              <div :class="['w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0', request.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600']">
                <svg v-if="request.status === 'approved'" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <span :class="['text-sm font-black uppercase tracking-widest', request.status === 'approved' ? 'text-emerald-700' : 'text-rose-700']">
                {{ request.status === 'approved' ? 'Approved' : 'Rejected' }}
              </span>
            </div>

            <div class="space-y-3">
              <div>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Processed By</p>
                <p class="text-sm font-bold text-slate-900">{{ request.processedBy?.firstName || 'System' }} {{ request.processedBy?.lastName || '' }}</p>
              </div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ new Date(request.updatedAt).toLocaleString() }}</p>
            </div>

            <div v-if="request.processedNotes" class="mt-6 pt-6 border-t border-slate-100">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Notes</p>
              <p class="text-sm text-slate-600 italic">"{{ request.processedNotes }}"</p>
            </div>
            <div v-if="request.rejectionReason" class="mt-6 pt-6 border-t border-rose-100 bg-rose-50 rounded-2xl p-4">
              <p class="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-2">Rejection Reason</p>
              <p class="text-sm text-rose-700 italic">"{{ request.rejectionReason }}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PIN Modal Component (can be shared, but local for now) -->
    <div v-if="showPinModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
       <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in duration-300">
         <!-- Action badge -->
         <div class="px-10 pt-6 pb-4 border-b border-slate-100">
           <div class="flex items-center justify-between mb-4">
             <span :class="['px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest', activeAction === 'approve' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800']">
               {{ activeAction === 'approve' ? 'Approving' : 'Rejecting' }}
             </span>
             <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ request?.order?.orderNumber }}</span>
           </div>
           <p class="text-3xl font-black text-slate-900">₦{{ request?.amount.toLocaleString() }}</p>
         </div>

         <div class="p-10 text-center">
            <div class="w-16 h-16 bg-slate-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <svg class="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-2xl font-black text-slate-900 italic tracking-tight">Security Verification</h3>
            <p v-if="!requireOtp" class="text-slate-500 text-sm mt-2">Enter your approval PIN to continue.</p>
            <p v-else class="text-slate-500 text-sm mt-2">Enter the 6-digit code from your email.</p>

            <div v-if="activeAction === 'approve' && planType === 'prepaid'" class="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-left">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Current Balance</span>
                <span :class="['text-xs font-black', walletBalance < request.amount ? 'text-rose-600' : 'text-slate-900']">
                  ₦{{ walletBalance.toLocaleString() }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Required Amount</span>
                <span class="text-xs font-black text-slate-900">₦{{ request.amount.toLocaleString() }}</span>
              </div>
              
              <div v-if="walletBalance < request.amount" class="pt-2 flex items-start space-x-2 text-rose-600">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p class="text-[10px] font-black leading-tight uppercase">Insufficient Funds</p>
              </div>
            </div>
            
            <div v-if="processError" class="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-bold animate-in fade-in slide-in-from-top-1">
              {{ processError }}
            </div>
            <div v-if="processSuccess" class="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-xs font-bold animate-in fade-in slide-in-from-top-1">
              {{ processSuccess }}
            </div>

            <div v-if="!requireOtp" class="mt-8 flex justify-center space-x-3">
              <input 
                v-for="i in 4" :key="i"
                v-model="pinArray[i-1]"
                ref="pinInputs"
                type="password"
                maxlength="1"
                class="w-12 h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl text-center text-2xl font-black focus:bg-white focus:border-primary-500 outline-none transition-all"
                @input="onPinInput(i-1, $event)"
                @keydown.delete="onPinDelete(i-1)"
              />
            </div>

            <div v-if="requireOtp" class="mt-8 space-y-4 animate-in slide-in-from-bottom-4 duration-300">
               <input 
                v-model="otp" 
                type="text" 
                maxlength="6"
                placeholder="000000"
                class="w-full h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl text-center text-3xl font-black tracking-[1em] focus:bg-white focus:border-primary-500 outline-none transition-all placeholder:tracking-normal placeholder:text-slate-200"
                autofocus 
              />
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">6-Digit Verification Code</p>
            </div>

            <div class="mt-10 flex space-x-4">
               <button @click="showPinModal = false" class="flex-1 py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors">Cancel</button>
               <button 
                @click="submitDecision" 
                :disabled="(!requireOtp && pinArray.join('').length < 4) || (requireOtp && otp.length < 6) || processing || (activeAction === 'approve' && planType === 'prepaid' && walletBalance < request.amount)"
                class="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl shadow-slate-900/20"
               >
                 {{ processing ? '...' : (requireOtp ? 'VERIFY' : 'CONFIRM') }}
               </button>
            </div>
         </div>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PartnerPortalService } from '../../../services/partner-portal.service';

const route = useRoute();
const router = useRouter();
const request = ref<any>(null);
const loading = ref(true);
const processing = ref(false);
const approvalNotes = ref('');
const processError = ref('');
const processSuccess = ref('');
const requireOtp = ref(false);
const otp = ref('');
const walletBalance = ref(0);
const planType = ref('prepaid');

// PIN Logic
const showPinModal = ref(false);
const activeAction = ref<'approve' | 'reject'>('approve');
const pinArray = ref(['', '', '', '']);
const pinInputs = ref<any[]>([]);

const statusClass = computed(() => {
  if (!request.value) return '';
  switch (request.value.status) {
    case 'approved': return 'bg-emerald-100 text-emerald-800';
    case 'rejected': return 'bg-rose-100 text-rose-800';
    default: return 'bg-amber-100 text-amber-800';
  }
});

const statusStripClass = computed(() => {
  if (!request.value) return 'bg-slate-200';
  switch (request.value.status) {
    case 'approved': return 'bg-emerald-500';
    case 'rejected': return 'bg-rose-500';
    default: return 'bg-amber-500';
  }
});

const fetchRequestDetails = async () => {
  try {
    loading.value = true;
    const res = await PartnerPortalService.getOrderRequest(route.params.id as string);
    request.value = res.data;
    walletBalance.value = res.walletBalance || 0;
    planType.value = res.planType || 'prepaid';
  } catch (error) {
    console.error('Failed to fetch order request', error);
    alert('Failed to load order request details.');
    router.push('/partner/orders');
  } finally {
    loading.value = false;
  }
};

const openApprovalModal = (action: 'approve' | 'reject') => {
  activeAction.value = action;
  pinArray.value = ['', '', '', ''];
  otp.value = '';
  requireOtp.value = false;
  processError.value = '';
  processSuccess.value = '';
  showPinModal.value = true;
  nextTick(() => pinInputs.value[0]?.focus());
};

const onPinInput = (index: number, event: any) => {
  const val = event.target.value;
  if (val && index < 3) {
    pinInputs.value[index + 1]?.focus();
  }
};

const onPinDelete = (index: number) => {
  if (!pinArray.value[index] && index > 0) {
    pinInputs.value[index - 1]?.focus();
  }
};

const submitDecision = async () => {
  try {
    processError.value = '';
    processSuccess.value = '';
    processing.value = true;
    
    const res = await PartnerPortalService.processOrder({
      requestId: request.value._id,
      action: activeAction.value,
      pin: pinArray.value.join(''),
      otp: otp.value,
      notes: approvalNotes.value
    });

    if (res.requireOtp) {
      requireOtp.value = true;
      processSuccess.value = 'PIN verified. Please enter the OTP sent to your email.';
      return;
    }
    
    processSuccess.value = `Order ${activeAction.value === 'approve' ? 'approved' : 'rejected'} successfully!`;
    await fetchRequestDetails(); // Refresh
    
    setTimeout(() => {
      showPinModal.value = false;
      processSuccess.value = '';
    }, 1500);
  } catch (error: any) {
    console.error('Failed to process order', error);
    processError.value = error.response?.data?.message || 'Action failed. Please verify your PIN.';
  } finally {
    processing.value = false;
  }
};

onMounted(fetchRequestDetails);
</script>

<route lang="yaml">
meta:
  layout: partner
</route>
