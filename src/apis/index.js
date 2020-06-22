import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import * as dd from 'dingtalk-jsapi';

import request from './request';

// const getAuthCode2 = (corpId) => {
//   console.log('call int getAuthCode:', corpId);
//
//   dd.runtime.permission.requestAuthCode({ corpId })
//     .then((dat) => {
//       console.log('get auth code:', dat);
//       return `THEN: ${JSON.stringify(dat)}`;
//     })
//     .catch((err) => {
//       console.log('got error:', err);
//       return `CATCH: ${JSON.stringify(err)}`;
//     });
// };

const getAuthCode = (corpId) => {
  console.log('call int getAuthCode:', corpId);
  return dd.runtime.permission.requestAuthCode({ corpId });
};

const fetchUserInfo = (dat) => {
  console.log('call int fetchUserInfo:', dat.code, request);
  // return request.get('/user', { params: { code: dat.code } });
  return Promise.resolve({ name: 'Rex' });
};

export default {
  getUserInfo: (id) => from(getAuthCode(id)).pipe(concatMap(fetchUserInfo)),
};
