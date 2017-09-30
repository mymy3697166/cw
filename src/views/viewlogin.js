import React from 'react';
import ViewBase from './viewbase';
import { Styles } from '../config/constants';
import { View, Text, TextInput, TouchableOpacity, Image, MAINCOLOR, Modal, _ } from '../';

export default class ViewLogin extends ViewBase {
  static navigatorStyle = Styles.noNavigatorStyle;
  constructor(props) {
    super(props);
    this.code_id = new Date().getTime();
    this.state = {
      phone: '',
      captcha_image: {uri: `${this.urls.CAPTCHA}?code_id=${this.code_id}`},
      code: '',
      sending: false,
      send_text: '发送验证码',
      show_captcha: false,
      captcha: ''
    };
  }

  onBgPress() {
    this.refs.phoneInput.blur();
    this.refs.captchaInput.blur();
  }

  onSendPress() {
    this.onRefreshPress();
    this.setState({show_captcha: true});
  }

  onRefreshPress() {
    this.code_id = new Date().getTime();
    this.setState({
      captcha_image: {uri: `${this.urls.CAPTCHA}?code_id=${this.code_id}`},
      captchas: ['', '', '', '']
    });
  }

  onCaptchaInputChangeText(e) {
    this.setState({captcha: e});
    // if (value == '') {
    //   if (index > 0) this.refs['captchaInput_' + (index - 1).toString()].focus();
    //   return;
    // }
    // if (index < 3) {
    //   this.refs['captchaInput_' + (index + 1).toString()].focus();
    // }
    // if (e.length >= 4) {
    //   this.showLoading();
    //   this.post(this.urls.LOGIN_CODE, {phone: this.state.phone}).then(e => {
    //     this.hideLoading();
    //   }, e => {
    //     alert(JSON.stringify(e));
    //     this.hideLoading();
    //   });
    // }
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.onBgPress.bind(this)} style={{flex: 1, alignItems: 'center'}}>
        <Image style={{marginTop: 64}} source={require('../assets/logo.png')} />
        <View style={{width: this.fw - 64, marginTop: 32, height: 48, borderBottomWidth: this.px, borderColor: '#ccc'}}>
          <TextInput
            style={{fontSize: 14, height: 48, paddingLeft: 8}} placeholderTextColor={'#bbb'} placeholder='请输入11位手机号'
            ref='phoneInput'
            value={this.state.phone}
            onChangeText={e => this.setState({phone: e})}
            maxLength={11}
            keyboardType='phone-pad'
            autoFocus={true}
          />
        </View>
        <View style={{width: this.fw - 64, marginTop: 16, height: 48, borderBottomWidth: this.px, borderColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TextInput
            style={{flex: 1, fontSize: 14, height: 48, paddingLeft: 8}} placeholderTextColor={'#bbb'} placeholder='请输入短信验证码'
            ref='codeInput'
            value={this.state.code}
            editable={this.state.code_editable}
            onChangeText={e => this.setState({code: e})}
            maxLength={6}
            keyboardType='numeric'
          />
          <TouchableOpacity disabled={this.state.sending} onPress={this.onSendPress.bind(this)} style={{paddingTop: 8, paddingBottom: 8}}>
            <Text style={{color: this.state.sending ? '#999' : '#1e90ff'}}>{this.state.send_text}</Text>
          </TouchableOpacity>
        </View>
        <Text style={{color: '#999', fontSize: 12, marginTop: 16, width: this.fw - 64, textAlign: 'right'}}>无须注册直接登录</Text>
        <TouchableOpacity activeOpacity={0.8} style={{marginTop: 32, width: this.fw - 64, borderRadius: 5, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: MAINCOLOR}}>
          <Text style={{color: '#fff', backgroundColor: 'transparent', fontSize: 18}}>登录</Text>
        </TouchableOpacity>
        <Modal animationType='fade' visible={this.state.show_captcha} transparent={true}>
          <TouchableOpacity activeOpacity={1} style={{flex: 1, backgroundColor: '#0008', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: this.fw * 0.7, height: this.fw * 0.4, backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
              <View style={{width: this.fw * 0.7, height: 48, marginBottom: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={this.state.captcha_image} style={{width: 96, height: 48, backgroundColor: '#666'}} />
                <TouchableOpacity onPress={this.onRefreshPress.bind(this)} style={{padding: 8, justifyContent: 'center'}}>
                  <Image source={require('../assets/icon_refresh.png')} style={{tintColor: '#bbb'}} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TextInput maxLength={4} keyboardType='numeric' ref='captchaInput' value={this.state.captcha} onChangeText={e => this.onCaptchaInputChangeText(e)} style={{width: 0, height: 0}} autoFocus={true} />
                <View style={{width: 40, height: 40, borderWidth: 1, borderColor: '#999', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 24}}>{this.state.captcha[0]}</Text>
                </View>
                <View style={{width: 40, height: 40, marginLeft: 8, borderWidth: 1, borderColor: '#999', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 24}}>{this.state.captcha[1]}</Text>
                </View>
                <View style={{width: 40, height: 40, marginLeft: 8, borderWidth: 1, borderColor: '#999', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 24}}>{this.state.captcha[2]}</Text>
                </View>
                <View style={{width: 40, height: 40, marginLeft: 8, borderWidth: 1, borderColor: '#999', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 24}}>{this.state.captcha[3]}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
    );
  }
}