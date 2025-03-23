<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow">
            <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                تسجيل الدخول إلى حسابك
            </h2>
            <p class="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                أو
                <RouterLink to="/register"
                    class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    إنشاء حساب جديد
                </RouterLink>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form @submit.prevent="handleLogin">
                    <div v-if="errorMessage" class="mb-4 p-2 bg-red-100 text-red-700 rounded">
                        {{ errorMessage }}
                    </div>

                    <div class="mt-6">
                        <label for="email" class="block text-sm font-medium leading-5 text-gray-700">
                            البريد الإلكتروني
                        </label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input id="email" v-model="email" name="email" placeholder="user@example.com" type="email" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                        </div>
                    </div>

                    <div class="mt-6">
                        <label for="password" class="block text-sm font-medium leading-5 text-gray-700">
                            كلمة المرور
                        </label>
                        <div class="mt-1 rounded-md shadow-sm">
                            <input id="password" v-model="password" name="password" type="password" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                        </div>
                    </div>

                    <div class="mt-6">
                        <span class="block w-full rounded-md shadow-sm">
                            <button type="submit" :disabled="loading"
                                class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                <span v-if="loading">جاري التحميل...</span>
                                <span v-else>تسجيل الدخول</span>
                            </button>
                        </span>
                    </div>
                </form>

                <div class="mt-4 text-center">
                    <RouterLink to="/manager" class="text-sm text-gray-600 hover:text-gray-900">
                        تسجيل الدخول كمدير
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
    loading.value = true;
    errorMessage.value = '';

    try {
        const result = await authStore.login(email.value, password.value);
        
        if (result.success) {
            router.push('/hotels');
        } else {
            errorMessage.value = result.message || 'فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.';
        }
    } catch (error) {
        errorMessage.value = 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا.';
        console.error('Login error:', error);
    } finally {
        loading.value = false;
    }
};
</script>