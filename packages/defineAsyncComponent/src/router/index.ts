import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

let routes: RouteRecordRaw[] = [
  {
    path: "/home",
    name: "home",
    meta: {},
    component: () => import("@/views/home.vue"),
  },
  {
    path: "/foo",
    name: "foo",
    meta: {},
    component: () => import("@/views/foo.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "home",
    meta: {},
    component: () => import("@/views/home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((_to, _form, next) => {
  //在父应用上运行
  // 跳转自己的页面直接跳转
  next();
});

export default router;
