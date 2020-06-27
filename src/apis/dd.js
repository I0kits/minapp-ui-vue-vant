import _ from 'lodash';
import * as ding from 'dingtalk-jsapi';

import conf from '../conf';

const status = { ready: false };

const jsApiList = [
  'runtime.info',
  'biz.util.ut',
  'biz.map.view',
  'biz.ding.post',
  'biz.util.open',
  'biz.map.locate',
  'biz.map.search',
  'biz.alipay.pay',
  'biz.ding.create',
  'biz.util.encrypt',
  'biz.util.decrypt',
  'biz.util.scanCard',
  'biz.cspace.preview',
  'biz.cspace.saveFile',
  'biz.telephone.call',
  'device.nfc.nfcWrite',
  'device.base.getUUID',
  'device.geolocation.get',
  'biz.chat.toConversation',
  'biz.contact.createGroup',
  'biz.chat.openSingleChat',
  'device.geolocation.stop',
  'device.geolocation.start',
  'device.base.getInterface',
  'biz.clipboardData.setData',
  'biz.util.uploadAttachment',
  'biz.cspace.chooseSpaceDir',
  'biz.chat.pickConversation',
  'biz.contact.complexPicker',
  'biz.telephone.checkBizCall',
  'biz.telephone.showCallMenu',
  'biz.telephone.quickCallList',
  'biz.chat.chooseConversationByCorpId',
  'runtime.permission.requestOperateAuthCode',
];

const init = (resolve) => {
  status.ready = true;

  // disable right menu
  ding.biz.navigation.setRight({ show: false, control: false });

  resolve(status);
};

export default {
  init() {
    return new Promise((resolve, reject) => {
      try {
        ding.ready(init(resolve));
      } catch (err) {
        reject(status);
      }
    });
  },
  getAuthCode(corpId) {
    return ding.runtime.permission.requestAuthCode({ corpId });
  },
  configJsPermission(config) {
    ding.config({ ...config, jsApiList });
  },
  currentPosition() {
    return new Promise((resolve, onFail) => {
      const onSuccess = (dat) => {
        if (dat.errorCode > 0) return onFail(dat.errorMessage);
        if (!_.isEmpty(dat.address)) return resolve(dat.address);
        return resolve(`${dat.province}${dat.city}${dat.district}${dat.road}`);
      };

      ding.device.geolocation.get({
        onFail,
        onSuccess,
        coordinate: 1,
        useCache: true,
        targetAccuracy: 500,
        withReGeocode: true,
      });
    });
  },
  choosePosition(latitude, longitude) {
    return new Promise((onSuccess, onFail) => {
      ding.biz.map.locate({
        latitude, longitude, onSuccess, onFail,
      });
    });
  },
  chooseUsers(title, opts) {
    return new Promise((onSuccess, onFail) => {
      ding.biz.contact.complexPicker({
        title,
        onFail,
        onSuccess,
        maxUsers: 200,
        multiple: true,
        pickedUsers: [],
        requiredUsers: [],
        disabledUsers: [],
        corpId: conf.corpId,
        appId: conf.agentId,
        pickedDepartments: [],
        responseUserOnly: true,
        disabledDepartments: [],
        requiredDepartments: [],
        ...opts,
      });
    });
  },
  createChatGroup(users) {
    return new Promise((onSuccess, onFail) => {
      ding.biz.contact.createGroup({
        users, onFail, onSuccess, corpId: conf.corpId,
      });
    });
  },
};
