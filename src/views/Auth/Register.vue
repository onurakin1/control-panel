<template>
    <div class="auth-container d-flex flex-column justify-content-center align-items-center">
        <div class="auth-form">
            <h2>Create an account</h2>
            <form @submit.prevent="register">

                <div class="form-group">

                    <input v-model="name" class="auth-form-input mt-3" type="text" id="name" placeholder="Name"
                        required />
                </div>
                <div class="form-group">

                    <input v-model="email" class="auth-form-input mt-3" type="email" id="email" placeholder="E-Mail"
                        required />
                </div>
                <div class="form-group">

                    <input v-model="password" class="auth-form-input mt-3" type="password" id="password"
                        placeholder="Password" required />
                </div>
                <div class="form-group">

                    <input v-model="password_confirmation" class="auth-form-input mt-3" type="password"
                        id="password_confirmation" placeholder="Confirm Password" required />
                </div>
                <button type="submit" class="login-ai-btn mt-3"><span class="text">Register</span></button>
                <div class="mt-3 redirect-area">Do you have an account? <router-link to="/login" role="button">Log
                        in</router-link></div>
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
    name: "AuthRegister",
    setup() {
        const authStore = useAuthStore();
        return {
            authStore,
        };
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            error: null,
        };
    },
    methods: {
        async register() {
            try {
                const response = await axios.post('https://panel.dinelim.ai/api/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                });
                if (response.data.token && response.data.user) {
                    this.error = null;
                        this.$router.push({ name: 'Login', query: { success: "User was created! Please log in with your email and password. " }});
                } else {
                    this.error = 'Invalid response from server. Please try again later.';
                }
      
          
            } catch (err) {
                this.error = 'Registration failed. Please try again.';
            }
        },
    },
};
</script>