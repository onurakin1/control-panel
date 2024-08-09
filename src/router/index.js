// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import HomeComp from '@/views/HomeComp.vue';  
import GroupBranchComp from "@/views/BranchGroupComp.vue"
import ProductManagement from "@/views/Product/CategoryMenu.vue"
import CategoryMenuDetails from "@/views/Product/CategoryMenuDetails.vue"
import SettingsComp from "@/views/Settings.vue"
import TemplateSettings from "@/views/TemplateSettings.vue"
import TemplateList from '@/views/Templates/TemplateList.vue';

const routes = [
  {
    path: '/',
    name: 'Template_List',
    component: TemplateList,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeComp,
  },
 
  {
    path: '/branch',
    name: 'GroupBranch',
    component: GroupBranchComp,
  },
  {
    path: '/product/:id',
    name: 'ProductManagement',
    component: ProductManagement,
  },
  {
    path: '/category-menu/:id',
    name: 'CategoryMenuDetails',
    component: CategoryMenuDetails,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsComp,
  },
  {
    path: '/template-settings',
    name: 'Template_Settings',
    component: TemplateSettings,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
