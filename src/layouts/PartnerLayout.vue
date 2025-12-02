<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-800">Genory Partner</h1>
      </div>
      <nav class="mt-6">
        <router-link
          to="/partner"
          class="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600"
          active-class="bg-blue-50 text-blue-600 border-r-4 border-blue-600"
        >
          Dashboard
        </router-link>
        <!-- Add more partner links here -->
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow-sm">
        <div class="px-6 py-4 flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-800">
            {{ $route.name }}
          </h2>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">Partner User</span>
            <button @click="logout" class="text-sm text-red-600 hover:text-red-800">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-6">
        <router-view></router-view>
      </main>
    </div>
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
    router.push('/partner/login');
    return;
  }
  
  const user = AuthService.getUser();
  if (user && user.role !== 'partner') {
     if (['admin', 'superadmin'].includes(user.role)) {
         router.push('/admin');
     }
  }
});

const logout = () => {
  AuthService.logout();
  router.push('/partner/login');
};
</script>
