<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center space-x-4">
      <button
        @click="router.back()"
        class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div>
        <h1 class="text-2xl font-bold text-slate-900">
          {{ isEditing ? 'Edit Product' : 'Create Product' }}
        </h1>
        <p class="mt-1 text-sm text-slate-500">{{ isEditing ? 'Update product information' : 'Add a new product to the catalog' }}</p>
      </div>
    </div>

    <form @submit.prevent="saveProduct" class="space-y-6">
      <!-- Basic Info Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
          <div class="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900">Basic Information</h3>
        </div>
        <div class="p-6 space-y-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input v-model="form.title" type="text" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" placeholder="Product title" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">SKU</label>
              <input v-model="form.sku" type="text" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-mono" placeholder="PROD-001" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea v-model="form.description" rows="3" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none" placeholder="Product description..."></textarea>
          </div>
        </div>
      </div>

      <!-- Pricing & Category Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
          <div class="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900">Pricing & Category</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Price</label>
              <input v-model.number="form.price" type="number" min="0" step="0.01" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" placeholder="0.00" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Currency</label>
              <select v-model="form.currency" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select v-model="form.category" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                <option value="" disabled>Select category</option>
                <option v-for="cat in categories" :key="cat._id" :value="cat._id">
                  {{ cat.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Inventory Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
          <div class="p-2 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900">Inventory</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
              <input v-model.number="form.inventory.quantity" type="number" min="0" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" placeholder="0" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Unit</label>
              <input v-model="form.inventory.unit" type="text" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" placeholder="e.g., pieces, kg" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Reorder Level</label>
              <input v-model.number="form.inventory.reorderLevel" type="number" min="0" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" placeholder="10" />
            </div>
          </div>
        </div>
      </div>

      <!-- Status Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
          <div class="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900">Status</h3>
        </div>
        <div class="p-6">
          <label class="block text-sm font-medium text-slate-700 mb-2">Product Status</label>
          <select v-model="form.status" class="w-full sm:w-1/3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="discontinued">Discontinued</option>
          </select>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-3">
        <button
          type="button"
          @click="router.back()"
          class="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Saving...' : 'Save Product' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CatalogService, Category } from '../../../../services/admin/catalog.service';

const route = useRoute();
const router = useRouter();
const isEditing = ref(false);
const loading = ref(false);
const categories = ref<Category[]>([]);

const form = reactive({
  title: '',
  sku: '',
  description: '',
  price: 0,
  currency: 'NGN',
  category: '',
  inventory: {
    quantity: 0,
    unit: 'pieces',
    reorderLevel: 10,
  },
  status: 'active',
  images: [] as string[],
});

const fetchCategories = async () => {
  try {
    const response = await CatalogService.getCategories();
    categories.value = response.data;
  } catch (error) {
    console.error('Failed to fetch categories', error);
  }
};

const fetchProduct = async (id: string) => {
  try {
    const response = await CatalogService.getProduct(id);
    const product = response.data;
    Object.assign(form, {
      title: product.title,
      sku: product.sku,
      description: product.description,
      price: product.price,
      currency: product.currency,
      category: product.category._id || product.category,
      inventory: {
        quantity: product.inventory.quantity,
        unit: product.inventory.unit,
        reorderLevel: product.inventory.reorderLevel,
      },
      status: product.status,
      images: product.images,
    });
  } catch (error) {
    console.error('Failed to fetch product', error);
    router.push('/admin/catalog/products');
  }
};

const saveProduct = async () => {
  loading.value = true;
  try {
    if (isEditing.value) {
      await CatalogService.updateProduct(route.params.id as string, form);
    } else {
      await CatalogService.createProduct(form);
    }
    router.push('/admin/catalog/products');
  } catch (error) {
    console.error('Failed to save product', error);
    alert('Failed to save product');
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchCategories();
  if (route.params.id) {
    isEditing.value = true;
    await fetchProduct(route.params.id as string);
  }
});
</script>
