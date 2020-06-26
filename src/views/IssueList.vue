<template>
  <div class="issue-list">
    <van-button type="primary" icon="add-o" @click="onReportNewIssue">
      报告新问题
    </van-button>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="下拉加载更多"
        @load="onLoad">
        <van-grid direction="horizontal" :column-num="1">
          <van-grid-item v-for="item in list" :key="item.id"
                         icon="photo-o" :text="item.desc" to="/issue-detail" >
          </van-grid-item>
        </van-grid>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="less">
.issue-list {
  text-align: left;
}
</style>

<script>
import {
  Button, Icon, List, PullRefresh, Cell, Grid, GridItem,
} from 'vant';

const issueList = [
  { desc: '漂浮垃圾11', time: '2020-06-26 22:22:22', submitter: '王小二' },
  { desc: '漂浮垃圾22', time: '2020-06-25 22:22:22', submitter: '李磊' },
  { desc: '漂浮垃圾33', time: '2020-06-24 22:22:22', submitter: '张三' },
  { desc: '漂浮垃圾11', time: '2020-06-26 22:22:22', submitter: '王小二' },
  { desc: '漂浮垃圾22', time: '2020-06-25 22:22:22', submitter: '李磊' },
  { desc: '漂浮垃圾33', time: '2020-06-24 22:22:22', submitter: '张三' },
  { desc: '漂浮垃圾11', time: '2020-06-26 22:22:22', submitter: '王小二' },
  { desc: '漂浮垃圾22', time: '2020-06-25 22:22:22', submitter: '李磊' },
  { desc: '漂浮垃圾33', time: '2020-06-24 22:22:22', submitter: '张三' },
];

export default {
  components: {
    [List.name]: List,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  data() {
    return {
      myTitle: '河湖问题列表',
      list: issueList,
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
        this.list = issueList;
        this.refreshing = false;
      }
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
    onReportNewIssue() {
      this.$router.push('/report');
    },
  },
};

</script>
