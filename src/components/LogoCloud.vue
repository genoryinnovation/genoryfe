<template>
  <div class="py-24 bg-white border-y border-slate-50 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <p class="text-center text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-16">
        Powering Africa's digital food economy
      </p>
      
      <div class="relative">
        <!-- Gradient masks for seamless blend -->
        <div class="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div class="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white to-transparent z-10"></div>
        
        <!-- Marquee content -->
        <div class="flex marquee-track space-x-24 items-center">
          <div v-for="(logo, i) in logos" :key="i" 
               class="flex-shrink-0 group cursor-default transition-all duration-500">
            <div class="flex items-center space-x-3 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0">
              <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-black text-slate-900 text-xl shadow-sm group-hover:bg-primary-50 transition-all duration-500">
                <span class="group-hover:text-primary-600 transition-colors uppercase">{{ logo[0] }}</span>
              </div>
              <span class="text-xl font-bold text-slate-900 tracking-tighter">{{ logo }}</span>
            </div>
          </div>
          <!-- Duplicate for seamless loop -->
          <div v-for="(logo, i) in logos" :key="'dup-' + i" 
               class="flex-shrink-0 group cursor-default transition-all duration-500">
            <div class="flex items-center space-x-3 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0">
              <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-black text-slate-900 text-xl shadow-sm group-hover:bg-primary-50 transition-all duration-500">
                <span class="group-hover:text-primary-600 transition-colors uppercase">{{ logo[0] }}</span>
              </div>
              <span class="text-xl font-bold text-slate-900 tracking-tighter">{{ logo }}</span>
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
];
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

