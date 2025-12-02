<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Products</h1>
      <router-link
        to="/admin/catalog/products/create"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
      >
        Add Product
      </router-link>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Total Products</dt>
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
          <dt class="text-sm font-medium text-gray-500 truncate">Low Stock</dt>
          <dd class="mt-1 text-3xl font-semibold text-yellow-600">{{ stats.lowStock || 0 }}</dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Out of Stock</dt>
          <dd class="mt-1 text-3xl font-semibold text-red-600">{{ stats.outOfStock || 0 }}</dd>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-6 flex gap-4">
      <input
        v-model="search"
        @input="debouncedFetch"
        type="text"
        placeholder="Search products..."
        class="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <select
        v-model="categoryFilter"
        @change="fetchProducts"
        class="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat._id" :value="cat._id">
          {{ cat.name }}
        </option>
      </select>
      <select
        v-model="statusFilter"
        @change="fetchProducts"
        class="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="discontinued">Discontinued</option>
      </select>
    </div>

    <!-- Product List -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SKU
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="product in products" :key="product._id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 flex-shrink-0">
                  <img class="h-10 w-10 rounded-full object-cover" :src="product.images[0] || 'https://via.placeholder.com/40'" alt="" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ product.title }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ product.category?.name }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ product.sku }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ product.currency }} {{ product.price.toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="product.inventory.quantity <= product.inventory.reorderLevel ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
              >
                {{ product.inventory.quantity }} {{ product.inventory.unit }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': product.status === 'active',
                  'bg-gray-100 text-gray-800': product.status === 'inactive',
                  'bg-red-100 text-red-800': product.status === 'discontinued'
                }"
              >
                {{ product.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <router-link :to="`/admin/catalog/products/${product._id}`" class="text-blue-600 hover:text-blue-900 mr-4">
                View
              </router-link>
              <router-link :to="`/admin/catalog/products/${product._id}/edit`" class="text-indigo-600 hover:text-indigo-900 mr-4">
                Edit
              </router-link>
              <button @click="deleteProduct(product._id)" class="text-red-600 hover:text-red-900">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex justify-between items-center">
      <div class="text-sm text-gray-700">
        Showing page {{ pagination.page }} of {{ pagination.pages }} ({{ pagination.total }} results)
      </div>
      <div class="flex space-x-2">
        <button
          @click="changePage(pagination.page - 1)"
          :disabled="pagination.page === 1"
          class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          @click="changePage(pagination.page + 1)"
          :disabled="pagination.page === pagination.pages"
          class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CatalogService, Product, Category } from '../../../../services/admin/catalog.service';

const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);
const stats = ref<any>({});
const search = ref('');
const categoryFilter = ref('');
const statusFilter = ref('');
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 1,
});

let debounceTimeout: any;

const fetchCategories = async () => {
  try {
    const response = await CatalogService.getCategories();
    categories.value = response.data;
  } catch (error) {
    console.error('Failed to fetch categories', error);
  }
};

const fetchProducts = async () => {
  try {
    const [listRes, statsRes] = await Promise.all([
      CatalogService.getProducts(
        pagination.value.page,
        pagination.value.limit,
        search.value,
        categoryFilter.value,
        statusFilter.value
      ),
      CatalogService.getProductStats(),
    ]);
    products.value = listRes.data.products;
    pagination.value = listRes.data.pagination;
    stats.value = statsRes.data;
  } catch (error) {
    console.error('Failed to fetch products', error);
  }
};

const debouncedFetch = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    pagination.value.page = 1;
    fetchProducts();
  }, 300);
};

const changePage = (page: number) => {
  if (page >= 1 && page <= pagination.value.pages) {
    pagination.value.page = page;
    fetchProducts();
  }
};

const deleteProduct = async (id: string) => {
  if (!confirm('Are you sure you want to delete this product?')) return;
  try {
    await CatalogService.deleteProduct(id);
    fetchProducts();
  } catch (error) {
    console.error('Failed to delete product', error);
  }
};

onMounted(() => {
  fetchCategories();
  fetchProducts();
});
</script>
