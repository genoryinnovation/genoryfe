<template>
  <section id="download" class="relative overflow-hidden py-40 bg-white">
    <!-- Decorative background -->
    <div class="blur-spot w-[600px] h-[600px] bg-primary-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="glass-card overflow-hidden !p-0 border-primary-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <!-- Text Content -->
          <div class="p-12 md:p-20 flex flex-col justify-center">
            <div class="inline-flex items-center px-4 py-2 rounded-xl bg-primary-50 text-primary-600 text-sm font-black mb-10 w-fit tracking-widest uppercase">
              Coming Q1 2026
            </div>
            <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
              The power of Genory in your <span class="text-primary-600">pocket.</span>
            </h2>
            <p class="text-xl text-slate-600 mb-14 leading-relaxed font-medium">
              We're building the most advanced app for food logistics in Africa. Join the waitlist and get early access to the private beta launch.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-6">
              <!-- App Store Placeholder -->
              <div v-for="store in ['Play Store', 'App Store']" :key="store" 
                   class="flex-1 bg-slate-900 text-white px-8 py-5 rounded-2xl flex items-center space-x-5 relative group cursor-not-allowed border border-slate-800 hover:border-slate-700 transition-all">
                <div class="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                  <svg v-if="store === 'Play Store'" class="w-6 h-6 text-primary-400" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                  <svg v-else class="w-6 h-6 text-primary-400" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/></svg>
                </div>
                <div class="text-left">
                  <div class="text-[10px] font-black uppercase tracking-widest opacity-40">Coming to</div>
                  <div class="text-lg font-black tracking-tight">{{ store }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Image Content -->
          <div class="bg-slate-900 p-20 flex items-center justify-center relative overflow-hidden hidden lg:flex stripe-gradient-dark">
            <!-- Decorative elements -->
            <div class="absolute inset-0 bg-grid-white opacity-10"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/10 rounded-full animate-spin-slow"></div>
            
            <img src="/app_mockup_catalog.png" alt="App Mockup" class="w-[75%] h-auto relative z-10 drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)] animate-float-medium" />
            
            <!-- Floating Achievement -->
            <div class="absolute bottom-12 right-12 glass-card !bg-white/10 !backdrop-blur-xl !border-white/20 p-6 shadow-2xl animate-float-slow transition-all hover:scale-110">
              <div class="flex items-center space-x-3">
                 <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white">🏆</div>
                 <div>
                    <p class="text-white font-black text-sm">#1 Future Launch</p>
                    <p class="text-white/60 text-[10px] font-bold uppercase tracking-widest">Most anticipated</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Stats Ribbon -->
      <div class="mt-24 grid grid-cols-1 md:grid-cols-3 gap-16 text-center border-t border-slate-100 pt-20">
        <div v-for="stat in [
          { label: 'Waitlist Growth', val: '200% MoM' },
          { label: 'Engineering Status', value: 'Alpha Build' },
          { label: 'Live Deployments', value: 'Private Beta' }
        ]" :key="stat.label">
          <div class="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">{{ stat.val || stat.value }}</div>
          <div class="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{{ stat.label }}</div>
        </div>
      </div>

    </div>
  </section>
</template>