<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 text-secondary sidebar-bg vh-100" :class="{ 'collapsed': isCollapsed }"
    id="sidebar">
    <a href="/"
      class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-secondary text-decoration-none w-100 justify-content-center company-logo">
      <img src="../assets/img/colony.png" alt="Logo" class="rounded-circle"
        :style="{ width: isCollapsed ? '40px' : '60px', height: isCollapsed ? '40px' : '60px' }">
      <!-- Replace with your image path -->
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/" class="nav-link text-secondary">
          <i class="bi bi-house fs-4"></i>
          <span class="ms-2 nav-text" :class="{ 'd-none': isCollapsed }">Dashboard</span>
        </router-link>
      </li>
      <li>
        <a href="#submenu1" data-bs-toggle="collapse" class="nav-link text-secondary">
          <i class="bi bi-person-fill fs-4"></i>
          <span class="ms-2 nav-text" :class="{ 'd-none': isCollapsed }">User Information</span>
        </a>

      </li>

      <li>
        <a href="#submenu2" data-bs-toggle="collapse" class="nav-link text-secondary">
          <i class="bi bi-window-stack fs-4"></i>
          <span class="ms-2 nav-text" :class="{ 'd-none': isCollapsed }">POP-UP Management</span>
        </a>

      </li>

      
      <li>
        <router-link to="/branch" class="nav-link text-secondary">
          <i class="bi bi-window-stack fs-4"></i>
          <span class="ms-2 nav-text" :class="{ 'd-none': isCollapsed }">Branch management</span>
        </router-link>


      </li>
      <li>
        <a href="#" class="nav-link text-secondary">
          <i class="bi bi-card-image fs-4"></i>
          <span class="ms-2 nav-text" :class="{ 'd-none': isCollapsed }">Banner Management</span>
        </a>
      </li>
      <li>
        <router-link to="/settings" class="nav-link text-secondary">
          <i class="bi bi-gear fs-4"></i>
          <span class="ms-2 nav-text" :class="{ 'd-none': isCollapsed }">Settings</span>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
import '../assets/css/Sidebar.css'
export default {
  name: 'SidebarComp',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
};
</script>


<style></style>