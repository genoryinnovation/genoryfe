<template>
  <section id="download" class="relative py-32 bg-white dark:bg-[#080B14] overflow-hidden transition-colors duration-300">
    <!-- Sophisticated Background Glows -->
    <div class="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary-100 dark:bg-primary-900/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 transition-colors duration-300"></div>
    <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-50 dark:bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-300"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="bg-slate-50 dark:bg-[#0E1420] border border-slate-200 dark:border-white/[0.05] rounded-[3rem] overflow-hidden transition-colors duration-300 shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <div class="grid grid-cols-1 lg:grid-cols-2">

          <!-- Left: Text Content -->
          <div class="p-12 md:p-20 flex flex-col justify-center">
            <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest mb-10 w-fit shadow-sm transition-colors duration-300">
              <span class="flex h-2 w-2 relative">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
              </span>
              Mobile App Early Access
            </div>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1] transition-colors duration-300">
              Fresh Food, <br/>
              <span class="text-primary-600 dark:text-primary-400">Perfectly Delivered.</span>
            </h2>

            <p class="text-lg text-slate-500 dark:text-slate-400 mb-12 leading-relaxed max-w-lg transition-colors duration-300">
              Take Genory with you. Manage your farm-to-table subscriptions, track deliveries in real-time, and discover AI-powered food picks—all from the palm of your hand.
            </p>

            <!-- Store buttons -->
            <div class="flex flex-wrap gap-4 mb-16">
              <a v-for="store in stores" :key="store.name" href="#" 
                 class="flex items-center gap-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-7 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/5">
                <div class="w-10 h-10 bg-white/10 dark:bg-slate-900/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg v-bind="store.svgProps" class="w-6 h-6">
                    <path :d="store.iconPath"/>
                  </svg>
                </div>
                <div class="text-left">
                  <div class="text-[10px] uppercase font-bold opacity-60 leading-none mb-1">Coming to</div>
                  <div class="text-base font-bold">{{ store.name }}</div>
                </div>
              </a>
            </div>

            <!-- Stats ribbon -->
            <div class="border-t border-slate-200 dark:border-white/10 pt-10 grid grid-cols-3 gap-8 transition-colors duration-300">
              <div v-for="stat in stats" :key="stat.label">
                <div class="text-2xl font-bold text-slate-900 dark:text-white mb-1 transition-colors duration-300">{{ stat.val }}</div>
                <div class="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest transition-colors duration-300">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- Right: Premium 3D Visual -->
          <div class="relative bg-white dark:bg-[#050810] hidden lg:flex items-center justify-center overflow-hidden min-h-[640px] perspective-1000 transition-colors duration-300 border-l border-slate-100 dark:border-white/5">
            <!-- Dynamic Background -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-100 dark:bg-primary-600/20 rounded-full blur-[100px] animate-pulse"></div>
              <div class="absolute inset-0 bg-grid-slate-900/[0.03] dark:bg-grid-white/[0.03] mask-radial"></div>
              <!-- Spinning Circles -->
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-slate-200 dark:border-white/[0.05] rounded-full animate-spin-slow"></div>
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-100 dark:border-white/[0.02] rounded-full animate-spin-slow" style="animation-duration: 40s; animation-direction: reverse;"></div>
            </div>

            <!-- Mockup Stack -->
            <div class="relative z-10 flex items-center justify-center w-full h-full scale-110">
              <!-- Back Mockup -->
              <div class="absolute transition-all duration-1000 hover:opacity-100 opacity-40" 
                   style="transform: translateX(-40%) translateY(-5%) rotateY(25deg) rotateX(10deg);">
                <img src="/assets/mock2.jpeg" 
                     class="w-[280px] h-auto rounded-[2.5rem] shadow-2xl blur-[1px]" />
              </div>
              
              <!-- Front Mockup -->
              <div class="relative z-20 animate-float-medium transition-all duration-700 hover:scale-105"
                   style="transform: perspective(1000px) rotateY(-15deg) rotateX(5deg);">
                <img src="/assets/mock3.jpeg" 
                     class="w-[300px] h-auto rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] dark:shadow-[0_50px_100px_rgba(0,0,0,0.6)] border-[6px] border-white dark:border-slate-800" />
              </div>

              <!-- Floating Glass Elements -->
              <div class="absolute top-24 right-4 bg-white/60 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-4 z-30 shadow-xl animate-float-slow">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">₦</div>
                  <div>
                    <p class="text-slate-900 dark:text-white font-bold text-xs">Cashback</p>
                    <p class="text-slate-500 dark:text-white/50 text-[10px]">Active now</p>
                  </div>
                </div>
              </div>

              <div class="absolute bottom-24 left-4 bg-white/60 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-4 z-30 shadow-xl animate-float-medium">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <div>
                    <p class="text-slate-900 dark:text-white font-bold text-xs">Farm Fresh</p>
                    <p class="text-slate-500 dark:text-white/50 text-[10px]">Quality Verified</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Achievement Badge -->
            <div class="absolute bottom-10 right-10 bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 z-40 shadow-xl animate-float-slow">
              <div class="flex items-center gap-4">
                <div class="w-11 h-11 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500 text-2xl shadow-inner">🏆</div>
                <div>
                  <p class="text-slate-900 dark:text-white font-bold text-sm">#1 Tech Launch</p>
                  <p class="text-slate-500 dark:text-white/40 text-[10px] uppercase tracking-wider">Africa 2026</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stores = [
  {
    name: 'App Store',
    svgProps: { viewBox: '0 0 24 24', fill: 'currentColor' },
    iconPath: 'M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z'
  },
  {
    name: 'Google Play',
    svgProps: { viewBox: '0 0 24 24', fill: 'currentColor' },
    iconPath: 'M3.609 1.814L13.792 12l-10.183 10.186c-.19.185-.309.438-.309.714v.25c0 .276.119.529.309.714l10.897 10.897c.185.19.438.309.714.309h.25c.276 0 .529-.119.714-.309l10.897-10.897c.19-.185.309-.438.309-.714v-.25c0-.276-.119-.529-.309-.714L3.609 1.814z'
  }
]

const stats = [
  { val: '4.9/5', label: 'Store Rating' },
  { val: '250K+', label: 'Pre-registrations' },
  { val: '12m', label: 'Delivery Avg' },
]
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.mask-radial {
  mask-image: radial-gradient(circle at center, black 0%, transparent 80%);
}

@keyframes float-medium {
  0%, 100% { transform: perspective(1000px) rotateY(-15deg) rotateX(5deg) translateY(0); }
  50% { transform: perspective(1000px) rotateY(-15deg) rotateX(5deg) translateY(-20px); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

@keyframes spin-slow {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 30s linear infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}
</style>
