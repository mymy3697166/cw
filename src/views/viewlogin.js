import React from 'react';
import ViewBase from './viewbase';
import { Styles } from '../config/constants';
import { View, Text, TextInput, TouchableOpacity, Image, MAINCOLOR } from '../';

export default class ViewLogin extends ViewBase {
  static navigatorStyle = Styles.noNavigatorStyle;
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      captcha: '',
      captcha_image: {uri: this.urls.CAPTCHA},
      code: ''
    };
  }

  onBgPress() {
    this.refs.uidInput.blur();
    this.refs.codeInput.blur();
  }

  onRefreshPress() {
    this.setState({captcha_image: {uri: `${this.urls.CAPTCHA}?time=${new Date().getTime()}`}})
  }

  onCodePress() {
    this.showLoading();
    this.post(this.urls.LOGIN_CODE)
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.onBgPress.bind(this)} style={{flex: 1, alignItems: 'center'}}>
        <Image style={{marginTop: 64}} source={require('../assets/logo.png')} />
        <View style={{width: this.fw - 64, marginTop: 32, height: 48, borderBottomWidth: this.px, borderColor: '#ccc'}}>
          <TextInput value={this.state.uid} onChangeText={e => this.setState({uid: e})} maxLength={11} ref='uidInput' keyboardType='phone-pad' style={{fontSize: 14, height: 48, paddingLeft: 8}} placeholderTextColor={'#bbb'} placeholder='请输入11位手机号' />
        </View>
        <View style={{width: this.fw - 64, marginTop: 16, height: 48, borderBottomWidth: this.px, borderColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TextInput value={this.state.captcha} onChangeText={e => this.setState({captcha: e})} maxLength={4} ref='codeInput' keyboardType='numeric' style={{flex: 1, fontSize: 14, height: 48, paddingLeft: 8}} placeholderTextColor={'#bbb'} placeholder='请输入图形验证码' />
          <Image source={this.state.captcha_image} style={{width: 64, height: 32, backgroundColor: '#666'}} />
          <TouchableOpacity onPress={this.onRefreshPress.bind(this)} style={{padding: 8, justifyContent: 'center'}}>
            <Image source={require('../assets/icon_refresh.png')} style={{tintColor: '#bbb'}} />
          </TouchableOpacity>
        </View>
        <View style={{width: this.fw - 64, marginTop: 16, height: 48, borderBottomWidth: this.px, borderColor: '#ccc'}}>
          <TextInput value={this.state.code} onChangeText={e => this.setState({code: e})} maxLength={6} ref='codeInput' keyboardType='numeric' style={{flex: 1, fontSize: 14, height: 48, paddingLeft: 8}} placeholderTextColor={'#bbb'} placeholder='请输入短信验证码' />
        </View>
        <Text style={{color: '#999', fontSize: 12, marginTop: 16, width: this.fw - 64, textAlign: 'right'}}>无须注册直接登录</Text>
        <TouchableOpacity activeOpacity={0.8} style={{marginTop: 32, width: this.fw - 64, borderRadius: 5, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: MAINCOLOR}}>
          <Text style={{color: '#fff', backgroundColor: 'transparent', fontSize: 18}}>登录</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}