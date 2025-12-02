<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Categories</h1>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
      >
        Add Category
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Total Categories</dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.total || 0 }}</dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Active</dt>
          <dd class="mt-1 text-3xl font-semibold text-green-600">{{ stats.active || 0 }}</dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Inactive</dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-500">{{ stats.inactive || 0 }}</dd>
        </div>
      </div>
    </div>

    <!-- Category List -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="category in categories" :key="category._id">
          <div class="px-4 py-4 sm:px-6 flex items-center justify-between">
            <div class="flex items-center">
              <div class="text-sm font-medium text-blue-600 truncate">
                {{ category.name }}
              </div>
              <div class="ml-2 flex-shrink-0 flex">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="category.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                >
                  {{ category.status }}
                </span>
              </div>
            </div>
            <div class="flex space-x-2">
              <button @click="editCategory(category)" class="text-gray-400 hover:text-gray-500">
                Edit
              </button>
              <button @click="deleteCategory(category._id)" class="text-red-400 hover:text-red-500">
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Modal (Simplified for now) -->
    <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              {{ isEditing ? 'Edit Category' : 'Add Category' }}
            </h3>
            <div class="mt-2 space-y-4">
              <input v-model="form.name" type="text" placeholder="Category Name" class="w-full border p-2 rounded" />
              <input v-model="form.description" type="text" placeholder="Description" class="w-full border p-2 rounded" />
              <input v-model.number="form.displayOrder" type="number" placeholder="Display Order" class="w-full border p-2 rounded" />
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="saveCategory" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm">
              Save
            </button>
            <button @click="closeModal" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
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
  if (!confirm('Are you sure?')) return;
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
