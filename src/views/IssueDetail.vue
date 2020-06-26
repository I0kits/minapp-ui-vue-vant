<template>
  <div class="issueDetail">
    <van-collapse v-model="issueInfo">
      <van-collapse-item title="问题基本情况" name="1">
        <van-cell>
          <template slot="title">
            <div align="left" class = "textQ">问题所在位置：</div>
            <div align="left" class = "textA">北京市朝阳区</div>
          </template>
        </van-cell>
        <van-cell>
          <template slot="title">
            <div align="left" class = "textQ">对应河湖：</div>
            <div align="left" class = "textA">长江流域村田河地杨村段</div>
          </template>
        </van-cell>
        <van-cell>
          <template slot="title">
            <div align="left" class = "textQ">问题类型：</div>
            <div align="left" class = "textA">污染问题</div>
          </template>
        </van-cell>
        <van-cell>
          <template slot="title">
            <div align="left" class = "textQ">问题描述：</div>
            <div align="left" class = "textA">河面有垃圾存在</div>
          </template>
        </van-cell>
        <van-cell>
          <template slot="title">
            <div align="left" class = "textQ">处理方式：</div>
            <div align="left" class = "textA">上报河长</div>
          </template>
        </van-cell>
        <van-cell>
          <template slot="title">
            <div align="left" class = "textQ">是否通知相关人员：</div>
            <div align="left" class = "textA">已通知</div>
          </template>
        </van-cell>
        <van-cell>
          <template slot="title">
            <div align="left" class = "textQ">问题照片：</div>
            <van-grid :border="false" :column-num="3">
              <van-grid-item>
                <van-image width="80" height="80" :src="require('../assets/heliu3.jpg')" />
              </van-grid-item>
              <van-grid-item>
                <van-image width="80" height="80" :src="require('../assets/heliu4.jpg')" />
              </van-grid-item>
              <van-grid-item>
                <van-image width="80" height="80" :src="require('../assets/heliu5.jpg')" />
              </van-grid-item>
            </van-grid>
          </template>
        </van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-steps direction="vertical" :active="2">
      <van-step>
          <h3>【张三】巡河人员</h3>
          <p>上报问题(已提交)</p>
          <p>2020-06-27 12:40</p>
      </van-step>
      <van-step>
          <h3>【李四】河长办</h3>
          <p>转发问题(已处理)</p>
          <p>2020-06-28 10:00</p>
      </van-step>
      <van-step>
          <h3>【王五】县水利局</h3>
          <p>受理问题(处理中)</p>
          <p>2020-06-29 09:30</p>
      </van-step>
    </van-steps>
    <div style="margin: 16px;">
      <van-button round block type="primary" to="/issue-list">
        返回
      </van-button>
    </div>
  </div>
</template>

<style scoped lang="less">
  .textA{
    padding-left: 17px;
    font-weight:bold;
  }
  .textQ{
    padding-left: 17px;
    font-weight:bold;
    color:#AAAAAA;
  }
</style>

<script>
import {
  Button, Icon, List, PullRefresh, Cell, Grid, GridItem, Image, Collapse, CollapseItem, Steps, Step,
} from 'vant';

export default {
  components: {
    [List.name]: List,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Steps.name]: Steps,
    [Step.name]: Step,
  },
  data() {
    return {
      myTitle: '河湖问题详情',
      issueInfo: ['1'],
      issueProcess: ['2'],
    };
  },
  methods: {
    onLoad() {
    },
    onRefresh() {

    },
  },
};

</script>
