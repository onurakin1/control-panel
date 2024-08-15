<template>
  <nav class="navbar navbar-expand-lg navbar-dark menu-bg">
    <div class="container-fluid">
      <img src="https://panel.dinelim.ai/uploads/images/1723724999_Limonist-Meta.png" alt="Home" height="50" class="me-2">

      <div @click="$emit('toggleSidebar')" class="me-2">
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
          {{ authStore.getUser.name }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="#">Update Profile</a></li>
          <li><a class="dropdown-item" href="#" @click="logout">Log out</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

export default {
  name: 'NavbarComp',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const logout = async () => {
      try {

        await axios.post('https://panel.dinelim.ai/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        // Redirect to login page
        router.push({ name: 'Login' });

        // Clear auth data
        authStore.clearAuthData();

        console.log('Logout successful');
      } catch (err) {
        console.error('Logout failed:', err);
      }
    };

    return {
      logout,
      authStore,
    };
  },
};
</script>
