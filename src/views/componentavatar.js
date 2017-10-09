import React from 'react';
import ViewBase from './viewbase';
import { Image, TouchableOpacity } from '../';

export default class ComponentAvatar extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      source: this.currentUser() ? {uri: this.currentUser().avatar} : require('../assets/avatar.png')
    };
  }

  componentDidMount() {
    this.loginListener = this.n.addListener('LOGINSUCCESS', e => {
      this.setState({source: {uri: this.currentUser().avatar}});
    });
    this.logoutListener = this.n.addListener('LOGOUTSUCCESS', e => {
      this.setState({source: require('../assets/avatar.png')});
    });
  }

  componentWillUnmount() {
    this.loginListener && this.loginListener.remove();
    this.logoutListener && this.logoutListener.remove();
  }

  render() {
    let data = this.state.data;
    
    return (
      <TouchableOpacity style={{width: 32, height: 32}}>
        <Image style={{width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#fff', marginLeft: -8}} source={this.state.source} />
      </TouchableOpacity>
    );
  }
}
