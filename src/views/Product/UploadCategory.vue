<template>
  <div class="container my-4 p-4 bg-white border rounded shadow-sm">
    <form ref="mainFormCategory" @submit.prevent="saveExcel"
      class="d-flex flex-column flex-md-column align-items-center gap-3 excel-file">
      

      <a-spin :spinning="loading">
        <label for="file-template-upload" class="custom-file-template-upload">
          <i class="bi bi-upload"></i>
          <div>Upload</div>
          <span>The file type can only be .xlsx .xls</span>
     
          <div v-if="file" class="mt-2 text-success">
            {{ file.name }}
          </div>
        </label>
        <input type="file" id="file-template-upload" name="select-category-files" class="form-control"
          @change="handleFileUpload" />
      </a-spin>

      <label class="btn btn-primary">
        Upload File
        <input type="submit" style="display: none;" />
      </label>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { toast } from "vue3-toastify";
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const mainFormCategory = ref(null);
    const router = useRouter(); 
    const file = ref(null);
    const loading = ref(false);

    const saveExcel = async () => {
      const formData = new FormData();
      if (file.value) {
        formData.append('file', file.value);
      } else {
        toast.error("Please select a file");
        return;
      }


      loading.value = true;

      try {
        const response = await axios.post('https://panel.dinelim.ai/api/import-category', formData);
        if (response.status === 200) {
          toast.success("Categories and Products imported successfully");
          router.push('/upload-multiple-image');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error("You have uploaded before or an error occurred");
      } finally {
     
        loading.value = false;
      }
    };

    const handleFileUpload = (event) => {
      file.value = event.target.files[0]; 
    };



    return {
      authStore,
      mainFormCategory,
      saveExcel,
      handleFileUpload,
  
      file,
      loading, 
    };
  },
};
</script>

<style scoped>

.container {
  max-width: 600px;
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
