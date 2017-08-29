import React from 'react';
import { View, Image } from 'react-native';
import ViewBase from './ViewBase';
import { Styles } from '../config/constants'

export default class ViewDiscovery extends ViewBase {
  static navigatorStyle = Styles.navigatorStyle;
  static navigatorButtons = {
    leftButtons: [
      {
        id: 'btnToggleDrawer',
        icon: require('../assets/tab_center.png'),
        component: 'Avatar',
        passProps: {data: {avatar: 'http://ac-jo3ojp37.clouddn.com/830b1d1e435e7d8c364c.png', width: 32, height: 32}}
      }
    ],
    rightButtons: [
      {
        component: 'Avatar',
        passProps: {data: {avatar: 'http://ac-jo3ojp37.clouddn.com/830b1d1e435e7d8c364c.png', width: 32, height: 32}}
      }
    ]
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id == 'btnToggleDrawer') {
      this.props.navigator.toggleDrawer();
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
      </View>
    );
  }
}