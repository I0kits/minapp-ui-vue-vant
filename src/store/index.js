import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: 'Guest',
      avatar: 'https://tva3.sinaimg.cn/crop.2.2.363.363.180/c23430b4tw1el1fpw55y8j20a70a73zt.jpg',
    },
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
