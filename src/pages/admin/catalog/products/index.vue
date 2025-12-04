<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Products</h1>
        <p class="mt-1 text-sm text-slate-500">Manage your product catalog</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <router-link
          to="/admin/catalog/products/create"
          class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Product
        </router-link>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Total Products</p>
            <p class="mt-2 text-3xl font-bold text-slate-900">{{ (stats.total || 0).toLocaleString() }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
            <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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
            <p class="text-sm font-medium text-slate-500">Low Stock</p>
            <p class="mt-2 text-3xl font-bold text-amber-600">{{ (stats.lowStock || 0).toLocaleString() }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200">
            <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Out of Stock</p>
            <p class="mt-2 text-3xl font-bold text-rose-600">{{ (stats.outOfStock || 0).toLocaleString() }}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200">
            <svg class="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1 relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          v-model="search"
          @input="debouncedFetch"
          type="text"
          placeholder="Search products..."
          class="block w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
      </div>
      <select
        v-model="categoryFilter"
        @change="fetchProducts"
        class="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all min-w-[160px]"
      >
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat._id" :value="cat._id">{{ cat.name }}</option>
      </select>
      <select
        v-model="statusFilter"
        @change="fetchProducts"
        class="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all min-w-[140px]"
      >
        <option value="">All Statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="discontinued">Discontinued</option>
      </select>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead>
            <tr class="bg-slate-50">
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                SKU
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Stock
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="relative px-6 py-4">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="product in products" :key="product._id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-slate-100">
                    <img 
                      class="w-12 h-12 object-cover" 
                      :src="product.images[0] || 'https://via.placeholder.com/48'" 
                      alt="" 
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-semibold text-slate-900">{{ product.title }}</div>
                    <div class="text-xs text-slate-500">{{ product.category?.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-slate-600 font-mono bg-slate-100 px-2 py-1 rounded">{{ product.sku }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-semibold text-slate-900">{{ product.currency }} {{ product.price.toFixed(2) }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium"
                  :class="product.inventory.quantity <= product.inventory.reorderLevel ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'"
                >
                  <span 
                    class="w-1.5 h-1.5 rounded-full mr-1.5"
                    :class="product.inventory.quantity <= product.inventory.reorderLevel ? 'bg-rose-500' : 'bg-emerald-500'"
                  ></span>
                  {{ product.inventory.quantity }} {{ product.inventory.unit }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                  :class="{
                    'bg-emerald-100 text-emerald-700': product.status === 'active',
                    'bg-slate-100 text-slate-600': product.status === 'inactive',
                    'bg-rose-100 text-rose-700': product.status === 'discontinued'
                  }"
                >
                  {{ product.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="flex items-center justify-end space-x-1">
                  <router-link 
                    :to="`/admin/catalog/products/${product._id}`" 
                    class="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="View"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </router-link>
                  <router-link 
                    :to="`/admin/catalog/products/${product._id}/edit`" 
                    class="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </router-link>
                  <button 
                    @click="deleteProduct(product._id)" 
                    class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="products.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h3 class="mt-4 text-sm font-medium text-slate-900">No products found</h3>
        <p class="mt-1 text-sm text-slate-500">Try adjusting your search or filter criteria.</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between">
      <p class="text-sm text-slate-600">
        Showing page <span class="font-medium">{{ pagination.page }}</span> of <span class="font-medium">{{ pagination.pages }}</span>
        <span class="text-slate-400 ml-1">({{ pagination.total }} results)</span>
      </p>
      <div class="flex items-center space-x-2">
        <button
          @click="changePage(pagination.page - 1)"
          :disabled="pagination.page === 1"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          @click="changePage(pagination.page + 1)"
          :disabled="pagination.page === pagination.pages"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
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
