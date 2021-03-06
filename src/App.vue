<template>
  <div id="app">
    <div id="tips" v-if="!ready" v-bind:class="{ error: hasErrors }">
      <p>{{status}}</p>
      <p v-if="hasErrors">
        Please use Dingtalk or contact
        <a href="mailto:wangwii@foxmail.com">Developer.</a>
      </p>
    </div>

    <van-nav-bar v-if="ready" @click-right="onClickRight">
      <template #right>
        {{$store.state.user.name}}｜
        <van-image round width="40px" height="40px" name="icon"
           :src="$store.state.user.avatar">
        </van-image>
      </template>
    </van-nav-bar>

    <div v-if="ready" class="van-hairline--bottom"></div>

    <router-view v-if="ready"></router-view>
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
import { NavBar, Image } from 'vant';

import apis from './apis';
import conf from './conf';

export default {
  name: 'App',
  components: {
    [Image.name]: Image,
    [NavBar.name]: NavBar,
  },
  data() {
    return {
      count: 0,
      ready: false,
      hasErrors: true,
      status: 'Not in DingTalk environment!',
    };
  },
  created() {
    if (conf.disableDingTalk) {
      this.skipEnvCheck();
    } else {
      this.initDingtalkEnv();
    }
  },
  methods: {
    skipEnvCheck() {
      this.ready = true;
      this.hasErrors = false;
      this.status = 'Skip runtime env check...';
    },
    initDingtalkEnv() {
      apis.init().then(() => {
        this.hasErrors = false;
        this.status = 'Loading user information...';
        apis.loadUserInfo().then((usr) => {
          this.$store.commit('onUserInfoUpdated', usr.data);
          this.status = `USR-INFO: ${JSON.stringify(this.$store.state.user)}`;
          this.configJsApisSign(window.location.href);
        }).catch((err) => {
          this.hasErrors = true;
          this.status = `ERR: ${JSON.stringify(err)}`;
        });
      });
    },
    configJsApisSign(url) {
      this.status = 'Setup js-apis permission...';
      const setup = () => apis.configJsApis(url)
        .then((dat) => {
          // this.status = `SIGN-DAT: ${JSON.stringify(dat.data)}`;
          this.status = `Setup js-apis permission done: [${dat.data.jsApiList.length}].`;
        })
        .catch((error) => {
          this.status = `SIGN-ERR: ${JSON.stringify(error)}`;
        });

      setTimeout(setup, 10);
      setTimeout(() => { this.ready = true; }, 3000);
    },
    onClickRight() {
      if (this.$route.path === '/profile') return;
      this.$router.push('/profile');
    },
  },
};
</script>
