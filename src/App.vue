<template>
  <div id="app">
    <div id="tips" v-if="!ready" v-bind:class="{ error: hasErrors }">
      <p>{{status}}</p>
      <p v-if="hasErrors">
        Please contact <a href="mailto:wangwii@foxmail.com">Administrator</a>
      </p>
    </div>
    <van-nav-bar v-if="ready" @click-right="onClickRight">
      <template #right>
        用户名｜<van-image round width="40px" height="40px" name="icon" :src="icon"></van-image>
      </template>
    </van-nav-bar>
    <div v-if="ready" class="van-hairline--bottom"></div>
    <router-view v-if="ready"/>
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

#tips {
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
import { NavBar, Image } from 'vant';

import conf from './conf';
import Apis from './apis';

export default {
  name: 'App',
  components: {
    [Image.name]: Image,
    [NavBar.name]: NavBar,
  },
  data() {
    return {
      ready: false,
      hasErrors: true,
      status: 'Not in DingTalk environment!',

      icon: 'https://tva3.sinaimg.cn/crop.2.2.363.363.180/c23430b4tw1el1fpw55y8j20a70a73zt.jpg',
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
        this.ready = true;
      }, (err) => {
        this.status = `ERRO: ${JSON.stringify(err)}`;
      });
    },
    onClickRight() {
      if (this.$route.path === '/profile') return;
      this.$router.push('/profile');
    },
  },
};
</script>
