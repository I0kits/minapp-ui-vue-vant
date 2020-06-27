import Vue from 'vue';

import store from './store';
import router from './router';
import './registerServiceWorker';

import App from './App.vue';
// import { localData, sessionData } from './store/local';

Vue.config.productionTip = false;
// Vue.prototype.localData = localData;
// Vue.prototype.sessionData = sessionData;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
