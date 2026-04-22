<template>
  <section :id="id" class="relative py-40 overflow-hidden bg-white">
    <!-- Decorative background -->
    <div v-if="reverse" class="absolute -left-48 top-0 w-96 h-96 bg-primary-100/20 blur-[100px] rounded-full"></div>
    <div v-else class="absolute -right-48 top-0 w-96 h-96 bg-primary-100/20 blur-[100px] rounded-full"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div :class="['grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center', reverse ? 'lg:flex-row-reverse' : '']">
        
        <!-- Text Content -->
        <div :class="['lg:col-span-6', reverse ? 'lg:order-last' : '']" data-aos="fade-up">
          <div class="inline-flex items-center px-4 py-2 rounded-xl bg-primary-50 text-primary-600 text-sm font-black mb-6 tracking-widest uppercase">
            {{ badge }}
          </div>
          <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
            {{ title }}
          </h2>
          <p class="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
            {{ description }}
          </p>
          
          <!-- Key Points -->
          <ul class="space-y-6 mb-12">
            <li v-for="(point, i) in points" :key="i" class="flex items-start">
              <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0 mt-1">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-black text-slate-900 leading-none mb-1">{{ point.title }}</h4>
                <p class="text-slate-500 font-medium">{{ point.desc }}</p>
              </div>
            </li>
          </ul>

          <a v-if="ctaLink" :href="ctaLink" class="inline-flex items-center text-primary-600 font-black text-lg group">
            {{ ctaText || 'Learn more' }}
            <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>

        <!-- Visual Content -->
        <div class="lg:col-span-6" :data-aos="reverse ? 'fade-right' : 'fade-left'">
          <div class="relative">
            <!-- Glass Wrapper -->
            <div class="glass-card !p-4 !rounded-[3rem] shadow-2xl overflow-hidden group">
              <img :src="image" :alt="title" class="w-full h-auto rounded-[2.5rem] transform group-hover:scale-105 transition-transform duration-1000" />
            </div>
            
            <!-- Floating Decorative Card -->
            <div class="absolute -bottom-8 -right-8 p-6 glass-card !rounded-3xl shadow-2xl animate-float-slow hidden md:block">
               <slot name="visual-overlay"></slot>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  badge: string;
  title: string;
  description: string;
  points: Array<{ title: string; desc: string }>;
  image: string;
  reverse?: boolean;
  ctaText?: string;
  ctaLink?: string;
}>();
</script>
