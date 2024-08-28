<template>
    <div id="app">
        <div class="mb-3" style="border: 1px solid #ddd; padding: 20px; max-width: 600px; width: 100%;">
            <form @submit.prevent="submitForm">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" id="name" v-model="form.name" class="form-control" required />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" id="email" v-model="form.email" class="form-control" required />
                </div>

                <!-- Yeni Parola Alanı -->
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" v-model="form.password" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="password_confirmation" class="form-label">Confirm Password</label>
                    <input type="password" id="password_confirmation" v-model="form.password_confirmation"
                        class="form-control" />
                </div>

                <input type="hidden" v-model="form.user_id" />
                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { toast } from "vue3-toastify";

export default {
    name: 'UpdateProfile',
    setup() {
        const authStore = useAuthStore();

        const userId = computed(() => authStore.user?.id || null);
        const form = ref({
            name: '',
            user_id: userId.value,
            email: '',
            password: '',  // Yeni şifre alanı
            password_confirmation: ''  // Yeni şifre doğrulama alanı
        });

        onMounted(async () => {
            if (userId.value) {
                try {
                    const response = await axios.get(`https://panel.dinelim.ai/api/user/${userId.value}`);
                    if (response.data) {
                        form.value.name = response.data[0].name;
                        form.value.email = response.data[0].email;
                        form.value.password = response.data[0].password;
                        // Kullanıcı bilgileri mevcut ise formu doldur
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        });

        const submitForm = async () => {
            try {
                const url = `https://panel.dinelim.ai/api/user/${form.value.user_id}`;
                const method = 'put';
                const response = await axios({ method, url, data: form.value });
                console.log(response);
                toast.success("User Information Updated Successfully!");
            } catch (error) {
                console.error('There was an error submitting the form:', error);
            }
        };

        return {
            form,
            submitForm
        };
    },
};
</script>
