import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@popperjs/core';
import { createPinia } from 'pinia';
import CKEditor from '@ckeditor/ckeditor5-vue';
import messages from './locales';
import { ToastifyContainer } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages,
});

const app = createApp(App);
const pinia = createPinia();

app.use(CKEditor);
app.use(router);
app.use(pinia);
app.use(i18n);
app.component('ToastContainer', ToastifyContainer); // Register ToastContainer globally

app.mount('#app');
