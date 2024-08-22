<template>
    <div class="autocomplete">
      <div class="autocomplete-input">
        <input v-model="searchQuery" @input="filterRoutes" placeholder="Search" />
        <span class="material-symbols-outlined search-icon">search</span>
      </div>
      <ul v-if="filteredRoutes.length > 0" class="autocomplete-suggestions">
        <li v-for="route in filteredRoutes" :key="route.path" @click="selectRoute(route)">
          {{ formatBreadcrumb(route.meta.breadcrumb) }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  // Router'ı al ve route'ları getir
  const router = useRouter();
  const routes = router.getRoutes();
  
  // Arama sorgusu ve filtrelenmiş route'lar için state
  const searchQuery = ref('');
  const filteredRoutes = ref([]);
  
  // Route'ları filtreleme fonksiyonu
  const filterRoutes = () => {
    if (searchQuery.value) {
      filteredRoutes.value = routes.filter(route =>
        route.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    } else {
      filteredRoutes.value = [];
    }
  };
  
  // Seçilen route'a yönlendirme fonksiyonu
  const selectRoute = (route) => {
    router.push(route.path);
    searchQuery.value = ''; // Arama terimini temizle
    filteredRoutes.value = []; // Önerileri temizle
  };
  
  // Breadcrumb'ları formatlama fonksiyonu
  const formatBreadcrumb = (breadcrumbs) => {
  // Ensure breadcrumbs is an array or return an empty string if undefined
  if (!Array.isArray(breadcrumbs)) {
    return '';
  }
  return breadcrumbs.map(breadcrumb => breadcrumb.name).join(' > ');
};
  </script>
  
  <style scoped>
  .autocomplete {
    position: relative;
    max-width: 100%;
    margin: auto;
    padding: 0 10px;
  }
  
  .autocomplete-input {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .autocomplete-input input {
    width: 100%;
    padding: 5px 40px 5px 40px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    box-sizing: border-box;
    outline: none; /* Remove default focus outline */
  }
  
  .autocomplete-input input:focus {
    border-color: gray;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1); 
  }
  
  .autocomplete-input .search-icon {
    position: absolute;
    left: 12px; /* Align icon to the left */
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #aaa;
  }
  
  .autocomplete-suggestions {
    position: absolute;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    max-height: 200px;
    overflow-y: auto;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    margin-top: 2px;
    padding: 0;
  }
  
  .autocomplete-suggestions li {
    list-style-type: none;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .autocomplete-suggestions li:hover {
    background-color: #f5f5f5;
  }
  
  .autocomplete-suggestions li:nth-child(odd) {
    background-color: #f9f9f9;
  }
  
  /* Responsive design for smaller screens */
  @media (max-width: 600px) {
    .autocomplete {
      padding: 0 5px;
    }
  
    .autocomplete-input input {
      padding: 10px 30px 10px 30px; /* Adjusted padding for smaller screens */
    }
  
    .autocomplete-input .search-icon {
      left: 8px;
      font-size: 14px;
    }
  
    .autocomplete-suggestions {
      max-height: 150px;
    }
  
    .autocomplete-suggestions li {
      padding: 8px;
    }
  }
  </style>
  