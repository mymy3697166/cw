import React from 'react';
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const CWNotification = NativeModules.CWNotification;
const CWNotificationEmitter = new NativeEventEmitter(CWNotification);

export default class Notification {
  // 广播
  static broadcast(name, info) {
    CWNotification.broadcast(name, info);
  }
  // 创建一个监听
  static addListener(name, callback) {
    let nf = new Notification();
    if (Platform.OS == "ios"){
      CWNotification.registerEvent(name).then(() => {
        nf.notification = CWNotificationEmitter.addListener(name, callback);
      }); 
    } else {
      nf.notification = CWNotificationEmitter.addListener(name, callback);
    }
    return nf;
  }
  // 移除一个监听
  remove() {
    this.notification && this.notification.remove();
    this.notification = null;
  }
}