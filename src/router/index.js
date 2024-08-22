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
import WizardTemplate from '@/views/Templates/Wizard/WizardTemplate.vue';
import Register from '@/views/Auth/Register.vue';
import Login from '@/views/Auth/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Template_List',
    component: TemplateList,
    meta: {
      requiresAuth: true, 
      breadcrumb: [
        { name: 'Template List' }
      ]
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: HomeComp,
    meta: {
      requiresAuth: true, 
      breadcrumb: [
        { name: 'Dashboard' }
      ]
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsComp,
    meta: {
      requiresAuth: true, 
      breadcrumb: [
        { name: 'Settings' }
      ]
    },
  },
  {
    path: '/branch',
    name: 'GroupBranch',
    component: GroupBranchComp,
    meta: {
      requiresAuth: true, 
      breadcrumb: [
        { name: 'Branch' }
      ]
    },
  },
  {
    path: '/category/:id',
    name: 'ProductManagement',
    component: ProductManagement,
    meta: {
      requiresAuth: true, 
      breadcrumb: [
        { name: 'Branch', link:'/branch' },
        { name: 'Category' }
      ]
    },
  },
  {
    path: '/category-details/:id',
    name: 'CategoryMenuDetails',
    component: CategoryMenuDetails,
    meta: {
      requiresAuth: true, 
      breadcrumb: [
        { name: 'Branch', link:'/branch' },
        { name: 'Category', link:'/category/:id' },
        { name: 'Category Details' }
      ]
    },
  },
  {
    path: '/template-settings',
    name: 'Template_Settings',
    component: TemplateSettings,
    meta: { requiresAuth: true },
  },
  {
    path: '/wizard-template',
    name: 'WizardTemplate',
    component: WizardTemplate,
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.checkTokenExpiry();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.name === 'Login' && authStore.isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
