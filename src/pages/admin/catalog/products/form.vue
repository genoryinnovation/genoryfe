<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">
        {{ isEditing ? 'Edit Product' : 'Create Product' }}
      </h1>
      <button
        @click="router.back()"
        class="text-gray-600 hover:text-gray-900"
      >
        Cancel
      </button>
    </div>

    <form @submit.prevent="saveProduct" class="bg-white shadow rounded-lg p-6 space-y-6">
      <!-- Basic Info -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <input v-model="form.title" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">SKU</label>
          <input v-model="form.sku" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <textarea v-model="form.description" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
      </div>

      <!-- Pricing & Category -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <label class="block text-sm font-medium text-gray-700">Price</label>
          <input v-model.number="form.price" type="number" min="0" step="0.01" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Currency</label>
          <select v-model="form.currency" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Category</label>
          <select v-model="form.category" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            <option v-for="cat in categories" :key="cat._id" :value="cat._id">
              {{ cat.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Inventory -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Inventory</h3>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label class="block text-sm font-medium text-gray-700">Quantity</label>
            <input v-model.number="form.inventory.quantity" type="number" min="0" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Unit</label>
            <input v-model="form.inventory.unit" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="e.g., pieces, kg" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Reorder Level</label>
            <input v-model.number="form.inventory.reorderLevel" type="number" min="0" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
        </div>
      </div>

      <!-- Status -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Status</label>
        <select v-model="form.status" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="discontinued">Discontinued</option>
        </select>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          :disabled="loading"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
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
