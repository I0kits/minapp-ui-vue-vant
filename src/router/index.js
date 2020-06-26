import Vue from 'vue';
import VueRouter from 'vue-router';
import VueWechatTitle from 'vue-wechat-title';

// import Main from '../views/Main.vue';
import Report from '../views/Report.vue';
import IssueList from '../views/IssueList.vue';
import IssueDetail from '../views/IssueDetail.vue';

Vue.use(VueRouter);
Vue.use(VueWechatTitle);

const routes = [
  // {
  //   path: '/',
  //   name: 'Main',
  //   component: Main,
  //   meta: { title: '' },
  // },
  {
    path: '/report',
    name: 'Report',
    component: Report,
    meta: { title: '问题提交' },
    // component: () => import('../views/Report.vue'),
  },
  {
    alias: '/',
    path: '/issue-list',
    name: 'IssueList',
    component: IssueList,
    meta: { title: '问题列表' },
    // component: () => import('../views/IssueList.vue'),
  },
  {
    path: '/issue-detail',
    name: 'IssueDetail',
    component: IssueDetail,
    meta: { title: '问题详情' },
    // component: () => import('../views/IssueDetail.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { title: '我的任务' },
    component: () => import('../views/Profile.vue'),
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
