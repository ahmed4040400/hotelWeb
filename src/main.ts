import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";
import HotelListing from "./pages/HotelListing.vue";
import { createRouter, createWebHistory } from "vue-router";
import ManagerDashboard from "./pages/admin/ManagerDashboard.vue";
import Reservations from "./pages/admin/Reservations.vue";
import GuestRegister from "./pages/GuestRegister.vue";
import GuestLogin from "./pages/GuestLogin.vue";
import AdminRegister from "./pages/admin/ManagerRegister.vue";
import AdminLogin from "./pages/admin/managerLogin.vue";
import { useAuthStore } from "./stores/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: GuestLogin,
    meta: { requiresGuest: true }
  },
  {
    path: "/register",
    name: "register",
    component: GuestRegister,
    meta: { requiresGuest: true }
  },
  {
    path: "/hotels",
    name: "hotels",
    component: HotelListing,
    meta: { requiresAuth: true }
  },
  {
    path: "/managerDashboard",
    name: "dashboard",
    component: ManagerDashboard,
    meta: { requiresManager: true }
  },
  {
    path: "/manager",
    name: "adminlogin",
    component: AdminLogin,
    meta: { requiresGuest: true }
  },
  {
    path: "/managerregister",
    name: "adminregister",
    component: AdminRegister,
    meta: { requiresGuest: true }
  },
  {
    path: "/reservation",
    name: "reservation",
    component: Reservations,
    meta: { requiresManager: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/');
  }
  
  // Check if route requires manager role
  if (to.meta.requiresManager && (!authStore.isAuthenticated || !authStore.isManager)) {
    return next('/');
  }
  
  // Check if route requires guest (non-authenticated)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // Redirect to appropriate dashboard based on role
    return next(authStore.isManager ? '/managerDashboard' : '/hotels');
  }
  
  next();
});

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
