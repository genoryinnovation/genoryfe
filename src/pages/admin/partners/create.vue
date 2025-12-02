<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-6">
      <router-link to="/admin/partners" class="text-gray-500 hover:text-gray-700 flex items-center space-x-1">
        <span>&larr; Back to Partners</span>
      </router-link>
      <h1 class="text-2xl font-bold text-gray-800 mt-2">Create New Partner</h1>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <form @submit.prevent="createPartner" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            placeholder="e.g. Acme Corp"
          />
        </div>

        <div>
          <label for="regNumber" class="block text-sm font-medium text-gray-700">Registration Number</label>
          <input
            type="text"
            id="regNumber"
            v-model="form.registrationNumber"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            placeholder="e.g. RC123456"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="industry" class="block text-sm font-medium text-gray-700">Industry</label>
            <input
              type="text"
              id="industry"
              v-model="form.industry"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="e.g. Technology"
            />
          </div>

          <div>
            <label for="employees" class="block text-sm font-medium text-gray-700">Employee Count</label>
            <input
              type="number"
              id="employees"
              v-model="form.employeeCount"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="e.g. 50"
            />
          </div>
        </div>

        <div class="pt-4 flex justify-end space-x-3">
          <router-link
            to="/admin/partners"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Partner
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  name: '',
  registrationNumber: '',
  industry: '',
  employeeCount: '',
});

const createPartner = async () => {
  // TODO: Implement API call
  console.log('Creating partner:', form);
  
  // Simulate success
  setTimeout(() => {
    router.push('/admin/partners');
  }, 1000);
};
</script>
