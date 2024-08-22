<template>
  <div id="app">
    <div v-if="authStore.isAuthenticated">
      <NavbarComp v-if="!isWizardPage" :isCollapsed="isSidebarCollapsed" @toggleSidebar="toggleSidebar" />
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div v-if="!isWizardPage" class="col-auto px-0" :class="{ 'collapsed': isSidebarCollapsed }">
            <SidebarComp :isCollapsed="isSidebarCollapsed" />
          </div>
          <div class="col" style="background: whitesmoke;" :class="{ 'expand': isSidebarCollapsed }">
            <BreadCrumb v-if="!isWizardPage" class="mt-3" />
            <router-view></router-view>
            <ToastComp ref="toast" />
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import NavbarComp from './components/NavbarComp.vue';
import SidebarComp from './components/SidebarComp.vue';
import BreadCrumb from './components/BreadCrumb.vue';
import ToastComp from './components/ToastComp.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  components: {
    NavbarComp,
    SidebarComp,
    BreadCrumb,
    ToastComp,
  },
  setup() {
    const authStore = useAuthStore();
    const route = useRoute();

    const isWizardPage = computed(() => route.path.startsWith('/wizard'));

    return { authStore, isWizardPage };
  },
  data() {
    return {
      isSidebarCollapsed: false,
    };
  },
  methods: {
    showToast(title, message) {
      this.$refs.toast.addToast(title, message);
    },
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
  },
};
</script>
