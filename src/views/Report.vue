<template>
  <div class="report">
    <van-form @submit="onSubmit">
      <!-- position 问题所在位置由地图定位选择后填入-->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <div align="left" style="padding-left: 17px;">位置：</div>
          <van-field
            v-model="position"
            offset="0"
            name="position"
            clearable
            right-icon="location-o"
            @click-right-icon="onLocationClicked"
            placeholder="问题所在位置"
            :rules="[{ required: true, message: '问题所在位置必须填写.' }]">
          </van-field>
        </template>
      </van-cell>

      <!--riverAddress 问题河流对应村落地址-->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <div align="left" style="padding-left: 17px;">对应河湖：</div>
          <van-field
            readonly
            clickable
            name="riverPicker"
            :value="riverName"
            placeholder="点击选择对应河湖"
            @click="showRiver = true"></van-field>

          <van-popup v-model="showRiver" position="bottom">
            <van-picker
              show-toolbar
              :columns="riverList"
              @confirm="onRiverConfirm"
              @cancel="showRiver = false"></van-picker>
          </van-popup>
        </template>
      </van-cell>

      <!--issuePic 问题图片上传-->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <div align="left" style="padding-left: 17px;">问题图片：</div>
          <van-field name="uploader">
            <template #input>
              <van-uploader v-model="images" />
            </template>
          </van-field>
        </template>
      </van-cell>

      <!--issueType 问题类型下拉选择-->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <div align="left" style="padding-left: 17px;">问题类型：</div>
          <van-field
            readonly
            clickable
            name="issueTypeName"
            :value="issueTypeName"
            placeholder="点击选择问题类型"
            @click="showIssueType = true"></van-field>
          <van-popup v-model="showIssueType" position="bottom">
            <van-picker
              show-toolbar
              :columns="issueTypeList"
              @change="onIssueChange"
              @confirm="onIssueConfirm"
              @cancel="showIssueType = false"></van-picker>
          </van-popup>
        </template>
      </van-cell>

      <!--issueDesc 问题描述用户输入-->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <div align="left" style="padding-left: 17px;">问题描述：</div>
          <van-field
            rows="2"
            autosize
            clearable
            name="issueDesc"
            type="textarea"
            maxlength="100"
            show-word-limit
            v-model="issueDesc"
            placeholder="请输入问题描述"></van-field>
        </template>
      </van-cell>

      <!--processType 处理方式单项选择-->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <div align="left" style="padding-left: 17px;">处理方式：</div>
          <van-field name="processType" >
            <template #input>
              <van-radio-group v-model="processType" direction="horizontal">
                <van-radio name="1">自行处理</van-radio>
                <van-radio name="2">上报河长</van-radio>
                <van-radio name="3">转交他人</van-radio>
                <van-radio name="4">河长协调</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </template>
      </van-cell>

      <!--notifyOthers 是否通知相关上下游人员,选择是则会出发建群操作-->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <div align="left" style="padding-left: 17px;">是否通知相关人员：</div>
          <van-field name="notifyOthers" >
            <template #input>
              <van-radio-group v-model="notifyOthers" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </template>
      </van-cell>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <div style="margin: 16px;">
      <van-button round block type="primary" @click="goList">
        返回
      </van-button>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>

<script>
// import _ from 'lodash';
import {
  Button, Form, Cell, Field, Picker, Popup, Uploader, RadioGroup, Radio, Checkbox, CheckboxGroup,
} from 'vant';

import dd from '../apis/dd';

const issueTypes = {
  水面水体问题: ['1漂浮垃圾', '1河底垃圾', '1水体异味', '1颜色异常'],
  排污问题: ['2漂浮垃圾', '2河底垃圾', '2水体异味', '2颜色异常'],
  岸线四乱: ['3漂浮垃圾', '3河底垃圾', '3水体异味', '3颜色异常'],
  设施问题: ['4漂浮垃圾', '4河底垃圾', '4水体异味', '4颜色异常'],
  非法行为: ['5漂浮垃圾', '5河底垃圾', '5水体异味', '5颜色异常'],
};

export default {
  name: 'Report',
  data() {
    return {
      position: '',
      latitude: 0,
      longitude: 0,

      riverName: '',
      showRiver: false,
      riverList: ['村田河地杨村段', '下梅溪地杨村段', '梅宁河地杨村段'],
      images: [],

      issueTypeName: '',
      showIssueType: false,
      issueTypeList: [{ values: Object.keys(issueTypes) }, { values: issueTypes['水面水体问题'] }],

      issueDesc: '',
      processType: '',
      notifyOthers: false,
    };
  },
  computed: {
  },
  mounted() {
    setTimeout(this.fetchCurrentPosition, 500);
  },
  components: {
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Popup.name]: Popup,
    [Radio.name]: Radio,
    [Field.name]: Field,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Checkbox.name]: Checkbox,
    [Uploader.name]: Uploader,
    [RadioGroup.name]: RadioGroup,
    [CheckboxGroup.name]: CheckboxGroup,
  },
  methods: {
    fetchCurrentPosition() {
      this.position = '定位中....';
      dd.currentPosition().then((dat) => {
        const { errorCode, errorMessage } = dat;
        if (errorCode > 0) {
          this.position = `定位失败：[${errorCode}] - ${errorMessage}`;
          return;
        }

        this.latitude = dat.latitude;
        this.longitude = dat.longitude;
        this.position = `${dat.address}`;
      }).catch((err) => {
        this.position = `ERR - ${JSON.stringify(err)}`;
      });
    },
    onSubmit(values) {
      console.log('submit', values);
      // TODO: save data to [SERVER]

      // if (this.notifyOthers) {
      //   dd.createChatGroup([]).then((ret) => {
      //     const chatGroupId = ret.id;
      //     this.errorMessage = `Got Chat Group: ${chatGroupId}`;
      //   }).catch((err) => {
      //     this.errorMessage = err;
      //   });
      // }
      // this.goList();
    },
    onIssueConfirm(value) {
      this.showIssueType = false;
      this.issueTypeName = value.join(',');
    },
    onIssueChange(picker, values) {
      picker.setColumnValues(1, issueTypes[values[0]]);
    },
    onRiverConfirm(value) {
      this.riverName = value;
      this.showRiver = false;
    },
    onRiverChange(value) {
      this.riverName = value;
    },
    goList() {
      this.$router.push('/issue-list');
    },
    onLocationClicked() {
      dd.choosePosition(this.latitude, this.longitude)
        .then((dat) => {
          this.latitude = dat.latitude;
          this.longitude = dat.longitude;
          this.position = `${dat.title}`;
        })
        .catch((err) => {
          this.position = `ERR - ${JSON.stringify(err)}`;
        });
    },
    onNotifyOthersChange(name) {
      this.notifyOthers = parseInt(name, 10) === 0;
    },
  },
};
</script>
