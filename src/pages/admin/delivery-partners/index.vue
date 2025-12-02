<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Delivery Partners</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all delivery partners including their name, type, status, and earnings.</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="mt-4 flex gap-4">
      <select v-model="filters.status" @change="fetchPartners" class="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="suspended">Suspended</option>
      </select>
      <select v-model="filters.type" @change="fetchPartners" class="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
        <option value="">All Types</option>
        <option value="driver">Driver</option>
        <option value="rider">Rider</option>
        <option value="errander">Errander</option>
      </select>
    </div>

    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Vehicle</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Earnings</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="partner in partners" :key="partner._id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div class="font-medium text-gray-900">{{ partner.user.firstName }} {{ partner.user.lastName }}</div>
                    <div class="text-gray-500">{{ partner.user.email }}</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">{{ partner.type }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <span :class="[
                      partner.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      partner.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      partner.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800',
                      'inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                    ]">
                      {{ partner.status }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ partner.vehicle?.make }} {{ partner.vehicle?.model }} ({{ partner.vehicle?.plateNumber }})
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    ₦{{ partner.earnings.total.toLocaleString() }}
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <router-link :to="`/admin/delivery-partners/${partner._id}`" class="text-blue-600 hover:text-blue-900">View<span class="sr-only">, {{ partner.user.firstName }}</span></router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import api from '../../../services/api';

const partners = ref<any[]>([]);
const filters = reactive({
  status: '',
  type: '',
});

const fetchPartners = async () => {
  try {
    const response = await api.get('/admin/delivery-partners', {
      params: filters
    });
    partners.value = response.data.data.partners;
  } catch (error) {
    console.error('Failed to fetch partners', error);
  }
};

onMounted(() => {
  fetchPartners();
});
</script>
