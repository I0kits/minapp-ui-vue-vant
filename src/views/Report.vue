<template>
  <div class="report">
    <van-form scroll-to-error @submit="onSubmit" @failed="onInvalid" ref="form">
      <!-- position 问题所在位置由地图定位选择后填入-->
      <van-cell>
        <template slot="title">
          <div align="left" style="padding-left: 17px;">位置：</div>
          <van-field clearable v-model="position" name="position" right-icon="location-o"
             v-bind:placeholder="positionPlaceholder" @click-right-icon="onLocationClicked"
             offset="0" :rules="[{ required: true, message: '问题所在位置必须填写.' }]">
          </van-field>
        </template>
      </van-cell>

      <!--riverAddress 问题河流对应村落地址-->
      <van-cell>
        <template slot="title">
          <div align="left" style="padding-left: 17px;">对应河湖：</div>
          <van-field readonly clickable name="riverName" :value="riverName"
             placeholder="点击选择对应河湖" @click="showRiverSelector = true"
             :rules="[{ required: true, message: '对应河湖名称必须填写.' }]">
          </van-field>
          <van-popup v-model="showRiverSelector" position="bottom">
            <van-picker show-toolbar :columns="riverNames" @confirm="onRiverNameConfirm"
              @cancel="showRiverSelector = false"></van-picker>
          </van-popup>
        </template>
      </van-cell>

      <!--issuePic 问题图片上传-->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <div align="left" style="padding-left: 17px;">问题图片：</div>
          <van-field name="images">
            <template #input><van-uploader v-model="images"></van-uploader></template>
          </van-field>
        </template>
      </van-cell>

      <!--issueType 问题类型下拉选择-->
      <van-cell>
        <template slot="title">
          <div align="left" style="padding-left: 17px;">问题类型：</div>
          <van-field readonly clickable name="issueTypeName" :value="issueTypeName"
             placeholder="点击选择问题类型" @click="showIssueTypeSelector = true"
             :rules="[{ required: true, message: '问题类型必须填写.' }]"></van-field>

          <van-popup v-model="showIssueTypeSelector" position="bottom">
            <van-picker show-toolbar :columns="issueTypes" @confirm="onIssueTypeConfirm"
                @cancel="showIssueTypeSelector = false">
            </van-picker>
          </van-popup>
        </template>
      </van-cell>

      <!--desc 问题描述用户输入-->
      <van-cell>
        <template slot="title">
          <div align="left" style="padding-left: 17px;">问题描述：</div>
          <van-field rows="2" autosize clearable name="desc" type="textarea" maxlength="100"
            show-word-limit v-model="desc" placeholder="请输入问题描述"
            :rules="[{ required: true, message: '问题描述必须填写.' }]">
          </van-field>
        </template>
      </van-cell>

      <!--processType 处理方式单项选择-->
      <van-cell>
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
        <template slot="title">
          <div align="left" style="padding-left: 17px;">是否通知相关人员：</div>
          <van-field name="notifyOthers" >
            <template #input>
              <van-radio-group v-model="notifyOthers" direction="horizontal"
                @change="onNotifyOthersChange">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </template>
      </van-cell>

      <div style="margin: 16px;">
        <van-button round type="primary" size="large" native-type="submit">提交</van-button>
        <van-button round type="default" size="large" @click="goList">取消</van-button>
      </div>
    </van-form>
    <van-overlay :show="submitting">
      <div class="wrapper">
        <van-loading type="spinner" color="#1989fa">正在保存数据...</van-loading>
      </div>
    </van-overlay>
    <div style="margin: 16px;">

    </div>
  </div>
</template>

<style scoped lang="less">
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

<script>
import { mapState } from 'vuex';
import {
  Button, Form, Cell, Field, Picker, Popup, Uploader, RadioGroup, Radio,
  Checkbox, CheckboxGroup, Notify, Overlay, Loading,
} from 'vant';

import dd from '../apis/dd';

export default {
  name: 'Report',
  data() {
    return {
      desc: '',
      images: [],
      position: '',
      riverName: '',
      issueTypeName: '',

      processType: '1',
      notifyOthers: '0',
      otherUserList: [],

      showRiverSelector: false,
      showIssueTypeSelector: false,
      positionPlaceholder: '问题所在位置',

      submitting: false,
    };
  },
  computed: {
    ...mapState({
      user: 'user',
      riverNames: 'riverNameList',
      issueTypes: 'issueTypeNames',
      submitter: ({ user }) => user.name,
    }),
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
    [Notify.name]: Notify,
    [Overlay.name]: Overlay,
    [Loading.name]: Loading,
    [Checkbox.name]: Checkbox,
    [Uploader.name]: Uploader,
    [RadioGroup.name]: RadioGroup,
    [CheckboxGroup.name]: CheckboxGroup,
  },
  methods: {
    fetchCurrentPosition() {
      this.positionPlaceholder = '定位中....';
      dd.currentPosition().then((v) => { this.position = v; }).catch((err) => {
        this.position = `ERR - ${JSON.stringify(err)}`;
      });
    },
    onInvalid(err) {
      Notify({ type: 'danger', message: `${err.errors[0].message}` });
    },
    onSubmit(values) {
      this.$refs.form.validate().then(() => {
        const time = new Date();
        const otherUsers = this.otherUserList;

        const dat = {
          time,
          ...values,
          otherUsers,
          submitter: this.submitter,
        };

        this.submitting = true;
        this.$store.dispatch('createIssue', dat).then(() => {
          this.submitting = false;
          this.goList();
        });
      });
    },
    onIssueTypeConfirm(value) {
      this.issueTypeName = value.join(',');
      this.showIssueTypeSelector = false;
    },
    onRiverNameConfirm(value) {
      this.riverName = value;
      this.showRiverSelector = false;
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
      if (name === '0') {
        this.otherUserList = [];
        return;
      }

      const opts = { requiredUsers: [this.user.userid] };
      const onSelected = ({ users }) => { this.otherUserList = users; };
      const onCancel = () => { this.otherUserList = []; this.notifyOthers = '0'; };

      dd.chooseUsers('请选择相关人', opts).then(onSelected).catch(onCancel);
    },
  },
};
</script>
