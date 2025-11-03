import { createRouter, createWebHistory, isNavigationFailure } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { isNavigation: true },
  },
  {
    path: "/market",
    name: "Market",
    component: () => import("@/views/MarketView.vue"),
    meta: { isNavigation: true },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
    meta: { isNavigation: true },
  },
  {
    path: "/contact",
    name: "Contact",
    component: HomeView,
    meta: { isNavigation: true },
  },
    {
    path: "/my-basket",
    name: "My Basket",
    component: () => import("@/views/MyBasket.vue"),
  },
]
});

export default router;
