<template>
    <div id="app">
    
        <div class="mb-3" style="border: 1px solid #ddd; padding: 20px; max-width: 600px; width: 100%;background: #fff;border-radius: 8px;">
            <form @submit.prevent="submitForm">
                <div class="mb-3">
                    <label for="company_name" class="form-label">Company Name</label>
                    <input type="text" id="company_name" v-model="form.company_name" class="form-control" required />
                </div>
                <div class="mb-3">
                    <label for="logo" class="form-label">Logo</label>
                    <div v-if="form.logo">
                        <div class="photo-area">
                            <div class="polaroid">
                                <div class="img-container" @click="toggler = !toggler">
                                    <img :src="'https://panel.dinelim.ai/uploads/' + form.logo" class="image"
                                        style="width:100%" />
                                </div>
                                <div class="container">
                                    <i class="bi bi-trash3" @click="resetFile"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="file-upload">
                            <span><b>Upload Logo</b></span>
                            <label for="file-upload" class="custom-file-upload">
                                <i class="bi bi-upload"></i>
                                <div>Upload</div>
                                <span>The file type can only be .jpg, .jpeg, and .png.</span>
                            </label>
                            <input type="file" id="file-upload" @change="onFileChangeLogo" accept="image/*" />
                        </div>
                    </div>
                </div>
                <input type="hidden" v-model="form.user_id" />
                <div class="d-flex justify-content-end">
  <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update' : 'Submit' }}</button>
                </div>
              
            </form>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { useCompanyStore } from '@/stores/companyStore';
import { toast } from "vue3-toastify";
export default {
    name: 'SettingsComp',
    setup() {
        const authStore = useAuthStore();
        const compStore = useCompanyStore();

        const userId = computed(() => authStore.user?.id || null);
        const form = ref({
            company_name: '',
            logo: '',
            user_id: userId.value,
        });
        const toggler = ref(false);
        const isEditing = ref(false);

        onMounted(async () => {
            if (userId.value) {
                try {
                    const response = await axios.get(`https://panel.dinelim.ai/api/company/${userId.value}`);
                    if (response.data) {
                        form.value = response.data[0];
                        isEditing.value = true;
                    }
                } catch (error) {
                    console.error('Error fetching company data:', error);
                }
            }
        });

        const submitForm = async () => {
            try {
                const url = isEditing.value
                    ? `https://panel.dinelim.ai/api/company/${form.value.id}`
                    : 'https://panel.dinelim.ai/api/company';
                const method = isEditing.value ? 'put' : 'post';
                const response = await axios({ method, url, data: form.value });
                compStore.setCompData(response.data.logo)
                toast.success("Company Informations Updated Successfully!");
            } catch (error) {
                console.error('There was an error submitting the form:', error);
            }
        };

        const onFileChangeLogo = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.post("https://panel.dinelim.ai/api/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                form.value.logo = response.data.filePath;
            } catch (error) {
                console.error("File upload error:", error);
            }
        };

        const resetFile = () => {
            form.value.logo = '';
        };

        return {
            form,
            submitForm,
            onFileChangeLogo,
            resetFile,
            toggler,
            isEditing,
            compStore
        };
    },
};
</script>