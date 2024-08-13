<template>
  <nav class="navbar navbar-expand-lg navbar-dark menu-bg">
    <div class="container-fluid">
      <img src="~@/assets/img/limonist.png" alt="Home" height="30" class="me-2"> <!-- Replace with your image path -->

      <div @click="$emit('toggleSidebar')" class=" me-2">
        <i class="text-secondary bi" :class="isCollapsed ? 'bi-arrow-right-square ' : 'bi-arrow-left-square'"></i>
      </div>

      <!-- Search form -->
      <form class="d-flex ms-auto">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        >
        <button class="btn btn-outline-light" type="submit">
          <i class="bi bi-search"></i>
        </button>
      </form>

      <!-- Dropdown -->
      <div class="dropdown">
        <button class="btn btn-primary-outline dropdown-toggle text-secondary" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: transparent; border: none; color: white;">
          Colony Menu
        </button>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="#">Update Profile</a></li>
          <li><a class="dropdown-item" href="#">Log out</a></li>
        
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import '../assets/css/Navbar.css'
export default {
  name: 'NavbarComp',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
