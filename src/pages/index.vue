<template>
  <DefaultLayout>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Trust Ribbon -->
    <LogoCloud />
    
    <!-- Core Product: Marketplace -->
    <FeatureSection
      id="marketplace"
      badge="The Platform"
      title="Dynamic Marketplace for the Digital Age"
      description="Genory provides a unified interface to browse, discover, and purchase fresh farm produce. We connect local producers with urban consumers through a high-performance logistics network."
      image="/feat_marketplace_new.png"
      :points="[
        { title: 'Optimized Discovery', desc: 'Find exactly what you need with smart filters and AI-driven recommendations.' },
        { title: 'Real-time Pricing', desc: 'Direct-from-farm prices that save you up to 30% on your monthly groceries.' }
      ]"
    >
      <template #visual-overlay>
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold">🛒</div>
          <p class="text-sm font-black text-slate-900 leading-tight">Fast Checkout <br/><span class="text-xs text-slate-500 font-bold text-[10px] uppercase">Under 60 seconds</span></p>
        </div>
      </template>
    </FeatureSection>

    <!-- Logistics: Subscription -->
    <FeatureSection
      id="subscription"
      badge="Smart Logistics"
      title="Subscriptions that scale with your life"
      description="Automate your grocery needs with tailored bundles. Whether for a family of four or a small business, our subscription engine ensures you never run out of essentials."
      image="/feat_subscription_new.png"
      :reverse="true"
      :points="[
        { title: 'Weekly Bundles', desc: 'Fresh produce delivered every Saturday morning, straight to your door.' },
        { title: 'Flex-Planning', desc: 'Pause, skip, or modify your food items anytime via the mobile app.' }
      ]"
    />

    <!-- Finance: HR & Wallets -->
    <FeatureSection
      id="infrastructure"
      badge="Financial Infrastructure"
      title="Integrated Wallets & HR Benefits"
      description="Food security is financial security. We integrate with corporate payroll systems to provide Buy-Before-Payday access, alongside a secure digital wallet for rewards and tokens."
      image="/feat_wallet_new.png"
      :points="[
        { title: 'Genory Pay', desc: 'Seamless payments using bank transfers, tokens, or gift cards.' },
        { title: 'Pre-Salary Access', desc: 'Empowering employees with food access when they need it most.' }
      ]"
    >
      <template #visual-overlay>
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-xs">₦</div>
          <p class="text-sm font-black text-slate-900 leading-tight">Earn Cashback <br/><span class="text-xs text-slate-500 font-bold text-[10px] uppercase">Up to 10% back</span></p>
        </div>
      </template>
    </FeatureSection>

    <!-- How It Works (Clean Stripe Style) -->
    <section id="how-it-works" class="py-40 bg-slate-50/50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
          <div class="lg:col-span-4">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              From Farm to <br/> <span class="text-primary-600">Your Table.</span>
            </h2>
            <p class="text-xl text-slate-600 mb-12 font-medium">
              We've abstracted away the complexity of logistics to bring you the freshest food in record time.
            </p>
            <a href="https://forms.gle/sPs2phRxP5KhGLuRA" target="_blank" class="px-8 py-4 bg-slate-900 text-white rounded-xl font-black transition-all hover:bg-slate-800">
              Start Now
            </a>
          </div>
          
          <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div v-for="(step, i) in [
              { title: 'Unified Data', desc: 'We sync directly with farm inventory to ensure accuracy.', icon: '📊' },
              { title: 'Smart Batching', desc: 'Orders are batched intelligently to minimize carbon footprint.', icon: '📦' },
              { title: 'Last-Mile Delivery', desc: 'Our rider network ensures delivery in under 12 hours.', icon: '⚡' },
              { title: 'Reward Loop', desc: 'Earn points on every buy and redeem for future essentials.', icon: '🎁' }
            ]" :key="i" class="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500">
              <div class="text-4xl mb-6">{{ step.icon }}</div>
              <h3 class="text-xl font-black text-slate-900 mb-2">{{ step.title }}</h3>
              <p class="text-slate-500 font-medium leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Community & Trust (Minimalist) -->
    <section class="py-40 bg-white">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-24 tracking-tight">
          Tested at <span class="text-primary-600">Scale.</span>
        </h2>
        
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          <div v-for="(stat, i) in [
            { label: 'Waitlisted Users', value: '10,000+' },
            { label: 'Eco-Impact', value: '₦50M+' },
            { label: 'City Hubs', value: '15+' },
            { label: 'Uptime', value: '99.9%' }
          ]" :key="stat.label" class="text-center group" data-aos="fade-up" :data-aos-delay="i * 100">
            <div class="text-4xl md:text-6xl font-black text-slate-900 mb-4 group-hover:text-primary-600 transition-colors">{{ stat.value }}</div>
            <div class="text-xs font-black text-slate-400 uppercase tracking-widest">{{ stat.label }}</div>
          </div>
        </div>

        <!-- Testimonials -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(t, i) in [
            { name: 'Adunni Okafor', text: 'Genory has saved me so much time. The fresh bundles are exactly what my family needs.', img: '21' },
            { name: 'Chike Okwu', text: 'The ease of buying directly from farms is incredible. Delivery is always on point.', img: '22' },
            { name: 'Folake Adebayo', text: 'HR integration is a lifesaver. stock up before payday changed everything.', img: '23' }
          ]" :key="i" class="p-10 bg-slate-50 rounded-[3rem] text-left hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-slate-100">
            <div class="flex items-center mb-8">
              <img :src="`https://i.pravatar.cc/100?u=${t.img}`" class="w-12 h-12 rounded-full" />
              <div class="ml-4">
                <h4 class="font-black text-slate-900 leading-none">{{ t.name }}</h4>
                <p class="text-xs text-slate-400 font-bold mt-1 uppercase">Verified Customer</p>
              </div>
            </div>
            <p class="text-lg text-slate-700 font-medium leading-relaxed italic">"{{ t.text }}"</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Download App Section -->
    <DownloadSection />
    
    <!-- Final CTA Footer -->
    <section id="contact" class="py-40 bg-slate-900 relative overflow-hidden">
      <div class="absolute inset-0 bg-grid-white opacity-5"></div>
      <div class="max-w-5xl mx-auto px-4 relative z-10 text-center">
        <h2 class="text-5xl md:text-[5rem] font-black text-white mb-10 leading-[0.9] tracking-tight">
          Build your <span class="text-primary-400">Kitchen's Future.</span>
        </h2>
        <p class="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
          Join Africa's first smart food ecosystem. Freshness delivered, infrastructure secured.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="https://forms.gle/sPs2phRxP5KhGLuRA" target="_blank"
             class="px-12 py-5 bg-primary-600 text-white rounded-2xl font-black text-xl hover:bg-primary-500 transition-all shadow-2xl shadow-primary-600/20">
            Join Waitlist
          </a>
          <a href="mailto:hello@genory.com" 
             class="px-12 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-xl hover:bg-white/20 transition-all backdrop-blur-md">
            Contact Sales
          </a>
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
import FeatureSection from '@/components/FeatureSection.vue'
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