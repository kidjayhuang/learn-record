import { createRouter, createWebHashHistory, RouteRecordRaw, Router } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useRemoteModules, RemoteModuleTypeEnum } from "@/composables";

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

async function initRemotePages() {
  const { remotePages } = await useRemoteModules({
    type: RemoteModuleTypeEnum.page
  });
  remotePages!.forEach(({ name, url }) => {
    router.addRoute({
      path: `/${name}`,
      name,
      component: () => import(url),
    });
  });
}

function initLocalPages() {
  router.addRoute({
    path: "/about",
    name: "about",
    component: () => import("about_exposes/AboutView.vue"),
  });
}

// initRemotePages()
process.env.NODE_ENV === "production" ? initRemotePages() : initLocalPages();

export default router;
