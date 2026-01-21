<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div 
        class="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" 
        aria-hidden="true"
        @click="$emit('close')"
      ></div>

      <!-- Center modal -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div 
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
              :class="type === 'approve' ? 'bg-emerald-100' : 'bg-rose-100'"
            >
              <svg v-if="type === 'approve'" class="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else class="h-6 w-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 15c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-slate-900" id="modal-title">
                {{ title }}
              </h3>
              <div class="mt-4 space-y-4">
                <div v-if="type === 'reject'">
                  <label class="block text-sm font-medium text-slate-700 mb-1">Rejection Reason <span class="text-rose-500">*</span></label>
                  <select 
                    v-model="reason"
                    class="w-full border-slate-300 rounded-xl focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                  >
                    <option value="" disabled>Select a reason</option>
                    <option value="Incomplete Documentation">Incomplete Documentation</option>
                    <option value="Invalid ID">Invalid ID Document</option>
                    <option value="Blurry Image">Blurry or Unclear Image</option>
                    <option value="Mismatched Information">Mismatched Information</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">
                    {{ type === 'reject' ? 'Additional Note' : 'Note' }} 
                    <span v-if="type === 'reject'" class="text-slate-400 font-normal">(Optional)</span>
                    <span v-else class="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    v-model="note"
                    rows="3"
                    class="w-full border-slate-300 rounded-xl focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                    :placeholder="type === 'approve' ? 'Add any comments about this approval...' : 'Add more context to the rejection...'"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button 
            type="button" 
            class="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :class="type === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500' : 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500'"
            @click="handleConfirm"
            :disabled="type === 'reject' && !reason"
          >
            {{ confirmText }}
          </button>
          <button 
            type="button" 
            class="mt-3 w-full inline-flex justify-center rounded-xl border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
            @click="$emit('close')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  type: 'approve' | 'reject';
  title: string;
  confirmText?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm', payload: { note?: string; reason?: string }): void;
}>();

const note = ref('');
const reason = ref('');

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    note.value = '';
    reason.value = '';
  }
});

const handleConfirm = () => {
  emit('confirm', {
    note: note.value,
    reason: props.type === 'reject' ? reason.value : undefined
  });
};
</script>
