import Vue from 'vue';
import VueRouter from 'vue-router';
import VueWechatTitle from 'vue-wechat-title';

import Main from '../views/Main.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);
Vue.use(VueWechatTitle);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: { title: '河湖管理' },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { title: '河湖管理' },
  },
  {
    path: '/about',
    name: 'About',
    meta: { title: '问题位置定位' },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
  mode: 'hash',
  base: process.env.BASE_URL,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title;
  next();
});

export default router;
