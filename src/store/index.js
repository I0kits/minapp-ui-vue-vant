import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: 'Guest',
      avatar: 'https://tva3.sinaimg.cn/crop.2.2.363.363.180/c23430b4tw1el1fpw55y8j20a70a73zt.jpg',
    },
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
        type: '排污问题, 河底垃圾',
        position: '高新区科技7路16号',
        time: '2020-06-27 12:22:54',
      }, {
        id: 2,
        images: [],
        processType: 1,
        submitter: '李磊',
        riverName: '梅宁河',
        notifyOthers: true,
        desc: '河岸四处都有生活垃圾',
        chatGroupId: undefined,
        type: '排污问题, 河底垃圾',
        position: '高新区科技7路16号',
        time: '2020-06-25 10:12:22',
      }, {
        id: 3,
        images: [],
        processType: 2,
        submitter: '张峰',
        riverName: '下梅溪',
        notifyOthers: true,
        chatGroupId: undefined,
        desc: '有工厂在私自排污',
        type: '排污问题, 河底垃圾',
        position: '高新区科技7路16号',
        time: '2020-06-25 10:12:22',
      },
    ],
  },
  mutations: {
    updateUserInfo(state, dat) {
      Object.assign(state.user, dat);
    },
  },
  actions: {
  },
  modules: {
  },
});
