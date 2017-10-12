import { NetInfo } from 'react-native';
import CryptoJS from 'crypto-js';

export default class Http {
  static isConnected = true;
  static reach = 'wifi';
  static post(url, forms) {
    //做了一个假timeout 45秒, 试图去解决网络请求没有回应,导致列表一直处于网络请求状态.
    let timeoutPromise = new Promise((resolve,reject) => {
      setTimeout(function () {
        reject({status: 1, description: '网络请求超时'});
      }, 10000);
    });
    let encrypt = text => {
      let key = CryptoJS.enc.Utf8.parse('1U7a/=45a8Qw@e8T');
      let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(text), key, {
        mode: CryptoJS.mode.ECB
      });
      return encryptedData.toString();
    };
    let decrypt = text => {
      let key = CryptoJS.enc.Utf8.parse('1U7a/=45a8Qw@e8T');
      let decryptedData = CryptoJS.AES.decrypt(text, key, {
        mode: CryptoJS.mode.ECB
      });
      return JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
    };
    let fetchPromise = new Promise((resolve, reject) => {
      if (Http.isConnected) {
        fetch(url, {
          method: 'POST',
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          body: JSON.stringify({data: encrypt(forms)})
        }).then((response) => response.json()).then(e => {
          let json = decrypt(e.data);
          let status = parseInt(json.status);
          if (status >= 400) {
            reject({status: 1, description: '服务器繁忙，请稍后重试'});
          } else if (status == 1) {
            reject(json);
          } else resolve(json);
        }).catch(e => reject({status: 1, description: '网络不给力，请检查网络设置'}));
      } else reject({status: 1, description: '网络不给力，请检查网络设置'});
    });
    return Promise.race([fetchPromise, timeoutPromise]);
  }
  static startListen() {
    setTimeout(() => {
      NetInfo.fetch().done(reach => {
        Http.reach = reach;
        if (reach == 'none') {
          Http.isConnected = false;
        }
      });
    }, 250);
    NetInfo.addEventListener('change', reach => {
      Http.reach = reach;
      if (reach.toLowerCase() == 'none') {
        Http.isConnected = false;
      } else {
        Http.isConnected = true;
      }
    });
  }
}