import Vue from 'vue';
import VueRouter from 'vue-router';
import VueWechatTitle from 'vue-wechat-title';

import Main from '../views/Main.vue';

Vue.use(VueRouter);
Vue.use(VueWechatTitle);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: { title: '' },
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { title: '我的任务' },
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/report',
    name: 'Report',
    meta: { title: '问题提交' },
    component: () => import('../views/Report.vue'),
  },
  {
    path: '/issue-list',
    name: 'IssueList',
    meta: { title: '问题列表' },
    component: () => import('../views/IssueList.vue'),
  },
  {
    path: '/issue-detail',
    name: 'IssueDetail',
    meta: { title: '问题详情' },
    component: () => import('../views/IssueDetail.vue'),
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
