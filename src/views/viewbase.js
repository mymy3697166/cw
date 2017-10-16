import React, { Component } from 'react';
import { MAINCOLOR, URLs, Dimensions, StyleSheet, PixelRatio, Toast, Notification, DB, _, Http } from '../';

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
    this.n = Notification;
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

  logout() {
    let users = DB.objects('User');
    DB.write(() => {
      DB.delete(users);
    });
    delete ViewBase.user;
    this.n.broadcast('LOGOUTSUCCESS');
  }

  post(url, forms) {
    let me = this;
    forms = forms || {};
    if (me.currentUser()) {
      forms = _.extend(forms, {token: me.currentUser().token});
    }
    return Http.post(url, forms);
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

  errorHandler(error) {
    if (error.status == 403) {
      this.props.navigator.showModal({screen: 'Login'});
      this.logout();
    }
    else Toast.warn(error.description);
  }

  countFormat(count) {
    if (count < 10000) return count;
    return count.toFixed(1);
  }

  timeFormat(time, past) {
    if (past < 60) return `${past}秒前`;
    if (past >= 60 && past < 3600) return `${parseInt(past / 60)}分钟前`;
    if (past >= 3600 && past < 86400) return `${parseInt(past / 3600)}小时前`;
    if (past >= 86400) {
      let dt = new Date(time);
      let m = dt.getMonth() + 1;
      let d = dt.getDate();
      return `${dt.getFullYear()}-${m > 9 ? m : '0' + m}-${d > 9 ? d : '0' + d}`;
    }
  }
}
