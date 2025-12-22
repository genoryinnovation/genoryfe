<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PartnerPortalService } from '../../../services/partner-portal.service';

const settings = ref({
  name: '',
  industry: '',
  registrationNumber: '',
  paymentSettings: {
    autoApprovalEnabled: false,
    autoApprovalThreshold: 0,
    approvalHours: {
      start: '08:00',
      end: '17:00',
      days: [1, 2, 3, 4, 5]
    },
    dailyLimit: 0,
    monthlyLimit: 0,
    negativeBalanceLimit: 0
  },
  planType: 'prepaid',
  billingCycleSettings: {
    billingDay: 'last',
    gracePeriodDays: 5
  },
  twoFactorEnabled: false
});

const loading = ref(true);
const saving = ref(false);
const showPinModal = ref(false);
const newPin = ref('');
const alertMessage = ref('');
const alertType = ref<'success' | 'error'>('success');


const dayOptions = [
  { value: 0, label: 'Sun' },
  { value: 1, label: 'Mon' },
  { value: 2, label: 'Tue' },
  { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' },
  { value: 5, label: 'Fri' },
  { value: 6, label: 'Sat' }
];

const toggleDay = (day: number) => {
  const index = settings.value.paymentSettings.approvalHours.days.indexOf(day);
  if (index === -1) {
    settings.value.paymentSettings.approvalHours.days.push(day);
  } else {
    settings.value.paymentSettings.approvalHours.days.splice(index, 1);
  }
};

const fetchSettings = async () => {
  try {
    loading.value = true;
    const data = await PartnerPortalService.getSettings();
    settings.value = {
      name: data.name || '',
      industry: data.industry || '',
      registrationNumber: data.registrationNumber || '',
      paymentSettings: {
        autoApprovalEnabled: data.paymentSettings?.autoApprovalEnabled || false,
        autoApprovalThreshold: data.paymentSettings?.autoApprovalThreshold || 0,
        approvalHours: {
          start: data.paymentSettings?.approvalHours?.start || '08:00',
          end: data.paymentSettings?.approvalHours?.end || '17:00',
          days: data.paymentSettings?.approvalHours?.days || [1, 2, 3, 4, 5]
        },
        dailyLimit: data.paymentSettings?.dailyLimit || 0,
        monthlyLimit: data.paymentSettings?.monthlyLimit || 0,
        negativeBalanceLimit: data.paymentSettings?.negativeBalanceLimit || 0
      },
      planType: data.planType || 'prepaid',
      billingCycleSettings: {
        billingDay: data.billingCycleSettings?.billingDay || 'last',
        gracePeriodDays: data.billingCycleSettings?.gracePeriodDays || 5
      },
      twoFactorEnabled: data.twoFactorEnabled || false
    };
  } catch (error) {
    console.error('Failed to fetch settings', error);
  } finally {
    loading.value = false;
  }
};

const handleSave = async () => {
  try {
    alertMessage.value = '';
    saving.value = true;
    await PartnerPortalService.updateSettings(settings.value);
    alertMessage.value = 'Settings saved successfully';
    alertType.value = 'success';
    
    setTimeout(() => { alertMessage.value = ''; }, 3000);
  } catch (error: any) {
    console.error('Failed to save settings', error);
    alertMessage.value = error.response?.data?.message || 'Failed to save settings';
    alertType.value = 'error';
  } finally {
    saving.value = false;
  }
};

const handlePinUpdate = async () => {
  if (newPin.value.length < 4) {
    alertMessage.value = 'PIN must be at least 4 digits';
    alertType.value = 'error';
    return;
  }
  try {
    alertMessage.value = '';
    saving.value = true;
    await PartnerPortalService.updatePin(newPin.value);
    
    alertMessage.value = 'PIN updated successfully';
    alertType.value = 'success';
    
    setTimeout(() => {
      showPinModal.value = false;
      alertMessage.value = '';
      newPin.value = '';
    }, 1500);
  } catch (error: any) {
    console.error('Failed to update PIN', error);
    alertMessage.value = error.response?.data?.message || 'Failed to update PIN';
    alertType.value = 'error';
  } finally {
    saving.value = false;
  }
};

onMounted(fetchSettings);
</script>

<template>
  <div class="max-w-4xl space-y-8 relative">
    <div v-if="loading" class="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-xl">
      <svg class="animate-spin h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <div>
      <h1 class="text-2xl font-bold text-slate-900">Company Settings</h1>
      <p class="text-slate-500">Configure your company's approval rules and security.</p>
    </div>

    <!-- API Feedback Banner -->
    <div v-if="alertMessage && !showPinModal" 
      :class="[
        'p-4 rounded-xl border font-bold text-sm animate-in fade-in slide-in-from-top-4 duration-300',
        alertType === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'
      ]"
    >
      {{ alertMessage }}
    </div>

    <!-- Configuration Sections -->
    <div class="space-y-6">
      <!-- Company Identity -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 class="font-bold text-slate-900 flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Company Identity
          </h3>
          <p class="text-xs text-slate-500 mt-1">Manage your public company information.</p>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Name</label>
            <input v-model="settings.name" type="text" class="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm" />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Industry</label>
            <input v-model="settings.industry" type="text" class="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm" />
          </div>
          <div class="space-y-1 md:col-span-2">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Registration Number</label>
            <input v-model="settings.registrationNumber" type="text" class="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm" placeholder="RC-1234567" />
          </div>
        </div>
      </div>

      <!-- Approval Rules & Workflow -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 class="font-bold text-slate-900 flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Approval Policy
          </h3>
          <p class="text-xs text-slate-500 mt-1">Define how orders are reviewed and approved.</p>
        </div>
        <div class="p-6 space-y-8">
          <!-- Auto-Approval -->
          <div class="flex items-center justify-between">
            <div>
              <p class="font-bold text-slate-900">Auto-Approval</p>
              <p class="text-xs text-slate-500">Automatically approve orders below a certain amount.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.paymentSettings.autoApprovalEnabled" class="sr-only peer">
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div v-if="settings.paymentSettings.autoApprovalEnabled" class="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl animate-in fade-in slide-in-from-top-2 border border-slate-100">
            <span class="text-sm text-slate-600 font-bold">Limit per order:</span>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₦</span>
              <input type="number" v-model="settings.paymentSettings.autoApprovalThreshold" class="pl-8 pr-4 py-2 border border-slate-200 rounded-xl w-32 focus:ring-2 focus:ring-primary-500 outline-none text-sm font-bold" />
            </div>
          </div>
        </div>
      </div>
      <!-- Spending Limits (Read Only) -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h3 class="font-bold text-slate-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Spending Limits
            </h3>
            <p class="text-xs text-slate-500 mt-1">Platform-defined spending controls for your company.</p>
          </div>
          <span class="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">Read Only</span>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Daily Limit</label>
            <p class="text-xl font-black text-slate-900">₦{{ settings.paymentSettings.dailyLimit.toLocaleString() }}</p>
          </div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Monthly Limit</label>
            <p class="text-xl font-black text-slate-900">₦{{ settings.paymentSettings.monthlyLimit.toLocaleString() }}</p>
          </div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Overdraft Limit</label>
            <p class="text-xl font-black text-emerald-600">₦{{ settings.paymentSettings.negativeBalanceLimit.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <!-- Billing Plan (Read Only) -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h3 class="font-bold text-slate-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Billing Plan
            </h3>
            <p class="text-xs text-slate-500 mt-1">Details about your active subscription and billing cycle.</p>
          </div>
          <span class="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">Read Only</span>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Active Plan</label>
            <p class="text-xl font-black text-slate-900 capitalize">{{ settings.planType }}</p>
          </div>
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Billing Cycle</label>
            <p class="text-xl font-black text-slate-900">
              {{ settings.billingCycleSettings.billingDay === 'last' ? 'Full Month' : `Every ${settings.billingCycleSettings.billingDay}th` }} 
            </p>
          </div>
        </div>
      </div>


      <!-- Operational Hours -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 class="font-bold text-slate-900 flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Operational Hours
          </h3>
          <p class="text-xs text-slate-500 mt-1">Specify when approvals can be processed.</p>
        </div>
        <div class="p-6 space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-1">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Start Time</label>
              <input v-model="settings.paymentSettings.approvalHours.start" type="time" class="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm font-bold" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">End Time</label>
              <input v-model="settings.paymentSettings.approvalHours.end" type="time" class="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm font-bold" />
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Days</label>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="day in dayOptions" 
                :key="day.value"
                @click="toggleDay(day.value)"
                :class="[
                  'px-4 py-2 rounded-xl text-xs font-bold transition-all border',
                  settings.paymentSettings.approvalHours.days.includes(day.value) ? 'bg-primary-600 border-primary-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'
                ]"
              >
                {{ day.label }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Security Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 class="font-bold text-slate-900 flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Security & Authentication
          </h3>
          <p class="text-xs text-slate-500 mt-1">Configure access and protection for high-value actions.</p>
        </div>
        <div class="p-6 space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-bold text-slate-900">Approval PIN</p>
              <p class="text-xs text-slate-500">Required for every manual order approval.</p>
            </div>
            <button @click="showPinModal = true" class="px-4 py-2 text-xs font-bold border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              Change PIN
            </button>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-slate-50">
            <div>
              <p class="font-bold text-slate-900">Email 2FA</p>
              <p class="text-xs text-slate-500">Enable two-factor authentication for sensitive approvals.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.twoFactorEnabled" class="sr-only peer">
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="flex justify-end">
      <button 
        @click="handleSave"
        :disabled="saving"
        class="px-8 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/25 disabled:opacity-50"
      >
        {{ saving ? 'Saving...' : 'Save Changes' }}
      </button>
    </div>

    <!-- PIN Modal -->
    <div v-if="showPinModal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 text-center">
          <h3 class="text-xl font-bold text-slate-900">Update Approval PIN</h3>
          <!-- Modal Specific Error -->
          <div v-if="alertMessage && showPinModal" 
            :class="[
              'mt-2 p-3 rounded-lg border text-xs font-bold animate-pulse',
              alertType === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'
            ]"
          >
            {{ alertMessage }}
          </div>
        </div>
        <div class="p-6 space-y-4">
          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">New 4-6 Digit PIN</label>
            <input 
              v-model="newPin" 
              type="password" 
              maxlength="6"
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-center text-2xl tracking-widest"
              autofocus 
            />
          </div>
          <div class="pt-4 flex space-x-3">
            <button @click="showPinModal = false" class="flex-1 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
            <button @click="handlePinUpdate" :disabled="saving" class="flex-1 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all disabled:opacity-50">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: partner
</route>
