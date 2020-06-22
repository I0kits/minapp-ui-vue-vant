<template>
  <div class="report">
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="position"
          name="position"
          label="位置"
          placeholder="问题所在位置"
          :rules="[{ required: true, message: '问题所在位置必须填写.' }]">
        </van-field>

        <van-field
          v-model="name"
          name="name"
          label="名称"
          placeholder="对应河湖名称"
          :rules="[{ required: true, message: '河湖名称必须填写.' }]">
        </van-field>
      </van-cell-group>

      <van-cell-group>
        <van-field name="uploader" label="问题图片">
          <template #input>
            <van-uploader v-model="images" />
          </template>
        </van-field>

        <van-field
          readonly
          clickable
          name="picker1"
          :value="issueType"
          label="问题类型"
          placeholder="点击选择问题类型"
          @click="showPicker = true"></van-field>

        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="issueTypes"
            @confirm="onConfirm"
            @cancel="showPicker = false"></van-picker>
        </van-popup>

        <van-field
          rows="2"
          autosize
          label="问题描述"
          type="textarea"
          maxlength="100"
          show-word-limit
          v-model="issueDesc"
          placeholder="请输入问题描述"></van-field>

        <van-field name="processType" label="处理方式">
          <template #input>
            <van-radio-group v-model="processType" direction="horizontal">
              <van-radio name="1">自行处理</van-radio>
              <van-radio name="2">上报河长</van-radio>
              <van-radio name="3">转交他人</van-radio>
              <van-radio name="4">河长协调</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>

      <van-field name="pingOthers" label="复选框">
        <template #input>
          <van-checkbox v-model="pingOthers" shape="square">是否通知相关人员？</van-checkbox>
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped lang="less">
</style>

<script>
import {
  Button, Icon, Form, Field, Cell, CellGroup, TreeSelect, Picker, Popup, Uploader,
  RadioGroup, Radio, Checkbox, CheckboxGroup,
} from 'vant';

export default {
  name: 'Report',
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Popup.name]: Popup,
    [Radio.name]: Radio,
    [Field.name]: Field,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Checkbox.name]: Checkbox,
    [Uploader.name]: Uploader,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [TreeSelect.name]: TreeSelect,
    [CheckboxGroup.name]: CheckboxGroup,
  },
  data() {
    return {
      name: '',
      position: '',
      images: [],
      issueDesc: '',
      issueType: '',
      issueTypeValue: '',

      processType: '',
      pingOthers: false,

      showPicker: false,
      issueTypes: ['水面问题', '水体问题', '其它问题'],
      categoryValues: [
        { id: 10, text: '漂浮辣椒', category: '水面问题' },
        { id: 11, text: '漂浮辣椒', category: '水面问题' },
        { id: 12, text: '漂浮辣椒', category: '水面问题' },
        { id: 20, text: '颜色异常', category: '水体问题' },
        { id: 21, text: '不明液体', category: '水体问题' },
        { id: 22, text: '其它水体问题', category: '水体问题' },
        { id: 30, text: '异常问题1', category: '其它问题' },
        { id: 31, text: '不明问题2', category: '其它问题' },
        { id: 32, text: '其它不明问题', category: '其它问题' },
      ],
    };
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
      this.$router.push('/');
    },
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.issueType = value;
      this.showPicker = false;
    },
  },
};
</script>
