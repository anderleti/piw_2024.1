import { createApp } from 'vue'
<<<<<<< HEAD
=======
import { createPinia } from 'pinia'
>>>>>>> d473681 (Entrega 05: Página de login e cadastro OK)
import App from './App.vue'
import { router } from './router'

import './assets/main.css'
import './assets/nav-bar.css'

<<<<<<< HEAD
createApp(App).use(router).mount('#app')
=======
const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app');
>>>>>>> d473681 (Entrega 05: Página de login e cadastro OK)
