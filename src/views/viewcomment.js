import React from 'react';
import ViewBase from './viewbase';
import { Styles } from '../config/constants';
import { View, FlatList, Image, Text, TouchableOpacity, TextInput, Keyboard, LayoutAnimation } from '../';

export default class ViewComment extends ViewBase {
  static navigatorStyle = Styles.noTabBarNavigatorStyle;

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment_count: this.props.comment_count,
      score: this.props.score,
      height: this.fh - 64,
      star: 0,
      description: ''
    };
    this.nType = this.props.type == 'Wallpaper' ? 'WALLPAPERUPDATESUCCESS' : 'THEMEUPDATESUCCESS';
    this.page = 0;
  }

  componentDidMount() {
    this.fetchData();
    this.kbsListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    this.khsListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  componentWillUnmount() {
    this.kbsListener.remove();
    this.khsListener.remove();
  }

  keyboardWillShow(e) {
    let cfg = LayoutAnimation.create(e.duration, e.easing);
    LayoutAnimation.configureNext(cfg);
    this.setState({height: this.fh - 64 - e.endCoordinates.height});
  }

  keyboardWillHide(e) {

    this.setState({height: this.fh - 64});
  }

  fetchData() {
    this.post(this.urls.FETCH_COMMENTS, {
      object_type: this.props.type,
      object_id: this.props.id,
      page: this.page,
      x: this.ratio
    }).then(e => {
      this.setState({comments: e.data});
      this.page++;
    }, this.errorHandler);
  }

  onPublishPress() {
    if (this.state.star == 0) {
      this.warn('请您打分');
      return;
    }
    if (this.state.description == '') {
      this.warn('请您填写评论内容')
      return;
    }
    this.post(this.urls.CREATE_COMMENT, {object_type: this.props.type, object_id: this.props.id, star: this.state.star, description: this.state.description, x: this.ratio}).then(e => {
      this.success('感谢您的参与');
      this.setState({
        comments: [e.data].concat(this.state.comments),
        comment_count: e.comment_count,
        score: e.score,
        star: 0,
        description: ''
      });
      this.refs.dInput.blur();
      this.n.broadcast(this.nType, {id: this.props.id, comment_count: e.comment_count, score: e.score})
    }, this.errorHandler.bind(this));
  }

  render() {
    let sw = this.state.star * 40;
    return (
      <View style={{height: this.state.height}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          data={this.state.comments}
          ListHeaderComponent={this.renderHeader()}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item.id}
        />
        <View style={{height: 96, borderTopWidth: this.px, borderTopColor: '#eee', backgroundColor: '#f1f1f1', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
          <View style={{height: 48, width: this.fw, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff'}}>
            <Text style={{fontSize: 16, color: '#666'}}>你的评分</Text>
            <View style={{backgroundColor: '#eee', width: 200}}>
              <View style={{backgroundColor: this.mc, flexDirection: 'row', width: sw}}>
                <TouchableOpacity onPress={() => this.setState({star: 1})} activeOpacity={1} style={{width: 40, height: 32}}>
                  <Image source={require('../assets/star.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({star: 2})} activeOpacity={1} style={{width: 40, height: 32}}>
                  <Image source={require('../assets/star.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({star: 3})} activeOpacity={1} style={{width: 40, height: 32}}>
                  <Image source={require('../assets/star.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({star: 4})} activeOpacity={1} style={{width: 40, height: 32}}>
                  <Image source={require('../assets/star.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({star: 5})} activeOpacity={1} style={{width: 40, height: 32}}>
                  <Image source={require('../assets/star.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TextInput
            ref='dInput'
            onChangeText={e => this.setState({description: e})}
            value={this.state.description}
            style={{width: this.fw - 16 - 64, backgroundColor: '#fff', height: 32, borderRadius: 16, paddingLeft: 16, paddingRight: 16, color: '#666', fontSize: 14}}
          />
          <TouchableOpacity onPress={this.onPublishPress.bind(this)} style={{width: 64, alignItems: 'center', height: 48, justifyContent: 'center'}}>
            <Text style={{color: '#1e90ff'}}>发表</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderHeader() {
    let p = this.state.score / 5.0;
    let r = 242 - (242 - 21) * p;
    let g = 141 + (173 - 141) * p;
    let b = 102 * p;
    return (
      <View style={{height: 96, marginTop: 8, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8}}>
        <Image
          source={{uri: this.props.image, cache: 'force-cache'}}
          style={{width: 96, height: 96, marginLeft: 8, marginRight: 2}}
        />
        <View style={{width: this.fw - 114}}>
          <View style={{backgroundColor: '#eee', height: 32, width: 200}}>
            <View style={{backgroundColor: this.mc, flexDirection: 'row', width: 200 * p}}>
              <Image source={require('../assets/star.png')} />
              <Image source={require('../assets/star.png')} />
              <Image source={require('../assets/star.png')} />
              <Image source={require('../assets/star.png')} />
              <Image source={require('../assets/star.png')} />
            </View>
          </View>
          <View style={{height: 64, flexDirection: 'row', alignItems: 'flex-end', paddingLeft: 6}}>
            <Text style={{fontSize: 40, marginBottom: -8, color: `rgb(${r}, ${g}, ${b})`}}>{this.state.score}</Text>
            <Text style={{fontSize: 20, color: `rgb(${r}, ${g}, ${b})`}}> 分</Text>
            <Text style={{fontSize: 14, color: '#999', position: 'absolute', right: 0}}>{this.state.comment_count}个评论</Text>
          </View>
        </View>
      </View>
    );
  }

  renderItem(info) {
    let w = this.fw - 16;
    return (
      <View style={{alignItems: 'center', paddingBottom: 8}}>
        <View style={{backgroundColor: '#f1f1f1', height: 8, width: this.fw}}></View>
        <View style={{width: w, height: 32, marginTop: 8, flexDirection: 'row'}}>
          <Image source={{uri: info.item.user.avatar, cache: 'force-cache'}} style={{width: 32, height: 32, borderRadius: 16}} />
          <View style={{height: 32, justifyContent: 'space-between', paddingLeft: 8}}>
            <Text style={{fontSize: 13, color: '#666'}}>{info.item.user.nickname}</Text>
            <Text style={{fontSize: 11, color: '#999'}}>{this.timeFormat(info.item.created_at, info.item.created_past)}</Text>
          </View>
          <View style={{backgroundColor: '#eee', height: 16, width: 100, position: 'absolute', right: 8}}>
            <View style={{backgroundColor: this.mc, flexDirection: 'row', width: 20 * info.item.star}}>
              <Image style={{width: 20, height: 16}} source={require('../assets/star.png')} />
              <Image style={{width: 20, height: 16}} source={require('../assets/star.png')} />
              <Image style={{width: 20, height: 16}} source={require('../assets/star.png')} />
              <Image style={{width: 20, height: 16}} source={require('../assets/star.png')} />
              <Image style={{width: 20, height: 16}} source={require('../assets/star.png')} />
            </View>
          </View>
        </View>
        <Text style={{width: w, marginTop: 6, lineHeight: 20, fontSize: 13, color: '#666'}}>{info.item.description}</Text>
      </View>
    );
  }
}