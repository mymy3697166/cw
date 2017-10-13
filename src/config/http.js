import { NetInfo } from 'react-native';
import CryptoJS from 'crypto-js';

export default class Http {
  static isConnected = true;
  static reach = 'wifi';
  static post(url, forms) {
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
    let timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(function () {
        reject({status: 408, description: '请求超时，请检查网络设置'});
      }, 10000);
    });
    let fetchPromise = new Promise((resolve, reject) => {
      if (Http.isConnected) {
        fetch(url, {
          method: 'POST',
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          body: JSON.stringify({data: encrypt(forms)})
        }).then(e => {
          if (e.status < 400) return e.json();
          let description = "";
          try {
            description = JSON.parse(e._bodyText).description;
          } catch(ex) {
            description = '服务器繁忙，请稍后重试';
          }
          if (reject) reject({status: e.status, description: description});
        }).then(e => {
          if (resolve) resolve(decrypt(e.data));
        }).catch(e => reject({status: 400, description: '内部错误，工程师正在处理'}));
      } else {
        if (reject) reject({status: 400, description: '无网络，请检查网络设置'});
      }
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
      Http.reach = reach.toLowerCase();
      if (reach.toLowerCase() == 'none') {
        Http.isConnected = false;
      } else {
        Http.isConnected = true;
      }
    });
  }
}