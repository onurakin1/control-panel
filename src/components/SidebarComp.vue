<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 text-secondary sidebar-bg vh-100"
    :class="{ 'collapsed': isCollapsed }" id="sidebar">
    <router-link to="/dashboard"
      class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-secondary text-decoration-none w-100 justify-content-center company-logo">
      <img :src="'https://panel.dinelim.ai/uploads/' + compStore.company" alt="Logo" class="rounded-circle"
        :style="{ width: isCollapsed ? '40px' : '60px', height: isCollapsed ? '40px' : '60px' }">
      <!-- Replace with your image path -->
    </router-link>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link text-secondary">
          <span class="material-symbols-outlined">
            browse
          </span>
          <span class="ms-2 nav-text" :class="{ 'd-none': isCollapsed }">{{ $t('controlPanel') }}</span>
        </router-link>
      </li>
      <li>
        <a href="#submenu1" data-bs-toggle="collapse" class="nav-link text-secondary">
          <span class="material-symbols-outlined">
            person
          </span>
          <span class="ms-2 nav-text" :class="{ 'd-none': isCollapsed }">{{ $t('userInformation') }}</span>
        </a>

      </li>

      <li>
        <a href="#submenu2" data-bs-toggle="collapse" class="nav-link text-secondary">
          <span class="material-symbols-outlined">
            ad_group
          </span>
          <span class="ms-2 nav-text" :class="{ 'd-none': isCollapsed }">{{ $t('popupManagement') }}</span>
        </a>

      </li>


      <li>
        <router-link to="/branch" class="nav-link text-secondary">
          <span class="material-symbols-outlined">
            home_work
          </span>
          <span class="ms-2 nav-text" :class="{ 'd-none': isCollapsed }">{{ $t('branchManagement') }}</span>
        </router-link>


      </li>
      <li>
        <a href="#" class="nav-link text-secondary">
          <span class="material-symbols-outlined">
            tab
          </span>
          <span class="ms-2 nav-text" :class="{ 'd-none': isCollapsed }">{{ $t('bannerManagement') }}</span>
        </a>
      </li>
      <li>
        <router-link to="/settings" class="nav-link text-secondary">
          <span class="material-symbols-outlined">
            manufacturing
          </span>
          <span class="ms-2 nav-text" :class="{ 'd-none': isCollapsed }">{{ $t('settings') }}</span>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>

import { useCompanyStore } from '@/stores/companyStore';
import '../assets/css/Sidebar.css'
export default {
  name: 'SidebarComp',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  setup() {

    const compStore = useCompanyStore();
    return {

      compStore
    };
  },
};
</script>


<style></style>