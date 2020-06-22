<template>
  <div class="profile">
    <h3>My Tasks Page.</h3>
    <p>TODO...</p>
    <van-icon name="chat-o" badge="9" size="80"></van-icon>
    <van-button type="info" @click="backToHome">返回</van-button>
  </div>
</template>

<style scoped lang="less">
</style>

<script>
import { Button, Icon } from 'vant';

export default {
  name: 'Profile',
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
  },
  data() {
    return {
    };
  },
  methods: {
    backToHome() {
      this.$router.push('/');
    },
  },
};
</script>
