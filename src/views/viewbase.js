import React, { Component } from 'react';
import CryptoJS from 'crypto-js';
import { MAINCOLOR, URLs, Dimensions, StyleSheet, PixelRatio, Toast, DB, _ } from '../';

export default class ViewBase extends Component {
  static user;
  constructor(props) {
    super(props);
    let { width, height } = Dimensions.get('window');
    this.fw = width;
    this.fh = height;
    this.mc = MAINCOLOR;
    this.px = StyleSheet.hairlineWidth;
    this.urls = URLs;
    this.ratio = PixelRatio.get();
  }

  currentUser() {
    if (!ViewBase.user) {
      let users = DB.objects('User');
      if (users.length > 0) ViewBase.user = users[0];
    }
    return ViewBase.user;
  }

  updateUser(user) {
    let users = DB.objects('User');
    DB.write(() => {
      DB.delete(users);
      DB.create('User', user);
    });
  }

  post(url, forms) {
    let me = this;
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
      forms = forms || {};
      if (me.currentUser()) {
        forms = _.extend(forms, {token: me.currentUser().token});
      }
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
      }).catch(e => {
        reject({status: 1, description: '服务器繁忙，请稍后重试'});
      });
    });
    return fetchPromise;
  }

  setCache(key, value) {
    let caches = DB.objects('Cache').filtered('key="' + key + '"');
    DB.write(() => {
      if (caches.length > 0) DB.create('Cache', {key: key, value: JSON.stringify(value), createdAt: new Date()}, true);
      else DB.create('Cache', {key: key, value: JSON.stringify(value), createdAt: new Date()});
    });
  }

  getCache(key) {
    let caches = DB.objects('Cache').filtered('key="' + key + '"');
    if (caches.length > 0) return JSON.parse(caches[0].value);
    return undefined;
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
