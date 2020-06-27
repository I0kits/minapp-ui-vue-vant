import Vue from 'vue';
import Vuex from 'vuex';

import _ from 'lodash';
import apis from '../apis';

Vue.use(Vuex);

const issueTypeNames = [
  { text: '设施问题', children: [{ text: '设施问题A' }, { text: '设施问题B' }] },
  { text: '非法行为', children: [{ text: '非法行为I' }, { text: '非法行为II' }] },
  { text: '排污问题', children: [{ text: '漂浮垃圾' }, { text: '河底垃圾' }, { text: '水体异味' }] },
  { text: '岸线四乱', children: [{ text: '岸线四乱1' }, { text: '岸线四乱2' }, { text: '岸线四乱2' }] },
  { text: '水面水体问题', children: [{ text: '水体异味' }, { text: '颜色异常' }, { text: '河底垃圾' }] },
];

export default new Vuex.Store({
  state: {
    issueTypeNames,
    user: {
      userid: 0,
      name: 'Guest',
      avatar: 'https://tva3.sinaimg.cn/crop.2.2.363.363.180/c23430b4tw1el1fpw55y8j20a70a73zt.jpg',
    },
    riverNameList: ['村田河地杨村段', '下梅溪地杨村段', '梅宁河地杨村段'],
    issues: [
      {
        id: 1,
        images: [],
        processType: 0,
        submitter: '王孟',
        riverName: '村田河',
        notifyOthers: true,
        desc: '水面有漂浮物垃圾',
        chatGroupId: undefined,
        position: '高新区科技7路16号',
        time: '2020-06-27 12:22:54',
        issueTypeName: '非法行为, 水体异味',
      }, {
        id: 2,
        images: [],
        processType: 1,
        submitter: '李磊',
        riverName: '梅宁河',
        notifyOthers: true,
        desc: '河岸四处都有生活垃圾',
        chatGroupId: undefined,
        position: '高新区科技7路16号',
        time: '2020-06-25 10:12:22',
        issueTypeName: '排污问题, 漂浮垃圾',
      }, {
        id: 3,
        images: [],
        processType: 2,
        submitter: '张峰',
        riverName: '下梅溪',
        notifyOthers: true,
        chatGroupId: undefined,
        desc: '有工厂在私自排污',
        position: '高新区科技7路16号',
        time: '2020-06-25 10:12:22',
        issueTypeName: '水面水体问题, 颜色异常',
      },
    ],
  },
  mutations: {
    onUserInfoUpdated(state, usr) {
      state.user = { ...state.user, ...usr };
    },
    onAddNewIssue(state, issue) {
      state.issues = [issue].concat(state.issues);
    },
  },
  actions: {
    createIssue(context, payload) {
      const { otherUsers, ...dat } = payload;
      dat.releUsers = [context.state.user.userid, ..._.map(otherUsers, 'emplId')];

      return new Promise((resolve, reject) => {
        apis.createIssue(dat).catch(reject).then((resp) => {
          const { chatid, id } = resp.data;
          context.commit('onAddNewIssue', { ...payload, id, chatGroupId: chatid });
          resolve();
        });
      });
    },
  },
  modules: {
  },
});
