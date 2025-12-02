<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-extrabold text-gray-900">Become a Delivery Partner</h2>
        <p class="mt-4 text-lg text-gray-600">Join us and start earning by delivering orders.</p>
      </div>

      <div class="bg-white shadow rounded-lg overflow-hidden">
        <!-- Step Indicator -->
        <div class="bg-gray-50 px-4 py-4 sm:px-6 border-b border-gray-200">
          <nav class="flex justify-center" aria-label="Progress">
            <ol class="flex items-center space-x-8">
              <li v-for="(step, index) in steps" :key="step.name" class="relative">
                <div class="flex items-center">
                  <span
                    :class="[
                      currentStep > index ? 'bg-blue-600' : currentStep === index ? 'border-2 border-blue-600' : 'border-2 border-gray-300',
                      'h-8 w-8 rounded-full flex items-center justify-center'
                    ]"
                  >
                    <span v-if="currentStep > index" class="text-white">✓</span>
                    <span v-else :class="currentStep === index ? 'text-blue-600' : 'text-gray-500'">{{ index + 1 }}</span>
                  </span>
                  <span class="ml-2 text-sm font-medium text-gray-900">{{ step.name }}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div class="p-8">
          <!-- Step 1: Role Selection -->
          <div v-if="currentStep === 0">
            <h3 class="text-lg font-medium text-gray-900 mb-6">Select your role</h3>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div
                v-for="role in roles"
                :key="role.value"
                @click="form.type = role.value"
                :class="[
                  form.type === role.value ? 'border-blue-600 ring-2 ring-blue-600' : 'border-gray-300',
                  'relative rounded-lg border bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 cursor-pointer'
                ]"
              >
                <div class="flex-1 min-w-0">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <p class="text-sm font-medium text-gray-900">{{ role.name }}</p>
                  <p class="text-sm text-gray-500 truncate">{{ role.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Vehicle Details -->
          <div v-if="currentStep === 1">
            <h3 class="text-lg font-medium text-gray-900 mb-6">Vehicle Information</h3>
            <div class="space-y-6">
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Vehicle Type</label>
                  <select v-model="form.vehicle.type" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border">
                    <option value="bike">Bike</option>
                    <option value="car">Car</option>
                    <option value="van">Van</option>
                    <option value="bicycle">Bicycle</option>
                  </select>
                </div>

                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Plate Number</label>
                  <input type="text" v-model="form.vehicle.plateNumber" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border">
                </div>

                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Make</label>
                  <input type="text" v-model="form.vehicle.make" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border">
                </div>

                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Model</label>
                  <input type="text" v-model="form.vehicle.model" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border">
                </div>
                 <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Color</label>
                  <input type="text" v-model="form.vehicle.color" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border">
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: KYC -->
          <div v-if="currentStep === 2">
            <h3 class="text-lg font-medium text-gray-900 mb-6">Identity Verification</h3>
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">ID Type</label>
                <select v-model="form.kyc.idType" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border">
                  <option value="NATIONAL_ID">National ID</option>
                  <option value="DRIVERS_LICENSE">Driver's License</option>
                  <option value="PASSPORT">Passport</option>
                  <option value="VOTERS_CARD">Voter's Card</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">ID Number</label>
                <input type="text" v-model="form.kyc.idNumber" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Upload ID Image URL (Temporary)</label>
                <input type="text" v-model="form.kyc.idImage" placeholder="https://..." class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Upload Selfie URL (Temporary)</label>
                <input type="text" v-model="form.kyc.selfieImage" placeholder="https://..." class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border">
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-8 flex justify-between">
            <button
              v-if="currentStep > 0"
              @click="currentStep--"
              class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back
            </button>
            <div v-else></div>

            <button
              v-if="currentStep < steps.length - 1"
              @click="nextStep"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Next
            </button>
            <button
              v-else
              @click="submitApplication"
              :disabled="submitting"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {{ submitting ? 'Submitting...' : 'Submit Application' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { PartnerService } from '../../../services/partner.service';

const router = useRouter();
const currentStep = ref(0);
const submitting = ref(false);

const steps = [
  { name: 'Role' },
  { name: 'Vehicle' },
  { name: 'KYC' },
];

const roles = [
  { name: 'Driver', value: 'driver', description: 'Deliver with your car or van' },
  { name: 'Rider', value: 'rider', description: 'Deliver with your motorbike' },
  { name: 'Errander', value: 'errander', description: 'Run errands and deliver small items' },
];

const form = reactive({
  type: 'driver',
  vehicle: {
    type: 'car',
    make: '',
    model: '',
    plateNumber: '',
    color: '',
    images: [] as string[],
  },
  kyc: {
    idType: 'NATIONAL_ID',
    idNumber: '',
    idImage: '',
    selfieImage: '',
  },
});

onMounted(async () => {
  try {
    const response = await PartnerService.getProfile();
    if (response.data) {
      router.push('/app/partner/dashboard');
    }
  } catch (error) {
    // Not a partner yet, stay on onboarding
  }
});

const nextStep = () => {
  // Add validation here
  currentStep.value++;
};

const submitApplication = async () => {
  submitting.value = true;
  try {
    await PartnerService.apply(form);
    router.push('/app/partner/dashboard');
  } catch (error) {
    console.error('Application failed', error);
    alert('Failed to submit application. Please try again.');
  } finally {
    submitting.value = false;
  }
};
</script>
