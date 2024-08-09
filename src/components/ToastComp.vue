<template>
    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div v-for="toast in toasts" :key="toast.id" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">{{ toast.title }}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" @click="removeToast(toast.id)"></button>
        </div>
        <div class="toast-body">
          {{ toast.message }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        toasts: [],
      };
    },
    methods: {
      addToast(title, message) {
        const id = Date.now();
        this.toasts.push({ id, title, message });
        setTimeout(() => {
          this.removeToast(id);
        }, 5000);
      },
      removeToast(id) {
        this.toasts = this.toasts.filter(toast => toast.id !== id);
      },
    },
  };
  </script>
  
  <style scoped>
  .toast-container {
    z-index: 1050;
  }
  </style>
  