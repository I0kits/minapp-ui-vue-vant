<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-icon name="chat-o" badge="9" size="80" />
    <br/>
    <van-button loading type="info" loading-text="加载中..."/>
    <van-button type="info" @click="backToHome">返回</van-button>
  </div>
</template>

<script>
import { Button, Icon } from 'vant';

export default {
  name: 'About',
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
  },
  methods: {
    backToHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="less">
  .about {
    button {
      margin: 5px 5px;
    }
  }
</style>
