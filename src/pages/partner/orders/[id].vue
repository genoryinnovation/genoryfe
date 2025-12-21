<template>
  <div class="space-y-6 max-w-5xl mx-auto pb-12">
    <!-- Header -->
    <div class="flex items-center space-x-4 mb-8">
      <router-link to="/partner/orders" class="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-200">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </router-link>
      <div>
        <h1 class="text-2xl font-black text-slate-900 italic uppercase tracking-tight">Order Request Detail</h1>
        <p class="text-slate-500 text-sm">Reviewing request <span class="font-bold text-slate-700">#{{ request?.order?.orderNumber || '...' }}</span></p>
      </div>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-24 space-y-4">
      <div class="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
      <p class="text-slate-400 font-medium animate-pulse">Retrieving order intelligence...</p>
    </div>

    <div v-else-if="request" class="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <!-- Left Column: Order Info -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Order Items Card -->
        <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 class="font-black text-slate-900 uppercase text-sm tracking-widest">Order Composition</h3>
            <span :class="['px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest', statusClass]">
              {{ request.status }}
            </span>
          </div>
          <div class="p-0">
            <table class="w-full text-left">
              <thead>
                <tr class="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th class="px-8 py-4">Item Details</th>
                  <th class="px-8 py-4 text-center">Qty</th>
                  <th class="px-8 py-4 text-right">Price</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-for="item in request.order?.items" :key="item._id" class="group">
                  <td class="px-8 py-5">
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img v-if="item.product?.image" :src="item.product.image" class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center text-slate-300">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/></svg>
                        </div>
                      </div>
                      <div>
                        <p class="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{{ item.product?.title || 'Unknown Item' }}</p>
                        <p class="text-xs text-slate-400">{{ item.product?.category || 'General' }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-8 py-5 text-center font-bold text-slate-700">x{{ item.quantity }}</td>
                  <td class="px-8 py-5 text-right font-black text-slate-900">₦{{ (item.price * item.quantity).toLocaleString() }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="bg-slate-50/30 font-black">
                  <td colspan="2" class="px-8 py-6 text-slate-500 uppercase text-xs tracking-widest">Grand Total Value</td>
                  <td class="px-8 py-6 text-right text-xl text-primary-600">₦{{ request.amount.toLocaleString() }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <!-- Delivery & Additional Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Delivery Intelligence</h4>
            <div class="space-y-4">
              <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase">Destination Address</p>
                <p class="text-sm font-bold text-slate-900 mt-1">
                  {{ request.order?.deliveryAddress?.street || 'N/A' }}, 
                  {{ request.order?.deliveryAddress?.city || '' }}
                </p>
              </div>
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-[10px] font-bold text-slate-400 uppercase">Contact Name</p>
                  <p class="text-sm font-bold text-slate-900 mt-1">{{ request.order?.deliveryAddress?.contactName || request.user?.firstName }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-bold text-slate-400 uppercase">Phone</p>
                  <p class="text-sm font-bold text-slate-900 mt-1">{{ request.order?.deliveryAddress?.phone || 'N/A' }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center text-center">
             <div class="mx-auto w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mb-4">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <h4 class="font-black text-slate-900 uppercase text-xs tracking-widest">Order Strategy</h4>
             <p class="text-sm text-slate-500 mt-2 px-4">This order will be fulfilled via <span class="font-bold text-slate-700">Genory Logistics</span> upon approval.</p>
          </div>
        </div>
      </div>

      <!-- Right Column: Requested By & Actions -->
      <div class="space-y-6">
        <!-- User Profile Card -->
        <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div class="w-20 h-20 bg-primary-600 rounded-3xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-primary-500/20">
            {{ request.user?.firstName[0] }}{{ request.user?.lastName[0] }}
          </div>
          <h3 class="text-xl font-black text-slate-900 italic">{{ request.user?.firstName }} {{ request.user?.lastName }}</h3>
          <p class="text-sm text-slate-500 font-medium">{{ request.user?.email }}</p>
          
          <div class="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4 text-left">
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Staff ID</p>
              <p class="text-xs font-bold text-slate-900">{{ request.user?.hrEmployeeId || 'GEN-ST-001' }}</p>
            </div>
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Requested On</p>
              <p class="text-xs font-bold text-slate-900">{{ new Date(request.createdAt).toLocaleDateString() }}</p>
            </div>
          </div>
        </div>

        <!-- Decision Box -->
        <div v-if="request.status === 'pending'" class="bg-slate-900 p-8 rounded-3xl shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
          <div class="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary-600 opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity"></div>
          <h4 class="text-lg font-black text-white italic uppercase tracking-wider mb-6">Action Protocol</h4>
          
          <textarea 
            v-model="approvalNotes"
            placeholder="Reviewer notes (optional)..."
            class="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white text-sm placeholder:text-slate-500 outline-none focus:border-primary-500 transition-colors mb-6 resize-none h-24"
          ></textarea>

          <div class="space-y-3">
             <button 
              @click="openApprovalModal('approve')"
              class="w-full py-4 bg-emerald-500 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center space-x-2"
             >
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>
               <span>APPROVE ORDER</span>
             </button>
             <button 
              @click="openApprovalModal('reject')"
              class="w-full py-4 bg-slate-800 text-rose-500 font-bold rounded-2xl hover:bg-slate-700 transition-all border border-slate-700"
             >
               REJECT REQUEST
             </button>
          </div>
        </div>

        <!-- Processed Info (if not pending) -->
        <div v-else class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
           <div class="flex items-center space-x-3 text-slate-500 mb-4">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
             <span class="text-xs font-black uppercase tracking-widest">{{ request.status === 'approved' ? 'Authorization Confirmed' : 'Authorization Denied' }}</span>
           </div>
           <div class="space-y-1">
             <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Processed By</p>
             <p class="text-sm font-bold text-slate-900">{{ request.processedBy?.firstName || 'System' }} {{ request.processedBy?.lastName || '' }}</p>
           </div>
           <div v-if="request.processedNotes" class="mt-4 p-4 bg-slate-50 rounded-2xl text-xs text-slate-600 italic">
             "{{ request.processedNotes }}"
           </div>
           <div v-if="request.rejectionReason" class="mt-4 p-4 bg-rose-50 rounded-2xl text-xs text-rose-600 italic">
             Reason: "{{ request.rejectionReason }}"
           </div>
        </div>
      </div>
    </div>

    <!-- PIN Modal Component (can be shared, but local for now) -->
    <div v-if="showPinModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
       <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in duration-300">
         <div class="p-10 text-center">
            <div class="w-16 h-16 bg-slate-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <svg class="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-2xl font-black text-slate-900 italic tracking-tight">Security Clearance</h3>
            <p class="text-slate-500 text-sm mt-2">Enter your company approval PIN to continue.</p>
            
            <div v-if="processError" class="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-bold animate-in fade-in slide-in-from-top-1">
              {{ processError }}
            </div>
            <div v-if="processSuccess" class="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-xs font-bold animate-in fade-in slide-in-from-top-1">
              {{ processSuccess }}
            </div>

            <div class="mt-8 flex justify-center space-x-3">
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

            <div class="mt-10 flex space-x-4">
               <button @click="showPinModal = false" class="flex-1 py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors">Cancel</button>
               <button 
                @click="submitDecision" 
                :disabled="pinArray.join('').length < 4 || processing"
                class="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl shadow-slate-900/20"
               >
                 {{ processing ? '...' : 'CONFIRM' }}
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

const fetchRequestDetails = async () => {
  try {
    loading.value = true;
    const data = await PartnerPortalService.getOrderRequest(route.params.id as string);
    request.value = data;
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
    
    await PartnerPortalService.processOrder({
      requestId: request.value._id,
      action: activeAction.value,
      pin: pinArray.value.join(''),
      notes: approvalNotes.value
    });
    
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
