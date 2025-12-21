<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p class="mt-1 text-sm text-slate-500">Welcome back! Here's what's happening with your store.</p>
      </div>
      <div class="mt-4 sm:mt-0 flex items-center space-x-3">
        <select class="px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>This year</option>
        </select>
        <button class="inline-flex items-center px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Total Users Card -->
      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Total Users</p>
            <p class="mt-2 text-3xl font-bold text-slate-900">{{ stats.users?.total?.toLocaleString() || 0 }}</p>
            <div class="mt-2 flex items-center text-sm">
              <span class="inline-flex items-center text-emerald-600">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                12%
              </span>
              <span class="ml-1 text-slate-400">vs last month</span>
            </div>
          </div>
          <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/5 rounded-full"></div>
      </div>

      <!-- Total Partners Card -->
      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Total Partners</p>
            <p class="mt-2 text-3xl font-bold text-slate-900">{{ stats.partners?.total?.toLocaleString() || 0 }}</p>
            <div class="mt-2 flex items-center text-sm">
              <span class="inline-flex items-center text-emerald-600">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                8%
              </span>
              <span class="ml-1 text-slate-400">vs last month</span>
            </div>
          </div>
          <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/5 rounded-full"></div>
      </div>

      <!-- Total Products Card -->
      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Total Products</p>
            <p class="mt-2 text-3xl font-bold text-slate-900">{{ stats.products?.total?.toLocaleString() || 0 }}</p>
            <div class="mt-2 flex items-center text-sm">
              <span class="inline-flex items-center text-emerald-600">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                24%
              </span>
              <span class="ml-1 text-slate-400">vs last month</span>
            </div>
          </div>
          <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg shadow-violet-500/30">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
        <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-violet-500/5 rounded-full"></div>
      </div>

      <!-- Low Stock Alert Card -->
      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Low Stock Items</p>
            <p class="mt-2 text-3xl font-bold text-rose-600">{{ stats.products?.lowStock?.toLocaleString() || 0 }}</p>
            <div class="mt-2 flex items-center text-sm">
              <span class="inline-flex items-center text-rose-600">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Needs attention
              </span>
            </div>
          </div>
          <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 shadow-lg shadow-rose-500/30">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
        </div>
        <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-rose-500/5 rounded-full"></div>
      </div>
    </div>

    <!-- Charts & Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Revenue Chart Placeholder -->
      <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-slate-900">Revenue Overview</h3>
            <p class="text-sm text-slate-500">Monthly revenue for the current year</p>
          </div>
          <div class="flex items-center space-x-2">
            <button class="px-3 py-1.5 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">Weekly</button>
            <button class="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Monthly</button>
            <button class="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Yearly</button>
          </div>
        </div>
        <div class="h-64 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
          <div class="text-center">
            <svg class="w-12 h-12 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p class="mt-2 text-sm text-slate-400">Chart visualization</p>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-slate-900">Recent Activity</h3>
          <button class="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">View all</button>
        </div>
        <div class="space-y-4">
          <div v-for="i in 5" :key="i" class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
              <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-slate-900">New order #{{ 1000 + i }}</p>
              <p class="text-xs text-slate-500">{{ i }} minute{{ i > 1 ? 's' : '' }} ago</p>
            </div>
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
              Completed
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <router-link 
        to="/admin/catalog/products/create" 
        class="group flex items-center p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100 transition-all"
      >
        <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm font-semibold text-slate-900">Add Product</p>
          <p class="text-xs text-slate-500">Create new product</p>
        </div>
      </router-link>

      <router-link 
        to="/admin/orders" 
        class="group flex items-center p-4 bg-white rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100 transition-all"
      >
        <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm font-semibold text-slate-900">View Orders</p>
          <p class="text-xs text-slate-500">Manage all orders</p>
        </div>
      </router-link>

      <router-link 
        to="/admin/partners/create" 
        class="group flex items-center p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100 transition-all"
      >
        <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm font-semibold text-slate-900">Add Partner</p>
          <p class="text-xs text-slate-500">Onboard new partner</p>
        </div>
      </router-link>

      <router-link 
        to="/admin/users" 
        class="group flex items-center p-4 bg-white rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100 transition-all"
      >
        <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-violet-50 text-violet-600 group-hover:bg-violet-500 group-hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm font-semibold text-slate-900">Manage Users</p>
          <p class="text-xs text-slate-500">View all customers</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../../services/api';

const stats = ref<any>({});

const fetchStats = async () => {
  try {
    const response = await api.get('/admin/dashboard/stats');
    if (response.data.success) {
      stats.value = response.data.data;
    }
  } catch (error) {
    console.error('Failed to fetch dashboard stats', error);
  }
};

onMounted(() => {
  fetchStats();
});
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
