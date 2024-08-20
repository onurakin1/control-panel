import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

// Import Components
import HomeComp from '@/views/HomeComp.vue';
import GroupBranchComp from "@/views/BranchGroupComp.vue";
import ProductManagement from "@/views/Product/CategoryMenu.vue";
import CategoryMenuDetails from "@/views/Product/CategoryMenuDetails.vue";
import SettingsComp from "@/views/Settings.vue";
import TemplateSettings from "@/views/TemplateSettings.vue";
import TemplateList from '@/views/Templates/TemplateList.vue';
import Register from '@/views/Auth/Register.vue';
import Login from '@/views/Auth/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Template_List',
    component: TemplateList,
    meta: { requiresAuth: true }, 
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: HomeComp,
    meta: { requiresAuth: true },
  },
  {
    path: '/branch',
    name: 'GroupBranch',
    component: GroupBranchComp,
    meta: { requiresAuth: true },
  },
  {
    path: '/product/:id',
    name: 'ProductManagement',
    component: ProductManagement,
    meta: { requiresAuth: true },
  },
  {
    path: '/category-menu/:id',
    name: 'CategoryMenuDetails',
    component: CategoryMenuDetails,
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsComp,
    meta: { requiresAuth: true },
  },
  {
    path: '/template-settings',
    name: 'Template_Settings',
    component: TemplateSettings,
    meta: { requiresAuth: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Giriş yapılmamış kullanıcıları login sayfasına yönlendirme
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
