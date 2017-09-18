import React, { Component } from 'react';
import { MAINCOLOR, AsyncStorage, Dimensions, StyleSheet, PixelRatio } from '../';

export default class ViewBase extends Component {
  constructor(props) {
    super(props);
    let { width, height } = Dimensions.get('window');
    this.fw = width;
    this.fh = height;
    this.mc = MAINCOLOR;
    this.px = StyleSheet.hairlineWidth;
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
}
