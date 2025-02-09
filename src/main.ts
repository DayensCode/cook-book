import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/styles/main.scss'
import 'vue3-carousel/carousel.css'

createApp(App).use(router).use(ElementPlus).mount('#app')
