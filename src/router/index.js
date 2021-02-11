import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Neewsfeed",
    component: () => import("@/views/Neewsfeed.vue"),
  },
  {
    path: "/watchlist",
    name: "Watchlist",
    component: () => import("@/views/Watchlist.vue"),
  },
  {
    path: "/article",
    name: "Article",
    component: () => import("@/views/Article.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
