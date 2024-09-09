<template>
    <div class="auth-container d-flex flex-column justify-content-center align-items-center">
        <div class="auth-form">
            <div class="d-flex justify-content-center">
                <img src="https://panel.dinelim.ai/uploads/images/1723724999_Limonist-Meta.png"
                    style="max-width: 300px;" />
            </div>

            <h2>Login to AI</h2>
            <form @submit.prevent="login">
                <div class="form-group">
                    <input v-model="email" class="auth-form-input mt-3" type="email" id="email" placeholder="E-mail"
                        required />
                </div>
                <div class="form-group">
                    <input v-model="password" class="auth-form-input mt-3" type="password" id="password"
                        placeholder="Password" required />
                </div>
                <button type="submit" class="login-ai-btn mt-3">
                    <a-spin :spinning="loading" :indicator="indicator"></a-spin>
                    <div v-if="loading" class="spinner-overlay"></div>
                    <span class="text">Login</span>
                </button>
                <div class="mt-3 redirect-area">
                    Don't have an account? <router-link to="/register" role="button">Sign Up</router-link>
                </div>
            </form>
            <div v-if="successMessage != null" class="mb-3">
                <a-space direction="vertical" style="width: 100%">
                    <a-alert :message="successMessage" type="success" show-icon />
                </a-space>
            </div>
            <div v-if="error" class="error">{{ error }}</div>
        </div>
    </div>
</template>

<script>
import { ref, defineComponent, h } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/authStore';
import { useCompanyStore } from '@/stores/companyStore';
import { useTempStore } from '@/stores/tempStore';
import "@/assets/css/views/Auth.css"

export default defineComponent({
    name: "AuthLogin",
    setup() {
        const authStore = useAuthStore();
        const compStore = useCompanyStore();
        const tempStore = useTempStore();
        const loading = ref(false);
        const router = useRouter();
        const indicator = h(LoadingOutlined, {
            style: {
                fontSize: '24px',
            },
            spin: true,
        });

        const successMessage = ref(null);
        const email = ref('');
        const password = ref('');
        const error = ref(null);

        const login = async () => {
            loading.value = true;
            try {
                const response = await axios.post('https://panel.dinelim.ai/api/login', {
                    email: email.value,
                    password: password.value,
                });

                if (response.data.token && response.data.user) {
                    authStore.setAuthData(response.data.token, response.data.user, response.data.company, response.data.template);
                    compStore.setCompData(response.data.company);
                    tempStore.setTempData(response.data.template);
                    error.value = null;

                    if (response.data.company) {
                        router.push({ name: 'Dashboard' });
                    } else {
                        router.push({ name: 'WizardTemplate' });
                    }

                    console.log('User Info:', response.data.user);
                } else {
                    error.value = 'Invalid response from server. Please try again later.';
                }
            } catch (err) {
                error.value = 'Login failed. Please check your credentials.';
            } finally {
                loading.value = false; // End loading
            }
        };

        return {
            authStore,
            compStore,
            tempStore,
            loading,
            indicator,
            successMessage,
            email,
            password,
            error,
            login,
            router
        };
    },
    created() {
        this.successMessage = this.$route.query.success || null;
    },
});
</script>