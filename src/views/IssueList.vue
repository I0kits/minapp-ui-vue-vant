<template>
  <div class="list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </van-pull-refresh>
    <van-button type="info">加载更多</van-button>
  </div>
</template>

<style scoped lang="less">
</style>

<script>
import {
  Button, Icon, List, PullRefresh
} from 'vant';

export default {
  components: {
    [List.name]: List,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [PullRefresh.name]: PullRefresh,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    onLoad() {
      // setTimeout(() => {
      //   if (this.refreshing) {
      //     this.list = [];
      //     this.refreshing = false;
      //   }
      //   this.list.push(1);
      //   this.loading = false;
      //
      //   this.finished = true;
      // }, 1000);
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      this.list.push(1);
      this.loading = false;
      this.finished = true;
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};

</script>
