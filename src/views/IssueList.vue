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
        <van-grid direction="horizontal" :column-num="1" icon-size="38px">
          <van-cell icon="location-o" v-for="item in list" :key="item"
                   :label="item.submitter" :title="item.desc" is-link value="详情"
                    to="/issue-detail" />
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
  { desc: '水面有漂浮物垃圾', submitter: '提交人：王孟，提交时间：2020-06-27 12:22:54' },
  { desc: '河岸四处都有生活垃圾', submitter: '提交人：李磊，提交时间：2020-06-25 10:12:22' },
  { desc: '有工厂在私自排污', submitter: '提交人：张峰，提交时间：2020-06-24 09:31:13' },
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
      submitterPro: '提交人:',
      list: issueList,
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    onLoad() {
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
