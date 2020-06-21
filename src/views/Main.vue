<template>
  <div class="main">
    <h1>The Main Page...</h1>
  </div>
</template>

<style lang="less" scoped>
</style>

<script>
import {
  Button, Icon, Col, Row, Loading,
} from 'vant';

export default {
  name: 'Main',
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Loading.name]: Loading,
  },
  methods: {
  },
  data() {
    return {
    };
  },
  mounted() {
  },
};
</script>
