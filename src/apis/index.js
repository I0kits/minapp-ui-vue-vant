import _ from 'lodash';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import dd from './dd';
import conf from '../conf';
import request from './request';

const hasError = ({ data }) => {
  if (_.isUndefined(data)) {
    return true;
  }
  return _.has(data, 'error');
};

const sign = (url) => request.post('/sign', { url });
const getUserData = (dat) => request.get('/user', { params: { code: dat.code } });
const getUserInfo = (corpId) => from(dd.getAuthCode(corpId)).pipe(concatMap(getUserData));

export default {
  sign,
  getUserInfo,
  init: dd.init,
  loadUserInfo() {
    return new Promise((resolve, reject) => {
      getUserInfo(conf.corpId).toPromise().catch(reject).then((resp) => {
        if (hasError(resp)) reject(resp);
        resolve(resp);
      });
    });
  },
  configJsApis(url) {
    return new Promise((resolve, reject) => {
      sign(url).catch(reject).then((dat) => {
        dd.configJsPermission(dat.data.data);
      });
    });
  },
  createIssue(issue) {
    return request.post('/issues', issue);
  },
};
