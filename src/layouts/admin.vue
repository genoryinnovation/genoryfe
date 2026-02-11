<template>
  <div class="min-h-screen bg-slate-50 flex">
    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 transition-all duration-300 ease-in-out',
        sidebarCollapsed ? 'w-20' : 'w-72'
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center h-16 px-6 border-b border-slate-700/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-primary-500/25 overflow-hidden">
            <img src="/logo.png" alt="Genory Logo" class="w-full h-full object-cover" />
          </div>
          <span v-if="!sidebarCollapsed" class="text-xl font-bold text-white">Genory</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <div v-if="!sidebarCollapsed" class="px-3 mb-4">
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Main Menu</p>
        </div>
        
        <router-link
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to || ''"
          :class="[
            'group flex items-center px-3 py-2.5 rounded-xl transition-all duration-200',
            isActiveRoute(item) 
              ? 'bg-primary-500/10 text-primary-400 shadow-lg shadow-primary-500/5' 
              : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
          ]"
        >
          <div :class="[
            'flex items-center justify-center w-10 h-10 rounded-lg transition-colors',
            isActiveRoute(item) ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'bg-slate-700/50 group-hover:bg-slate-600'
          ]">
            <component :is="item.icon" class="w-5 h-5" />
          </div>
          <span v-if="!sidebarCollapsed" class="ml-3 font-medium">{{ item.label }}</span>
          <span 
            v-if="!sidebarCollapsed && item.badge" 
            class="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-primary-500 text-white"
          >
            {{ item.badge }}
          </span>
        </router-link>

        <div v-if="!sidebarCollapsed" class="px-3 mt-8 mb-4">
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Catalog</p>
        </div>

        <template v-for="item in catalogItems" :key="item.label">
          <!-- Single Item -->
          <router-link
            v-if="!item.children"
            :to="item.to!"
            :class="[
              'group flex items-center px-3 py-2.5 rounded-xl transition-all duration-200',
              isActiveRoute(item) 
                ? 'bg-primary-500/10 text-primary-400 shadow-lg shadow-primary-500/5' 
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
            ]"
          >
            <div :class="[
              'flex items-center justify-center w-10 h-10 rounded-lg transition-colors',
              isActiveRoute(item) ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'bg-slate-700/50 group-hover:bg-slate-600'
            ]">
              <component :is="item.icon" class="w-5 h-5" />
            </div>
            <span v-if="!sidebarCollapsed" class="ml-3 font-medium">{{ item.label }}</span>
          </router-link>

          <!-- Parent Item with Children -->
          <div v-else class="space-y-1">
            <button
              @click="toggleMenu(item.label)"
              :class="[
                'w-full group flex items-center px-3 py-2.5 rounded-xl transition-all duration-200',
                isActiveRoute(item) ? 'text-white' : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <div :class="[
                'flex items-center justify-center w-10 h-10 rounded-lg transition-colors',
                isActiveRoute(item) ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'bg-slate-700/50 group-hover:bg-slate-600'
              ]">
                <component :is="item.icon" class="w-5 h-5" />
              </div>
              <span v-if="!sidebarCollapsed" class="ml-3 font-medium flex-1 text-left">{{ item.label }}</span>
               <svg 
                v-if="!sidebarCollapsed"
                :class="['w-4 h-4 transition-transform duration-200', expandedMenus[item.label] ? 'rotate-180' : '']" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Children -->
            <div v-show="expandedMenus[item.label] && !sidebarCollapsed" class="pl-14 pr-3 space-y-1">
              <router-link
                v-for="child in item.children"
                :key="child.to"
                :to="child.to!"
                :class="[
                  'block py-2 px-3 text-sm rounded-lg transition-colors',
                  isActiveRoute(child)
                    ? 'text-primary-400 bg-primary-500/10 font-medium'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                ]"
              >
                {{ child.label }}
              </router-link>
            </div>
          </div>
        </template>
      </nav>

      <!-- User Section -->
      <div class="p-4 border-t border-slate-700/50">
        <div :class="['flex items-center', sidebarCollapsed ? 'justify-center' : 'space-x-3']">
          <div class="relative">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {{ adminUser?.firstName?.charAt(0) || 'A' }}
            </div>
            <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-800 rounded-full"></span>
          </div>
          <div v-if="!sidebarCollapsed" class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">{{ adminUser?.firstName || 'Admin' }} {{ adminUser?.lastName || 'User' }}</p>
            <p class="text-xs text-slate-400 truncate">{{ adminUser?.email || 'admin@genory.com' }}</p>
          </div>
          <button 
            v-if="!sidebarCollapsed"
            @click="logout" 
            class="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-colors"
            title="Logout"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Collapse Toggle -->
      <button 
        @click="sidebarCollapsed = !sidebarCollapsed"
        class="absolute -right-3 top-20 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-colors shadow-lg"
      >
        <svg :class="['w-4 h-4 transition-transform', sidebarCollapsed ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </aside>

    <!-- Main Content -->
    <main :class="['flex-1 transition-all duration-300', sidebarCollapsed ? 'ml-20' : 'ml-72']">
      <!-- Top Header -->
      <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/80">
        <div class="flex items-center justify-between h-16 px-6">
          <!-- Breadcrumb -->
          <div class="flex items-center space-x-2">
            <nav class="flex items-center space-x-1 text-sm">
              <router-link to="/admin" class="text-slate-500 hover:text-primary-600 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </router-link>
              <template v-for="(crumb, index) in breadcrumbs" :key="index">
                <svg class="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <span :class="index === breadcrumbs.length - 1 ? 'text-slate-900 font-medium' : 'text-slate-500'">
                  {{ crumb }}
                </span>
              </template>
            </nav>
          </div>

          <!-- Right Actions -->
          <div class="flex items-center space-x-3">
            <!-- Search -->
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                class="w-64 pl-10 pr-4 py-2 text-sm bg-slate-100 border-0 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
              />
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <!-- Notifications -->
            <button class="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <!-- Theme Toggle -->
            <button class="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="p-6">
        <router-view />
      </div>
    </main>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { AuthService, type AdminUser } from '../services/admin/auth.service';

const router = useRouter();
const route = useRoute();
const sidebarCollapsed = ref(false);
const adminUser = ref<AdminUser | null>(null);

// Icon components
const DashboardIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' })
    ]);
  }
};

const PartnersIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
    ]);
  }
};

const OrdersIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' })
    ]);
  }
};

const UsersIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' })
    ]);
  }
};

const WalletIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' })
    ]);
  }
};

const DeliveryIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' })
    ]);
  }
};

const CategoryIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' })
    ]);
  }
};

const ProductsIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
    ]);
  }
};

const SettingsIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }),
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })
    ]);
  }
};

const SubscriptionsIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' })
    ]);
  }
};

interface MenuItem {
  to?: string;
  label: string;
  icon: any;
  badge?: string | null;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { to: '/admin', label: 'Dashboard', icon: DashboardIcon },
  { to: '/admin/subscriptions', label: 'Subscriptions', icon: SubscriptionsIcon },
  { to: '/admin/partners', label: 'Hr Partners', icon: PartnersIcon },
  { to: '/admin/orders', label: 'Orders', icon: OrdersIcon, badge: null },
  { to: '/admin/users', label: 'Users', icon: UsersIcon },
  { to: '/admin/wallets', label: 'Wallets', icon: WalletIcon },
  { to: '/admin/delivery-partners', label: 'Delivery Partners', icon: DeliveryIcon },
];

const catalogItems: MenuItem[] = [
  { to: '/admin/catalog/categories', label: 'Categories', icon: CategoryIcon },
  { to: '/admin/catalog/products', label: 'Products', icon: ProductsIcon },
  { 
    label: 'Configuration', 
    icon: SettingsIcon,
    children: [
      { to: '/admin/configuration/pickup-locations', label: 'Pickup Locations', icon: null },
      { to: '/admin/configuration/settings', label: 'System Settings', icon: null }
    ]
  },
];

const expandedMenus = ref<Record<string, boolean>>({
  'Configuration': true // Default open for now
});

const toggleMenu = (label: string) => {
  expandedMenus.value[label] = !expandedMenus.value[label];
};

const isActiveRoute = (item: MenuItem): boolean => {
  if (item.to) {
    if (item.to === '/admin') {
      return route.path === '/admin';
    }
    return route.path.startsWith(item.to);
  }
  
  if (item.children) {
    return item.children.some(child => child.to && route.path.startsWith(child.to));
  }
  
  return false;
};

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(p => p && p !== 'admin');
  return paths.map(p => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' '));
});

onMounted(() => {
  const token = AuthService.getToken();
  if (!token) {
    router.push('/login');
  }
  
  // Get admin user from localStorage
  const storedUser = localStorage.getItem('admin_user');
  if (storedUser) {
    try {
      adminUser.value = JSON.parse(storedUser);
    } catch (e) {
      console.error('Failed to parse admin user', e);
    }
  }
});

const logout = () => {
  AuthService.logout();
  router.push('/login');
};
</script>
