import React from 'react';
import ViewBase from './viewbase';
import { Styles } from '../config/constants';
import { MAINCOLOR, View, Image, Text, TouchableOpacity, LayoutAnimation } from '../';

export default class ViewWallpaper extends ViewBase {
  static navigatorStyle = Styles.noNavigatorStyle;
  constructor(props) {
    super(props);
  
    this.state = {
      image: {uri: this.props.image, cache: 'force-cache'},
      navBarTop: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.state.navBarTop < 0) return;
      this.onBgPress();
    }, 3000);
  }

  onBgPress() {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      navBarTop: this.state.navBarTop == 0 ? -64 : 0
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={this.onBgPress.bind(this)} activeOpacity={1} style={{flex: 1}}>
          <Image source={this.state.image} style={{flex: 1, backgroundColor: '#eee'}} />
        </TouchableOpacity>
        <View style={{position: 'absolute', top: this.state.navBarTop, left: 0, height: 64, width: this.fw, backgroundColor: MAINCOLOR, flexDirection: 'row', paddingTop: 20, justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => this.props.navigator.pop()} style={{width: 42, height: 40, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/icon_back.png')} style={{tintColor: '#fff'}} />
          </TouchableOpacity>
          <Text style={{color: '#fff', backgroundColor: 'transparent', fontSize: 16, height: 40, lineHeight: 40}}>{this.props.name}</Text>
          <TouchableOpacity style={{width: 42, height: 40, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/icon_share.png')} style={{tintColor: '#fff'}} />
          </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', top: this.state.navBarTop, left: 0, height: 64, width: this.fw, backgroundColor: MAINCOLOR, flexDirection: 'row', paddingTop: 20, justifyContent: 'space-between'}}>
        </View>
      </View>
    );
  }
}