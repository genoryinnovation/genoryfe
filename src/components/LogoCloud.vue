<template>
  <div class="py-16 bg-slate-50 dark:bg-[#080B14] border-b border-slate-100 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <p class="text-center text-xs font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-10 transition-colors duration-300">
        Powering Africa's digital food economy
      </p>

      <div class="relative">
        <!-- Gradient masks -->
        <div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 dark:from-[#080B14] to-transparent z-10 pointer-events-none transition-colors duration-300"></div>
        <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 dark:from-[#080B14] to-transparent z-10 pointer-events-none transition-colors duration-300"></div>

        <!-- Marquee -->
        <div class="flex marquee-track space-x-16 items-center">
          <div v-for="(logo, i) in logos" :key="i" class="flex-shrink-0 group">
            <div class="flex items-center space-x-2.5 opacity-40 dark:opacity-25 group-hover:opacity-80 dark:group-hover:opacity-70 transition-all duration-400">
              <div class="w-7 h-7 rounded-lg bg-slate-200 dark:bg-white/8 flex items-center justify-center font-bold text-slate-600 dark:text-white text-xs transition-colors duration-300">
                {{ logo[0] }}
              </div>
              <span class="text-base font-semibold text-slate-700 dark:text-white tracking-tight transition-colors duration-300">{{ logo }}</span>
            </div>
          </div>
          <!-- Duplicate for loop -->
          <div v-for="(logo, i) in logos" :key="'dup-' + i" class="flex-shrink-0 group">
            <div class="flex items-center space-x-2.5 opacity-40 dark:opacity-25 group-hover:opacity-80 dark:group-hover:opacity-70 transition-all duration-400">
              <div class="w-7 h-7 rounded-lg bg-slate-200 dark:bg-white/8 flex items-center justify-center font-bold text-slate-600 dark:text-white text-xs transition-colors duration-300">
                {{ logo[0] }}
              </div>
              <span class="text-base font-semibold text-slate-700 dark:text-white tracking-tight transition-colors duration-300">{{ logo }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const logos = [
  'FarmFresh',
  'EcoGrow',
  'AgroLink',
  'NigeriaConnect',
  'GreenBasket',
  'NourishLogistics',
  'SmartMarket',
  'KwaraAgro',
  'EkoDeliver'
]
</script>

<style scoped>
.marquee-track {
  animation: marquee 40s linear infinite;
  width: max-content;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.marquee-track:hover {
  animation-play-state: paused;
}
</style>
