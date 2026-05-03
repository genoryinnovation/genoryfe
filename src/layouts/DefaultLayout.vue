<template>
  <div class="min-h-screen bg-white dark:bg-[#080B14] transition-colors duration-300">
    <!-- Navigation -->
    <nav class="fixed w-full top-0 z-50 transition-all duration-500"
         :class="[isScrolled
           ? 'bg-white/90 dark:bg-[#080B14]/90 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 py-3 shadow-sm dark:shadow-none'
           : 'bg-transparent py-5']">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-12">
          <!-- Logo -->
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-3 group">
              <div class="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-all">
                <img src="/logo.png" alt="Genory Logo" class="w-[65%] h-[65%] object-contain" />
              </div>
              <span class="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">Genory</span>
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-1">
            <a href="#features"
               class="px-4 py-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-medium transition-all text-sm">Features</a>
            <a href="#how-it-works"
               class="px-4 py-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-medium transition-all text-sm">How It Works</a>
            <a href="#download"
               class="px-4 py-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-medium transition-all text-sm">Download</a>
            <router-link to="/app/partner/onboarding"
               class="px-4 py-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-medium transition-all text-sm">Partners</router-link>

            <div class="w-px h-5 bg-slate-200 dark:bg-white/10 mx-3"></div>

            <!-- Theme Toggle -->
            <button
              @click="toggleTheme"
              class="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <!-- Moon: shown in light mode to switch to dark -->
              <svg v-if="!isDark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
              <!-- Sun: shown in dark mode to switch to light -->
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </button>

            <a href="https://forms.gle/sPs2phRxP5KhGLuRA" target="_blank"
               class="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-primary-600/25 ml-1">
              Join Waitlist
            </a>
          </div>

          <!-- Mobile right side -->
          <div class="md:hidden flex items-center gap-2">
            <!-- Theme toggle (mobile) -->
            <button
              @click="toggleTheme"
              class="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
            >
              <svg v-if="!isDark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </button>
            <!-- Hamburger -->
            <button @click="mobileMenuOpen = !mobileMenuOpen"
                    class="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="md:hidden bg-white/95 dark:bg-[#0E1219]/95 backdrop-blur-xl border border-slate-100 dark:border-white/8 mt-3 mx-4 rounded-2xl shadow-2xl overflow-hidden">
          <div class="px-2 pt-2 pb-5 space-y-1">
            <a @click="mobileMenuOpen = false" href="#features" class="block px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors">Features</a>
            <a @click="mobileMenuOpen = false" href="#how-it-works" class="block px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors">How It Works</a>
            <a @click="mobileMenuOpen = false" href="#download" class="block px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors">Download App</a>
            <div class="pt-3 px-4">
              <a href="https://forms.gle/sPs2phRxP5KhGLuRA" target="_blank"
                 class="w-full text-center block px-5 py-3 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-xl transition-all">
                Join Waitlist
              </a>
            </div>
          </div>
        </div>
      </transition>
    </nav>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer (always dark) -->
    <footer class="bg-slate-900 dark:bg-[#050709] border-t border-white/5 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" :class="simpleFooter ? 'py-10' : 'py-20'">
        <div v-if="!simpleFooter" class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <!-- Brand -->
          <div class="lg:col-span-5">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-sm">
                <img src="/logo.png" alt="Genory Logo" class="w-[65%] h-[65%] object-contain" />
              </div>
              <span class="text-xl font-bold tracking-tight">Genory</span>
            </div>
            <p class="text-slate-400 mb-8 max-w-xs leading-relaxed text-[15px]">
              The smart grocery, savings, and rewards platform helping Nigerians shop smarter, save more, and earn effortlessly.
            </p>
            <div class="flex space-x-3">
              <a href="https://x.com/genoryhq" class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:bg-primary-600/20 hover:text-primary-400 transition-all">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/genoryhq/" class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:bg-primary-600/20 hover:text-primary-400 transition-all">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/genoryhq/" class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:bg-primary-600/20 hover:text-primary-400 transition-all">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
 
          <!-- Product Links -->
          <div class="lg:col-span-2">
            <h3 class="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Product</h3>
            <ul class="space-y-3">
              <li><a href="#features" class="text-slate-500 hover:text-slate-300 transition-colors text-sm">Features</a></li>
              <li><a href="#how-it-works" class="text-slate-500 hover:text-slate-300 transition-colors text-sm">How It Works</a></li>
              <li><a href="#download" class="text-slate-500 hover:text-slate-300 transition-colors text-sm">Download App</a></li>
              <li><router-link to="/app/partner/onboarding" class="text-slate-500 hover:text-slate-300 transition-colors text-sm">Become a Partner</router-link></li>
            </ul>
          </div>
 
          <!-- Company Links -->
          <div class="lg:col-span-2">
            <h3 class="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Company</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-slate-500 hover:text-slate-300 transition-colors text-sm">About Us</a></li>
              <li><a href="#" class="text-slate-500 hover:text-slate-300 transition-colors text-sm">Contact</a></li>
              <li><a href="/privacy" class="text-slate-500 hover:text-slate-300 transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="/terms" class="text-slate-500 hover:text-slate-300 transition-colors text-sm">Terms & Conditions</a></li>
            </ul>
          </div>
 
          <!-- Newsletter -->
          <div class="lg:col-span-3">
            <h3 class="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Stay Updated</h3>
            <p class="text-slate-500 mb-5 text-sm leading-relaxed">Get the latest updates and early access announcements.</p>
            <div class="relative">
              <input type="email" placeholder="Your email address"
                     class="w-full bg-white/5 border border-white/8 rounded-xl py-3 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 transition-colors" />
              <button class="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-primary-600 hover:bg-primary-500 rounded-lg text-xs font-semibold transition-colors">Join</button>
            </div>
          </div>
        </div>
 
        <!-- Bottom bar -->
        <div class="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" :class="!simpleFooter && 'mt-16'">
          <p class="text-slate-600 text-sm">
            © {{ currentYear }} Genory. All rights reserved. Made with love in Nigeria.
          </p>
          <div class="flex gap-6">
            <a href="/terms" class="text-slate-600 hover:text-slate-400 text-sm transition-colors">Terms</a>
            <a href="/privacy" class="text-slate-600 hover:text-slate-400 text-sm transition-colors">Privacy</a>
            <a href="#" class="text-slate-600 hover:text-slate-400 text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from '@/composables/useTheme'

defineProps<{
  simpleFooter?: boolean
}>()

const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const currentYear = computed(() => new Date().getFullYear())

const { isDark, toggle: toggleTheme } = useTheme()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
