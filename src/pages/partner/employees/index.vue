<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Employee Management</h1>
        <p class="text-slate-500">Manage your employees and their spending limits.</p>
      </div>
      <div class="flex space-x-3">
        <div class="relative">
          <input 
            v-model="searchQuery" 
            @input="handleSearch"
            type="text" 
            placeholder="Search employees..." 
            class="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none w-64 transition-all"
          />
          <svg class="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button 
          @click="showBulkUpload = true"
          class="px-4 py-2 text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
        >
          Bulk Upload
        </button>
        <button 
          @click="showAddModal = true"
          class="px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Add Employee
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <p class="text-sm font-medium text-slate-500">Total Employees</p>
        <p class="text-3xl font-bold text-slate-900 mt-2">{{ stats?.employeeCount || employees.length }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <p class="text-sm font-medium text-slate-500">Pending Approvals</p>
        <p class="text-3xl font-bold text-slate-900 mt-2">{{ stats?.pendingOrders || 0 }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <p class="text-sm font-medium text-slate-500">This Month's Spending</p>
        <p class="text-3xl font-bold text-primary-600 mt-2">₦{{ stats?.monthSpend?.toLocaleString() || 0 }}</p>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
      <div v-if="loading" class="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-10">
        <svg class="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <table class="w-full text-left border-collapse">
        <!-- ... existing table headers ... -->
        <thead class="bg-slate-50 border-b border-slate-200">
          <tr>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Employee</th>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Email</th>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Threshold</th>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr v-if="employees.length === 0 && !loading">
            <td colspan="5" class="px-6 py-12 text-center text-slate-500">
              No employees found. Invite your first employee to get started.
            </td>
          </tr>
          <tr v-for="emp in employees" :key="emp.email" class="hover:bg-slate-50 transition-colors">
            <td class="px-6 py-4">
              <router-link :to="`/partner/employees/${emp._id}`" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 font-black text-sm uppercase shadow-sm">
                  {{ emp.firstName.charAt(0) }}
                </div>
                <div class="flex flex-col">
                  <span class="font-bold text-slate-900 leading-tight">{{ emp.firstName }} {{ emp.lastName }}</span>
                  <span v-if="emp.membership?.employeeId" class="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">ID: {{ emp.membership.employeeId }}</span>
                </div>
              </router-link>
            </td>
            <td class="px-6 py-4 text-slate-600 font-medium">{{ emp.email }}</td>
            <td class="px-6 py-4">
              <span 
                :class="[
                  'inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest italic',
                  emp.membership?.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                ]"
              >
                {{ emp.membership?.status || 'Unknown' }}
              </span>
            </td>
            <td class="px-6 py-4">
              <p class="text-sm font-black text-slate-900 tabular-nums italic">
                ₦{{ emp.membership?.settings?.orderThreshold?.toLocaleString() || '0' }}
              </p>
              <p class="text-[9px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">Per Order Limit</p>
            </td>
            <td class="px-6 py-4">
              <router-link 
                :to="`/partner/employees/${emp._id}`"
                class="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Stats
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div v-if="meta && meta.pages > 1" class="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between font-bold">
        <span class="text-sm text-slate-500">
          Showing <span class="text-slate-900">{{ meta.page * meta.limit - meta.limit + 1 }}</span> to 
          <span class="text-slate-900">{{ Math.min(meta.page * meta.limit, meta.total) }}</span> of 
          <span class="text-slate-900">{{ meta.total }}</span> entries
        </span>
        <div class="flex space-x-2">
          <button 
            @click="changePage(meta.page - 1)" 
            :disabled="!meta.hasPrevPage"
            class="px-3 py-1 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors"
          >
            Prev
          </button>
          <div class="flex space-x-1">
            <button 
              v-for="p in meta.pages" 
              :key="p"
              @click="changePage(p)"
              :class="['px-3 py-1 border rounded-lg transition-colors', meta.page === p ? 'bg-primary-600 text-white border-primary-600' : 'bg-white border-slate-200 hover:bg-slate-50']"
            >
              {{ p }}
            </button>
          </div>
          <button 
            @click="changePage(meta.page + 1)" 
            :disabled="!meta.hasNextPage"
            class="px-3 py-1 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Add Employee Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div class="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 class="text-xl font-bold text-slate-900">Invite Employee</h3>
          <button @click="showAddModal = false" class="text-slate-400 hover:text-slate-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="handleInvite" class="p-6 space-y-4">
          <!-- API Feedback -->
          <div v-if="inviteError" class="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-sm font-medium animate-in fade-in slide-in-from-top-1">
            {{ inviteError }}
          </div>
          <div v-if="inviteSuccess" class="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-sm font-medium animate-in fade-in slide-in-from-top-1">
            {{ inviteSuccess }}
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-700">First Name</label>
              <input v-model="inviteData.firstName" type="text" required class="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-700">Last Name</label>
              <input v-model="inviteData.lastName" type="text" required class="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
            </div>
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Email Address</label>
            <input v-model="inviteData.email" type="email" required class="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Staff ID (Optional)</label>
            <input v-model="inviteData.hrEmployeeId" type="text" class="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Weekly Threshold (₦)</label>
            <input v-model="inviteData.orderThreshold" type="number" class="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          <div class="pt-4">
            <button 
              type="submit" 
              :disabled="inviting"
              class="w-full py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <span v-if="!inviting">Send Invitation</span>
              <svg v-else class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- Bulk Upload Modal -->
    <div v-if="showBulkUpload" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
        <div class="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 class="text-xl font-bold text-slate-900">Bulk Employee Upload</h3>
            <p class="text-slate-500 text-xs mt-1">Upload a CSV file with employee details.</p>
          </div>
          <button @click="showBulkUpload = false" class="text-slate-400 hover:text-slate-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6 space-y-6">
          <div v-if="inviteError" class="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-sm font-medium animate-in fade-in slide-in-from-top-1">
            {{ inviteError }}
          </div>
          
          <div class="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300 text-center relative">
            <p class="text-xs text-slate-500 mb-4 italic">
              Format: email, firstName, lastName, [staffId], [threshold]
            </p>
            <input 
              type="file" 
              accept=".csv"
              @change="onFileChange"
              class="hidden" 
              ref="fileInput"
            />
            <button 
              @click="triggerFileInput"
              class="w-full py-6 flex flex-col items-center justify-center space-y-2 hover:bg-white transition-all rounded-lg"
            >
              <svg class="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span class="text-sm font-bold text-slate-700">
                {{ selectedFile ? selectedFile.name : 'Click to select CSV file' }}
              </span>
            </button>
          </div>

          <div v-if="bulkResults" class="p-4 rounded-xl" :class="bulkResults.failed > 0 ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'">
            <p class="text-sm font-bold">Upload Complete</p>
            <p class="text-xs mt-1">Successful: {{ bulkResults.successful }} | Failed: {{ bulkResults.failed }}</p>
            <div v-if="bulkResults.errors.length > 0" class="mt-2 text-[10px] space-y-0.5">
              <p v-for="(err, i) in bulkResults.errors.slice(0, 3)" :key="i">
                • {{ err.email }}: {{ err.error }}
              </p>
            </div>
          </div>

          <div class="flex space-x-3">
             <button 
              @click="showBulkUpload = false"
              class="flex-1 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50"
             >
              Cancel
             </button>
             <button 
              @click="handleBulkUpload"
              :disabled="!selectedFile || uploading"
              class="flex-1 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all disabled:opacity-50 flex items-center justify-center"
             >
              <span v-if="!uploading">Upload Employees</span>
              <svg v-else class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
             </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PartnerPortalService, Employee } from '../../../services/partner-portal.service';

const employees = ref<Employee[]>([]);
const stats = ref<any>(null);
const loading = ref(true);
const uploading = ref(false);
const showAddModal = ref(false);
const showBulkUpload = ref(false);
const selectedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const bulkResults = ref<any>(null);
const inviteError = ref('');
const inviteSuccess = ref('');
const inviting = ref(false);

// Pagination & Search
const searchQuery = ref('');
const meta = ref<any>(null);
const searchTimeout = ref<any>(null);

const inviteData = ref({
  email: '',
  firstName: '',
  lastName: '',
  hrEmployeeId: '',
  orderThreshold: 20000
});

const fetchEmployees = async (page = 1) => {
  try {
    loading.value = true;
    const [empRes, statsData] = await Promise.all([
      PartnerPortalService.getEmployees({ page, limit: 10, search: searchQuery.value }),
      PartnerPortalService.getStats()
    ]);
    employees.value = empRes.data;
    meta.value = empRes.meta;
    stats.value = statsData;
  } catch (error) {
    console.error('Failed to fetch employees', error);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    fetchEmployees(1);
  }, 500);
};

const changePage = (page: number) => {
  fetchEmployees(page);
};

const handleInvite = async () => {
  try {
    inviteError.value = '';
    inviteSuccess.value = '';
    inviting.value = true;
    
    await PartnerPortalService.inviteEmployee(inviteData.value);
    
    inviteSuccess.value = 'Employee invited successfully!';
    await fetchEmployees();
    
    // Close modal after delay on success
    setTimeout(() => {
      showAddModal.value = false;
      inviteSuccess.value = '';
      // Reset form
      inviteData.value = {
        email: '',
        firstName: '',
        lastName: '',
        hrEmployeeId: '',
        orderThreshold: 20000
      };
    }, 1500);
  } catch (error: any) {
    console.error('Failed to invite employee', error);
    inviteError.value = error.response?.data?.message || 'Failed to invite employee. Please check your data.';
  } finally {
    inviting.value = false;
  }
};

const onFileChange = (e: any) => {
  selectedFile.value = e.target.files[0];
  bulkResults.value = null;
};

const handleBulkUpload = async () => {
  if (!selectedFile.value) return;
  
  try {
    inviteError.value = '';
    uploading.value = true;
    const text = await selectedFile.value.text();
    const rows = text.split('\n').filter(row => row.trim());
    
    // Skip header if it exists
    const startIndex = rows[0].toLowerCase().includes('email') ? 1 : 0;
    
    const employeesToInvite = rows.slice(startIndex).map(row => {
      const [email, firstName, lastName, staffId, threshold] = row.split(',').map(s => s.trim());
      return {
        email,
        firstName,
        lastName,
        hrEmployeeId: staffId,
        orderThreshold: threshold ? parseInt(threshold) : 20000
      };
    }).filter(e => e.email && e.firstName);

    if (employeesToInvite.length === 0) {
      throw new Error('No valid employee data found in CSV.');
    }

    const result = await PartnerPortalService.bulkInviteEmployees(employeesToInvite);
    bulkResults.value = result;
    
    if (result.successful > 0) {
      await fetchEmployees();
    }
    
    selectedFile.value = null;
  } catch (error: any) {
    console.error('Failed bulk upload', error);
    inviteError.value = error.response?.data?.message || error.message || 'Failed to process CSV file.';
  } finally {
    uploading.value = false;
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

onMounted(fetchEmployees);
</script>

<route lang="yaml">
meta:
  layout: partner
</route>
