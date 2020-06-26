function localData(method, name, obj) {
  /*
   * 参数说明：
   * method：get获取，set存入或覆盖，clean清除
   * name:localStorage的名称
   * obj:存入的内容，可以是任意类型
   * localStorage.getItem(key):获取指定key本地存储的值
   * localStorage.setItem(key,value)：将value存储到key字段
   * localStorage.removeItem(key):删除指定key本地存储的值
   * this.localData("方法","名字",数据); //使用localStorage进行数据处理
   * this.sessionData("方法","名字",数据);//使用sessionStorage进行数据处理
   * */
  let returnStr="";
  switch (method) {
    case 'get':
      if (localStorage.getItem(`${name}_obj`)) {
        returnStr= JSON.parse(localStorage.getItem(`${name}_obj`));
      } else if (localStorage.getItem(`${name}_str`)) {
        returnStr= localStorage.getItem(`${name}_str`);
      }
      return returnStr;
    case 'set':
      localData('clean', name);
      if (typeof obj == 'object') {
        localStorage.setItem(`${name}_obj`, JSON.stringify(obj));
      } else {
        localStorage.setItem(`${name}_str`, obj);
      }
      return true;
    case 'clean':
      localStorage.removeItem(`${name}_obj`);
      localStorage.removeItem(`${name}_str`);
      return true;
    default:
      return null;
  }
  return null;
};

// session操作
function sessionData(method, name, obj) {
  /*
   * 参数说明：
   * method：get获取，set存入或覆盖，clean清除
   * name:session的名称
   * obj:存入的内容，可以是任意类型
   * */
  switch (method) {
    case 'get':
      if (sessionStorage.getItem(`${name}_obj`)) {
        return JSON.parse(sessionStorage.getItem(`${name}_obj`));
      } else if (sessionStorage.getItem(`${name}_str`)) {
        return sessionStorage.getItem(`${name}_str`);
      } else {
        return null
      }
    case 'set':
      sessionData('clean', name);
      if (typeof obj == 'object') {
        sessionStorage.setItem(`${name}_obj`, JSON.stringify(obj));
      } else {
        sessionStorage.setItem(`${name}_str`, obj);
      }
      return true;
    case 'clean':
      sessionStorage.removeItem(`${name}_obj`);
      sessionStorage.removeItem(`${name}_str`);
      return true;
  }
};

export {localData, sessionData}
