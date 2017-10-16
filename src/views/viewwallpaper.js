import React from 'react';
import ViewBase from './viewbase';
import { Styles } from '../config/constants';
import { View, Image, Text, TouchableOpacity, LayoutAnimation, Loader, CameraRoll, DownloadLog } from '../';

export default class ViewWallpaper extends ViewBase {
  static navigatorStyle = Styles.noNavigatorStyle;
  constructor(props) {
    super(props);
  
    this.state = {
      image: {uri: this.props.data.image, cache: 'force-cache'},
      favorite_count: this.props.data.favorite_count,
      is_favorite: this.props.data.is_favorite,
      download_count: this.props.data.download_count,
      comment_count: this.props.data.comment_count,
      score: this.props.data.score,
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
    this.loader.download(this.props.data.image_original);
    this.listener = this.n.addListener('WALLPAPERUPDATESUCCESS', e => {
      this.setState(e);
    });
  }

  componentWillUnmount() {
    this.listener && this.listener.remove();
    clearTimeout(this.sto);
  }

  onBgPress() {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      barTop: this.state.barTop == 0 ? -64 : 0,
      barBottom: this.state.barBottom == 0 ? -64 : 0,
      diyBottom: this.state.diyBottom == 52 ? 8 : 52
    });
  }

  onLoadFinish(e) {
    this.loaded = true;
    this.setState({image: {uri: e.nativeEvent.uri}});
  }

  onDownloadPress() {
    if (!this.currentUser()) {
      this.props.navigator.showModal({screen: 'Login'});
      return;
    }
    if (this.loaded) {
      CameraRoll.saveToCameraRoll(this.state.image.uri).then(() => {
        this.success('成功保存至相册');
        let wp = this.props.data;
        this.post(this.urls.DOWNLOAD, {id: wp.id}).then(e => {
          this.n.broadcast('WALLPAPERUPDATESUCCESS', e);
        });
      });
    } else {
      this.warn('图片加载中，请稍候重试');
    }
  }

  onFavoritePress() {
    if (!this.currentUser()) {
      this.props.navigator.showModal({screen: 'Login'});
      return;
    }
    this.post(this.urls.FAVORITE, {id: this.props.data.id, type: 'Wallpaper'}).then(e => {
      this.success(e.is_favorite ? '已收藏' : '已取消');
      this.n.broadcast('WALLPAPERUPDATESUCCESS', e);
    }, this.errorHandler.bind(this));
  }

  onCommentPress() {
    this.props.navigator.push({
      screen: 'Comment',
      title: '评论',
      passProps: {
        id: this.props.data.id,
        type: 'Wallpaper',
        image: this.props.data.image,
        score: this.state.score,
        comment_count: this.state.comment_count
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={this.onBgPress.bind(this)} activeOpacity={1} style={{flex: 1}}>
          <Image source={this.state.image} style={{flex: 1, backgroundColor: '#eee'}} />
        </TouchableOpacity>
        <View style={{position: 'absolute', top: this.state.barTop, left: 0, height: 64, width: this.fw, backgroundColor: this.mc, flexDirection: 'row', paddingTop: 20, justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => this.props.navigator.pop()} style={{width: 42, height: 40, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/icon_back.png')} style={{tintColor: '#fff'}} />
          </TouchableOpacity>
          <Text style={{color: '#fff', backgroundColor: 'transparent', fontSize: 16, height: 40, lineHeight: 40}}>{this.props.name}</Text>
          <TouchableOpacity style={{width: 42, height: 40, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/icon_share.png')} style={{tintColor: '#fff'}} />
          </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', bottom: this.state.barBottom, left: 0, height: 44, width: this.fw, backgroundColor: this.mc, flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.onFavoritePress.bind(this)} style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <Image source={require('../assets/icon_favorite.png')} style={{tintColor: '#fff'}} />
            <Text style={{color: '#fff'}}>  {this.state.is_favorite ? '已收藏' : '收藏'}({this.state.favorite_count})</Text>
          </TouchableOpacity>
          <View style={{backgroundColor: '#fff', width: this.px, height: 44}}></View>
          <TouchableOpacity onPress={this.onDownloadPress.bind(this)} style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <Image source={require('../assets/icon_download.png')} style={{tintColor: '#fff'}} />
            <Text style={{color: '#fff'}}>  下载({this.state.download_count})</Text>
          </TouchableOpacity>
          <View style={{backgroundColor: '#fff', width: this.px, height: 44}}></View>
          <TouchableOpacity onPress={this.onCommentPress.bind(this)} style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <Image source={require('../assets/icon_comment.png')} style={{tintColor: '#fff'}} />
            <Text style={{color: '#fff'}}>  评论({this.state.comment_count})</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={{width: 40, height: 40, borderRadius: 20, backgroundColor: this.mc, position: 'absolute', right: 8, bottom: this.state.diyBottom, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../assets/icon_diy.png')} style={{tintColor: '#fff'}} />
        </TouchableOpacity>
        <Loader onLoadFinish={this.onLoadFinish.bind(this)} ref={e => this.loader = e} style={{width: 50, height: 50, position: 'absolute', top: (this.fh - 50) / 2, left: (this.fw - 50) / 2, backgroundColor: 'transparent'}} />
      </View>
    );
  }
}