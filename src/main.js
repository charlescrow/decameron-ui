import { createApp } from 'vue'
import App from './views/App.vue'
import axios from 'axios'
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.css';

axios.defaults.baseURL = 'http://localhost:8001/api';

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(router); 
app.mount('#app');