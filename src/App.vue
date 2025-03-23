<template>
  <header
    class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
    <div class="flex items-center gap-8">
      <div class="flex items-center gap-4 text-[#111418]">
        <div class="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
              fill="currentColor"></path>
          </svg>
        </div>
        <h2 class="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">LuxStay</h2>
      </div>
    </div>

    <div v-if="authStore.isAuthenticated" class="flex items-center gap-4">
      <span class="text-sm text-gray-600">مرحباً {{ authStore.user?.name }}</span>
      <button @click="logout" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
        تسجيل الخروج
      </button>
    </div>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  // If user is authenticated, fetch profile data
  if (authStore.isAuthenticated) {
    await authStore.fetchUserProfile();
  }
});

const logout = () => {
  authStore.logout();
  router.push('/');
};
</script>