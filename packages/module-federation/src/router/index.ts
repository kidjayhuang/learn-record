import { createRouter, createWebHashHistory, RouteRecordRaw, Router } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useRemoteModule, RemoteModuleTypeEnum } from "@/composables";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
