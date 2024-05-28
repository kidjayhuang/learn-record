import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

setTimeout(() => {
  router.addRoute(
    {
      path: '/about',
      name: 'about',
      component: () => import('about_exposes/AboutView.vue'),
    },
  );
}, 1000);

export default router;
