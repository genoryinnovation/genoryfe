<template>
  <DefaultLayout>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Logo Cloud / Social Proof -->
    <LogoCloud />
    
    <!-- Features Section -->
    <section id="features" class="relative overflow-hidden py-32 bg-white">
      <!-- Decorative elements -->
      <div class="blur-spot w-96 h-96 bg-primary-100 -top-20 -left-20"></div>
      <div class="blur-spot w-96 h-96 bg-primary-50 top-1/2 -right-20"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-24">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-accent-900 mb-8 tracking-tight">
            Why Choose <span class="text-primary-600">Genory?</span>
          </h2>
          <p class="text-xl text-accent-600 max-w-3xl mx-auto leading-relaxed">
            Experience a smarter way to shop for food. We combine technology, logistics, and financial tools to bring you the best value.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- 1. Smart food marketplace -->
          <div class="group relative" data-aos="fade-up" data-aos-delay="0">
            <div class="glass-card p-10 h-full flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:bg-white/90">
              <div class="w-24 h-24 mb-10 transform group-hover:scale-110 transition-transform duration-500">
                <img src="/feat_marketplace.png" alt="Marketplace" class="w-full h-full object-contain" />
              </div>
              <h3 class="text-2xl font-bold text-accent-900 mb-4">Smart Food Marketplace</h3>
              <p class="text-accent-600 leading-relaxed text-sm">
                Browse and buy fresh farm produce and food items at affordable prices.
              </p>
            </div>
          </div>
          
          <!-- 2. Smart food subscription -->
          <div class="group relative" data-aos="fade-up" data-aos-delay="100">
            <div class="glass-card p-10 h-full flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:bg-white/90">
              <div class="w-24 h-24 mb-10 transform group-hover:scale-110 transition-transform duration-500">
                <img src="/feat_subscription.png" alt="Subscription" class="w-full h-full object-contain" />
              </div>
              <h3 class="text-2xl font-bold text-accent-900 mb-4">Smart Food Subscription</h3>
              <p class="text-accent-600 leading-relaxed text-sm">
                Weekly or monthly food bundles tailored for individuals, families, or staff.
              </p>
            </div>
          </div>
          
          <!-- 3. HR Integration System -->
          <div class="group relative" data-aos="fade-up" data-aos-delay="200">
            <div class="glass-card p-10 h-full flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:bg-white/90">
              <div class="w-24 h-24 mb-10 transform group-hover:scale-110 transition-transform duration-500">
                <img src="/feat_hr.png" alt="HR Integration" class="w-full h-full object-contain" />
              </div>
              <h3 class="text-2xl font-bold text-accent-900 mb-4">HR Integration System</h3>
              <p class="text-accent-600 leading-relaxed text-sm">
                Food access solutions that reduce hunger and stress before salary dates. (Buy-Before-Payday Access)
              </p>
            </div>
          </div>
          
          <!-- 4. Smart wallet systems -->
          <div class="group relative" data-aos="fade-up" data-aos-delay="300">
            <div class="glass-card p-10 h-full flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:bg-white/90">
              <div class="w-24 h-24 mb-10 transform group-hover:scale-110 transition-transform duration-500">
                <img src="/feat_wallet.png" alt="Smart Wallet" class="w-full h-full object-contain" />
              </div>
              <h3 class="text-2xl font-bold text-accent-900 mb-4">Smart Wallet Systems</h3>
              <p class="text-accent-600 leading-relaxed text-sm">
                Use Genory’s Smart Wallet to buy food with your bank wallet, tokens, or gift cards—fast, secure, and seamless.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- How It Works Section -->
    <section id="how-it-works" class="py-32 bg-primary-50/30 overflow-hidden relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-24">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-accent-900 mb-8 tracking-tight">
            How It <span class="text-primary-600">Works?</span>
          </h2>
          <p class="text-xl text-accent-600 max-w-3xl mx-auto leading-relaxed">
            Get started in minutes and transform the way you buy food.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          <!-- Steps with visual connectors -->
          <div v-for="(step, i) in [
            { title: 'Sign Up', desc: 'Create your free Genory account in less than 2 minutes.', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
            { title: 'Add Essentials', desc: 'Pick your everyday food items or selection of bundles.', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
            { title: 'Market Run', desc: 'Fresh food house delivery in under 12 hours.', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
            { title: 'Earn Rewards', desc: 'Get rewards on every order and earn up to 10%.', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
          ]" :key="i" class="text-center group relative" data-aos="fade-up" :data-aos-delay="i * 100">
            <div class="relative z-10 mb-10">
              <div class="w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:bg-primary-500 transition-all duration-500">
                <svg class="w-10 h-10 text-primary-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="step.icon" />
                </svg>
                <div class="absolute -top-3 -right-3 w-10 h-10 bg-accent-900 rounded-2xl flex items-center justify-center text-sm font-bold text-white shadow-lg">0{{ i + 1 }}</div>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-accent-900 mb-4">{{ step.title }}</h3>
            <p class="text-accent-600 leading-relaxed text-sm">{{ step.desc }}</p>
          </div>
        </div>
        
        <div class="mt-24 text-center">
          <a href="https://forms.gle/sPs2phRxP5KhGLuRA" target="_blank" class="btn-primary">
            Start Your Journey Now
          </a>
        </div>
      </div>
    </section>
    
    <!-- Community/Trust Section -->
    <section class="py-32 bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-24">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-accent-900 mb-8 tracking-tight">
            Trusted by <span class="text-primary-600">Thousands</span>
          </h2>
          <p class="text-xl text-accent-600 max-w-3xl mx-auto leading-relaxed">
            Join the growing community of Nigerians who have transformed their grocery shopping experience with Genory.
          </p>
        </div>
        
        <!-- Stats -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          <div v-for="(stat, i) in [
            { label: 'Happy Users', value: '10,000+' },
            { label: 'Savings Generated', value: '₦50M+' },
            { label: 'Cities Covered', value: '15+' },
            { label: 'Success Rate', value: '99.9%' }
          ]" :key="stat.label" class="glass-card p-10 text-center hover:scale-105 transition-transform duration-500" data-aos="fade-up" :data-aos-delay="i * 100">
            <div class="text-4xl md:text-5xl font-bold text-primary-600 mb-4">{{ stat.value }}</div>
            <div class="text-accent-500 font-medium uppercase tracking-widest text-xs">{{ stat.label }}</div>
          </div>
        </div>

        <!-- Testimonials (Staggered Grid) -->
        <div class="columns-1 md:columns-2 lg:columns-3 gap-8">
          <div v-for="(t, i) in [
            { name: 'Adunni Okafor', city: 'Lagos', text: 'Genory has saved me so much time and money. The fresh bundles are exactly what my family needs.', img: '1' },
            { name: 'Chike Okwu', city: 'Abuja', text: 'The ease of buying directly from farms is incredible. Delivery is always on point.', img: '2' },
            { name: 'Folake Adebayo', city: 'PH', text: 'HR integration is a lifesaver. Being able to stock up before payday changed everything.', img: '3' },
            { name: 'Emeka Nwosu', city: 'Enugu', text: 'Highest quality produce I\'ve seen in any online marketplace in Nigeria.', img: '4' },
            { name: 'Titi Williams', city: 'Ibadan', text: 'Saves me at least ₦15,000 every month on groceries. Highly recommend!', img: '5' },
            { name: 'Yusuf Bello', city: 'Kano', text: 'Customer support is top-notch and the app is so easy to use.', img: '6' }
          ]" :key="i" class="break-inside-avoid mb-8" data-aos="fade-up" :data-aos-delay="(i % 3) * 100">
            <div class="glass-card p-8 hover:shadow-xl transition-all duration-500 border-primary-50">
              <div class="flex items-center space-x-4 mb-6">
                <img :src="`https://i.pravatar.cc/100?u=${i}`" class="w-12 h-12 rounded-full border-2 border-primary-100" />
                <div>
                  <h4 class="font-bold text-accent-900 leading-none">{{ t.name }}</h4>
                  <p class="text-xs text-accent-500 mt-1">{{ t.city }}, Nigeria</p>
                </div>
              </div>
              <p class="text-accent-600 italic leading-relaxed">"{{ t.text }}"</p>
              <div class="flex text-yellow-400 mt-6">
                <svg v-for="s in 5" :key="s" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Download App Section -->
    <DownloadSection />
    
    <!-- Contact Section -->
    <section id="contact" class="py-32 bg-accent-900 relative overflow-hidden" data-aos="fade-in">
      <!-- Decorative background -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-grid-white"></div>
      </div>
      <div class="blur-spot w-[600px] h-[600px] bg-primary-500/20 -bottom-48 -left-48"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 class="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-10 tracking-tight leading-tight">
          The Smartest Way to <br/> <span class="text-primary-400">Shop for Food in Africa</span>
        </h2>
        <p class="text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
          Join our waitlist and be part of Africa's first smart food ecosystem, delivering fresh, high-quality groceries. Fast and seamlessly convenience.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6 justify-center mb-32">
          <a href="https://forms.gle/sPs2phRxP5KhGLuRA" target="_blank"
             class="btn-primary !px-12 !py-5 text-xl shadow-2xl shadow-primary-500/20">
            Join the Waitlist
          </a>
          <a href="mailto:hello@genory.com" 
             class="btn-secondary !bg-white/10 !text-white !border-white/20 hover:!bg-white/20 !px-12 !py-5 text-xl backdrop-blur-md">
            Contact Us
          </a>
        </div>
        
        <!-- Contact info -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-left border-t border-white/10 pt-24">
          <div v-for="info in [
            { title: 'Email', value: 'info@genory.co', icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
            { title: 'Phone', value: '+234 814 300 3554', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
            { title: 'Location', value: 'Ojodu Berger, Lagos Nigeria', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }
          ]" :key="info.title" class="flex space-x-6 group">
            <div class="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-500">
              <svg class="w-8 h-8 text-primary-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="info.icon" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-white text-lg mb-2">{{ info.title }}</h3>
              <p class="text-gray-400 leading-relaxed font-medium">{{ info.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HeroSection from '@/components/HeroSection.vue'
import LogoCloud from '@/components/LogoCloud.vue'

import DownloadSection from '@/components/DownloadSection.vue'

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-cubic'
  })
})
</script>

<route lang="yaml">
meta:
  layout: false
</route>

<style scoped>
/* Page-specific styles */
</style>