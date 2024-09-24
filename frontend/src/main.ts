import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'

import './assets/main.css'
import './assets/nav-bar.css'

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app');
