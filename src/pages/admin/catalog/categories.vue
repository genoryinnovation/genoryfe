<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Categories</h1>
        <p class="mt-1 text-sm text-slate-500">Organize your products into categories</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button
          @click="openCreateModal"
          class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Category
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Total Categories</p>
            <p class="mt-2 text-3xl font-bold text-slate-900">{{ (stats.total || 0).toLocaleString() }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
            <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
      </div>

      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Active</p>
            <p class="mt-2 text-3xl font-bold text-emerald-600">{{ (stats.active || 0).toLocaleString() }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200">
            <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Inactive</p>
            <p class="mt-2 text-3xl font-bold text-slate-400">{{ (stats.inactive || 0).toLocaleString() }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
            <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Category List -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <ul role="list" class="divide-y divide-slate-100">
        <li v-for="category in categories" :key="category._id" class="hover:bg-slate-50/50 transition-colors">
          <div class="px-6 py-4 flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200">
                <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-slate-900">{{ category.name }}</h3>
                <p class="text-xs text-slate-500 mt-0.5">{{ category.description || 'No description' }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                :class="category.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'"
              >
                <span 
                  class="w-1.5 h-1.5 rounded-full mr-1.5"
                  :class="category.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'"
                ></span>
                {{ category.status }}
              </span>
              <div class="flex items-center space-x-1">
                <button 
                  @click="editCategory(category)" 
                  class="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button 
                  @click="deleteCategory(category._id)" 
                  class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <!-- Empty State -->
      <div v-if="categories.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 class="mt-4 text-sm font-medium text-slate-900">No categories yet</h3>
        <p class="mt-1 text-sm text-slate-500">Get started by creating a new category.</p>
        <button
          @click="openCreateModal"
          class="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create your first category
        </button>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
          
          <!-- Modal Panel -->
          <div class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="px-6 pt-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold text-slate-900">
                  {{ isEditing ? 'Edit Category' : 'Create Category' }}
                </h3>
                <button 
                  @click="closeModal"
                  class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">Category Name</label>
                  <input 
                    v-model="form.name" 
                    type="text" 
                    placeholder="Enter category name" 
                    class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <input 
                    v-model="form.description" 
                    type="text" 
                    placeholder="Brief description (optional)" 
                    class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">Display Order</label>
                  <input 
                    v-model.number="form.displayOrder" 
                    type="number" 
                    placeholder="0" 
                    class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
            
            <div class="px-6 py-4 mt-4 bg-slate-50 flex justify-end space-x-3">
              <button 
                @click="closeModal" 
                class="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                @click="saveCategory" 
                class="px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25"
              >
                {{ isEditing ? 'Update Category' : 'Create Category' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { CatalogService, Category } from '../../../services/admin/catalog.service';

const categories = ref<Category[]>([]);
const stats = ref<any>({});
const showModal = ref(false);
const isEditing = ref(false);
const editingId = ref<string | null>(null);

const form = reactive({
  name: '',
  description: '',
  displayOrder: 0,
});

const fetchCategories = async () => {
  try {
    const [listRes, statsRes] = await Promise.all([
      CatalogService.getCategories(),
      CatalogService.getCategoryStats(),
    ]);
    categories.value = listRes.data;
    stats.value = statsRes.data;
  } catch (error) {
    console.error('Failed to fetch categories', error);
  }
};

const openCreateModal = () => {
  isEditing.value = false;
  editingId.value = null;
  form.name = '';
  form.description = '';
  form.displayOrder = 0;
  showModal.value = true;
};

const editCategory = (category: Category) => {
  isEditing.value = true;
  editingId.value = category._id;
  form.name = category.name;
  form.description = category.description || '';
  form.displayOrder = category.displayOrder;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveCategory = async () => {
  try {
    if (isEditing.value && editingId.value) {
      await CatalogService.updateCategory(editingId.value, form);
    } else {
      await CatalogService.createCategory(form);
    }
    await fetchCategories();
    closeModal();
  } catch (error) {
    console.error('Failed to save category', error);
  }
};

const deleteCategory = async (id: string) => {
  if (!confirm('Are you sure you want to delete this category?')) return;
  try {
    await CatalogService.deleteCategory(id);
    await fetchCategories();
  } catch (error) {
    console.error('Failed to delete category', error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>
