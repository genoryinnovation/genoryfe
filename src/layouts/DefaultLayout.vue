<template>
  <div class="min-h-screen bg-secondary-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm fixed w-full top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Genory Logo" class="w-full h-full object-cover" />
              </div>
              <span class="text-xl font-bold text-accent-900">Genory</span>
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <a href="#features"
              class="text-accent-700 hover:text-primary-500 font-medium transition-colors">Features</a>
            <a href="#how-it-works" class="text-accent-700 hover:text-primary-500 font-medium transition-colors">How It
              Works</a>
            <a href="#download" class="text-accent-700 hover:text-primary-500 font-medium transition-colors">Download
              App</a>
            <router-link to="/app/partner/onboarding" class="text-accent-700 hover:text-primary-500 font-medium transition-colors">Become a Partner</router-link>
            <a href="#contact" class="text-accent-700 hover:text-primary-500 font-medium transition-colors">Contact</a>
            <a href="https://forms.google.com/waitlist" target="_blank" class="btn-primary">
              Join Waitlist
            </a>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-accent-700 hover:text-primary-500 p-2">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a href="#features" class="block px-3 py-2 text-accent-700 hover:text-primary-500 font-medium">Features</a>
          <a href="#how-it-works" class="block px-3 py-2 text-accent-700 hover:text-primary-500 font-medium">How It
            Works</a>
          <a href="#download" class="block px-3 py-2 text-accent-700 hover:text-primary-500 font-medium">Download
            App</a>
          <a href="#contact" class="block px-3 py-2 text-accent-700 hover:text-primary-500 font-medium">Contact</a>
          <div class="px-3 py-2">
            <a href="https://forms.google.com/waitlist" target="_blank" class="btn-primary w-full text-center block">
              Join Waitlist
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-16">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-accent-900 text-white">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Logo and description -->
          <div class="md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Genory Logo" class="w-full h-full object-cover" />
              </div>
              <span class="text-xl font-bold">Genory</span>
            </div>
            <p class="text-gray-300 mb-6 max-w-md">
              The smart grocery, savings, and rewards platform helping Nigerians shop smarter, save more, and earn
              effortlessly.
            </p>
            <!-- Social Media Icons -->
            <div class="flex space-x-4">

              <a href="https://x.com/genoryhq" class="text-gray-300 hover:text-primary-500 transition-colors">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/genoryhq/"
                class="text-gray-300 hover:text-primary-500 transition-colors">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/genoryhq/"
                class="text-gray-300 hover:text-primary-500 transition-colors">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><a href="#features" class="text-gray-300 hover:text-primary-500 transition-colors">Features</a></li>
              <li><a href="#how-it-works" class="text-gray-300 hover:text-primary-500 transition-colors">How It
                  Works</a></li>
              <li><a href="#download" class="text-gray-300 hover:text-primary-500 transition-colors">Download</a></li>
              <li><a href="#contact" class="text-gray-300 hover:text-primary-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Support</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-300 hover:text-primary-500 transition-colors">Help Center</a></li>
              <li><a href="#" class="text-gray-300 hover:text-primary-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="text-gray-300 hover:text-primary-500 transition-colors">Terms of Service</a></li>
              <li><a href="mailto:support@genory.com"
                  class="text-gray-300 hover:text-primary-500 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="border-t border-gray-700 mt-12 pt-8 text-center">
          <p class="text-gray-300">
            © {{ currentYear }} Genory. All rights reserved. Made with ❤️ in Nigeria.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const mobileMenuOpen = ref(false)
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* Additional layout-specific styles can go here */
</style>