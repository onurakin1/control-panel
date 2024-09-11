<template>
  <div class="container my-4 p-4 bg-white border rounded shadow-sm">
    <form ref="mainFormCategory" @submit.prevent="saveExcel" class="d-flex flex-column flex-md-row align-items-center gap-3 excel-file">
      <input type="file" name="select-category-files" class="form-control" @change="handleFileUpload" />
      <label class="btn btn-primary">
        Upload File
        <input type="submit" style="display: none;" />
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
import { toast } from "vue3-toastify";
import { useAuthStore } from '@/stores/authStore';

export default {
  setup() {
    const authStore = useAuthStore();
    const mainFormCategory = ref(null);
    const file = ref(null);

    const saveExcel = async () => {
      const formData = new FormData();
      if (file.value) {
        formData.append('file', file.value);
      } else {
        toast.error("Please select a file");
        return;
      }

      try {
        const response = await axios.post('https://panel.dinelim.ai/api/import-category', formData);
        if (response.status === 200) {
          toast.success("Categories and Products imported successfully");
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error("You have uploaded before or an error occurred");
      }
    };

    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
    };

    const exportExcel = () => {
      window.location.href = 'https://panel.dinelim.ai/api/export-category-products';
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
