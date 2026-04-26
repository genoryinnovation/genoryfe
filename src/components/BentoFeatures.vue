<template>
  <section id="features" class="relative py-28 bg-white dark:bg-[#080B14] overflow-hidden transition-colors duration-300">
    <!-- Background glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary-50 dark:bg-primary-900/20 rounded-full blur-[140px] pointer-events-none transition-colors duration-300"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <!-- Section header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 text-primary-600 dark:text-primary-400 text-xs font-semibold mb-6 uppercase tracking-[0.15em] transition-colors duration-300">
          Platform Features
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight transition-colors duration-300">
          Everything in one place
        </h2>
        <p class="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          From farm to table — a complete ecosystem powering Nigeria's food future.
        </p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

        <!-- Card 1: Marketplace (spans 2 cols) -->
        <div class="lg:col-span-2 group bg-slate-50 dark:bg-[#0E1219] border border-slate-100 dark:border-white/[0.07] rounded-3xl overflow-hidden hover:border-slate-200 dark:hover:border-white/[0.12] transition-all duration-500" data-aos="fade-up" data-aos-delay="0">
          <div class="p-8">
            <div class="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 text-[11px] font-bold tracking-[0.15em] uppercase mb-5 transition-colors duration-300">
              Marketplace
            </div>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight transition-colors duration-300">Dynamic Marketplace</h3>
            <p class="text-slate-500 leading-relaxed mb-6 max-w-lg">Browse, discover, and purchase fresh farm produce. AI-driven recommendations save you up to 30% versus traditional retail.</p>
            <div class="flex flex-wrap items-center gap-5">
              <div class="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium transition-colors duration-300">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                Smart Discovery
              </div>
              <div class="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium transition-colors duration-300">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                Real-time Pricing
              </div>
              <div class="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium transition-colors duration-300">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                Fast Checkout
              </div>
            </div>
          </div>
          <div class="mx-6 mb-0 overflow-hidden rounded-t-2xl">
            <img src="/assets/mock1.jpeg" alt="Marketplace" class="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>

        <!-- Card 2: Subscriptions -->
        <div class="group bg-slate-50 dark:bg-[#0E1219] border border-slate-100 dark:border-white/[0.07] rounded-3xl p-8 hover:border-slate-200 dark:hover:border-white/[0.12] transition-all duration-500 flex flex-col" data-aos="fade-up" data-aos-delay="50">
          <div class="w-11 h-11 bg-amber-100 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-200 dark:group-hover:bg-amber-500/20 transition-colors">
            <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </div>
          <div class="inline-flex items-center px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[11px] font-bold tracking-[0.15em] uppercase mb-4 w-fit transition-colors duration-300">
            Subscriptions
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight transition-colors duration-300">Bundles that Scale</h3>
          <p class="text-slate-500 leading-relaxed flex-1 text-sm">Weekly fresh produce delivered every Saturday. Pause, skip, or modify anytime via the app.</p>
          <div class="mt-8 pt-6 border-t border-slate-100 dark:border-white/[0.07] flex items-center justify-between transition-colors duration-300">
            <span class="text-slate-400 dark:text-slate-600 text-xs font-medium">Auto-renews weekly</span>
            <span class="text-emerald-600 dark:text-emerald-400 text-xs font-semibold bg-emerald-100 dark:bg-emerald-400/10 px-2.5 py-1 rounded-full transition-colors duration-300">Active</span>
          </div>
        </div>

        <!-- Card 3: Wallet/Payments -->
        <div class="group bg-slate-50 dark:bg-[#0E1219] border border-slate-100 dark:border-white/[0.07] rounded-3xl p-8 hover:border-slate-200 dark:hover:border-white/[0.12] transition-all duration-500 flex flex-col" data-aos="fade-up" data-aos-delay="100">
          <div class="w-11 h-11 bg-emerald-100 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-500/20 transition-colors">
            <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
          </div>
          <div class="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold tracking-[0.15em] uppercase mb-4 w-fit transition-colors duration-300">
            Genory Pay
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight transition-colors duration-300">Integrated Wallet</h3>
          <p class="text-slate-500 leading-relaxed flex-1 text-sm">Seamless payments via bank transfer, tokens, or gift cards. Earn cashback on every purchase.</p>
          <div class="mt-8 pt-6 border-t border-slate-100 dark:border-white/[0.07] transition-colors duration-300">
            <div class="text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">10% <span class="text-slate-400 text-sm font-medium">max cashback</span></div>
          </div>
        </div>

        <!-- Card 4: Delivery Speed -->
        <div class="group bg-slate-50 dark:bg-[#0E1219] border border-slate-100 dark:border-white/[0.07] rounded-3xl p-8 hover:border-slate-200 dark:hover:border-white/[0.12] transition-all duration-500 flex flex-col" data-aos="fade-up" data-aos-delay="150">
          <div class="w-11 h-11 bg-sky-100 dark:bg-sky-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-200 dark:group-hover:bg-sky-500/20 transition-colors">
            <svg class="w-5 h-5 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="inline-flex items-center px-3 py-1.5 rounded-lg bg-sky-100 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 text-[11px] font-bold tracking-[0.15em] uppercase mb-4 w-fit transition-colors duration-300">
            Last-mile
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight transition-colors duration-300">12-Hour Delivery</h3>
          <p class="text-slate-500 leading-relaxed flex-1 text-sm">Our rider network delivers farm-to-door in under 12 hours. Smart order batching minimizes carbon footprint.</p>
          <div class="mt-8 pt-6 border-t border-slate-100 dark:border-white/[0.07] transition-colors duration-300">
            <div class="text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">&lt;12h <span class="text-slate-400 text-sm font-medium">guaranteed</span></div>
          </div>
        </div>

        <!-- Card 5: HR / Pre-salary (accent card) -->
        <div class="group relative bg-gradient-to-br from-primary-50 to-sky-50 dark:from-[#111a30] dark:to-[#0e1525] border border-primary-200 dark:border-primary-700/25 rounded-3xl p-8 hover:border-primary-300 dark:hover:border-primary-600/40 transition-all duration-500 flex flex-col overflow-hidden" data-aos="fade-up" data-aos-delay="200">
          <div class="absolute -top-8 -right-8 w-32 h-32 bg-primary-100 dark:bg-primary-500/15 rounded-full blur-[40px] pointer-events-none transition-colors duration-300"></div>
          <div class="w-11 h-11 bg-primary-100 dark:bg-primary-500/15 rounded-2xl flex items-center justify-center mb-6 relative z-10 transition-colors duration-300">
            <svg class="w-5 h-5 text-primary-600 dark:text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <div class="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary-100 dark:bg-primary-500/15 text-primary-700 dark:text-primary-300 text-[11px] font-bold tracking-[0.15em] uppercase mb-4 w-fit relative z-10 transition-colors duration-300">
            HR Benefits
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight relative z-10 transition-colors duration-300">Pre-Salary Access</h3>
          <p class="text-slate-600 dark:text-primary-200/50 leading-relaxed flex-1 text-sm relative z-10 transition-colors duration-300">Empower your workforce with food access before payday. Integrated with corporate payroll for seamless benefits.</p>
          <div class="mt-8 pt-6 border-t border-primary-100 dark:border-white/[0.05] relative z-10 transition-colors duration-300">
            <a href="https://forms.gle/sPs2phRxP5KhGLuRA" target="_blank" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-semibold flex items-center gap-1.5 group/link transition-colors">
              Learn about HR plans
              <svg class="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
