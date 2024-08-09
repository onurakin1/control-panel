<template>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li v-for="(crumb, index) in crumbs" :key="index" class="breadcrumb-item">
          <router-link :to="crumb.route">
            {{ crumb.label }}
          </router-link>
        </li>
      </ol>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'BreadCrumb',
    computed: {
      crumbs() {
        const routes = this.$route.matched;
        return routes.map(route => ({
          label: route.meta.breadcrumb || route.name,
          route: route.path
        })).filter(crumb => crumb.label !== null && crumb.label !== undefined); // Filter out null or undefined labels
      }
    }
  };
  </script>
  
  <style scoped>
  .breadcrumb {
    background-color: #f8f9fa;
    padding: 8px 15px;
    border-radius: 4px;
    margin-bottom: 0;
  }
  
  .breadcrumb-item {
    font-size: 14px;
  }
  
  .breadcrumb-item:not(:last-child) {
    margin-right: 4px;
  }
  
  .breadcrumb-item a {
    color: #6c757d;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  
  .breadcrumb-item a:hover {
    color: #495057;
  }
  
  .breadcrumb-item a i {
    margin-right: 4px;
  }
  </style>
  