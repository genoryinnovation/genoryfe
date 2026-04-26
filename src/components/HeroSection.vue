<template>
  <section class="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-white dark:bg-[#080B14] transition-colors duration-300">
    <!-- Ambient glow blobs -->
    <div class="absolute -top-40 left-1/3 w-[700px] h-[700px] bg-primary-100 dark:bg-primary-600/15 rounded-full blur-[160px] pointer-events-none transition-colors duration-300"></div>
    <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-50 dark:bg-emerald-600/8 rounded-full blur-[120px] pointer-events-none transition-colors duration-300"></div>
    <div class="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-sky-50 dark:bg-primary-900/30 rounded-full blur-[100px] pointer-events-none transition-colors duration-300"></div>

    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 bg-grid-dark dark:bg-grid-white opacity-[0.04] dark:opacity-[0.025]"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        <!-- Left: Text Content -->
        <div>
          <!-- Badge -->
          <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 dark:bg-white/5 border border-emerald-200 dark:border-white/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-10 tracking-wide transition-colors duration-300">
            <span class="relative flex h-2 w-2 shrink-0">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
            </span>
            Africa's first smart food ecosystem
          </div>

          <!-- Headline Slider -->
          <div class="min-h-[220px] sm:min-h-[200px] lg:min-h-[260px]">
            <transition name="fade-slide" mode="out-in">
              <div :key="currentIndex">
                <h1 v-html="slides[currentIndex].title" class="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-slate-900 dark:text-white leading-[1.15] mb-4 tracking-tight transition-colors duration-300">
                </h1>

                <p class="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-6 leading-relaxed max-w-md font-medium transition-colors duration-300">
                  {{ slides[currentIndex].description }}
                </p>
              </div>
            </transition>

            <!-- Slide Indicators -->
            <div class="flex gap-2.5 mb-8">
              <button v-for="(_, i) in slides" :key="i" 
                   @click="currentIndex = i"
                   class="h-1.5 rounded-full transition-all duration-500"
                   :class="currentIndex === i ? 'w-10 bg-primary-600' : 'w-3 bg-slate-200 dark:bg-white/10'">
              </button>
            </div>
          </div>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <a href="https://forms.gle/sPs2phRxP5KhGLuRA" target="_blank"
               class="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-semibold text-base transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary-600/30 flex items-center justify-center gap-2.5 group">
              Join the Waitlist
              <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a href="#features"
               class="px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2.5">
              Explore Platform
            </a>
          </div>

          <!-- Stats row -->
          <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
            <div v-for="(stat, i) in stats" :key="i" class="flex items-center gap-8">
              <div>
                <div class="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">{{ stat.value }}</div>
                <div class="text-xs text-slate-400 dark:text-slate-600 font-medium uppercase tracking-widest mt-0.5 transition-colors duration-300">{{ stat.label }}</div>
              </div>
              <div v-if="i < stats.length - 1" class="w-px h-8 bg-slate-200 dark:bg-white/10 hidden sm:block transition-colors duration-300"></div>
            </div>
          </div>
        </div>

        <!-- Right: Visual -->
        <div class="relative hidden lg:flex items-center justify-center">
          <div class="relative w-full h-[580px]">

            <!-- Glow behind mockup -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="w-[300px] h-[300px] bg-primary-100 dark:bg-primary-600/20 rounded-full blur-[80px] transition-colors duration-300"></div>
            </div>

            <!-- Main app screenshot -->
            <div class="absolute inset-0 flex items-center justify-center z-10">
              <img src="/donboard-4.png" alt="Genory App"
                   class="h-[520px] w-auto object-contain drop-shadow-[0_40px_100px_rgba(37,99,235,0.15)] dark:drop-shadow-[0_40px_100px_rgba(37,99,235,0.2)]" />
            </div>

            <!-- Floating badge: Delivered -->
            <div class="absolute top-10 right-0 bg-white dark:bg-[#0E1420] border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 z-20 animate-float-slow shadow-xl dark:shadow-2xl transition-colors duration-300">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300">
                  <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <p class="text-slate-900 dark:text-white font-semibold text-sm leading-none mb-1 transition-colors duration-300">Order Delivered</p>
                  <p class="text-slate-400 dark:text-slate-500 text-xs font-medium">12,402 this month</p>
                </div>
              </div>
            </div>

            <!-- Floating badge: Cashback -->
            <div class="absolute bottom-24 left-0 bg-white dark:bg-[#0E1420] border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 z-20 animate-float-medium shadow-xl dark:shadow-2xl transition-colors duration-300">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 bg-primary-100 dark:bg-primary-500/20 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-base shrink-0 transition-colors duration-300">₦</div>
                <div>
                  <p class="text-slate-900 dark:text-white font-semibold text-sm leading-none mb-1 transition-colors duration-300">Cashback Earned</p>
                  <p class="text-slate-400 dark:text-slate-500 text-xs font-medium">₦2,400 this week</p>
                </div>
              </div>
            </div>

            <!-- Floating badge: Rating -->
            <div class="absolute top-1/2 -left-6 bg-white dark:bg-[#0E1420] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 z-20 shadow-xl dark:shadow-2xl transition-colors duration-300">
              <div class="flex items-center gap-2">
                <div class="flex gap-0.5">
                  <svg v-for="s in 5" :key="s" class="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <span class="text-slate-900 dark:text-white font-semibold text-xs transition-colors duration-300">4.9</span>
              </div>
              <p class="text-slate-400 dark:text-slate-500 text-[10px] font-medium mt-0.5">Avg. delivery rating</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom fade -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#080B14] to-transparent pointer-events-none transition-colors duration-300"></div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const slides = [
  {
    title: 'Shop Smart. <span class="text-primary-600 dark:text-primary-400">Save More.</span><br/>Earn Effortlessly.',
    description: 'Genory connects Nigerians to fresh farm food through smart technology and efficient logistics, reducing food costs and making quality food accessible every day, because no one should go hungry.'
  },
  {
    title: '<span class="text-primary-600 dark:text-primary-400">Buy Fresh.</span> <span class="text-rose-500">Fast Delivery.</span><br/><span class="text-primary-600 dark:text-primary-400">ENJOY upto 30% more.</span>',
    description: 'Say goodbye to long market trips. Genory brings the best farm produce to you the same day, while letting you enjoy up to 30% more in value. Fresh, fast, and designed for your convenience.'
  },
  {
    title: 'NO hustle. NO worries.<br/>stay relax before <span class="text-primary-600 dark:text-primary-500">payday.</span>',
    description: 'Empower employees with fresh food delivered home. Boost wellbeing and productivity by ensuring families stay nourished—all before payday.'
  }
]

const currentIndex = ref(0)
let timer: any = null

onMounted(() => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slides.length
  }, 5000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const stats = [
  { value: '10K+', label: 'Waitlisted' },
  { value: '15+', label: 'City Hubs' },
  { value: '12h', label: 'Delivery SLA' },
  { value: '99.9%', label: 'Uptime' },
]
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
