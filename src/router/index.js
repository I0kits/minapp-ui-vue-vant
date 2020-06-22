import Vue from 'vue';
import VueRouter from 'vue-router';
// import VueWechatTitle from 'vue-wechat-title';

import Main from '../views/Main.vue';

Vue.use(VueRouter);
// Vue.use(VueWechatTitle);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/Report.vue'),
  },
];

const router = new VueRouter({
  routes,
  mode: 'hash',
  base: process.env.BASE_URL,
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.title) document.title = to.meta.title;
//   next();
// });

export default router;
