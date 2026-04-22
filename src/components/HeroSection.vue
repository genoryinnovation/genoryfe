<template>
  <section class="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-white">
    <!-- Animated Canvas Blobs (Stripe Style) -->
    <div class="canvas-blob w-[1000px] h-[1000px] -top-1/2 -right-1/4 bg-gradient-to-br from-primary-400/40 via-sky-300/30 to-transparent"></div>
    <div class="canvas-blob w-[800px] h-[800px] top-1/2 -right-1/3 bg-gradient-to-tr from-primary-500/20 via-primary-300/10 to-transparent animation-delay-2000"></div>
    
    <!-- Subtle Grid Overlay -->
    <div class="absolute inset-0 bg-grid-dark opacity-[0.03]"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        <!-- Text content -->
        <div class="lg:col-span-7 text-center lg:text-left">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-black mb-10 animate-fade-in tracking-[0.2em] shadow-sm uppercase">
            <span class="relative flex h-2 w-2 mr-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Africa's first smart food ecosystem
          </div>

          <h1 class="text-6xl md:text-8xl lg:text-[7.5rem] font-black text-slate-900 leading-[0.82] mb-12 tracking-[-0.05em]">
            Shop Smarter. <br/>
            <span class="text-primary-600">Eat Better.</span> <br/>
            <span class="text-slate-900">Live Well.</span>
          </h1>
          
          <p class="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto lg:mx-0 mb-16 leading-relaxed font-medium">
            Genory is building the world's most convenient food infrastructure. Seamless farm-to-table logistics for every modern home.
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <a href="https://forms.gle/sPs2phRxP5KhGLuRA" target="_blank"
               class="px-12 py-6 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-slate-800 transition-all transform hover:-translate-y-1 hover:shadow-2xl shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)] flex items-center group">
              Join the Waitlist
              <svg class="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            
            <a href="#features" 
               class="px-12 py-6 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all transform hover:-translate-y-1 hover:shadow-xl flex items-center group">
              Explore Platform
              <svg class="ml-3 w-6 h-6 opacity-40 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          <!-- Trust Badge -->
          <div class="mt-20 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <p class="text-slate-900 font-black text-sm uppercase tracking-widest">Backed by data</p>
            <div class="flex items-center space-x-8">
               <div class="font-black text-2xl tracking-tighter text-slate-900 underline decoration-primary-500 decoration-4">99.9% Success</div>
               <div class="font-black text-2xl tracking-tighter text-slate-900 underline decoration-primary-500 decoration-4">12H Delivery</div>
            </div>
          </div>
        </div>

        <!-- Visual Side -->
        <div class="lg:col-span-5 relative hidden lg:block perspective-1000">
          <!-- Collage Stack -->
          <div class="relative w-full h-[700px]">
            <!-- Card 1: Perspective Layer -->
            <div class="absolute top-20 -left-10 w-[85%] glass-card !p-3 !rounded-[3rem] shadow-2xl animate-float-slow z-10 rotate-[-4deg] transition-all hover:rotate-0 hover:z-40 duration-700">
               <img src="/branding3.jpeg" alt="Logistics" class="w-full h-auto rounded-[2.5rem]" />
            </div>

            <!-- Card 2: Main Focus -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] glass-card !p-4 !rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] z-20 transition-all hover:scale-105 duration-700">
               <img src="/donboard-4.png" alt="Genory Main" class="w-full h-auto rounded-[3.5rem]" />
            </div>

            <!-- Card 3: Top Detail -->
            <div class="absolute bottom-10 -right-12 w-[80%] glass-card !p-3 !rounded-[2.5rem] shadow-2xl animate-float-medium z-30 rotate-[6deg] transition-all hover:rotate-0 hover:z-40 duration-700">
               <img src="/branding2.jpeg" alt="Finance" class="w-full h-auto rounded-[2.2rem]" />
            </div>
            
            <!-- Realigned Achievement Badge -->
            <div class="absolute top-10 right-0 p-6 glass-card !rounded-[2rem] shadow-2xl border-white/80 z-50 transform hover:-translate-y-2 transition-transform">
               <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <p class="text-slate-900 font-black text-lg leading-none mb-1">Delivered</p>
                    <p class="text-slate-500 text-xs font-bold uppercase tracking-wider">12,402 this month</p>
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
// Interactive stripe hero
</script>

<style scoped>
/* Page-specific overrides if any */
</style>