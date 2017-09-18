import { NativeModules } from 'react-native';
const resolveAssetSource = require('resolveAssetSource');

export default class Toast {
  static success(msg) {
    NativeModules.CWToast.show(msg, resolveAssetSource(require('../assets/icon_success.png')));
  }

  static info(msg) {

  }

  static warn(msg) {
    NativeModules.CWToast.show(msg, resolveAssetSource(require('../assets/icon_warn.png')));
  }

  static error(msg) {

  }

  static showLoading() {

  }

  static hideLoading() {

  }
}