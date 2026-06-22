<template>
  <DefaultLayout>
    <!-- Hero -->
    <HeroSection />

    <!-- Partner marquee -->
    <LogoCloud />

    <!-- Feature bento grid -->
    <BentoFeatures />

    <!-- How It Works -->
    <section id="how-it-works" class="relative py-28 bg-slate-50/80 dark:bg-[#06090F] overflow-hidden transition-colors duration-300">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/8 to-transparent transition-colors duration-300"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <!-- Header -->
        <div class="text-center mb-20" data-aos="fade-up">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 dark:bg-white/5 border border-emerald-100 dark:border-white/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-6 uppercase tracking-[0.15em] transition-colors duration-300">
            The Process
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight transition-colors duration-300">
            From Farm to Your Table
          </h2>
          <p class="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            We've abstracted the complexity of food logistics into a seamless four-step process.
          </p>
        </div>

        <!-- Steps grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="group bg-white dark:bg-[#0E1219] border border-slate-100 dark:border-white/[0.07] rounded-3xl p-8 hover:border-slate-200 dark:hover:border-white/[0.14] hover:shadow-lg dark:hover:shadow-none transition-all duration-500"
            data-aos="fade-up"
            :data-aos-delay="i * 75"
          >
            <!-- Step number -->
            <div class="text-6xl font-black text-slate-900/[0.04] dark:text-white/[0.04] mb-4 leading-none select-none transition-colors duration-300">
              {{ String(i + 1).padStart(2, '0') }}
            </div>
            <!-- Icon -->
            <div class="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 transition-colors"
                 :class="step.iconBg">
              <span class="text-xl">{{ step.icon }}</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">{{ step.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-14" data-aos="fade-up">
          <a href="https://forms.gle/sPs2phRxP5KhGLuRA" target="_blank"
             class="inline-flex items-center gap-2.5 px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-900 dark:text-white rounded-xl font-semibold transition-all">
            Get Early Access
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Social Proof: Stats + Testimonials -->
    <section class="relative py-28 bg-white dark:bg-[#080B14] overflow-hidden transition-colors duration-300">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-100 dark:via-white/8 to-transparent transition-colors duration-300"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Stats header -->
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight transition-colors duration-300">
            Tested at <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-600 dark:from-primary-400 dark:to-emerald-400">Scale.</span>
          </h2>
        </div>

        <!-- Stats grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div
            v-for="(stat, i) in socialStats"
            :key="stat.label"
            class="bg-slate-50 dark:bg-[#0E1219] border border-slate-100 dark:border-white/[0.07] rounded-3xl p-8 text-center group hover:border-slate-200 dark:hover:border-white/[0.12] hover:shadow-md dark:hover:shadow-none transition-all duration-500"
            data-aos="fade-up"
            :data-aos-delay="i * 75"
          >
            <div class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors duration-300">{{ stat.value }}</div>
            <div class="text-xs font-semibold text-slate-400 uppercase tracking-[0.15em]">{{ stat.label }}</div>
          </div>
        </div>

        <!-- Testimonials -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="(t, i) in testimonials"
            :key="i"
            class="bg-slate-50 dark:bg-[#0E1219] border border-slate-100 dark:border-white/[0.07] rounded-3xl p-8 hover:border-slate-200 dark:hover:border-white/[0.12] hover:shadow-md dark:hover:shadow-none transition-all duration-500"
            data-aos="fade-up"
            :data-aos-delay="i * 75"
          >
            <!-- Stars -->
            <div class="flex gap-1 mb-6">
              <svg v-for="s in 5" :key="s" class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-[15px] transition-colors duration-300">"{{ t.text }}"</p>
            <div class="flex items-center gap-3">
              <img :src="`/assets/testimonials/${t.img}.png`" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 class="font-semibold text-slate-900 dark:text-white text-sm transition-colors duration-300">{{ t.name }}</h4>
                <p class="text-xs text-slate-400 mt-0.5">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Download App -->
    <DownloadSection />

    <!-- Final CTA -->
    <section id="contact" class="relative py-28 bg-slate-50 dark:bg-[#06090F] overflow-hidden transition-colors duration-300">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/8 to-transparent transition-colors duration-300"></div>

      <!-- Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-100 dark:bg-primary-700/15 rounded-full blur-[120px] pointer-events-none transition-colors duration-300"></div>

      <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 text-primary-600 dark:text-primary-400 text-xs font-semibold mb-8 uppercase tracking-[0.15em] transition-colors duration-300" data-aos="fade-up">
          Get Started Today
        </div>
        <h2 class="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-[1.05] tracking-tight transition-colors duration-300" data-aos="fade-up" data-aos-delay="50">
          Build your Kitchen's <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-sky-500 to-emerald-600 dark:from-primary-400 dark:via-sky-300 dark:to-emerald-400">Future.</span>
        </h2>
        <p class="text-lg text-slate-500 mb-12 max-w-xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
          Join Africa's first smart food ecosystem. Freshness delivered, infrastructure secured.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="150">
          <a href="https://forms.gle/sPs2phRxP5KhGLuRA" target="_blank"
             class="px-10 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-semibold text-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary-600/25">
            Join Waitlist
          </a>
          <a href="mailto:hello@genory.com"
             class="px-10 py-4 bg-white hover:bg-slate-50 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 rounded-xl font-semibold text-lg transition-all">
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
import BentoFeatures from '@/components/BentoFeatures.vue'
import DownloadSection from '@/components/DownloadSection.vue'

const steps = [
  { title: 'Unified Data', desc: 'We sync directly with farm inventory in real time to guarantee freshness and accuracy.', icon: '📊', iconBg: 'bg-primary-100 dark:bg-primary-500/10' },
  { title: 'Smart Batching', desc: 'Orders are intelligently grouped to minimize delivery time and carbon footprint.', icon: '📦', iconBg: 'bg-amber-100 dark:bg-amber-500/10' },
  { title: 'Last-Mile Delivery', desc: 'Our verified rider network ensures delivery from farm to door in under 12 hours.', icon: '⚡', iconBg: 'bg-sky-100 dark:bg-sky-500/10' },
  { title: 'Reward Loop', desc: 'Earn points on every purchase. Redeem them for future orders, cashback, or gifts.', icon: '🎁', iconBg: 'bg-emerald-100 dark:bg-emerald-500/10' },
]

const socialStats = [
  { label: 'Waitlisted Users', value: '10,000+' },
  { label: 'Eco Impact', value: '₦50M+' },
  { label: 'City Hubs', value: '15+' },
  { label: 'Uptime', value: '99.9%' },
]

const testimonials = [
  { name: 'Adunni Okafor', text: 'Genory has saved me so much time. The fresh bundles are exactly what my family needs every week.', img: '1' },
  { name: 'Chike Okwu', text: 'The ease of buying directly from farms is incredible. Delivery is always on point.', img: '2' },
  { name: 'Folake Adebayo', text: 'HR integration is a lifesaver. Stock up before payday completely changed how I manage groceries.', img: '3' },
]

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-cubic',
    offset: 60,
  })
})
</script>

<route lang="yaml">
meta:
  layout: false
</route>
