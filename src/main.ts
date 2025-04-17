import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/styles/main.scss'
import 'vue3-carousel/carousel.css'

import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.mount('#app')
