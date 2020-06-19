<template>
  <div class="home">
    <van-row>
      <van-col span="8">
        1
      </van-col>
      <van-col span="8">
        <img alt="Vue logo" src="../assets/logo.png" />
      </van-col>
      <van-col span="8">
        3
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <hello msg="Hello here, welcom to vue app."/>
      </van-col>
    </van-row>
  </div>
</template>

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
