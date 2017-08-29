import React from 'react';
import ViewBase from './ViewBase';
import { View } from 'react-native';

export default class ViewDrawer extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  render() {
    let data = this.state.data;
    return (
      <View style={{flex: 1, backgroundColor: 'green'}}></View>
    );
  }
}