import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

// Import Components
import HomeComp from '@/views/HomeComp.vue';
import GroupBranchComp from "@/views/BranchGroupComp.vue";
import ProductManagement from "@/views/Product/CategoryMenu.vue";
import CategoryMenuDetails from "@/views/Product/CategoryMenuDetails.vue";
import SettingsComp from "@/views/Settings.vue";
import AccountSettings from "@/views/User/User.vue"
import TemplateList from '@/views/Templates/TemplateList.vue';
import WizardTemplate from '@/views/Templates/Wizard/WizardTemplate.vue';
import Register from '@/views/Auth/Register.vue';
import Login from '@/views/Auth/Login.vue';
import UploadCategory from '@/views/Product/UploadCategory.vue';
import UploadMultipleImage from '@/views/images/UploadMultipleImage.vue';

const routes = [
  {
    path: '/template-settings',
    name: 'Template_Settings',
    component: TemplateList,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/',
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
        { name: 'Company Settings' }
      ]
    },
  },
  {
    path: '/import-file',
    name: 'ImportFile',
    component: UploadCategory,
    meta: {
      requiresAuth: true, 
      breadcrumb: [
        { name: 'Import File' }
      ]
    },
  },
  {
    path: '/upload-multiple-image',
    name: 'UploadMultipleImage',
    component: UploadMultipleImage,
    meta: {
      requiresAuth: true, 
      breadcrumb: [
        { name: 'Upload Multiple Image' }
      ]
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: AccountSettings,
    meta: {
      requiresAuth: true, 
      breadcrumb: [
        { name: 'Account Settings' }
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
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.checkTokenExpiry();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.name === 'Login' && authStore.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
