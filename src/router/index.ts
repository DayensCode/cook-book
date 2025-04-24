import { createRouter, createWebHistory } from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import Authorization from '../views/Authorization.vue'
import MainPage from '../views/MainPage.vue'
import RecipeCollections from '../views/RecipeCollections.vue'
import SavedRecipes from '../views/SavedRecipes.vue'
import TheHeader from '../components/TheHeader.vue'
import SignUp from '../views/SignUp.vue'
import Account from '../views/Account.vue'

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
        path: '/saved-recipes',
        name: 'SavedRecipes',
        component: SavedRecipes,
      },
      {
        path: '/account',
        name: 'Account',
        component: Account,
      },
    ],
  },
  {
    path: '/authorization',
    name: 'Authorization',
    component: Authorization,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
