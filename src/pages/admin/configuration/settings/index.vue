<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">System Settings</h1>
        <p class="mt-1 text-sm text-slate-500">Manage dynamic system configurations.</p>
      </div>
      <button
        @click="openModal()"
        class="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-primary-500/30"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Setting
      </button>
    </div>

    <!-- Group Tabs -->
    <div class="flex space-x-2 border-b border-slate-200 overflow-x-auto pb-1">
      <button
        v-for="group in groups"
        :key="group"
        @click="activeGroup = group"
        :class="[
          'px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap',
          activeGroup === group
            ? 'bg-white text-primary-600 border-b-2 border-primary-600'
            : 'text-slate-500 hover:text-slate-700'
        ]"
      >
        {{ group }}
      </button>
    </div>

    <!-- Settings List -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div v-if="loading" class="p-8 text-center text-slate-500">
            Scanning configurations...
        </div>
        <div v-else-if="filteredConfigs.length === 0" class="p-8 text-center text-slate-500">
            No settings found for this group.
        </div>
        <table v-else class="w-full text-left border-collapse">
          <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
              <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Key / Description</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Value</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="config in filteredConfigs" :key="config._id" class="hover:bg-slate-50">
              <td class="px-6 py-4">
                <p class="font-mono text-sm font-medium text-slate-900">{{ config.key }}</p>
                <p class="text-xs text-slate-500">{{ config.description }}</p>
                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 mt-1">
                    {{ config.type }}
                </span>
                 <span v-if="config.isPublic" class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-1">
                    Public
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="max-w-md">
                    <template v-if="config.type === 'boolean'">
                        <span :class="config.value ? 'text-green-600' : 'text-red-600'" class="font-medium">
                            {{ config.value ? 'TRUE' : 'FALSE' }}
                        </span>
                    </template>
                    <template v-else-if="config.type === 'json'">
                         <pre class="text-xs bg-slate-100 p-2 rounded overflow-x-auto">{{ JSON.stringify(config.value, null, 2) }}</pre>
                    </template>
                    <template v-else>
                        <span class="text-sm text-slate-700 break-words">{{ config.value }}</span>
                    </template>
                </div>
              </td>
              <td class="px-6 py-4 text-right space-x-2">
                <button
                  @click="openModal(config)"
                  class="text-primary-600 hover:text-primary-800 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  @click="deleteConfig(config.key)"
                  class="text-rose-600 hover:text-rose-800 text-sm font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <h3 class="text-lg font-bold text-slate-900">{{ isEditing ? 'Edit Setting' : 'Add New Setting' }}</h3>
            
            <div class="space-y-4">
                <div>
                   <label class="block text-sm font-medium text-slate-700 mb-1">Key (Unique)</label>
                   <input v-model="form.key" :disabled="isEditing" type="text" class="w-full px-3 py-2 border rounded-xl" placeholder="e.g. PAGINATION_LIMIT" />
                </div>
                
                <div>
                   <label class="block text-sm font-medium text-slate-700 mb-1">Group</label>
                   <input v-model="form.group" type="text" list="group-suggestions" class="w-full px-3 py-2 border rounded-xl" placeholder="e.g. GENERAL" />
                   <datalist id="group-suggestions">
                       <option v-for="g in groups" :key="g" :value="g"></option>
                   </datalist>
                </div>

                <div>
                   <label class="block text-sm font-medium text-slate-700 mb-1">Type</label>
                   <select v-model="form.type" class="w-full px-3 py-2 border rounded-xl">
                       <option value="string">String</option>
                       <option value="number">Number</option>
                       <option value="boolean">Boolean</option>
                       <option value="json">JSON</option>
                   </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Value</label>
                    <template v-if="form.type === 'boolean'">
                        <select v-model="form.value" class="w-full px-3 py-2 border rounded-xl">
                            <option :value="true">True</option>
                            <option :value="false">False</option>
                        </select>
                    </template>
                    <template v-else-if="form.type === 'number'">
                         <input v-model.number="form.value" type="number" class="w-full px-3 py-2 border rounded-xl" />
                    </template>
                    <template v-else-if="form.type === 'json'">
                         <textarea v-model="jsonStringValue" rows="4" class="w-full px-3 py-2 border rounded-xl font-mono text-xs" placeholder='{"key": "value"}'></textarea>
                    </template>
                    <template v-else>
                         <input v-model="form.value" type="text" class="w-full px-3 py-2 border rounded-xl" />
                    </template>
                </div>
                
                 <div>
                   <label class="block text-sm font-medium text-slate-700 mb-1">Description</label>
                   <input v-model="form.description" type="text" class="w-full px-3 py-2 border rounded-xl" />
                </div>
                
                 <div class="flex items-center">
                    <input v-model="form.isPublic" type="checkbox" id="isPublic" class="h-4 w-4 text-primary-600 rounded" />
                    <label for="isPublic" class="ml-2 text-sm text-slate-700">Is Public API Safe?</label>
                 </div>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
                <button @click="closeModal" class="px-4 py-2 text-slate-600 font-medium">Cancel</button>
                <button @click="saveConfig" class="px-4 py-2 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700">Save</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { SystemConfigService, type SystemConfig, type UpsertSystemConfigDto } from '@/services/admin/system-config.service';

const configs = ref<SystemConfig[]>([]);
const loading = ref(true);
const activeGroup = ref('GENERAL');
const showModal = ref(false);
const isEditing = ref(false);
const jsonStringValue = ref('');

const form = reactive<UpsertSystemConfigDto>({
    key: '',
    value: '',
    group: 'GENERAL',
    type: 'string',
    description: '',
    isPublic: false
});

const groups = computed(() => {
    const g = new Set(configs.value.map(c => c.group));
    if (g.size === 0) return ['GENERAL'];
    return Array.from(g).sort();
});

const filteredConfigs = computed(() => {
    return configs.value.filter(c => c.group === activeGroup.value);
});

// Watch type change to reset value if needed, simplified
watch(() => form.type, (newType) => {
    if (newType === 'boolean' && typeof form.value !== 'boolean') form.value = false;
    if (newType === 'number' && typeof form.value !== 'number') form.value = 0; 
});

const fetchConfigs = async () => {
    loading.value = true;
    try {
        const response = await SystemConfigService.getAll();
        configs.value = response.data; // getAll returns response.data which contains success, data array
        // But checking SystemConfigService.getAll implementation:
        // it returns response.data which is { success: boolean; data: SystemConfig[] }
        // So we need response.data
        if (Array.isArray(response)) {
             configs.value = response;
        } else if (response && response.data) {
             configs.value = response.data;
        }
        
        // Ensure active group exists
        if (!groups.value.includes(activeGroup.value) && groups.value.length > 0) {
            activeGroup.value = groups.value[0];
        }
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
}

const openModal = (config?: SystemConfig) => {
    if (config) {
        isEditing.value = true;
        form.key = config.key;
        form.group = config.group;
        form.type = config.type;
        form.description = config.description;
        form.isPublic = config.isPublic;
        form.value = config.value;
        if (config.type === 'json') {
            jsonStringValue.value = JSON.stringify(config.value, null, 2);
        }
    } else {
        isEditing.value = false;
        form.key = '';
        form.group = activeGroup.value;
        form.type = 'string';
        form.value = '';
        form.description = '';
        form.isPublic = false;
        jsonStringValue.value = '';
    }
    showModal.value = true;
}

const closeModal = () => {
    showModal.value = false;
}

const saveConfig = async () => {
    try {
        const payload = { ...form };
        if (payload.type === 'json') {
            try {
                payload.value = JSON.parse(jsonStringValue.value);
            } catch (e) {
                alert('Invalid JSON');
                return;
            }
        }
        
        await SystemConfigService.upsert(payload);
        closeModal();
        fetchConfigs();
    } catch (e) {
        console.error(e);
        alert('Failed to save');
    }
}

const deleteConfig = async (key: string) => {
    if(!confirm('Delete this setting?')) return;
    try {
        await SystemConfigService.delete(key);
        fetchConfigs();
    } catch(e) {
        console.error(e);
    }
}

onMounted(() => {
    fetchConfigs();
});

</script>

<route lang="yaml">
meta:
  layout: admin
</route>
