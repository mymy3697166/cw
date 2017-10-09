import React from 'react';
import ViewBase from './viewbase';
import { View, TouchableOpacity, Text } from '../';

export default class ViewDrawer extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  onLogoutPress() {
    this.logout();
  }

  render() {
    let data = this.state.data;
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity style={{width: 64, height: 32, justifyContent: 'center', alignItems: 'center', marginTop: 64}} onPress={this.onLogoutPress.bind(this)}>
          <Text>退出</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
