import React from 'react';
import ViewBase from './viewbase';
import { Styles } from '../config/constants';
import { NativeModules, NativeEventEmitter, requireNativeComponent } from 'react-native';
import { MAINCOLOR, View, Image, Text, TouchableOpacity, LayoutAnimation } from '../';

const CWFile = NativeModules.CWFile;
const CWFileEmitter = new NativeEventEmitter(CWFile);
const CWCircleProgress = requireNativeComponent('CWCircleProgress');
export default class ViewWallpaper extends ViewBase {
  static navigatorStyle = Styles.noNavigatorStyle;
  constructor(props) {
    super(props);
  
    this.state = {
      image: {uri: this.props.image, cache: 'force-cache'},
      barTop: 0,
      barBottom: 0,
      diyBottom: 52
    };
  }

  componentDidMount() {
    this.sto = setTimeout(() => {
      if (this.state.barTop < 0) return;
      this.onBgPress();
    }, 3000);
    // this.pListener = CWFileEmitter.addListener('DownloadProgress', this.downloadProgress.bind(this));
    // CWFile.download(this.props.uri);
  }

  componentWillUnmount() {
    clearTimeout(this.sto);
    // this.pListener && CWFileEmitter.removeListener(this.pListener);
    // delete this.pListener;
  }

  // downloadProgress(e) {
  //   console.log(e.progress);
  // }

  onBgPress() {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      barTop: this.state.barTop == 0 ? -64 : 0,
      barBottom: this.state.barBottom == 0 ? -64 : 0,
      diyBottom: this.state.diyBottom == 52 ? 8 : 52
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={this.onBgPress.bind(this)} activeOpacity={1} style={{flex: 1}}>
          <Image source={this.state.image} style={{flex: 1, backgroundColor: '#eee'}} />
        </TouchableOpacity>
        <View style={{position: 'absolute', top: this.state.barTop, left: 0, height: 64, width: this.fw, backgroundColor: MAINCOLOR, flexDirection: 'row', paddingTop: 20, justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => this.props.navigator.pop()} style={{width: 42, height: 40, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/icon_back.png')} style={{tintColor: '#fff'}} />
          </TouchableOpacity>
          <Text style={{color: '#fff', backgroundColor: 'transparent', fontSize: 16, height: 40, lineHeight: 40}}>{this.props.name}</Text>
          <TouchableOpacity style={{width: 42, height: 40, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/icon_share.png')} style={{tintColor: '#fff'}} />
          </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', bottom: this.state.barBottom, left: 0, height: 44, width: this.fw, backgroundColor: MAINCOLOR, flexDirection: 'row'}}>
          <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <Image source={require('../assets/icon_favorite.png')} style={{tintColor: '#fff'}} />
            <Text style={{color: '#fff'}}>  收藏</Text>
          </TouchableOpacity>
          <View style={{backgroundColor: '#fff', width: this.px, height: 44}}></View>
          <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <Image source={require('../assets/icon_download.png')} style={{tintColor: '#fff'}} />
            <Text style={{color: '#fff'}}>  下载</Text>
          </TouchableOpacity>
          <View style={{backgroundColor: '#fff', width: this.px, height: 44}}></View>
          <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <Image source={require('../assets/icon_comment.png')} style={{tintColor: '#fff'}} />
            <Text style={{color: '#fff'}}>  评论</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={{width: 40, height: 40, borderRadius: 20, backgroundColor: MAINCOLOR, position: 'absolute', right: 8, bottom: this.state.diyBottom, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../assets/icon_diy.png')} style={{tintColor: '#fff'}} />
        </TouchableOpacity>
        <CWCircleProgress style={{width: 50, height: 50, position: 'absolute', top: (this.fh - 50) / 2, left: (this.fw - 50) / 2, backgroundColor: 'transparent'}} progressColor={MAINCOLOR} />
      </View>
    );
  }
}