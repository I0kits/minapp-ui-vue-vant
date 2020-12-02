<template>
  <div class="issue-list">
    <van-button type="primary" icon="add-o" @click="onReportNewIssue">
      报告新问题
    </van-button>
    <!--van-pull-refresh v-model="refreshing" @refresh="onRefresh"></van-pull-refresh-->
    <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
      <van-grid direction="horizontal" :column-num="1" icon-size="38px">
        <van-cell v-for="item in items" :key="item.id" :label="item.submitter"
            icon="location-o" :title="item.desc" is-link value="详情" to="/issue-detail">
        </van-cell>
      </van-grid>
    </van-list>
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

export default {
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [List.name]: List,
    [Grid.name]: Grid,
    [Button.name]: Button,
    [GridItem.name]: GridItem,
    [PullRefresh.name]: PullRefresh,
  },
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      list: this.$store.state.issues,
    };
  },
  computed: {
    items() {
      return this.list.map((issue) => {
        const { id, riverName, submitter } = issue;
        return {
          id,
          desc: `${riverName}，${issue.desc}`,
          submitter: `提交人：${submitter} ${issue.time}`,
        };
      });
    },
  },
  methods: {
    onLoad() {
      if (this.refreshing) {
        // this.$store.state.issues.push(this.localData('get', 'report', null));
        this.refreshing = false;
        this.list = this.$store.state.issues;
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
