<template>
    <aside id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar">
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
                <li>
                    <RouterLink to="/managerDashboard"
                        class="flex items-center bg-gray-200 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V8h2v4zm6 4h-2v-4h-2v4h-2v-6h6v6z" />
                        </svg> <span class="ms-3">الفنادق</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink to="/reservation"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V8h2v4zm6 4h-2v-4h-2v4h-2v-6h6v6z" />
                        </svg> <span class="ms-3">الحجوزات</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </aside>

    <div class="ml-64 p-4"> <!-- Added margin-left and padding to main content -->
        <!-- Loading indicator -->
        <div v-if="hotelStore.loading" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <!-- Error message -->
        <div v-else-if="hotelStore.error" class="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {{ hotelStore.error }}
        </div>

        <table v-else class="w-full">
            <thead>
                <tr class="bg-white">
                    <th
                        class="table-c1f63e65-e852-449e-8deb-be5104d5dfa0-column-56 px-4 py-3 text-right text-[#111418] w-14 text-sm font-medium leading-normal">
                        الصور</th>
                    <th
                        class="table-c1f63e65-e852-449e-8deb-be5104d5dfa0-column-176 px-4 py-3 text-right text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        الاسم</th>
                    <th
                        class="table-c1f63e65-e852-449e-8deb-be5104d5dfa0-column-296 px-4 py-3 text-right text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        العنوان</th>
                    <th
                        class="table-c1f63e65-e852-449e-8deb-be5104d5dfa0-column-416 px-4 py-3 text-right text-[#111418] w-60 text-sm font-medium leading-normal">
                        التقييم</th>
                    <th
                        class="table-c1f63e65-e852-449e-8deb-be5104d5dfa0-column-656 px-4 py-3 text-right text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        الموقع</th>
                    <th
                        class="table-c1f63e65-e852-449e-8deb-be5104d5dfa0-column-776 px-4 py-3 text-right text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        السعر</th>
                    <th
                        class="table-c1f63e65-e852-449e-8deb-be5104d5dfa0-column-896 px-4 py-3 text-right text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        الإجراءات</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="hotel in hotelStore.hotels" :key="hotel.id" class="border-t border-t-[#dce0e5]">
                    <td class="h-[72px] px-4 py-2 w-14 text-sm font-normal leading-normal">
                        <img :src="hotel.image" alt="Hotel Image" class="w-14 h-14 object-cover rounded">
                    </td>
                    <td class="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                        {{ hotel.name }}
                    </td>
                    <td class="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                        {{ hotel.title }}
                    </td>
                    <td class="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                        {{ hotel.rating }}
                    </td>
                    <td class="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                        {{ hotel.location }}
                    </td>
                    <td class="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                        {{ hotel.price }}
                    </td>
                    <td class="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                        <button @click="deleteHotel(hotel.id)" class="px-4 py-2 bg-red-500 text-white rounded">حذف</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="mt-4">
            <button @click="showModal = true" class="px-4 py-2 bg-blue-500 text-white rounded">إضافة فندق</button>
        </div>

        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 class="text-xl mb-4">إضافة فندق جديد</h2>
                
                <div v-if="errorMessage" class="mb-4 p-2 bg-red-100 text-red-700 rounded">
                    {{ errorMessage }}
                </div>
                
                <form @submit.prevent="addHotel">
                    <div class="mb-4">
                        <label class="block mb-2">رابط الصورة</label>
                        <input v-model="newHotel.image" type="text" class="w-full p-2 border rounded" required>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">الاسم</label>
                        <input v-model="newHotel.name" type="text" class="w-full p-2 border rounded" required>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">العنوان</label>
                        <input v-model="newHotel.title" type="text" class="w-full p-2 border rounded" required>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">الوصف</label>
                        <textarea v-model="newHotel.description" class="w-full p-2 border rounded" rows="3" required></textarea>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">التقييم</label>
                        <input v-model.number="newHotel.rating" type="number" step="0.1" min="0" max="5" class="w-full p-2 border rounded" required>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">المراجعات</label>
                        <input v-model.number="newHotel.reviews" type="number" min="0" class="w-full p-2 border rounded" required>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">الموقع</label>
                        <input v-model="newHotel.location" type="text" class="w-full p-2 border rounded" required>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">المسافة</label>
                        <input v-model="newHotel.distance" type="text" class="w-full p-2 border rounded" required>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">السعر</label>
                        <input v-model="newHotel.price" type="text" class="w-full p-2 border rounded" required>
                    </div>
                    <div class="flex justify-end">
                        <button type="button" @click="closeModal"
                            class="px-4 py-2 bg-gray-500 text-white rounded mr-2">إلغاء</button>
                        <button type="submit" :disabled="loading" class="px-4 py-2 bg-blue-500 text-white rounded">
                            <span v-if="loading">جاري الإضافة...</span>
                            <span v-else>إضافة</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useHotelStore } from '../../stores/hotel';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const hotelStore = useHotelStore();
const authStore = useAuthStore();

const showModal = ref(false);
const loading = ref(false);
const errorMessage = ref('');

const newHotel = reactive({
    image: '',
    name: '',
    title: '',
    description: '',
    rating: 0,
    reviews: 0,
    location: '',
    distance: '',
    price: ''
});

onMounted(async () => {
    // Check if user is authenticated and is a manager
    if (!authStore.isAuthenticated || !authStore.isManager) {
        router.push('/');
        return;
    }
    
    // Fetch hotels
    await hotelStore.fetchHotels();
});

const closeModal = () => {
    showModal.value = false;
    errorMessage.value = '';
    // Reset form
    Object.assign(newHotel, {
        image: '',
        name: '',
        title: '',
        description: '',
        rating: 0,
        reviews: 0,
        location: '',
        distance: '',
        price: ''
    });
};

const addHotel = async () => {
    // Basic validation
    if (!newHotel.image || !newHotel.name || !newHotel.title || !newHotel.location || !newHotel.price) {
        errorMessage.value = 'يرجى ملء جميع الحقول المطلوبة';
        return;
    }

    loading.value = true;
    errorMessage.value = '';

    try {
        const result = await hotelStore.createHotel(newHotel);
        
        if (result.success) {
            closeModal();
        } else {
            errorMessage.value = result.message || 'فشل إضافة الفندق';
        }
    } catch (error) {
        console.error('Error adding hotel:', error);
        errorMessage.value = 'حدث خطأ أثناء إضافة الفندق';
    } finally {
        loading.value = false;
    }
};

const deleteHotel = async (id: number | undefined) => {
    // Add null/undefined check
    if (id === undefined) {
        console.error('Cannot delete hotel: ID is undefined');
        alert('فشل حذف الفندق: معرف الفندق غير محدد');
        return;
    }
    
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا الفندق؟')) {
        try {
            await hotelStore.deleteHotel(id);
        } catch (error) {
            console.error('Error deleting hotel:', error);
            alert('فشل حذف الفندق');
        }
    }
};
</script>