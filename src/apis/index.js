import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import * as dd from 'dingtalk-jsapi';

import request from './request';

const getAuthCode = (corpId) => dd.runtime.permission.requestAuthCode({ corpId });

const getUserData = (dat) => request.get('/user', { params: { code: dat.code } });

export default {
  sign(url) {
    return request.post('/sign', { url });
  },
  getUserInfo(corpId) {
    return from(getAuthCode(corpId)).pipe(concatMap(getUserData));
  },
};
