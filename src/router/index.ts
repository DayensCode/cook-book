import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainPage from "../views/MainPage.vue";
import RecipeCollections from "../views/RecipeCollections.vue";
import SavedRecipes from "../views/SavedRecipes.vue";
import Authorization from "../views/Authorization.vue";
import TheHeader from "@/components/TheHeader.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: TheHeader,
    children: [
      {
        path: "",
        name: "MainPage",
        component: MainPage,
      },
      {
        path: "/recipe-collections",
        name: "RecipeCollections",
        component: RecipeCollections,
      },
      {
        path: "/saved-recepies",
        name: "SavedRecipes",
        component: SavedRecipes,
      },
    ],
  },
  {
    path: "/authorization",
    name: "Authorization",
    component: Authorization,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
