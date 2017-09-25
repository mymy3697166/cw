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
      code: ''
    };
  }

  onBgPress() {
    this.refs.uidInput.blur();
    this.refs.codeInput.blur();
  }

  onCodePress() {
    this.showLoading();
    
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.onBgPress.bind(this)} style={{flex: 1, alignItems: 'center'}}>
        <Image style={{marginTop: 64}} source={require('../assets/logo.png')} />
        <View style={{width: this.fw - 64, marginTop: 32, height: 48, borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}>
          <TextInput value={this.state.uid} onChangeText={e => this.setState({uid: e})} maxLength={11} ref='uidInput' keyboardType='phone-pad' style={{fontSize: 14, height: 48, paddingLeft: 8}} placeholderTextColor={'#bbb'} placeholder='请输入11位手机号' />
        </View>
        <View style={{width: this.fw - 64, marginTop: 16, height: 48, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput value={this.state.code} onChangeText={e => this.setState({code: e})} maxLength={6} ref='codeInput' keyboardType='numeric' style={{flex: 1, fontSize: 14, height: 48, paddingLeft: 8}} placeholderTextColor={'#bbb'} placeholder='请输入验证码' />
          <TouchableOpacity onPress={this.onCodePress.bind(this)} style={{paddingRight: 8, justifyContent: 'center'}}>
            <Text style={{color: '#00a0e9'}}>获取验证码</Text>
          </TouchableOpacity>
        </View>
        <Text style={{color: '#999', fontSize: 12, marginTop: 16, width: this.fw - 64, textAlign: 'right'}}>无须注册直接登录</Text>
        <TouchableOpacity activeOpacity={0.8} style={{marginTop: 32, width: this.fw - 64, borderRadius: 5, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: MAINCOLOR}}>
          <Text style={{color: '#fff', backgroundColor: 'transparent', fontSize: 18}}>登录</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}