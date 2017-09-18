import React from 'react';
import ViewBase from './viewbase';
import { Image, TouchableOpacity } from '../';

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
        <Image style={{width: data.width, height: data.height, borderRadius: data.width / 2, borderWidth: 2, borderColor: '#fff', marginLeft: -8}} source={{uri: data.avatar}} />
      </TouchableOpacity>
    );
  }
}
