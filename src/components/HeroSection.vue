<template>
    <section class="relative min-h-screen flex items-center pt-20 overflow-hidden bg-mesh">
        <!-- Background decoration -->
        <div class="absolute inset-0 bg-grid-white opacity-40"></div>
        <div class="blur-spot w-[500px] h-[500px] bg-primary-400 -top-24 -left-24"></div>
        <div class="blur-spot w-[600px] h-[600px] bg-primary-200 bottom-0 -right-48"></div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <!-- Text content -->
                <div class="text-center lg:text-left z-10">
                    <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-sm font-bold mb-8 animate-fade-in">
                        <span class="relative flex h-2 w-2 mr-3">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        Africa's Smartest Food Ecosystem
                    </div>

                    <div class="relative mb-8">
                        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-accent-900 leading-[1.05] mb-8 tracking-tight">
                            Shop Farm-Fresh Essentials. <span class="text-primary-600">Save More.</span> <br/> 
                            <span class="block text-primary-500 mt-2">Earn Effortlessly.</span>
                        </h1>
                        <p class="text-xl text-accent-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Genory connects Nigerians to fresh farm food through smart technology and eﬃcient logistics, reducing costs and ensuring quality food is accessible to every home.
                        </p>
                    </div>

                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mt-12">
                        <a href="#download"
                            class="btn-primary !py-5 !px-10 text-lg flex items-center justify-center group relative overflow-hidden">
                            <div class="absolute inset-0 animate-shimmer pointer-events-none opacity-30"></div>
                            <svg class="w-6 h-6 mr-3 group-hover:scale-110 transition-transform relative z-10" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                            </svg>
                            <div class="text-left leading-none relative z-10">
                                <span class="block text-[10px] opacity-80 font-bold uppercase tracking-widest mb-1">Coming soon</span>
                                <span class="block font-bold">Mobile App</span>
                            </div>
                        </a>

                        <a href="https://forms.gle/sPs2phRxP5KhGLuRA" target="_blank"
                            class="btn-secondary !py-5 !px-10 text-lg flex items-center justify-center group h-full">
                            <svg class="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            <span class="font-bold">Join Waitlist</span>
                        </a>
                    </div>

                    <!-- Social proof -->
                    <div class="mt-16 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-10 border-t border-gray-100 pt-10">
                        <div class="flex items-center">
                            <div class="flex -space-x-3">
                                <img v-for="i in 3" :key="i" 
                                     class="w-12 h-12 rounded-full border-4 border-white shadow-sm hover:scale-110 transition-transform cursor-pointer"
                                     :src="`https://i.pravatar.cc/100?u=${i}`"
                                     alt="User">
                                <div class="w-12 h-12 rounded-full border-4 border-white bg-primary-500 flex items-center justify-center shadow-sm">
                                    <span class="text-xs font-bold text-white">+10K</span>
                                </div>
                            </div>
                            <div class="ml-5">
                                <p class="text-sm font-bold text-accent-900 leading-none mb-1">Join 10,000+ users</p>
                                <p class="text-xs text-accent-500">Already saving with Genory</p>
                            </div>
                        </div>

                        <div class="h-10 w-px bg-gray-200 hidden sm:block"></div>

                        <div class="flex items-center">
                            <div class="flex text-yellow-400 mr-3">
                                <svg v-for="i in 5" :key="i" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <span class="text-sm font-bold text-accent-900">4.9/5 Success Rate</span>
                        </div>
                    </div>
                </div>

                <!-- Hero image/mockup -->
                <div class="relative lg:block hidden">
                    <!-- Glassy Backdrop -->
                    <div class="absolute inset-0 bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 transform rotate-3 scale-110 -z-10 animate-float-slow"></div>
                    
                    <!-- Glowing Aura -->
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary-400/20 blur-[100px] rounded-full animate-pulse"></div>
                    
                    <div class="relative z-10 animate-float-medium">
                        <img src="/hero_mockup.png" alt="Genory App Mockup" class="w-full h-auto drop-shadow-[0_35px_35px_rgba(46,115,255,0.25)] transform hover:scale-105 transition-transform duration-700" />
                    </div>

                    <!-- Decorative rings -->
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-primary-100/50 rounded-full -z-10 animate-pulse"></div>
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-primary-50/50 rounded-full -z-10 animate-pulse animation-delay-1000"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// Static Hero Section
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    width: 100%;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}
</style>



<style scoped>
.bg-grid-pattern {
    background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
    background-size: 20px 20px;
}

.animation-delay-1000 {
    animation-delay: 1s;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
}
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-40px) rotate(-12deg) scale(0.9); }
    to { opacity: 1; transform: translateX(0) rotate(-12deg) scale(1); }
}
@keyframes fadeInRight {
    from { opacity: 0; transform: translateX(40px) rotate(12deg) scale(0.9); }
    to { opacity: 1; transform: translateX(0) rotate(12deg) scale(1); }
}

.animate-float-slow { animation: float 6s ease-in-out infinite; }
.animate-float-medium { animation: float 5s ease-in-out infinite; animation-delay: 1s; }
.animate-float-fast { animation: float 4s ease-in-out infinite; animation-delay: 0.5s; }

.animate-fade-in-up { animation: fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
.animate-fade-in-left { animation: fadeInLeft 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
.animate-fade-in-right { animation: fadeInRight 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
</style>