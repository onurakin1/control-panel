<template>
  <div class="container my-4 p-4 bg-white border rounded shadow-sm">
    <form ref="mainFormCategory" class="d-flex flex-column flex-md-row align-items-center gap-3 excel-file">
      

        <input type="file"  name="select-category-files" class="form-control" @change="handleFileUpload" />

      <label class="btn btn-primary">
        Upload File
        <input type="submit" style="display: none;" @click.prevent="saveExcel" />
      </label>
    </form>
    <div class="mt-3">
      <button @click="exportExcel" class="btn btn-success">
        Download Excel
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

export default {
  setup() {
    const authStore = useAuthStore();
    const mainFormCategory = ref(null);
    const file = ref(null);

    const saveExcel = async () => {
      const formData = new FormData(mainFormCategory.value);
      formData.append('file', file.value);

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/import-category', formData);
        console.log(response);
      } catch (error) {
        console.error('Hata:', error);
      }
    };

    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
    };

    const exportExcel = () => {
      window.location.href = 'http://127.0.0.1:8000/api/export-users';
    };

    return {
      authStore,
      mainFormCategory,
      saveExcel,
      handleFileUpload,
      exportExcel,
    };
  },
};
</script>

<style scoped>
/* Adjust padding and margin for responsive design */
.container {
  max-width: 600px;
}

.excel-file input[type="file"] {
  display: block;
}

@media (max-width: 576px) {
  .form-control {
    width: 100%;
  }

  .btn {
    width: 100%;
  }
}
</style>
