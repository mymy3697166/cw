import React from 'react';
import ViewBase from './viewbase';
import { Styles } from '../config/constants';
import { View, Image, Dimensions, Text } from '../';

export default class ViewDiscovery extends ViewBase {
  static navigatorStyle = Styles.navigatorStyle;
  static navigatorButtons = {
    leftButtons: [
      {
        id: 'btnToggleDrawer',
        component: 'Avatar',
        passProps: {data: {avatar: 'http://ac-jo3ojp37.clouddn.com/830b1d1e435e7d8c364c.png', width: 32, height: 32}}
      }
    ]
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {};
  }

  onNavigatorEvent(event) {
    if (event.id == 'btnToggleDrawer') {
      this.props.navigator.toggleDrawer();
    }
  }

  render() {
    let { width, height } = Dimensions.get('window');
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        
      </View>
    );
  }
}