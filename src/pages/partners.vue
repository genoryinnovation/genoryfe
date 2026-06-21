<template>
  <DefaultLayout>

    <!-- Hero -->
    <section class="relative pt-36 pb-28 bg-white dark:bg-[#080B14] overflow-hidden transition-colors duration-300" style="padding-top: 120px; padding-bottom: 50px;">
      <!-- Background grid -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none"></div>
      <!-- Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-100 dark:bg-emerald-700/10 rounded-full blur-[140px] pointer-events-none transition-colors duration-300"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 dark:bg-white/5 border border-emerald-100 dark:border-white/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-8 uppercase tracking-[0.15em] transition-colors duration-300" data-aos="fade-up">
            Partner Program
          </div>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-8 leading-[1.04] tracking-tight transition-colors duration-300" data-aos="fade-up" data-aos-delay="50">
            Build Your Income <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-primary-600 dark:from-emerald-400 dark:via-teal-300 dark:to-primary-400">with Genory.</span>
          </h1>
          <p class="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            Whether you're a delivery rider or an HR manager, Genory gives you the tools to earn more, move faster, and care for your team.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="150">
            <a href="#business"
               class="px-8 py-4 bg-white hover:bg-slate-50 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 rounded-xl font-semibold text-lg transition-all">
              Contact Sales
            </a>
          </div>
        </div>

        <!-- Hero stats row -->
        <div class="grid grid-cols-3 gap-4 mt-36 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          <div v-for="stat in heroStats" :key="stat.label" class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1 transition-colors duration-300">{{ stat.value }}</div>
            <div class="text-xs text-slate-400 font-medium uppercase tracking-widest">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Driver Section -->
    <section id="drivers" class="relative py-28 bg-slate-50/80 dark:bg-[#06090F] overflow-hidden transition-colors duration-300">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/8 to-transparent transition-colors duration-300"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section label -->
        <div class="text-center mb-20" data-aos="fade-up">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 dark:bg-white/5 border border-emerald-100 dark:border-white/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-6 uppercase tracking-[0.15em] transition-colors duration-300">
            For Riders
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight transition-colors duration-300">
            Deliver. Earn. Repeat.
          </h2>
          <p class="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Join our vetted rider network. Set your own schedule, pick up orders near you, and get paid every week.
          </p>
        </div>

        <!-- Driver benefits grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          <div
            v-for="(benefit, i) in driverBenefits"
            :key="i"
            class="group bg-white dark:bg-[#0E1219] border border-slate-100 dark:border-white/[0.07] rounded-3xl p-8 hover:border-emerald-200 dark:hover:border-emerald-500/20 hover:shadow-lg dark:hover:shadow-none transition-all duration-500"
            data-aos="fade-up"
            :data-aos-delay="i * 75"
          >
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors"
                 :class="benefit.iconBg">
              <span class="text-2xl">{{ benefit.icon }}</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-300">{{ benefit.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">{{ benefit.desc }}</p>
          </div>
        </div>

        <!-- Earnings breakdown -->
        <div id="earnings" class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <!-- Left: Earnings info -->
          <div data-aos="fade-right">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 dark:bg-white/5 border border-emerald-100 dark:border-white/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-6 uppercase tracking-[0.15em] transition-colors duration-300">
              Your Earnings
            </div>
            <h3 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight transition-colors duration-300">
              Transparent Pay, Every Delivery
            </h3>
            <p class="text-slate-500 leading-relaxed mb-8">
              You earn 70% of every delivery fee. No hidden deductions. See your estimated payout before you accept an order.
            </p>
            <ul class="space-y-4">
              <li v-for="point in earningsPoints" :key="point" class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-slate-600 dark:text-slate-400 text-sm">{{ point }}</span>
              </li>
            </ul>
          </div>

          <!-- Right: Payout card mock -->
          <div data-aos="fade-left" data-aos-delay="100">
            <div class="bg-white dark:bg-[#0E1219] border border-slate-100 dark:border-white/[0.07] rounded-3xl p-8 shadow-xl dark:shadow-none">
              <div class="flex items-center justify-between mb-8">
                <div>
                  <p class="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">This Week's Earnings</p>
                  <p class="text-4xl font-bold text-slate-900 dark:text-white">₦32,400</p>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
                  <span class="text-2xl">💳</span>
                </div>
              </div>
              <div class="space-y-3 mb-8">
                <div v-for="delivery in sampleDeliveries" :key="delivery.id" class="flex items-center justify-between py-3 border-b border-slate-50 dark:border-white/5">
                  <div>
                    <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ delivery.id }}</p>
                    <p class="text-xs text-slate-400 mt-0.5">{{ delivery.route }}</p>
                  </div>
                  <span class="text-sm font-bold text-emerald-600 dark:text-emerald-400">{{ delivery.earnings }}</span>
                </div>
              </div>
              <div class="bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 rounded-2xl p-4 text-center">
                <p class="text-xs text-emerald-700 dark:text-emerald-400 font-semibold uppercase tracking-widest">Payout Status</p>
                <p class="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">Arriving Friday</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Driver CTA -->
        <div class="text-center mt-16" data-aos="fade-up">
          <a href="/app/partner/onboarding"
             class="inline-flex items-center gap-2.5 px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-emerald-600/25">
            Start Earning Today
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Business / HR Section -->
    <section id="business" class="relative py-28 bg-white dark:bg-[#080B14] overflow-hidden transition-colors duration-300">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-100 dark:via-white/8 to-transparent transition-colors duration-300"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20" data-aos="fade-up">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 text-primary-700 dark:text-primary-400 text-xs font-semibold mb-6 uppercase tracking-[0.15em] transition-colors duration-300">
            For Companies
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight transition-colors duration-300">
            Feed Your Team Smarter.
          </h2>
          <p class="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            From SMEs to enterprise HR teams — Genory's corporate plan turns employee food benefits into a productivity engine.
          </p>
        </div>

        <!-- Business features -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          <div
            v-for="(feature, i) in businessFeatures"
            :key="i"
            class="flex gap-6 bg-slate-50 dark:bg-[#0E1219] border border-slate-100 dark:border-white/[0.07] rounded-3xl p-8 hover:border-primary-200 dark:hover:border-primary-500/20 hover:shadow-md dark:hover:shadow-none transition-all duration-500"
            data-aos="fade-up"
            :data-aos-delay="i * 75"
          >
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors"
                 :class="feature.iconBg">
              <span class="text-2xl">{{ feature.icon }}</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">{{ feature.title }}</h3>
              <p class="text-slate-500 text-sm leading-relaxed">{{ feature.desc }}</p>
            </div>
          </div>
        </div>

        <!-- How corporate plan works -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div
            v-for="(step, i) in corporateSteps"
            :key="i"
            class="bg-slate-50 dark:bg-[#0E1219] border border-slate-100 dark:border-white/[0.07] rounded-3xl p-8 text-center hover:border-slate-200 dark:hover:border-white/[0.14] hover:shadow-md dark:hover:shadow-none transition-all duration-500"
            data-aos="fade-up"
            :data-aos-delay="i * 75"
          >
            <div class="text-5xl font-black text-slate-900/[0.04] dark:text-white/[0.04] mb-4 leading-none select-none">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="text-3xl mb-5">{{ step.icon }}</div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-300">{{ step.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials (partner voices) -->
    <section class="relative py-28 bg-slate-50/80 dark:bg-[#06090F] overflow-hidden transition-colors duration-300">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/8 to-transparent transition-colors duration-300"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight transition-colors duration-300">
            Partners Love <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-primary-600 dark:from-emerald-400 dark:to-primary-400">Genory.</span>
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="(t, i) in partnerTestimonials"
            :key="i"
            class="bg-white dark:bg-[#0E1219] border border-slate-100 dark:border-white/[0.07] rounded-3xl p-8 hover:border-slate-200 dark:hover:border-white/[0.12] hover:shadow-md dark:hover:shadow-none transition-all duration-500"
            data-aos="fade-up"
            :data-aos-delay="i * 75"
          >
            <div class="flex gap-1 mb-6">
              <svg v-for="s in 5" :key="s" class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-[15px] transition-colors duration-300">"{{ t.text }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                   :class="t.avatarBg">
                {{ t.name.charAt(0) }}
              </div>
              <div>
                <h4 class="font-semibold text-slate-900 dark:text-white text-sm transition-colors duration-300">{{ t.name }}</h4>
                <p class="text-xs text-slate-400 mt-0.5">{{ t.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final partner CTA -->
    <section id="partner-cta" class="relative py-28 bg-white dark:bg-[#080B14] overflow-hidden transition-colors duration-300">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-100 dark:via-white/8 to-transparent transition-colors duration-300"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-100 dark:bg-emerald-700/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-300"></div>

      <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 dark:bg-white/5 border border-emerald-100 dark:border-white/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-8 uppercase tracking-[0.15em] transition-colors duration-300" data-aos="fade-up">
          Join Today
        </div>
        <h2 class="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-[1.05] tracking-tight transition-colors duration-300" data-aos="fade-up" data-aos-delay="50">
          Ready to Partner <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-primary-600 dark:from-emerald-400 dark:via-teal-300 dark:to-primary-400">with Genory?</span>
        </h2>
        <p class="text-lg text-slate-500 mb-12 max-w-xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
          Riders: download the app and apply in minutes. Companies: book a 20-minute demo with our partnership team.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="150">
          <!-- <a href="/app/partner/onboarding"
             class="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-emerald-600/25">
            Apply as Rider
          </a> -->
          <a href="mailto:partners@genory.com"
             class="px-10 py-4 bg-white hover:bg-slate-50 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 rounded-xl font-semibold text-lg transition-all">
            Contact Business Team
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

const heroStats = [
  { value: '₦32K+', label: 'Avg. weekly rider earn' },
  { value: '15+', label: 'Active city hubs' },
  { value: '500+', label: 'Corporate clients' },
]

const driverBenefits = [
  {
    title: 'Flexible Schedule',
    desc: 'Go online when you want. Accept orders on your own terms — morning, afternoon, or evening shifts.',
    icon: '🕐',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/10',
  },
  {
    title: '70% Delivery Cut',
    desc: 'You keep 70% of every delivery fee. See your estimated payout before you even accept the order.',
    icon: '💸',
    iconBg: 'bg-amber-100 dark:bg-amber-500/10',
  },
  {
    title: 'Weekly Payouts',
    desc: 'Earnings are automatically swept to your registered bank account every Friday. No delays, no chasing.',
    icon: '🏦',
    iconBg: 'bg-sky-100 dark:bg-sky-500/10',
  },
  {
    title: 'Rider Insurance',
    desc: 'Every active delivery is covered by our partner protection policy. Ride with confidence.',
    icon: '🛡️',
    iconBg: 'bg-violet-100 dark:bg-violet-500/10',
  },
]

const earningsPoints = [
  'Earn ₦800–₦3,200 per delivery depending on distance and package size',
  'Bonus multipliers active during peak hours and high-demand zones',
  'No minimum hours — go online for just one shift and still get paid',
  'Transparent earnings dashboard in the Genory Partner app',
  'Instant withdrawal available for top-rated riders',
]

const sampleDeliveries = [
  { id: 'ORD-00412', route: 'Yaba → Surulere', earnings: '₦1,680' },
  { id: 'ORD-00413', route: 'Lekki → VI', earnings: '₦2,100' },
  { id: 'ORD-00415', route: 'Ikeja → Ojodu', earnings: '₦1,200' },
  { id: 'ORD-00416', route: 'Gbagada → Ketu', earnings: '₦980' },
]

const businessFeatures = [
  {
    title: 'Employee Meal Benefits',
    desc: 'Set monthly food budgets per employee. Funds are loaded directly into their Genory wallet — no cash handling, no vouchers.',
    icon: '🍱',
    iconBg: 'bg-primary-100 dark:bg-primary-500/10',
  },
  {
    title: 'Payroll Integration',
    desc: 'Sync meal allowances with your existing payroll cycle. Deductions happen automatically before salary disbursal.',
    icon: '🔗',
    iconBg: 'bg-amber-100 dark:bg-amber-500/10',
  },
  {
    title: 'Spend Controls & Caps',
    desc: 'Define per-employee daily or monthly spend limits. Restrict categories (e.g., fresh produce only) or order windows.',
    icon: '🎛️',
    iconBg: 'bg-sky-100 dark:bg-sky-500/10',
  },
  {
    title: 'Real-Time Reporting',
    desc: 'One dashboard showing team-wide spend, order frequency, savings, and delivery performance. Export to CSV or PDF.',
    icon: '📊',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/10',
  },
]

const corporateSteps = [
  {
    title: 'Create Company Account',
    desc: 'Sign up as a business, add your team members via bulk CSV upload or invite links.',
    icon: '🏢',
  },
  {
    title: 'Set Benefits & Budget',
    desc: 'Define spend limits, eligible product categories, and the funding source for each pay period.',
    icon: '⚙️',
  },
  {
    title: 'Team Orders & Reports',
    desc: 'Employees shop and you get real-time visibility. Monthly statements land in your inbox automatically.',
    icon: '📈',
  },
]

const partnerTestimonials = [
  {
    name: 'Emeka Obi',
    role: 'Rider Partner · Lagos',
    text: 'I went from ₦45K/month at my old job to clearing ₦90K+ some weeks. The flexible hours mean I can still handle family stuff.',
    avatarBg: 'bg-emerald-500',
  },
  {
    name: 'Ngozi Eze',
    role: 'HR Manager · TechCorp Nigeria',
    text: "Managing meal allowances used to be a nightmare of spreadsheets. Genory's corporate dashboard is the best thing we've added to our benefits stack.",
    avatarBg: 'bg-primary-500',
  },
  {
    name: 'Taiwo Adeleke',
    role: 'Rider Partner · Abuja',
    text: 'Payouts hit every Friday without fail. The app shows exactly what I earned per delivery so I always know where I stand.',
    avatarBg: 'bg-teal-500',
  },
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
