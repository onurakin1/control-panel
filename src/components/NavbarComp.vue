<template>
  <nav class="navbar navbar-expand-lg navbar-dark menu-bg">
    <div class="container-fluid">
      <img src="https://panel.dinelim.ai/uploads/images/1723724999_Limonist-Meta.png" alt="Home" height="50"
        class="me-2">

      <div @click="$emit('toggleSidebar')" class="me-2">
        <span class="text-secondary material-symbols-outlined">
          {{ isCollapsed ? 'menu_open' : 'menu' }}
        </span>

      </div>

      <!-- Search form -->
      <SearchBar/>

      <!-- Dropdown -->
      <div class="dropdown">
        <button class="btn btn-primary-outline dropdown-toggle text-secondary" type="button" id="navbarDropdown"
          data-bs-toggle="dropdown" aria-expanded="false"
          style="background-color: transparent; border: none; color: white;">
          {{ authStore.getUser.name }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="#">Update Profile</a></li>
          <li><a class="dropdown-item" href="#" @click="logout">Log out</a></li>
        </ul>
      </div>

      <div class="dropdown">
        <button class="btn btn-primary-outline dropdown-toggle text-secondary" type="button" id="navbarDropdown"
          data-bs-toggle="dropdown" aria-expanded="false"
          style="background-color: transparent; border: none; color: white;">
          <span class="flag-icon" :class="`flag-icon-${getFlagIcon(currentLanguage)}`"></span>
          <span class="ms-2">{{ currentLanguage }}</span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <div class="dropdown-item" @click="changeLanguage('en')"><span class="flag-icon flag-icon-gb me-2"></span>
              EN</div>
          </li>
          <li>
            <div class="dropdown-item" @click="changeLanguage('tr')"><span class="flag-icon flag-icon-tr me-2"></span>
              TR</div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import SearchBar from './SearchBar.vue';

export default {
  name: 'NavbarComp',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  components:{
    SearchBar
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { locale } = useI18n();

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

    const changeLanguage = (lang) => {
      locale.value = lang; // Dil değişimini ayarlayın
    };

    const getFlagIcon = (language) => {
      switch (language.toLowerCase()) {
        case 'en':
          return 'gb'; // İngiliz bayrağı
        case 'tr':
          return 'tr'; // Türk bayrağı
        default:
          return 'us'; // Varsayılan bayrak
      }
    };

    // currentLanguage'i computed olarak tanımlayın
    const currentLanguage = computed(() => locale.value.toUpperCase());

    return {
      logout,
      authStore,
      changeLanguage,
      currentLanguage,
      getFlagIcon,
    };
  }
};
</script>
