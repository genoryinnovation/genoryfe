<template>
  <div class="py-20 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-center text-sm font-bold text-accent-500 uppercase tracking-widest mb-12">
        Empowering thousands across Nigeria
      </p>
      
      <div class="relative">
        <!-- Gradient masks -->
        <div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        
        <!-- Marquee content -->
        <div class="flex marquee-track space-x-16 items-center">
          <div v-for="(logo, i) in logos" :key="i" class="flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center font-bold text-accent-900 text-xl">
                {{ logo[0] }}
              </div>
              <span class="text-xl font-bold text-accent-900">{{ logo }}</span>
            </div>
          </div>
          <!-- Duplicate for seamless loop -->
          <div v-for="(logo, i) in logos" :key="'dup-' + i" class="flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center font-bold text-accent-900 text-xl">
                {{ logo[0] }}
              </div>
              <span class="text-xl font-bold text-accent-900">{{ logo }}</span>
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
  'SmartMarket'
];
</script>

<style scoped>
.marquee-track {
  animation: marquee 50s linear infinite;
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
