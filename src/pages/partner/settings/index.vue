<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PartnerPortalService } from '../../../services/partner-portal.service';

const settings = ref({
  paymentSettings: {
    autoApprovalEnabled: false,
    autoApprovalThreshold: 0,
  },
  twoFactorEnabled: false
});

const loading = ref(true);
const saving = ref(false);
const showPinModal = ref(false);
const newPin = ref('');
const alertMessage = ref('');
const alertType = ref<'success' | 'error'>('success');

const fetchSettings = async () => {
  try {
    loading.value = true;
    const data = await PartnerPortalService.getSettings();
    settings.value = {
      paymentSettings: data.paymentSettings || { autoApprovalEnabled: false, autoApprovalThreshold: 0 },
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

    <!-- Payment Settings -->
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
      <div class="p-6">
        <h3 class="font-bold text-slate-900 flex items-center">
          <svg class="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Approval Rules
        </h3>
        <div class="mt-6 space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-slate-900">Auto-Approval</p>
              <p class="text-sm text-slate-500">Automatically approve orders below a certain amount.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.paymentSettings.autoApprovalEnabled" class="sr-only peer">
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div v-if="settings.paymentSettings.autoApprovalEnabled" class="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg animate-in fade-in slide-in-from-top-2">
            <span class="text-sm text-slate-600 font-medium">Approval Limit:</span>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₦</span>
              <input type="number" v-model="settings.paymentSettings.autoApprovalThreshold" class="pl-8 pr-4 py-2 border border-slate-200 rounded-lg w-32 focus:ring-2 focus:ring-primary-500 outline-none" />
            </div>
          </div>
        </div>
      </div>

      <!-- Security -->
      <div class="p-6">
        <h3 class="font-bold text-slate-900 flex items-center">
          <svg class="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Security & PIN
        </h3>
        <div class="mt-6 space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-slate-900">Approval PIN</p>
              <p class="text-sm text-slate-500">Required for every manual order approval.</p>
            </div>
            <button @click="showPinModal = true" class="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              Change PIN
            </button>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-slate-900">Email 2FA</p>
              <p class="text-sm text-slate-500">Enable two-factor authentication for high-value approvals.</p>
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
