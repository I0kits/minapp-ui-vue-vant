<template>
  <div class="home">
    <van-row>
      <van-col span="2">
        1
      </van-col>
      <van-col span="20">
        <img alt="Vue logo" src="../assets/logo.png" />
      </van-col>
      <van-col span="2">
        3
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        {{status}}
      </van-col>
    </van-row>
  </div>
</template>

<style lang="less" scoped>
</style>

<script>
import { Col, Row } from 'vant';
import Hello from '@/components/Hello.vue';

export default {
  name: 'Home',
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Hello.name]: Hello,
  },
};
</script>
