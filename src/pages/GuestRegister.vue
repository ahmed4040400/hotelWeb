<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow">
            <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                إنشاء حساب جديد
            </h2>
            <p class="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                أو
                <RouterLink to="/"
                    class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    تسجيل الدخول إلى حسابك
                </RouterLink>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form @submit.prevent="handleRegister">
                    <div v-if="errorMessage" class="mb-4 p-2 bg-red-100 text-red-700 rounded">
                        {{ errorMessage }}
                    </div>

                    <div>
                        <label for="name" class="block text-sm font-medium leading-5 text-gray-700">الاسم</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input id="name" v-model="userData.name" name="name" placeholder="جون دو" type="text" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                        </div>
                    </div>

                    <div class="mt-6">
                        <label for="username" class="block text-sm font-medium leading-5 text-gray-700">اسم
                            المستخدم</label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input id="username" v-model="userData.username" name="username" placeholder="john" type="text" required
                                class="flex-1 border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                        </div>
                    </div>

                    <div class="mt-6">
                        <label for="email" class="block text-sm font-medium leading-5 text-gray-700">
                            البريد الإلكتروني
                        </label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input id="email" v-model="userData.email" name="email" placeholder="user@example.com" type="email" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                        </div>
                    </div>

                    <div class="mt-6">
                        <label for="password" class="block text-sm font-medium leading-5 text-gray-700">
                            كلمة المرور
                        </label>
                        <div class="mt-1 rounded-md shadow-sm">
                            <input id="password" v-model="userData.password" name="password" type="password" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                        </div>
                    </div>

                    <div class="mt-6">
                        <label for="password_confirmation" class="block text-sm font-medium leading-5 text-gray-700">
                            تأكيد كلمة المرور
                        </label>
                        <div class="mt-1 rounded-md shadow-sm">
                            <input id="password_confirmation" v-model="passwordConfirmation" name="password_confirmation" 
                                type="password" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                        </div>
                    </div>

                    <div class="mt-6">
                        <span class="block w-full rounded-md shadow-sm">
                            <button type="submit" :disabled="loading"
                                class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                <span v-if="loading">جاري التحميل...</span>
                                <span v-else>إنشاء حساب</span>
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const userData = reactive({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'guest'
});

const passwordConfirmation = ref('');
const loading = ref(false);
const errorMessage = ref('');

const handleRegister = async () => {
    // Basic validation
    if (userData.password !== passwordConfirmation.value) {
        errorMessage.value = 'كلمات المرور غير متطابقة';
        return;
    }

    loading.value = true;
    errorMessage.value = '';

    try {
        const result = await authStore.register(userData);
        
        if (result.success) {
            router.push('/hotels');
        } else {
            errorMessage.value = result.message || 'فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.';
        }
    } catch (error) {
        errorMessage.value = 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا.';
        console.error('Registration error:', error);
    } finally {
        loading.value = false;
    }
};
</script>