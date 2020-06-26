import _ from 'lodash';
import * as ding from 'dingtalk-jsapi';

import conf from '../conf';
import apis from './index';

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
  'biz.chat.openSingleChat',
  'device.geolocation.stop',
  'device.geolocation.start',
  'device.base.getInterface',
  'biz.clipboardData.setData',
  'biz.util.uploadAttachment',
  'biz.cspace.chooseSpaceDir',
  'biz.telephone.checkBizCall',
  'biz.telephone.showCallMenu',
  'biz.telephone.quickCallList',
  'biz.chat.pickConversation',
  'biz.chat.chooseConversationByCorpId',
  'runtime.permission.requestOperateAuthCode',
];

const hasError = ({ data }) => {
  if (_.isUndefined(data)) {
    return true;
  }

  if (_.has(data, 'error')) {
    return true;
  }

  return false;
};

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
  configJsApis(url) {
    return new Promise((resolve, reject) => {
      const handle = (dat) => {
        const data = { ...dat.data.data, jsApiList };
        ding.config(data);
        resolve({ data });
      };
      apis.sign(url).then(handle).catch(reject);
    });
  },
  loadUserInfo() {
    return new Promise((resolve, reject) => {
      const handle = (resp) => {
        if (hasError(resp)) reject(resp);
        resolve(resp);
      };
      apis.getUserInfo(conf.corpId).toPromise().then(handle).catch(reject);
    });
  },
  currentPosition() {
    return new Promise((onSuccess, onFail) => {
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
};