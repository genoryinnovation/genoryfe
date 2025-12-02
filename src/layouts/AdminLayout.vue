<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md flex flex-col">
      <div class="p-6 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-800">Genory Admin</h1>
      </div>
      <nav class="flex-1 p-4 space-y-2">
        <router-link
          to="/admin"
          class="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          Dashboard
        </router-link>
        <router-link
          to="/admin/partners"
          class="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          Partners
        </router-link>
        <router-link
          to="/admin/catalog/categories"
          class="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          Categories
        </router-link>
        <router-link
          to="/admin/catalog/products"
          class="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          Products
        </router-link>
        <router-link
          to="/admin/orders"
          class="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          Orders
        </router-link>
        <router-link
          to="/admin/users"
          class="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          Users
        </router-link>
        <router-link
          to="/admin/wallets"
          class="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          Wallets
        </router-link>
        <router-link
          to="/admin/delivery-partners"
          class="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          Partners
        </router-link>
      </nav>
      <div class="p-4 border-t border-gray-200">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            A
          </div>
          <div>
            <p class="text-sm font-medium text-gray-700">Admin User</p>
            <p class="text-xs text-gray-500">admin@genory.com</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <header class="bg-white shadow-sm p-4 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-800">{{ $route.name }}</h2>
          <div class="flex items-center space-x-4">
            <button @click="logout" class="text-sm text-red-600 hover:text-red-800 font-medium">
              Logout
            </button>
          </div>
        </header>
        <div class="p-6">
          <router-view />
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { AuthService } from '../services/admin/auth.service';
  
  const router = useRouter();
  
  onMounted(() => {
    const token = AuthService.getToken();
    if (!token) {
      router.push('/admin/login');
    }
  });
  
  const logout = () => {
    AuthService.logout();
    router.push('/admin/login');
  };
  </script>
