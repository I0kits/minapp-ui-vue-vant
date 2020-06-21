<template>
  <div id="app">
    <div id="nav" v-if="!ready" v-bind:class="{ error: hasErrors }">
      <p>{{status}}</p>
      <p v-if="hasErrors">
        Please contact <a href="mailto:wangwii@foxmail.com">Administrator</a>
      </p>
    </div>
    <router-view v-wechat-title="$route.meta.title" v-if="ready"/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#nav {
  padding: 30px;
  background-color: #42b983;
}

.error {
  color: #fff;
  background-color: #ee0a24 !important;

  a {
    color: #fff !important;
    font-weight: bold !important;
  }
}

</style>

<script>
import * as dd from 'dingtalk-jsapi';

import conf from './conf';
import Apis from './apis';

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      ready: false,
      hasErrors: true,
      status: 'Not in DingTalk environment!',
    };
  },
  mounted() {
    if (conf.disableDingTalk) {
      this.skipEnvCheck();
    } else {
      dd.ready(this.initDingtalkEnv);
    }
  },
  methods: {
    skipEnvCheck() {
      this.ready = true;
      this.hasErrors = false;
      this.status = 'Skip runtime env check...';
    },
    initDingtalkEnv() {
      // disable right menu
      dd.biz.navigation.setRight({ show: false, control: false });

      // reset error styles.
      this.hasErrors = false;
      this.status = 'Loading user information...';

      // loading the user information
      Apis.getUserInfo(conf.corpId).subscribe((dat) => {
        this.status = `INFO: ${JSON.stringify(dat.data)}`;
      }, (err) => {
        this.status = `ERRO: ${JSON.stringify(err)}`;
      });
    },
  },
};
</script>
