<template>
  <div v-if="partner" class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div class="flex items-center space-x-4">
        <router-link
          to="/admin/delivery-partners"
          class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </router-link>
        <div>
          <h2 class="text-2xl font-bold text-slate-900">
            {{ partner.user.firstName }} {{ partner.user.lastName }}
          </h2>
          <div class="mt-1 flex items-center space-x-3">
            <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 capitalize">
              <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              {{ partner.type }}
            </span>
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
              :class="{
                'bg-emerald-100 text-emerald-700': partner.status === 'approved',
                'bg-amber-100 text-amber-700': partner.status === 'pending',
                'bg-rose-100 text-rose-700': partner.status === 'rejected',
                'bg-slate-100 text-slate-600': partner.status === 'suspended'
              }"
            >
              <span 
                class="w-1.5 h-1.5 rounded-full mr-1.5"
                :class="{
                  'bg-emerald-500': partner.status === 'approved',
                  'bg-amber-500': partner.status === 'pending',
                  'bg-rose-500': partner.status === 'rejected',
                  'bg-slate-400': partner.status === 'suspended'
                }"
              ></span>
              {{ partner.status }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex space-x-3" v-if="partner.status === 'pending'">
        <button
          @click="rejectApplication"
          class="inline-flex items-center px-4 py-2.5 border border-rose-200 rounded-xl text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Reject
        </button>
        <button
          @click="approveApplication"
          class="inline-flex items-center px-4 py-2.5 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/25 transition-all"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Approve
        </button>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="flex border-b border-slate-200 overflow-x-auto no-scrollbar">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="currentTab = tab.id"
        class="px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all"
        :class="currentTab === tab.id ? 'border-primary-500 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="mt-6">
      <!-- Overview Tab -->
      <div v-if="currentTab === 'overview'" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
              <div class="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="flex items-center justify-between w-full">
                <h3 class="text-lg font-semibold text-slate-900">Personal Information</h3>
                <div class="flex items-center space-x-3">
                  <span 
                    v-if="partner.approvals?.personalInfo?.status" 
                    class="px-2.5 py-0.5 rounded-full text-xs font-bold capitalize border"
                    :class="{
                      'bg-emerald-50 text-emerald-700 border-emerald-100': partner.approvals.personalInfo.status === 'approved',
                      'bg-rose-50 text-rose-700 border-rose-100': partner.approvals.personalInfo.status === 'rejected',
                      'bg-amber-50 text-amber-700 border-amber-100': partner.approvals.personalInfo.status === 'pending'
                    }"
                  >
                    {{ partner.approvals.personalInfo.status }}
                  </span>
                  <div class="flex space-x-2">
                    <button @click="approveSection('personalInfo')" class="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve Section">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                    </button>
                    <button @click="rejectSection('personalInfo')" class="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Reject Section">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-6 space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-xs text-slate-500 uppercase tracking-wide">First Name</p>
                  <p class="mt-1 text-sm font-medium text-slate-900 font-bold">{{ partner.user.firstName }}</p>
                </div>
                <div>
                  <p class="text-xs text-slate-500 uppercase tracking-wide">Last Name</p>
                  <p class="mt-1 text-sm font-medium text-slate-900 font-bold">{{ partner.user.lastName }}</p>
                </div>
                <div>
                  <p class="text-xs text-slate-500 uppercase tracking-wide">Email Address</p>
                  <p class="mt-1 text-sm font-medium text-slate-900 font-bold">{{ partner.user.email }}</p>
                </div>
                <div>
                  <p class="text-xs text-slate-500 uppercase tracking-wide">Phone Number</p>
                  <p class="mt-1 text-sm font-medium text-slate-900 font-bold">{{ partner.user.phone?.code }} {{ partner.user.phone?.number }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Quick Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p class="text-sm font-medium text-slate-500">Total Earnings</p>
              <p class="mt-2 text-2xl font-bold text-slate-900 font-bold">₦{{ partner.earnings?.total?.toLocaleString() || 0 }}</p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p class="text-sm font-medium text-slate-500">Wallet Balance</p>
              <p class="mt-2 text-2xl font-bold text-emerald-600 font-bold">₦{{ partner.earnings?.balance?.toLocaleString() || 0 }}</p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p class="text-sm font-medium text-slate-500">Onboarding Step</p>
              <p class="mt-2 text-2xl font-bold text-slate-900 font-bold">{{ partner.onboardingStep }}/5</p>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Availability</h3>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <span 
                  class="w-3 h-3 rounded-full mr-2"
                  :class="partner.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'"
                ></span>
                <span class="text-sm font-medium" :class="partner.isOnline ? 'text-emerald-700' : 'text-slate-500'">
                  {{ partner.isOnline ? 'Currently Online' : 'Offline' }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="partner.currentLocation" class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Last Known Location</h3>
            <div class="space-y-2">
              <p class="text-sm text-slate-600">{{ partner.currentLocation.address || 'Address not available' }}</p>
              <p class="text-xs text-slate-400">Lat: {{ partner.currentLocation.latitude }}, Lng: {{ partner.currentLocation.longitude }}</p>
              <p class="text-xs text-slate-400">Updated: {{ new Date(partner.currentLocation.updatedAt).toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Earnings Tab -->
      <div v-if="currentTab === 'earnings'" class="space-y-6">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-slate-900">Wallet Transactions</h3>
            <div class="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-bold">
              Current Balance: ₦{{ partner.earnings?.balance?.toLocaleString() || 0 }}
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-slate-200">
              <thead>
                <tr class="bg-slate-50 text-left">
                  <th class="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Date</th>
                  <th class="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Description</th>
                  <th class="px-6 py-3 text-xs font-semibold text-slate-600 uppercase text-right">Amount</th>
                  <th class="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-if="loadingTransactions" v-for="i in 3" :key="i">
                  <td colspan="4" class="px-6 py-4 text-center animate-pulse bg-slate-50/50">Loading...</td>
                </tr>
                <tr v-for="tx in transactions" :key="tx._id" class="hover:bg-slate-50/50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {{ new Date(tx.createdAt).toLocaleDateString() }}
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-900">
                    <p class="font-medium font-bold">{{ tx.remarks || tx.reason.replace(/_/g, ' ') }}</p>
                    <p class="text-xs text-slate-400">{{ tx.reference }}</p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-bold" :class="tx.transactionType === 'credit' ? 'text-emerald-600' : 'text-rose-600'">
                    {{ tx.transactionType === 'credit' ? '+' : '-' }}₦{{ (tx.nairaAmount || 0).toLocaleString() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="['px-2 py-0.5 rounded-full text-xs font-medium capitalize', 
                      tx.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700']">
                      {{ tx.status }}
                    </span>
                  </td>
                </tr>
                <tr v-if="!loadingTransactions && transactions.length === 0">
                  <td colspan="4" class="px-6 py-8 text-center text-slate-500">No transactions found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Deliveries Tab -->
      <div v-if="currentTab === 'deliveries'" class="space-y-6">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100">
            <h3 class="text-lg font-semibold text-slate-900">Assigned Deliveries</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-slate-200">
              <thead>
                <tr class="bg-slate-50 text-left">
                  <th class="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Order #</th>
                  <th class="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Customer</th>
                  <th class="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">City</th>
                  <th class="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                  <th class="px-6 py-3 text-xs font-semibold text-slate-600 uppercase text-right">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-if="loadingOrders" v-for="i in 3" :key="i">
                  <td colspan="5" class="px-6 py-4 text-center animate-pulse bg-slate-50/50">Loading...</td>
                </tr>
                <tr v-for="order in orders" :key="order._id" class="hover:bg-slate-50/50 cursor-pointer" @click="$router.push(`/admin/orders/${order._id}`)">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600 font-bold">
                    {{ order.orderNumber }}
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-900">
                    {{ order.userId?.firstName }} {{ order.userId?.lastName }}
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-600">
                    {{ order.deliveryAddress?.city }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="['px-2 py-0.5 rounded-full text-xs font-medium capitalize', 
                      order.orderStatus === 'delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-primary-100 text-primary-700']">
                      {{ order.orderStatus }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-slate-900">
                    ₦{{ order.totalAmount?.toLocaleString() }}
                  </td>
                </tr>
                <tr v-if="!loadingOrders && orders.length === 0">
                  <td colspan="5" class="px-6 py-8 text-center text-slate-500">No deliveries found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- KYC Tab -->
      <div v-if="currentTab === 'kyc'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
            <div class="p-2 bg-violet-50 text-violet-600 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div class="flex items-center justify-between w-full">
              <h3 class="text-lg font-semibold text-slate-900">KYC Status</h3>
              <div class="flex items-center space-x-3">
                <span 
                  v-if="partner.approvals?.kyc?.status" 
                  class="px-2.5 py-0.5 rounded-full text-xs font-bold capitalize border"
                  :class="{
                    'bg-emerald-50 text-emerald-700 border-emerald-100': partner.approvals.kyc.status === 'approved',
                    'bg-rose-50 text-rose-700 border-rose-100': partner.approvals.kyc.status === 'rejected',
                    'bg-amber-50 text-amber-700 border-amber-100': partner.approvals.kyc.status === 'pending'
                  }"
                >
                  {{ partner.approvals.kyc.status }}
                </span>
                <div class="flex space-x-2">
                  <button @click="approveSection('kyc')" class="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve Section">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  </button>
                  <button @click="rejectSection('kyc')" class="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Reject Section">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="p-6 space-y-6">
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-500">Verification Status</span>
              <span :class="['px-3 py-1 rounded-full text-xs font-bold capitalize', 
                partner.kyc?.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 
                partner.kyc?.status === 'rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700']">
                {{ partner.kyc?.status || 'Not Started' }}
              </span>
            </div>
            <div v-if="partner.kyc?.approvedAt" class="flex items-center justify-between border-t border-slate-50 pt-4">
              <span class="text-sm text-slate-500">Approved On</span>
              <span class="text-sm font-medium">{{ new Date(partner.kyc.approvedAt).toLocaleDateString() }}</span>
            </div>
            <div v-if="partner.kyc?.rejectionReason" class="p-4 bg-rose-50 rounded-xl border border-rose-100">
              <p class="text-xs font-bold text-rose-600 uppercase mb-1">Rejection Reason</p>
              <p class="text-sm text-rose-700">{{ partner.kyc.rejectionReason }}</p>
              <p class="mt-2 text-xs text-rose-500">{{ new Date(partner.kyc.rejectedAt).toLocaleString() }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
               <div class="p-4 bg-slate-50 rounded-xl">
                 <p class="text-xs text-slate-500 uppercase">ID Type</p>
                 <p class="mt-1 text-sm font-bold text-slate-900 font-bold">{{ partner.kyc?.idType || 'N/A' }}</p>
               </div>
               <div class="p-4 bg-slate-50 rounded-xl">
                 <p class="text-xs text-slate-500 uppercase">ID Number</p>
                 <p class="mt-1 text-sm font-bold text-slate-900 font-bold font-mono">{{ partner.kyc?.idNumber || 'N/A' }}</p>
               </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100">
            <h3 class="text-lg font-semibold text-slate-900">Documents</h3>
          </div>
          <div class="p-6 space-y-4">
            <div v-if="partner.kyc?.idImage" class="group relative aspect-video rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
              <img :src="partner.kyc.idImage" class="w-full h-full object-cover transition-transform group-hover:scale-105" alt="ID Image" />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a :href="partner.kyc.idImage" target="_blank" class="px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-bold shadow-xl">View Original</a>
              </div>
              <div class="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white text-[10px] font-bold uppercase tracking-wider">ID Document</div>
            </div>
            <p v-else class="text-sm text-slate-500 italic">No ID image uploaded</p>

            <div v-if="partner.kyc?.selfieImage" class="group relative aspect-video rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
              <img :src="partner.kyc.selfieImage" class="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Selfie" />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a :href="partner.kyc.selfieImage" target="_blank" class="px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-bold shadow-xl">View Original</a>
              </div>
              <div class="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white text-[10px] font-bold uppercase tracking-wider">Selfie Verification</div>
            </div>
            <p v-else class="text-sm text-slate-500 italic">No selfie uploaded</p>
          </div>
        </div>
      </div>

      <!-- Vehicle Tab -->
      <div v-if="currentTab === 'vehicle'" class="space-y-6">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
             <div class="p-2 bg-cyan-50 text-cyan-600 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
            <div class="flex items-center justify-between w-full">
              <h3 class="text-lg font-semibold text-slate-900">Vehicle Details</h3>
              <div class="flex items-center space-x-3">
                <span 
                  v-if="partner.approvals?.vehicle?.status" 
                  class="px-2.5 py-0.5 rounded-full text-xs font-bold capitalize border"
                  :class="{
                    'bg-emerald-50 text-emerald-700 border-emerald-100': partner.approvals.vehicle.status === 'approved',
                    'bg-rose-50 text-rose-700 border-rose-100': partner.approvals.vehicle.status === 'rejected',
                    'bg-amber-50 text-amber-700 border-amber-100': partner.approvals.vehicle.status === 'pending'
                  }"
                >
                  {{ partner.approvals.vehicle.status }}
                </span>
                <div class="flex space-x-2">
                  <button @click="approveSection('vehicle')" class="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve Section">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  </button>
                  <button @click="rejectSection('vehicle')" class="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Reject Section">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div v-if="partner.vehicle" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <div class="p-4 bg-slate-50 rounded-xl">
                 <p class="text-xs text-slate-500 uppercase">Type</p>
                 <p class="mt-1 text-sm font-bold text-slate-900 font-bold capitalize">{{ partner.vehicle.type }}</p>
               </div>
               <div class="p-4 bg-slate-50 rounded-xl">
                 <p class="text-xs text-slate-500 uppercase">Make & Model</p>
                 <p class="mt-1 text-sm font-bold text-slate-900 font-bold">{{ partner.vehicle.make }} {{ partner.vehicle.model }}</p>
               </div>
               <div class="p-4 bg-slate-50 rounded-xl">
                 <p class="text-xs text-slate-500 uppercase">Plate Number</p>
                 <p class="mt-1 text-sm font-bold text-slate-900 font-bold font-mono">{{ partner.vehicle.plateNumber }}</p>
               </div>
               <div class="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
                 <div>
                    <p class="text-xs text-slate-500 uppercase">Color</p>
                    <p class="mt-1 text-sm font-bold text-slate-900 font-bold capitalize">{{ partner.vehicle.color }}</p>
                 </div>
                 <div class="w-8 h-8 rounded-full border border-slate-200" :style="{ backgroundColor: partner.vehicle.color }"></div>
               </div>
            </div>
            <div v-else class="text-center py-12 text-slate-500">No vehicle information registered</div>

            <!-- Vehicle Images -->
            <div v-if="partner.vehicle?.images?.length" class="mt-8">
              <h4 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Vehicle Images</h4>
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="(img, idx) in partner.vehicle.images" :key="idx" class="group relative aspect-video rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                  <img :src="img.url" class="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Vehicle Image" />
                  <a :href="img.url" target="_blank" class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                    <span class="px-3 py-1.5 bg-white text-slate-900 text-xs font-bold rounded-lg shadow-lg">View</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="partner.backPack" class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
             <div class="p-2 bg-orange-50 text-orange-600 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            <h3 class="text-lg font-semibold text-slate-900">Backpack Details</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-2 gap-6">
              <div class="p-4 bg-slate-50 rounded-xl">
                 <p class="text-xs text-slate-500 uppercase">Size</p>
                 <p class="mt-1 text-sm font-bold text-slate-900 font-bold">{{ partner.backPack.size }}</p>
               </div>
               <div class="p-4 bg-slate-50 rounded-xl">
                 <p class="text-xs text-slate-500 uppercase">Weight Limit</p>
                 <p class="mt-1 text-sm font-bold text-slate-900 font-bold">{{ partner.backPack.weightLimit }}kg</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Finalize Onboarding Warning -->
    <div v-if="partner.onboardingStep < 5" class="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start space-x-4">
       <div class="p-2 bg-amber-100 rounded-lg text-amber-600">
         <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 15c-.77 1.333.192 3 1.732 3z" />
         </svg>
       </div>
       <div>
         <h4 class="text-sm font-bold text-amber-900">Action Required: Onboarding Incomplete</h4>
         <p class="mt-1 text-sm text-amber-700">The partner has not completed all onboarding steps (Currently step {{ partner.onboardingStep }}/5). Some features may be limited.</p>
       </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="flex flex-col items-center justify-center py-16">
    <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent shadow-lg shadow-primary-500/20"></div>
    <p class="mt-4 text-sm text-slate-500 font-medium">Fetching partner intelligence...</p>
  </div>

  <ReviewModal
    :is-open="showReviewModal"
    :type="reviewType"
    :title="reviewTitle"
    :confirm-text="reviewType === 'approve' ? 'Approve' : 'Reject'"
    @close="showReviewModal = false"
    @confirm="handleReviewConfirm"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import api from '../../../services/api';

import ReviewModal from '@/components/admin/ReviewModal.vue';

const route = useRoute();
const partner = ref<any>(null);
const currentTab = ref('overview');

const transactions = ref<any[]>([]);
const orders = ref<any[]>([]);
const loadingTransactions = ref(false);
const loadingOrders = ref(false);

// Modal State
const showReviewModal = ref(false);
const reviewType = ref<'approve' | 'reject'>('approve');
const reviewSection = ref('');
const reviewTitle = ref('');

const tabs = [
  { id: 'overview', name: 'Overview' },
  { id: 'earnings', name: 'Earnings' },
  { id: 'deliveries', name: 'Deliveries' },
  { id: 'kyc', name: 'KYC & Verification' },
  { id: 'vehicle', name: 'Vehicle & Gear' },
];

const fetchPartner = async () => {
  try {
    const response = await api.get(`/admin/delivery-partners/${route.params.id}`);
    partner.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch partner', error);
  }
};

const fetchTransactions = async () => {
  if (!partner.value) return;
  loadingTransactions.value = true;
  try {
    const response = await api.get(`/admin/users/${partner.value._id}/wallet/transactions`);
    transactions.value = response.data.data.transactions;
  } catch (error) {
    console.error('Failed to fetch transactions', error);
  } finally {
    loadingTransactions.value = false;
  }
};

const fetchOrders = async () => {
  if (!partner.value) return;
  loadingOrders.value = true;
  try {
    // Fetch orders where assignedPartner matches the current user ID
    const response = await api.get('/admin/orders', {
      params: { assignedPartner: partner.value._id }
    });
    orders.value = response.data.data.orders;
  } catch (error) {
    console.error('Failed to fetch orders', error);
  } finally {
    loadingOrders.value = false;
  }
};

const approveApplication = async () => {
  if (!confirm('Verify all documents and approve this partner?')) return;
  try {
    await api.patch(`/admin/delivery-partners/${route.params.id}/approve`);
    await fetchPartner();
  } catch (error) {
    console.error('Failed to approve', error);
  }
};

const rejectApplication = async () => {
  const reason = prompt('State the reason for rejection:');
  if (!reason) return;
  
  try {
    await api.patch(`/admin/delivery-partners/${route.params.id}/reject`, { reason });
    await fetchPartner();
  } catch (error) {
    console.error('Failed to reject', error);
  }
};

const approveSection = (section: string) => {
  reviewType.value = 'approve';
  reviewSection.value = section;
  reviewTitle.value = 'Approve Section';
  showReviewModal.value = true;
};

const rejectSection = (section: string) => {
  reviewType.value = 'reject';
  reviewSection.value = section;
  reviewTitle.value = 'Reject Section';
  showReviewModal.value = true;
};

const handleReviewConfirm = async ({ note, reason }: { note?: string; reason?: string }) => {
  try {
    if (reviewType.value === 'approve') {
      await api.patch(`/admin/delivery-partners/${route.params.id}/approve-section/${reviewSection.value}`, { note });
    } else {
      await api.patch(`/admin/delivery-partners/${route.params.id}/reject-section/${reviewSection.value}`, { reason, note });
    }
    
    await fetchPartner();
    showReviewModal.value = false;
  } catch (error) {
    console.error(`Failed to ${reviewType.value} ${reviewSection.value}`, error);
    alert(`Failed to ${reviewType.value} section`);
  }
};

watch(currentTab, (newTab) => {
  if (newTab === 'earnings') fetchTransactions();
  if (newTab === 'deliveries') fetchOrders();
});

onMounted(() => {
  fetchPartner();
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<route lang="yaml">
meta:
  layout: admin
</route>
