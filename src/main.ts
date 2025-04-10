import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/styles/main.scss'
import 'vue3-carousel/carousel.css'

import { getCurrentUser, initializeUsers } from './helpers/authorization'
import { createPinia } from 'pinia'

initializeUsers();

const globalState = reactive({
  isAuthorized: false,
  isAdmin: false,
  user: null as any,
});

const currentUser = getCurrentUser();
if (currentUser) {
  globalState.isAuthorized = true;
  globalState.isAdmin = currentUser.isAdmin || false;
  globalState.user = currentUser;
}

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.provide("globalState", globalState);
app.mount('#app')
