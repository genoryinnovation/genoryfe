<template>
  <section id="download" class="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
    <div class="max-w-7xl mx-auto section-padding text-center">
      <!-- Content -->
      <div class="max-w-3xl mx-auto mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Genory App Coming Soon
        </h2>
        <p class="text-xl text-primary-100 mb-8">
          Get ready to shop smarter, save more, and earn effortlessly. Be the first to know when Genory launches in Nigeria.
        </p>
      </div>
      
      <!-- Coming Soon notification -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-lg mx-auto mb-12">
        <div class="flex items-center justify-center mb-4">
          <svg class="w-16 h-16 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold mb-3">Coming Soon to App Stores</h3>
        <p class="text-primary-100 mb-6">
          We're putting the finishing touches on the Genory mobile app. Join our waitlist to be notified when it's ready!
        </p>
        <a 
          href="https://forms.gle/sPs2phRxP5KhGLuRA" 
          target="_blank"
          class="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center group"
        >
          Join Waitlist
          <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
      
      <!-- Expected launch platforms -->
      <div class="mb-12">
        <h4 class="text-lg font-semibold mb-6 text-primary-100">Available on these platforms when we launch:</h4>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-60">
          <!-- Google Play Store (Coming Soon) -->
          <div class="bg-black/20 text-white px-6 py-3 rounded-lg flex items-center space-x-3 relative">
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            <div class="text-left">
              <div class="text-xs opacity-75">Coming to</div>
              <div class="text-lg font-semibold">Google Play</div>
            </div>
            <div class="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
              Soon
            </div>
          </div>
          
          <!-- Apple App Store (Coming Soon) -->
          <div class="bg-black/20 text-white px-6 py-3 rounded-lg flex items-center space-x-3 relative">
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
            </svg>
            <div class="text-left">
              <div class="text-xs opacity-75">Coming to</div>
              <div class="text-lg font-semibold">App Store</div>
            </div>
            <div class="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
              Soon
            </div>
          </div>
        </div>
      </div>
      
      <!-- Stats -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">1,000+</div>
          <div class="text-primary-100">Waitlist Signups</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">15</div>
          <div class="text-primary-100">Cities Ready</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">Q1 2026</div>
          <div class="text-primary-100">Expected Launch</div>
        </div>
      </div>
    </div>
  </section>
</template>