<template>
  <div id="app">
 
    <div v-if="authStore.isAuthenticated">
      <NavbarComp :isCollapsed="isSidebarCollapsed" @toggleSidebar="toggleSidebar" />
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col-auto px-0" :class="{'collapsed': isSidebarCollapsed}">
            <SidebarComp :isCollapsed="isSidebarCollapsed" />
          </div>
          <div class="col py-3" style="background: whitesmoke;" :class="{'expand': isSidebarCollapsed}">
            <BreadCrumb />
      
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
    return { authStore };
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

<style>
.expand {
  transition-delay: 250ms;
  transition-property: margin-right;
}

.collapsed {
  width: 60px !important;
  transition: width 0.3s ease; 
}

#sidebar:not(.collapsed) {
  width: 250px;
  transition: width 0.3s ease; 
}
</style>
