<template>
    <div class="auth-container d-flex flex-column justify-content-center align-items-center">
        <div class="auth-form">
            <div class="d-flex justify-content-center">
                <img src="https://panel.dinelim.ai/uploads/images/1723724999_Limonist-Meta.png" style="max-width: 300px;"/>
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
                <button type="submit" class="login-ai-btn mt-3"><span class="text">Login</span></button>
                <div class="mt-3 redirect-area">Don't have an account? <router-link to="/register" role="button">Sign
                        Up</router-link></div>
            </form>
            <div v-if="error" class="error">{{ error }}</div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import "@/assets/css/views/Auth.css"
export default {
    name: "AuthLogin",
    setup() {
        const authStore = useAuthStore();

        return {
            authStore
        };
    },
    data() {
        return {
            email: '',
            password: '',
            error: null,
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('https://panel.dinelim.ai/api/login', {
                    email: this.email,
                    password: this.password,
                });
                this.authStore.setAuthData(response.data.token, response.data.user);
                this.error = null;

                this.$router.push({ name: 'Dashboard' });
                console.log('User Info:', response.data.user);
            } catch (err) {
                this.error = 'Login failed. Please check your credentials.';
            }
        },
    },
};
</script>