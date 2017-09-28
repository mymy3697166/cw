import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Platform, AsyncStorage, Dimensions, StyleSheet, ScrollView, PixelRatio, PanResponder, StatusBar, LayoutAnimation, NativeModules, NativeEventEmitter, requireNativeComponent, CameraRoll } from 'react-native';
import { Navigation } from './components/react-native-navigation/src';
import { MAINCOLOR, Styles, URLs } from './config/constants';
import { registerRoutes } from './config/routes';
import DB from './config/db';
import _ from './components/underscore';
import Loader from './components/loader';
import Toast from './components/toast';
import ComponentAvatar from './views/componentavatar';
import ViewDiscovery from './views/viewdiscovery';
import ViewTag from './views/viewtag';
import ViewDrawer from './views/viewdrawer';
import ViewWallpaperList from './views/viewwallpaperlist';
import ViewWallpaper from './views/viewwallpaper';
import ViewLogin from './views/viewlogin';
// 扩展系统组件
const Image = Platform.OS == 'ios' ? require('Image') : class CacheImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
};
const ImageBackground = Platform.OS == 'ios' ? require('ImageBackground') : class CacheImageBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
}
// APP初始化
export default function init() {
  registerRoutes();
}
// 导出组件
export {
  // 系统组件
  View, Text, TouchableOpacity, FlatList, Modal, TextInput, Platform, AsyncStorage, Dimensions, StyleSheet, ScrollView, PixelRatio, PanResponder, StatusBar, LayoutAnimation, NativeModules, NativeEventEmitter, requireNativeComponent, CameraRoll,
  // 扩展系统组件
  Image, Navigation, ImageBackground,
  // realm数据库
  DB, _,
  // 常量
  MAINCOLOR, Styles, URLs,
  // 自定义组件
  ComponentAvatar, Loader, Toast,
  // 页面
  ViewDiscovery, ViewTag, ViewDrawer, ViewWallpaperList, ViewWallpaper, ViewLogin
};