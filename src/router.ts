import { createRouter, createWebHistory } from 'vue-router'
import Authorization from './views/Authorization.vue'
import MainPage from './views/MainPage.vue'
import RecipeCollections from './views/RecipeCollections.vue'
import SavedRecepies from './views/SavedRecipes.vue'
import type {RouteRecordRaw} from 'vue-router'
import TheHeader from './components/TheHeader.vue'

// Определяем маршруты с типами
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: TheHeader,
    children: [
      {
        path: '',
        name: 'MainPage',
        component: MainPage,
      },
      {
        path: '/recipe-collections',
        name: 'RecipeCollections',
        component: RecipeCollections,
      },
      {
        path: '/saved-recepies',
        name: 'SavedRecepies',
        component: SavedRecepies,
      },
    ],
  },
  {
    path: '/authorization',
    name: 'Authorization',
    component: Authorization,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
