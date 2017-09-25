import React, { Component } from 'react';
import CryptoJS from 'crypto-js';
import { MAINCOLOR, URLs, AsyncStorage, Dimensions, StyleSheet, PixelRatio, Toast } from '../';

export default class ViewBase extends Component {
  constructor(props) {
    super(props);
    let { width, height } = Dimensions.get('window');
    this.fw = width;
    this.fh = height;
    this.mc = MAINCOLOR;
    this.px = StyleSheet.hairlineWidth;
    this.urls = URLs;
  }

  post(url, forms) {
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
      return JSON.parse(decryptedData.toString());
    };
    let fetchPromise = new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({data: encrypt(forms||{})})
      }).then((response) => response.json()).then(e => {
        let json = decrypt(e.data);
        let status = parseInt(json.status);
        if (status >= 400) {
          reject({status: 1, description: '服务器繁忙，请稍后重试'});
        } else if (status == 1) {
          reject(json);
        } else resolve(json);
      }).catch(e => reject({status: 1, description: '网络不给力，请检查网络设置'}));
    });
    return fetchPromise;
  }

  setCache(key, value) {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(key, JSON.stringify(value), (error, result) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  getCache(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (error, result) => {
        if (error) reject(error);
        else resolve(JSON.parse(result));
      });
    });
  }

  getPixel(dp) {
    return PixelRatio.get() * dp;
  }
  
  success(msg) {
    Toast.success(msg);
  }

  warn(msg) {
    Toast.warn(msg);
  }

  showLoading() {
    Toast.showLoading();
  }

  hideLoading() {
    Toast.hideLoading();
  }
}
