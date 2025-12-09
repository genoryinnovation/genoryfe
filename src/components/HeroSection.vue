<template>
    <section class="relative bg-gradient-to-b from-primary-500/10 to-white overflow-hidden">
        <!-- Background decoration -->
        <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div class="relative max-w-7xl mx-auto section-padding">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                <!-- Text content -->
                <div class="text-center lg:text-left lg:col-span-2">
                    <div class="relative h-[300px] mb-8">
                        <TransitionGroup name="fade" tag="div" class="absolute inset-0 flex flex-col justify-center">
                            <div v-for="(slide, index) in slides" :key="index" v-show="currentSlide === index" class="w-full">
                                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-accent-900 leading-tight mb-6" v-html="slide.headline">
                                </h1>
                                <p class="text-xl text-accent-700 max-w-2xl mx-auto lg:mx-0">
                                    {{ slide.subheadline }}
                                </p>
                            </div>
                        </TransitionGroup>
                    </div>

                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <!-- <a href="#download"
                            class="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center group">
                            <svg class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path
                                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                            </svg>
                            Download App
                        </a> -->

                        <button
                            class="btn-primary text-white px-6 py-3 rounded-lg flex items-center space-x-3 relative hover:bg-black/30 transition-colors border-2 border-white/20 group">
                            <svg class="w-8 h-8 group-hover:scale-110 transition-transform" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                            </svg>
                            <div class="text-left">
                                <div class="text-xs opacity-75">Download</div>
                                <div class="text-lg font-semibold">Mobile App</div>
                            </div>
                            <div
                                class="absolute -top-2 -right-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                                Soon
                            </div>
                        </button>


                        <a href="https://forms.gle/sPs2phRxP5KhGLuRA" target="_blank"
                            class="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center group">
                            <svg class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            Join Waitlist
                        </a>
                    </div>

                    <!-- Social proof -->
                    <div class="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                        <div class="flex items-center">
                            <div class="flex -space-x-2">
                                <img class="w-10 h-10 rounded-full border-2 border-white"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="">
                                <img class="w-10 h-10 rounded-full border-2 border-white"
                                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="">
                                <img class="w-10 h-10 rounded-full border-2 border-white"
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="">
                                <div
                                    class="w-10 h-10 rounded-full border-2 border-white bg-primary-500 flex items-center justify-center">
                                    <span class="text-xs font-medium text-white">+10K</span>
                                </div>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-accent-900">Join 10,000+ users</p>
                                <p class="text-xs text-accent-600">Already saving with Genory</p>
                            </div>
                        </div>

                        <div class="flex items-center space-x-1">
                            <div class="flex">
                                <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <span class="text-sm font-medium text-accent-900 ml-2">4.9/5 rating</span>
                        </div>
                    </div>
                </div>

                <!-- Hero image/mockup -->
                <div class="relative">
                    <div class="relative z-10 max-w-7xl mx-auto">
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
                            <!-- Main Image (Left) -->
                            <div class="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up group" style="animation-delay: 0s;">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <img src="/branding1.jpeg" alt="Genory App Main" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                            </div>

                            <!-- Side Images (Right) -->
                            <div class="lg:col-span-4 flex flex-col gap-6 h-full">
                                <div class="flex-1 relative rounded-3xl overflow-hidden shadow-xl animate-fade-in-right group" style="animation-delay: 0.2s;">
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <img src="/branding2.jpeg" alt="Genory App Feature" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                                </div>
                                <div class="flex-1 relative rounded-3xl overflow-hidden shadow-xl animate-fade-in-right group" style="animation-delay: 0.4s;">
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <img src="/branding3.jpeg" alt="Genory App Feature" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                                </div>
                            </div>
                        </div>
                    </div>



                    <!-- Floating elements -->
                    <div class="absolute -top-4 -left-4 w-16 h-16 bg-primary-500 rounded-full opacity-20 animate-pulse">
                    </div>
                    <div
                        class="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse animation-delay-1000">
                    </div>
                    <div
                        class="absolute top-1/3 -right-8 w-12 h-12 bg-green-400 rounded-full opacity-20 animate-pulse animation-delay-2000">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const currentSlide = ref(0);
const slides = [
    {
        headline: `Shop Smart. <span class="text-primary-500">Save More.</span> <span class="block">Earn Effortlessly.</span>`,
        subheadline: `Genory connects Nigerians to fresh farm food through smart technology and eﬃcient logistics, reducing food costs and making quality food accessible every day, because no one should go hungry.`
    },
    {
        headline: `<span class="text-primary-500">Buy Fresh.</span> <span class="text-red-500">Fast Delivery.</span> <span class="block text-primary-500">ENJOY upto 30% more.</span>`,
        subheadline: `Say goodbye to long market trips. Genory brings the best farm produce to you the same day, while letting you enjoy up to 30% more in value. Fresh, fast, and designed for your convenience.`
    },
    {
        headline: `NO hustle. NO worries. <span class="block">stay relax before <span class="text-blue-600">payday</span>.</span>`,
        subheadline: `Genory makes it easy for employees to care for their families by delivering fresh, farm-quality food straight to their door—fast, reliable, and stress-free. We help companies keep employees energized and focused while families stay nourished, giving HR teams peace of mind knowing staff welfare is taken care of—all before payday.`
    }
];

let intervalId: any;

onMounted(() => {
    intervalId = setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % slides.length;
    }, 5000);
});

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
    position: absolute;
    width: 100%;
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
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