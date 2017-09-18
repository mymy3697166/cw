import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Platform, AsyncStorage, Dimensions, StyleSheet, ScrollView, PixelRatio, PanResponder, StatusBar, LayoutAnimation, NativeModules, NativeEventEmitter, requireNativeComponent } from 'react-native';
import AV from 'leancloud-storage';
import { Navigation } from './components/react-native-navigation/src';
import { MAINCOLOR, Styles } from './config/constants';
import { registerRoutes } from './config/routes';
import { Tag, Wallpaper, User, WallpaperTags, Theme } from './config/models';
import Loader from './components/loader';
import Toast from './components/toast';
import ComponentAvatar from './views/componentavatar';
import ViewDiscovery from './views/viewdiscovery';
import ViewTag from './views/viewtag';
import ViewDrawer from './views/viewdrawer';
import ViewWallpaperList from './views/viewwallpaperlist';
import ViewWallpaper from './views/viewwallpaper';
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
  AV.init({appId: 'JO3OJp373W3VEa7DjyfsCtuL-gzGzoHsz', appKey: '1G0XACMyjCEIyG9OnBlBS0V7'});
}
// 导出组件
export {
  // 系统组件
  View, Text, TouchableOpacity, FlatList, TextInput, Platform, AsyncStorage, Dimensions, StyleSheet, ScrollView, PixelRatio, PanResponder, StatusBar, LayoutAnimation, NativeModules, NativeEventEmitter, requireNativeComponent,
  // 扩展系统组件
  Image, Navigation, ImageBackground,
  // 常量
  MAINCOLOR, Styles,
  // 数据模型
  Tag, Wallpaper, WallpaperTags, User, Theme,
  // 自定义组件
  ComponentAvatar, Loader, Toast,
  // 页面
  ViewDiscovery, ViewTag, ViewDrawer, ViewWallpaperList, ViewWallpaper
};