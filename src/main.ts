import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// Import pages
import HomePage from './pages/index.vue'

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: () => import('./pages/admin/login.vue'),
    },
    {
      path: '/admin',
      component: () => import('./layouts/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'AdminDashboard',
          component: () => import('./pages/admin/index.vue'),
        },
        {
          path: 'partners',
          name: 'PartnerList',
          component: () => import('./pages/admin/partners/index.vue'),
        },
        {
          path: 'partners/create',
          name: 'PartnerCreate',
          component: () => import('./pages/admin/partners/create.vue'),
        },
        {
          path: 'catalog/categories',
          name: 'CategoryList',
          component: () => import('./pages/admin/catalog/categories.vue'),
        },
        {
          path: 'catalog/products',
          name: 'ProductList',
          component: () => import('./pages/admin/catalog/products/index.vue'),
        },
        {
          path: 'catalog/products/create',
          name: 'ProductCreate',
          component: () => import('./pages/admin/catalog/products/form.vue'),
        },
        {
          path: 'catalog/products/:id',
          name: 'ProductDetails',
          component: () => import('./pages/admin/catalog/products/[id].vue'),
        },
        {
          path: 'catalog/products/:id/edit',
          name: 'ProductEdit',
          component: () => import('./pages/admin/catalog/products/form.vue'),
        },
        {
          path: 'orders',
          name: 'OrderList',
          component: () => import('./pages/admin/orders/index.vue'),
        },
        {
          path: 'orders/:id',
          name: 'OrderDetails',
          component: () => import('./pages/admin/orders/[id].vue'),
        },
        {
          path: 'users',
          name: 'UserList',
          component: () => import('./pages/admin/users/index.vue'),
        },
        {
          path: 'users/:id',
          name: 'UserDetails',
          component: () => import('./pages/admin/users/[id].vue'),
        },
        {
          path: 'wallets',
          name: 'WalletList',
          component: () => import('./pages/admin/wallets/index.vue'),
        },
        {
          path: 'delivery-partners',
          name: 'DeliveryPartnerList',
          component: () => import('./pages/admin/delivery-partners/index.vue'),
        },
        {
          path: 'delivery-partners/:id',
          name: 'DeliveryPartnerDetails',
          component: () => import('./pages/admin/delivery-partners/[id].vue'),
        },
        {
          path: 'delivery-partners',
          name: 'DeliveryPartnerList',
          component: () => import('./pages/admin/delivery-partners/index.vue'),
        },
        {
          path: 'delivery-partners/:id',
          name: 'DeliveryPartnerDetails',
          component: () => import('./pages/admin/delivery-partners/[id].vue'),
        },
        {
          path: 'delivery-partners',
          name: 'DeliveryPartnerList',
          component: () => import('./pages/admin/delivery-partners/index.vue'),
        },
        {
          path: 'delivery-partners/:id',
          name: 'DeliveryPartnerDetails',
          component: () => import('./pages/admin/delivery-partners/[id].vue'),
        },
      ],
    },
    {
      path: '/partner/login',
      name: 'PartnerLogin',
      component: () => import('./pages/partner/login.vue'),
    },
    {
      path: '/partner',
      component: () => import('./layouts/PartnerLayout.vue'),
      children: [
        {
          path: '',
          name: 'PartnerDashboard',
          component: () => import('./pages/partner/index.vue'),
        },
      ],
    },
    {
      path: '/app/partner/onboarding',
      name: 'PartnerOnboarding',
      component: () => import('./pages/app/partner/onboarding.vue'),
    },
    {
      path: '/app/partner/dashboard',
      name: 'PartnerAppDashboard',
      component: () => import('./pages/app/partner/dashboard.vue'),
    },
  ],
})

// Create and mount app
const app = createApp(App)
app.use(router)
app.mount('#app')