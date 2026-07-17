<script setup lang="ts">
defineProps({
  baseAmount: {
    type: Number,
    required: true
  },
  totalServiceFeePercentage: {
    type: Number,
    default: 0
  },
  totalServiceFeeAmount: {
    type: Number,
    default: 0
  },
  platformServiceFeePercentage: {
    type: Number,
    default: 0
  },
  platformServiceFeeAmount: {
    type: Number,
    default: 0
  },
  companyServiceFeePercentage: {
    type: Number,
    default: 0
  },
  companyServiceFeeAmount: {
    type: Number,
    default: 0
  },
  companyServiceFeeBearer: {
    type: String as () => 'employee' | 'platform',
    default: 'employee'
  },
  compact: {
    type: Boolean,
    default: false
  },
  showTotalLabel: {
    type: Boolean,
    default: true
  }
});

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
};

const totalAmount = () => {
  if (companyServiceFeeBearer === 'platform') {
    // Platform absorbs company fee - only platform fee charged
    return baseAmount + platformServiceFeeAmount;
  } else {
    // Employee pays both fees
    return baseAmount + totalServiceFeeAmount;
  }
};
</script>

<template>
  <!-- Compact Mode (Single line) -->
  <div v-if="compact" class="text-sm">
    <div v-if="totalServiceFeePercentage > 0" class="flex items-center justify-between gap-2">
      <span class="text-slate-600">Service Fee ({{ totalServiceFeePercentage }}%):</span>
      <span class="font-bold text-slate-900">
        +{{ formatCurrency(totalServiceFeeAmount) }}
      </span>
    </div>
  </div>

  <!-- Full Mode (Detailed breakdown) -->
  <div v-else class="space-y-3">
    <!-- Base Amount -->
    <div class="flex items-center justify-between">
      <span class="text-slate-600">Order Amount:</span>
      <span class="font-bold text-slate-900">{{ formatCurrency(baseAmount) }}</span>
    </div>

    <!-- Service Fee (Combined) -->
    <div v-if="totalServiceFeePercentage > 0" class="flex items-center justify-between pl-4 border-l-2 border-primary-200">
      <div>
        <span class="text-sm text-slate-600">
          Service Fee ({{ totalServiceFeePercentage }}%):
        </span>
        <p class="text-[11px] text-slate-500 font-normal">
          Platform {{ platformServiceFeePercentage }}% + Company {{ companyServiceFeePercentage }}%
        </p>
      </div>
      <span class="text-sm font-bold text-primary-600">+{{ formatCurrency(totalServiceFeeAmount) }}</span>
    </div>

    <!-- Fee Breakdown (Detailed) -->
    <div v-if="totalServiceFeePercentage > 0" class="mt-3 pt-3 border-t border-slate-100">
      <p class="text-xs font-bold text-slate-500 uppercase mb-2">Fee Breakdown</p>
      <div class="space-y-1 text-xs text-slate-600">
        <div class="flex items-center justify-between">
          <span>• Platform Service Fee ({{ platformServiceFeePercentage }}%):</span>
          <span class="font-bold">₦{{ platformServiceFeeAmount.toLocaleString() }}</span>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <span>• Company Service Fee ({{ companyServiceFeePercentage }})%:</span>
            <span class="font-bold">₦{{ companyServiceFeeAmount.toLocaleString() }}</span>
          </div>
          <p v-if="companyServiceFeeBearer === 'platform'" class="text-[10px] text-emerald-600 ml-6 mt-1">
            (Absorbed by Genory)
          </p>
        </div>
      </div>
    </div>

    <!-- Total -->
    <div v-if="showTotalLabel && totalServiceFeePercentage > 0" class="border-t border-slate-200 pt-3 flex items-center justify-between">
      <span class="font-bold text-slate-900">Total to be Charged:</span>
      <span class="font-black text-lg text-primary-600">{{ formatCurrency(totalAmount()) }}</span>
    </div>

    <!-- Info Message for Platform-Borne -->
    <div v-if="companyServiceFeeBearer === 'platform' && companyServiceFeePercentage > 0" class="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
      <p class="text-xs text-emerald-700">
        <strong>💚 Special Offer:</strong> Genory is covering the ₦{{ companyServiceFeeAmount.toLocaleString() }} company service fee this time!
      </p>
    </div>
  </div>
</template>
