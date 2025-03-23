<template>
    <aside id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar">
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul class="space-y-2 font-medium">

                <li>
                    <RouterLink to="/managerDashboard"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V8h2v4zm6 4h-2v-4h-2v4h-2v-6h6v6z" />
                        </svg> <span class="ms-3">الفنادق</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/reservation"
                        class="flex items-center bg-gray-200 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
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
        <div v-if="reservationStore.loading" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <!-- Error message -->
        <div v-else-if="reservationStore.error" class="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {{ reservationStore.error }}
        </div>
        
        <!-- No reservations message -->
        <div v-else-if="reservationStore.reservations.length === 0" class="mb-4 p-2 bg-gray-100 rounded">
            لا توجد حجوزات حالياً.
        </div>

        <table v-else class="w-full">
            <thead>
                <tr class="bg-white">
                    <th
                        class="table-c1f63e65-e852-449e-8deb-be5104d5dfa0-column-56 px-4 py-3 text-right text-[#111418] w-24 text-sm font-medium leading-normal">
                        الاسم</th>
                    <th
                        class="table-c1f63e65-e852-449e-8deb-be5104d5dfa0-column-176 px-4 py-3 text-right text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        الفندق</th>
                    <th
                        class="table-c1f63e65-e852-449e-8deb-be5104d5dfa0-column-296 px-4 py-3 text-right text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        تاريخ الوصول</th>
                    <th
                        class="table-c1f63e65-e852-449e-8deb-be5104d5dfa0-column-416 px-4 py-3 text-right text-[#111418] w-60 text-sm font-medium leading-normal">
                        تاريخ المغادرة</th>
                    <th
                        class="table-c1f63e65-e852-449e-8deb-be5104d5dfa0-column-656 px-4 py-3 text-right text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        السعر</th>
                    <th
                        class="table-c1f63e65-e852-449e-8deb-be5104d5dfa0-column-776 px-4 py-3 text-right text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        الحالة</th>
                    <th
                        class="table-c1f63e65-e852-449e-8deb-be5104d5dfa0-column-896 px-4 py-3 text-right text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        الإجراءات</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="reservation in reservationStore.reservations" :key="reservation.id" class="border-t border-t-[#dce0e5]">
                    <td class="h-[72px] px-4 py-2 w-24 text-sm font-normal leading-normal">
                        {{ reservation.User?.name }}
                    </td>
                    <td class="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                        {{ reservation.Hotel?.name }}
                    </td>
                    <td class="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                        {{ formatDate(reservation.checkIn) }}
                    </td>
                    <td class="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                        {{ formatDate(reservation.checkOut) }}
                    </td>
                    <td class="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                        {{ reservation.price }}
                    </td>
                    <td class="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                        <span :class="{
                            'bg-green-100 text-green-800': reservation.status === 'confirmed',
                            'bg-yellow-100 text-yellow-800': reservation.status === 'pending',
                            'bg-red-100 text-red-800': reservation.status === 'canceled'
                        }" class="px-2 py-1 rounded text-xs">
                            {{ getStatusTranslation(reservation.status) }}
                        </span>
                    </td>
                    <td class="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                        <div class="flex space-x-2">
                            <button v-if="reservation.status !== 'confirmed'" 
                                @click="updateReservationStatus(reservation.id, 'confirmed')"
                                class="px-3 py-1 bg-green-500 text-white rounded text-xs mr-1">
                                تأكيد
                            </button>
                            <button v-if="reservation.status !== 'canceled'" 
                                @click="updateReservationStatus(reservation.id, 'canceled')"
                                class="px-3 py-1 bg-red-500 text-white rounded text-xs mr-1">
                                إلغاء
                            </button>
                            <button @click="deleteReservation(reservation.id)" 
                                class="px-3 py-1 bg-gray-700 text-white rounded text-xs">
                                حذف
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useReservationStore } from '../../stores/reservation';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const reservationStore = useReservationStore();
const authStore = useAuthStore();

onMounted(async () => {
    // Check if user is authenticated and is a manager
    if (!authStore.isAuthenticated || !authStore.isManager) {
        router.push('/');
        return;
    }
    
    // Fetch all reservations
    await reservationStore.fetchAllReservations();
});

// Format date to display in a more readable format
const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG');
};

// Translate status to Arabic
const getStatusTranslation = (status: string | undefined) => {
    if (!status) return '';
    
    const translations: Record<string, string> = {
        confirmed: 'مؤكد',
        pending: 'قيد الانتظار',
        canceled: 'ملغي'
    };
    return translations[status] || status;
};

// Update reservation status
const updateReservationStatus = async (id: number | undefined, status: string) => {
    if (id === undefined) {
        console.error('Cannot update reservation: ID is undefined');
        alert('فشل تحديث حالة الحجز: معرف الحجز غير محدد');
        return;
    }
    
    try {
        await reservationStore.updateReservationStatus(id, status);
    } catch (error) {
        console.error('Error updating reservation status:', error);
        alert('فشل تحديث حالة الحجز');
    }
};

// Delete reservation
const deleteReservation = async (id: number | undefined) => {
    if (id === undefined) {
        console.error('Cannot delete reservation: ID is undefined');
        alert('فشل حذف الحجز: معرف الحجز غير محدد');
        return;
    }
    
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا الحجز؟')) {
        try {
            await reservationStore.deleteReservation(id);
        } catch (error) {
            console.error('Error deleting reservation:', error);
            alert('فشل حذف الحجز');
        }
    }
};
</script>
