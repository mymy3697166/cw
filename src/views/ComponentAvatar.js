import React from 'react';
import ViewBase from './ViewBase';
import { Image, TouchableOpacity } from 'react-native';

export default class ComponentAvatar extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  render() {
    let data = this.state.data;
    return (
      <TouchableOpacity style={{width: data.width, height: data.height}}>
        <Image style={{width: data.width, height: data.height, borderRadius: data.width / 2, borderWidth: 2, borderColor: '#fff', marginLeft: -12}} source={{uri: data.avatar}}></Image>
      </TouchableOpacity>
    );
  }
}