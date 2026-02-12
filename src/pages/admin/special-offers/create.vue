<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">
          {{ isEditing ? 'Edit Special Offer' : 'Create Special Offer' }}
        </h1>
        <p class="mt-1 text-sm text-slate-500">
          {{ isEditing ? 'Update existing offer details' : 'Configure a new promotional offer' }}
        </p>
      </div>
    </div>

    <form @submit.prevent="saveOffer" class="space-y-6">
      <!-- Basic Info -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
        <h2 class="text-lg font-semibold text-slate-900">Basic Information</h2>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <input 
              v-model="form.title" 
              type="text" 
              required
              class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Type</label>
            <select 
              v-model="form.type" 
              class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            >
              <option value="SINGLE">Single Item</option>
              <option value="COMBO">Combo Deal</option>
            </select>
          </div>

          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea 
              v-model="form.description" 
              rows="3"
              class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            ></textarea>
          </div>

          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
            <input 
              v-model="form.image" 
              type="url" 
              required
              class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      <!-- Pricing & Validity -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
        <h2 class="text-lg font-semibold text-slate-900">Pricing & Validity</h2>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Offer Price (₦)</label>
            <input 
              v-model.number="form.price" 
              type="number" 
              required
              min="0"
              class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Original Price (₦)</label>
            <input 
              v-model.number="form.originalPrice" 
              type="number" 
              min="0"
              class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Valid From</label>
            <input 
              v-model="form.validFrom" 
              type="datetime-local" 
              required
              class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Valid Until</label>
            <input 
              v-model="form.validUntil" 
              type="datetime-local" 
              required
              class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
          
           <div>
            <label class="flex items-center space-x-2 cursor-pointer mt-6">
                <input 
                  v-model="form.isActive" 
                  type="checkbox" 
                  class="w-5 h-5 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                />
                <span class="text-sm font-medium text-slate-900">Is Active?</span>
            </label>
           </div>
        </div>
      </div>

       <!-- Eligibility Criteria -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
        <h2 class="text-lg font-semibold text-slate-900">Eligibility Criteria</h2>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Minimum Completed Orders</label>
            <input 
              v-model.number="form.criteria.minOrders" 
              type="number" 
              min="0"
              class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Target User Type</label>
            <select 
              v-model="form.criteria.targetUser" 
              class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            >
              <option value="ALL">All Users</option>
              <option value="NEW">New Users Only (0 orders)</option>
              <option value="EXISTING">Existing Users Only (>0 orders)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Items Selection -->
       <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
        <h2 class="text-lg font-semibold text-slate-900">Included Products</h2>
        
        <div class="space-y-4">
            <div class="flex space-x-2">
                 <input 
                  v-model="productSearch" 
                  type="text" 
                  placeholder="Search products by title..." 
                  class="block flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  @input="searchProducts"
                />
            </div>
            
            <!-- Search Results -->
             <div v-if="searchResults.length > 0" class="border border-slate-200 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                <div 
                    v-for="product in searchResults" 
                    :key="product._id"
                    class="px-4 py-2 hover:bg-slate-50 cursor-pointer flex justify-between items-center"
                    @click="addProductToOffer(product)"
                >
                    <div class="flex items-center space-x-3">
                         <img :src="product.images[0] || 'https://via.placeholder.com/32'" class="w-8 h-8 rounded object-cover" />
                         <span class="text-sm font-medium">{{ product.title }}</span>
                    </div>
                    <span class="text-xs text-slate-500">{{ product.sku }}</span>
                </div>
             </div>

             <!-- Selected Items -->
             <div v-if="form.items.length > 0" class="space-y-2">
                <div v-for="(item, index) in form.items" :key="index" class="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                    <div class="flex items-center space-x-3">
                        <span class="text-sm font-medium text-slate-900">{{ item.product.title }}</span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <label class="text-xs text-slate-500">Qty:</label>
                        <input 
                            v-model.number="item.quantity"
                            type="number"
                            min="1"
                            class="w-16 px-2 py-1 bg-white border border-slate-200 rounded text-sm"
                        />
                        <button type="button" @click="removeItem(index)" class="text-rose-500 hover:text-rose-700">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
             </div>
             <p v-else class="text-sm text-slate-500 text-center py-4">No products selected.</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-3">
        <router-link
          to="/admin/special-offers"
          class="px-6 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
        >
          Cancel
        </router-link>
        <button
          type="submit"
          class="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25"
        >
          {{ isEditing ? 'Update Offer' : 'Create Offer' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { SpecialOfferService } from '../../../services/admin/special_offer.service';
import { CatalogService } from '../../../services/admin/catalog.service';

const route = useRoute();
const router = useRouter();

const isEditing = computed(() => !!route.params.id);
const productSearch = ref('');
const searchResults = ref<any[]>([]);
let searchTimeout: any;

const form = reactive({
  title: '',
  description: '',
  image: '',
  type: 'SINGLE',
  items: [] as { product: any; quantity: number }[],
  price: 0,
  originalPrice: 0,
  criteria: {
    minOrders: 0,
    targetUser: 'ALL',
  },
  validFrom: '',
  validUntil: '',
  isActive: true,
});

const fetchOffer = async () => {
    if (!isEditing.value) return;
    try {
        const res = await SpecialOfferService.getOffer(route.params.id as string);
        const data = res.data;
        form.title = data.title;
        form.description = data.description || '';
        form.image = data.image;
        form.type = data.type;
        form.items = data.items.map((i: any) => ({ product: i.product, quantity: i.quantity }));
        form.price = data.price;
        form.originalPrice = data.originalPrice || 0;
        form.criteria = data.criteria;
        form.validFrom = new Date(data.validFrom).toISOString().slice(0, 16);
        form.validUntil = new Date(data.validUntil).toISOString().slice(0, 16);
        form.isActive = data.isActive;
    } catch (e) {
        console.error('Failed to fetch offer', e);
    }
};

const searchProducts = () => {
    if (!productSearch.value) {
        searchResults.value = [];
        return;
    }
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
        try {
            const res = await CatalogService.getProducts(1, 10, productSearch.value);
            searchResults.value = res.data.products;
        } catch (e) {
            console.error('Failed to search products', e);
        }
    }, 300);
};

const addProductToOffer = (product: any) => {
    // Check if exists
    const exists = form.items.find((i) => i.product._id === product._id);
    if (!exists) {
        form.items.push({ product, quantity: 1 });
    }
    searchResults.value = [];
    productSearch.value = '';
};

const removeItem = (index: number) => {
    form.items.splice(index, 1);
};

const saveOffer = async () => {
    try {
        const payload = {
            ...form,
            items: form.items.map(i => ({ product: i.product._id, quantity: i.quantity })),
            validFrom: new Date(form.validFrom).toISOString(),
            validUntil: new Date(form.validUntil).toISOString(),
        };

        if (isEditing.value) {
            await SpecialOfferService.updateOffer(route.params.id as string, payload);
        } else {
            await SpecialOfferService.createOffer(payload);
        }
        router.push('/admin/special-offers');
    } catch (e) {
        console.error('Failed to save offer', e);
        alert('Failed to save offer. Check console for details.');
    }
};

onMounted(() => {
    fetchOffer();
});
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
