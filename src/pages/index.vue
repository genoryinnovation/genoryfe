<template>
  <DefaultLayout>
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Features Section -->
    <section id="features" class="bg-white relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50"></div>
        <div class="absolute top-1/2 right-0 w-64 h-64 bg-secondary-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div class="max-w-7xl mx-auto section-padding relative z-10">
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-5xl font-bold text-accent-900 mb-6 tracking-tight">
            Why Choose Genory?
          </h2>
          <p class="text-xl text-accent-600 max-w-3xl mx-auto leading-relaxed">
            Experience a smarter way to shop for food. We combine technology, logistics, and financial tools to bring you the best value.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- 1. Smart Food Marketplace -->
          <div class="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
            
            <div class="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary-500 transition-colors duration-300 relative z-10">
              <svg class="w-8 h-8 text-primary-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L3 3m0 0h2m0 0l2 9m8 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            
            <h3 class="text-xl font-bold text-accent-900 mb-4 group-hover:text-primary-600 transition-colors">Smart Food Marketplace</h3>
            <p class="text-accent-600 leading-relaxed">
              Browse and buy fresh farm produce and food items at affordable prices.
            </p>
          </div>
          
          <!-- 2. Smart food subscription -->
          <div class="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
            
            <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-green-500 transition-colors duration-300 relative z-10">
              <svg class="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h3 class="text-xl font-bold text-accent-900 mb-4 group-hover:text-green-600 transition-colors">Smart Food Subscription</h3>
            <p class="text-accent-600 leading-relaxed">
              Weekly or monthly food bundles tailored for individuals, families, or staff.
            </p>
          </div>
          
          <!-- 3. HR Integration System -->
          <div class="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
            
            <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-500 transition-colors duration-300 relative z-10">
              <svg class="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h3 class="text-xl font-bold text-accent-900 mb-4 group-hover:text-purple-600 transition-colors">HR Integration System</h3>
            <p class="text-accent-600 leading-relaxed">
              Food access solutions that reduce hunger and stress before salary dates. (Buy-Before-Payday Access)
            </p>
          </div>
          
          <!-- 4. Smart wallet systems -->
          <div class="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
            
            <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-500 transition-colors duration-300 relative z-10">
              <svg class="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            
            <h3 class="text-xl font-bold text-accent-900 mb-4 group-hover:text-blue-600 transition-colors">Smart Wallet Systems</h3>
            <p class="text-accent-600 leading-relaxed">
              Use Genory’s Smart Wallet to buy food with your bank wallet, tokens, or gift cards—fast, secure, and seamless.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- How It Works Section -->
    <section id="how-it-works" class="bg-gradient-to-b from-secondary-50 to-white">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-accent-900 mb-6">
            Get started in minutes and transform the way you buy food in Nigeria.
          </h2>
          <p class="text-xl text-accent-700 max-w-3xl mx-auto">
            Fast, simple, and designed to help you save more every day.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          <!-- Connecting Line (Desktop) -->
          <div class="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>

          <!-- Step 1 -->
          <div class="text-center group relative">
            <div class="relative mb-8 inline-block">
              <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="absolute -top-2 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-accent-900 border-2 border-white shadow-sm">1</div>
            </div>
            <h3 class="text-xl font-bold text-accent-900 mb-3">Sign Up</h3>
            <p class="text-accent-600 text-sm leading-relaxed">Create your free Genory account in less than 2 minutes. No stress, no paperwork — just enter your details and you’re in.</p>
          </div>
          
          <!-- Step 2 -->
          <div class="text-center group relative">
            <div class="relative mb-8 inline-block">
              <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div class="absolute -top-2 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-accent-900 border-2 border-white shadow-sm">2</div>
            </div>
            <h3 class="text-xl font-bold text-accent-900 mb-3">Add Your Essentials</h3>
            <p class="text-accent-600 text-sm leading-relaxed">Pick your everyday food items — rice, yam, veggies, proteins, and more — or select from our affordable bundles. Everything fresh, everything budget-friendly.</p>
          </div>
          
          <!-- Step 3 -->
          <div class="text-center group relative">
            <div class="relative mb-8 inline-block">
              <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div class="absolute -top-2 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-accent-900 border-2 border-white shadow-sm">3</div>
            </div>
            <h3 class="text-xl font-bold text-accent-900 mb-3">Your Market Run, Done Fast</h3>
            <p class="text-accent-600 text-sm leading-relaxed">Your Fresh food picks , straight to your doorstep. Directly from Nigerian farms, handled with care, and delivered in under 12 hours(Same day delivery ) — clean, fresh, and affordable.</p>
          </div>
          
          <!-- Step 4 -->
          <div class="text-center group relative">
            <div class="relative mb-8 inline-block">
              <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="absolute -top-2 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-accent-900 border-2 border-white shadow-sm">4</div>
            </div>
            <h3 class="text-xl font-bold text-accent-900 mb-3">Earn Up to 10%</h3>
            <p class="text-accent-600 text-sm leading-relaxed">Get rewards on every order and earn up to 10% by helping others buy from Genory — savings for them, value for you.</p>
          </div>
        </div>
        
        <!-- CTA -->
        <div class="text-center mt-16">
          <a 
            href="https://forms.gle/sPs2phRxP5KhGLuRA" 
            target="_blank"
            class="btn-primary text-lg px-8 py-4 inline-flex items-center group"
          >
            Get Started Today
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
    
    <!-- Community/Trust Section -->
    <section class="bg-white hidden" >
      <div class="max-w-7xl mx-auto section-padding">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-accent-900 mb-6">
            Trusted by Thousands
          </h2>
          <p class="text-xl text-accent-700 max-w-3xl mx-auto">
            Join the growing community of Nigerians who have transformed their grocery shopping experience with Genory.
          </p>
        </div>
        
        <!-- Testimonials -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <!-- Testimonial 1 -->
          <div class="card text-center">
            <div class="flex justify-center mb-4">
              <img class="w-16 h-16 rounded-full" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Testimonial">
            </div>
            <div class="flex justify-center mb-4">
              <div class="flex text-yellow-400">
                <svg v-for="i in 5" :key="i" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <p class="text-accent-700 mb-4">"Genory has saved me so much time and money. The food lock feature is genius!"</p>
            <div class="font-semibold text-accent-900">Adunni Okafor</div>
            <div class="text-sm text-accent-600">Lagos, Nigeria</div>
          </div>
          
          <!-- Testimonial 2 -->
          <div class="card text-center">
            <div class="flex justify-center mb-4">
              <img class="w-16 h-16 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Testimonial">
            </div>
            <div class="flex justify-center mb-4">
              <div class="flex text-yellow-400">
                <svg v-for="i in 5" :key="i" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <p class="text-accent-700 mb-4">"The token rewards system is amazing. I've earned enough to get free groceries!"</p>
            <div class="font-semibold text-accent-900">Chike Okwu</div>
            <div class="text-sm text-accent-600">Abuja, Nigeria</div>
          </div>
          
          <!-- Testimonial 3 -->
          <div class="card text-center">
            <div class="flex justify-center mb-4">
              <img class="w-16 h-16 rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Testimonial">
            </div>
            <div class="flex justify-center mb-4">
              <div class="flex text-yellow-400">
                <svg v-for="i in 5" :key="i" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <p class="text-accent-700 mb-4">"Never shopping at traditional markets again. Genory is the future!"</p>
            <div class="font-semibold text-accent-900">Folake Adebayo</div>
            <div class="text-sm text-accent-600">Port Harcourt, Nigeria</div>
          </div>
        </div>
        
        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold text-primary-500 mb-2">10,000+</div>
            <div class="text-accent-700">Happy Users</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-primary-500 mb-2">₦2M+</div>
            <div class="text-accent-700">Savings Generated</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-primary-500 mb-2">15</div>
            <div class="text-accent-700">Cities Covered</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-primary-500 mb-2">4.9/5</div>
            <div class="text-accent-700">App Rating</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Download App Section -->
    <DownloadSection />
    
    <!-- Contact Section -->
    <section id="contact" class="bg-secondary-50">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-accent-900 mb-6">
            The Smartest Way to Shop for Food in Africa
          </h2>
          <p class="text-xl text-accent-700 mb-8">
            Join our waitlist and be part of Africa's first smart food ecosystem, delivering fresh, high-quality groceries. Fast and seamlessly convenience.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="https://forms.gle/sPs2phRxP5KhGLuRA" 
              target="_blank"
              class="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center group"
            >
              <svg class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              Join the Waitlist
            </a>
            
            <a 
              href="mailto:hello@genory.com" 
              class="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center group"
            >
              <svg class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </a>
          </div>
          
          <!-- Contact info -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="font-semibold text-accent-900 mb-2">Email</h3>
              <p class="text-accent-700">info@genory.co</p>
            </div>
            
            <div>
              <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 class="font-semibold text-accent-900 mb-2">Phone</h3>
              <p class="text-accent-700">+2348143003554, +2348134649622</p>
            </div>
            
            <div>
              <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="font-semibold text-accent-900 mb-2">Location</h3>
              <p class="text-accent-700">No 4, Akintunde Street, Ojodu Berger Busstop, Lagos Nigeria</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HeroSection from '@/components/HeroSection.vue'

import DownloadSection from '@/components/DownloadSection.vue'
</script>

<route lang="yaml">
meta:
  layout: false
</route>

<style scoped>
/* Page-specific styles */
</style>