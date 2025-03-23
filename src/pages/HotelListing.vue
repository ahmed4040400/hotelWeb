<template>
    <div class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
        style='font-family: "Work Sans", "Noto Sans", sans-serif;'>
        <div class="layout-container flex h-full grow flex-col">
            <div class="mt-10">
                <!-- Loading indicator -->
                <div v-if="hotelStore.loading" class="flex justify-center py-8">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>

                <!-- Error message -->
                <div v-else-if="hotelStore.error" class="max-w-3xl mx-auto mt-5 p-4 bg-red-100 text-red-700 rounded">
                    {{ hotelStore.error }}
                </div>

                <!-- No hotels found message -->
                <div v-else-if="hotelStore.hotels.length === 0" class="max-w-3xl mx-auto mt-5 p-4 bg-gray-100 rounded">
                    لا توجد فنادق متاحة حاليا.
                </div>

                <!-- Hotel cards -->
                <article v-for="hotel in hotelStore.hotels" :key="hotel.id"
                    class="mt-5 flex flex-wrap md:flex-nowrap shadow-lg mx-auto max-w-3xl group cursor-pointer transform duration-500 hover:-translate-y-1">
                    <img class="w-full max-h-[400px] object-cover md:w-52" :src="hotel.image" :alt="hotel.name">
                    <div class="w-full">
                        <div class="p-5 pb-10">
                            <h1 class="text-2xl font-semibold text-gray-800 mt-4">
                                {{ hotel.name }}
                            </h1>
                            <p class="text-xl text-gray-400 mt-2 leading-relaxed">
                                {{ hotel.description }}
                            </p>
                        </div>
                        <div class="bg-blue-50 p-5">
                            <div class="sm:flex sm:justify-between">
                                <div>
                                    <div class="text-lg text-gray-700">
                                        <span class="text-gray-900 font-bold">{{ hotel.distance }}</span> من القاهرة
                                    </div>
                                    <div class="flex items-center">
                                        <div class="flex">
                                            <svg v-for="i in Math.round(hotel.rating)" :key="i" class="w-4 h-4 mx-px fill-current text-green-600"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                                                <path
                                                    d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z">
                                                </path>
                                            </svg>
                                        </div>
                                        <div class="text-gray-600 ml-2 text-sm md:text-base mt-1">
                                            {{ hotel.reviews }} مراجعات
                                        </div>
                                    </div>
                                </div>
                                <button @click.prevent="openReservationModal(hotel)"
                                    class="mt-3 sm:mt-0 py-2 px-5 md:py-3 md:px-6 bg-purple-700 hover:bg-purple-600 font-bold text-white md:text-lg rounded-lg shadow-md">
                                    احجز
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>

    <!-- Reservation Modal -->
    <div v-if="showReservationModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 class="text-xl mb-4 font-bold">إضافة حجز جديد</h2>
            
            <div v-if="reservationError" class="mb-4 p-2 bg-red-100 text-red-700 rounded">
                {{ reservationError }}
            </div>

            <form @submit.prevent="createReservation">
                <div class="mb-4">
                    <label class="block mb-2">الفندق</label>
                    <input v-if="selectedHotel" :value="selectedHotel.name" disabled type="text" class="w-full p-2 border rounded bg-gray-100">
                </div>
                <div class="mb-4">
                    <label class="block mb-2">تاريخ الوصول</label>
                    <input v-model="reservationDetails.checkIn" type="date" class="w-full p-2 border rounded" required>
                </div>
                <div class="mb-4">
                    <label class="block mb-2">تاريخ المغادرة</label>
                    <input v-model="reservationDetails.checkOut" type="date" class="w-full p-2 border rounded" required>
                </div>

                <div class="flex justify-end">
                    <button type="button" @click="showReservationModal = false"
                        class="px-4 py-2 bg-gray-500 text-white rounded mr-2">إلغاء</button>
                    <button type="submit" :disabled="reservationLoading" class="px-4 py-2 bg-blue-500 text-white rounded">
                        <span v-if="reservationLoading">جاري الحجز...</span>
                        <span v-else>تأكيد الحجز</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useHotelStore } from '../stores/hotel';
import { useReservationStore } from '../stores/reservation';
import { useAuthStore } from '../stores/auth';

// Define Hotel interface for type safety
interface Hotel {
  id?: number;
  name: string;
  image: string;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  price: string;
}

const router = useRouter();
const hotelStore = useHotelStore();
const reservationStore = useReservationStore();
const authStore = useAuthStore();

// Check if user is authenticated
const isAuthenticated = computed(() => authStore.isAuthenticated);

// Load hotels on mount
onMounted(async () => {
    if (!isAuthenticated.value) {
        router.push('/');
        return;
    }
    
    await hotelStore.fetchHotels();
});

// Reservation modal
const showReservationModal = ref(false);
const selectedHotel = ref<Hotel | null>(null);
const reservationLoading = ref(false);
const reservationError = ref('');

const reservationDetails = ref({
    checkIn: '',
    checkOut: '',
});

const openReservationModal = (hotel: Hotel) => {
    selectedHotel.value = hotel;
    reservationDetails.value = {
        checkIn: '',
        checkOut: '',
    };
    reservationError.value = '';
    showReservationModal.value = true;
};

const createReservation = async () => {
    if (!selectedHotel.value || !reservationDetails.value.checkIn || !reservationDetails.value.checkOut) {
        reservationError.value = 'يرجى ملء جميع الحقول المطلوبة';
        return;
    }

    // Check if hotel id exists
    if (!selectedHotel.value.id) {
        reservationError.value = 'معرف الفندق غير صالح';
        return;
    }

    const checkInDate = new Date(reservationDetails.value.checkIn);
    const checkOutDate = new Date(reservationDetails.value.checkOut);
    
    // Validate dates
    if (checkInDate >= checkOutDate) {
        reservationError.value = 'يجب أن يكون تاريخ المغادرة بعد تاريخ الوصول';
        return;
    }

    if (checkInDate < new Date()) {
        reservationError.value = 'لا يمكن الحجز في تاريخ سابق';
        return;
    }

    reservationLoading.value = true;
    reservationError.value = '';

    try {
        const result = await reservationStore.createReservation({
            hotelId: selectedHotel.value.id as number, // Type assertion to ensure it's a number
            checkIn: reservationDetails.value.checkIn,
            checkOut: reservationDetails.value.checkOut,
            price: selectedHotel.value.price
        });

        if (result.success) {
            showReservationModal.value = false;
            alert('تم إنشاء الحجز بنجاح!');
        } else {
            reservationError.value = result.message || 'فشل إنشاء الحجز';
        }
    } catch (error) {
        console.error('Reservation error:', error);
        reservationError.value = 'حدث خطأ أثناء إنشاء الحجز';
    } finally {
        reservationLoading.value = false;
    }
};
</script>