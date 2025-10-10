<template>
  <DefaultLayout>
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Features Section -->
    <section id="features" class="bg-white">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-accent-900 mb-6">
            Why Choose Genory?
          </h2>
          <p class="text-xl text-accent-700 max-w-3xl mx-auto">
            Experience the future of grocery shopping with our innovative features designed to save you time, money, and effort.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon="cart"
            title="Smart Grocery Bundles"
            description="Curated grocery packages tailored to your household needs and preferences. Never run out of essentials again."
            badge="Popular"
          />
          
          <FeatureCard
            icon="coins"
            title="Earn Tokens & Rewards"
            description="Get rewarded for every purchase with Genory tokens. Redeem for discounts, exclusive deals, and more."
          />
          
          <FeatureCard
            icon="lock"
            title="Food Lock Savings"
            description="Lock in today's prices for future purchases. Protect yourself from inflation while building your savings."
          />
          
          <FeatureCard
            icon="truck"
            title="Instant Delivery Tracking"
            description="Real-time tracking from order to doorstep. Know exactly when your groceries will arrive."
          />
        </div>
      </div>
    </section>
    
    <!-- How It Works Section -->
    <section id="how-it-works" class="bg-gradient-to-b from-secondary-50 to-white">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-accent-900 mb-6">
            How Genory Works
          </h2>
          <p class="text-xl text-accent-700 max-w-3xl mx-auto">
            Get started in minutes and transform your grocery shopping experience forever.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Step 1 -->
          <div class="text-center">
            <div class="relative mb-6">
              <div class="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-accent-900">1</div>
            </div>
            <h3 class="text-xl font-bold text-accent-900 mb-3">Sign Up</h3>
            <p class="text-accent-700">Create your free Genory account in under 2 minutes. No credit card required.</p>
          </div>
          
          <!-- Step 2 -->
          <div class="text-center">
            <div class="relative mb-6">
              <div class="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-accent-900">2</div>
            </div>
            <h3 class="text-xl font-bold text-accent-900 mb-3">Add Essentials</h3>
            <p class="text-accent-700">Select your household essentials and set up your personalized grocery bundles.</p>
          </div>
          
          <!-- Step 3 -->
          <div class="text-center">
            <div class="relative mb-6">
              <div class="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-accent-900">3</div>
            </div>
            <h3 class="text-xl font-bold text-accent-900 mb-3">Lock Savings</h3>
            <p class="text-accent-700">Lock in current prices for future purchases and watch your savings grow.</p>
          </div>
          
          <!-- Step 4 -->
          <div class="text-center">
            <div class="relative mb-6">
              <div class="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-accent-900">4</div>
            </div>
            <h3 class="text-xl font-bold text-accent-900 mb-3">Earn Rewards</h3>
            <p class="text-accent-700">Earn tokens with every purchase and unlock exclusive rewards and discounts.</p>
          </div>
        </div>
        
        <!-- CTA -->
        <div class="text-center mt-16">
          <a 
            href="https://forms.google.com/waitlist" 
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
    <section class="bg-white">
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
            Ready to Transform Your Grocery Shopping?
          </h2>
          <p class="text-xl text-accent-700 mb-8">
            Join our waitlist to be among the first to experience the future of grocery shopping in Nigeria.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="https://forms.google.com/waitlist" 
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
              <p class="text-accent-700">hello@genory.com</p>
            </div>
            
            <div>
              <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 class="font-semibold text-accent-900 mb-2">Phone</h3>
              <p class="text-accent-700">+234 (0) 810 000 0000</p>
            </div>
            
            <div>
              <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="font-semibold text-accent-900 mb-2">Location</h3>
              <p class="text-accent-700">Lagos, Nigeria</p>
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
import FeatureCard from '@/components/FeatureCard.vue'
import DownloadSection from '@/components/DownloadSection.vue'
</script>

<style scoped>
/* Page-specific styles */
</style>