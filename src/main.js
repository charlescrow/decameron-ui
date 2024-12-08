import { createApp } from 'vue'
import App from './views/App.vue'
import axios from 'axios'
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.css';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

axios.defaults.baseURL = 'http://localhost:8001/api';
axios.defaults.withCredentials = true;

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(Vue3Toastify);
app.use(router); 
app.mount('#app');