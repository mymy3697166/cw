import React from 'react';
import ViewBase from './viewbase';
import { Styles } from '../config/constants';
import { View, ScrollView, Image, Text, TouchableOpacity, FlatList} from '../';

export default class ViewDiscovery extends ViewBase {
  static navigatorStyle = Styles.navigatorStyle;
  static navigatorButtons = {
    leftButtons: [
      {
        id: 'btnToggleDrawer',
        component: 'Avatar',
        passProps: {data: {avatar: 'http://ac-jo3ojp37.clouddn.com/830b1d1e435e7d8c364c.png', width: 32, height: 32}}
      }
    ]
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    let w = this.fw - 32;
    this.state = {
      themes: [],
      themeIndex: 0,
      users: [],
      wallpapers: [],
      refreshing: false
    };
    this.page = 0;
  }
  componentDidMount() {
    this.fetchData(true);
  }

  fetchData(refresh) {
    if (refresh) {
      this.setState({refreshing: true});
      this.post(this.urls.FETCH_HOME).then(e => {
        this.setState({refreshing: false});
        this.setState({themes: e.themes, users: e.users});
      }, e => {
        this.setState({refreshing: false});
      });
      this.page = 0;
      this.state.wallpapers = [];
    }
    if (this.state.wallpapers.length % 30 > 0 && this.page > 0) return;
    this.post(this.urls.FETCH_WALLPAPERS, {page: this.page, rows: 30}).then(e => {
      this.setState({wallpapers: this.state.wallpapers.concat(e.data)});
    });
    this.page++;
  }

  openPreview(wp) {
    this.props.navigator.push({
      screen: 'Wallpaper',
      passProps: {data: wp}
    });
  }

  onNavigatorEvent(event) {
    if (event.id == 'btnToggleDrawer') {
      // this.props.navigator.toggleDrawer();
      this.props.navigator.showModal({
        screen: 'Login'
      });
    }
  }

  onThemeScroll(e) {
    let x = e.nativeEvent.contentOffset.x;
    this.setState({themeIndex: parseInt(x / this.fw)});
  }

  render() {
    let w = this.fw - 16;
    let h = w * 9 / 16;
    return (
      <FlatList
        style={{flex: 1, backgroundColor: '#fff'}}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={this.state.wallpapers}
        refreshing={this.state.refreshing}
        ListHeaderComponent={this.renderHeader()}
        renderItem={this.renderItem.bind(this)}
        keyExtractor={item => item.id}
        ListFooterComponent={<Text style={{width: this.fw, paddingTop: 32, paddingBottom: 32, fontSize: 13, color: '#999', textAlign: 'center'}}>{this.state.wallpapers.length % 30 > 0 ? '没有更多了' : '正在加载...'}</Text>}
        onRefresh={() => this.fetchData(true)}
        onEndReached={() => this.fetchData()}
        onEndReachedThreshold={0.1 / this.page}
        scrollEventThrottle={0}
      />
    );
  }

  renderHeader() {
    let w = this.fw - 16;
    let h = w * 9 / 16;
    return (
      <View>
        <View style={{width: this.fw, height: h + 16, backgroundColor: '#f1f1f1'}}>
          <ScrollView
            bounces={false}
            horizontal={true}
            pagingEnabled={true}
            scrollEventThrottle={0}
            showsHorizontalScrollIndicator={false}
            onScroll={this.onThemeScroll.bind(this)}
          >
            {this.state.themes.map(item => <TouchableOpacity activeOpacity={0.8} key={item.id} style={{width: this.fw, height: h + 16, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={{uri: item.cover, cache: 'force-cache'}} style={{width: w, height: h, borderRadius: 5, backgroundColor: '#eee'}}>
                <Image source={require('../assets/bg_mask.png')} style={{width: w, height: 44, position: 'absolute', bottom: 0, left: 0}}>
                  <Text style={{backgroundColor: 'transparent', color: '#fff', lineHeight: 44, paddingLeft: 16}}>{item.name}</Text>
                </Image>
              </Image>
            </TouchableOpacity>)}
          </ScrollView>
          {this.state.themes.map((item, index) => {
            let count = this.state.themes.length;
            let right = (count - index - 1) * 16 + 24;
            let opacity = index == this.state.themeIndex ? 0.8 : 0.5;
            return (<View key={index} style={{right: right, opacity: opacity, width: 8, height: 8, borderRadius: 4, position: 'absolute', bottom: 22, backgroundColor: '#fff'}}></View>);
          })}
        </View>
        <View style={{height: 50, paddingLeft: 8, paddingRight: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 15, color: '#666', fontWeight: 'bold'}}>设计师作品</Text>
          <TouchableOpacity style={{paddingLeft: 16, paddingTop: 16, paddingBottom: 16}}>
            <Image source={require('../assets/icon_more.png')} />
          </TouchableOpacity>
        </View>
        {this.state.users.map(item => <View key={item.id} style={{width: this.fw, flexDirection: 'row', flexWrap: 'wrap'}}>
          <TouchableOpacity activeOpacity={0.8} style={{width: this.fw, height: 57, flexDirection: 'row', flexWrap: 'wrap'}}>
            <Image source={{uri: item.avatar, cache: 'force-cache'}} style={{width: 36, height: 36, borderRadius: 18, marginLeft: 8, backgroundColor: '#eee'}} />
            <Text style={{width: this.fw - 92, paddingLeft: 6, fontSize: 16, color: '#666', lineHeight: 36}}>{item.name}</Text>
            <Text style={{marginLeft: 8, marginTop: 8, fontSize: 13, color: '#aaa'}}>{item.description}</Text>
          </TouchableOpacity>
          {item.wallpapers.map((item, index) => <TouchableOpacity onPress={() => this.openPreview(item)} key={item.id} activeOpacity={0.8} style={{width: (this.fw - 22) / 4, height: (this.fw - 22) / 4 * 16 / 9, marginTop: 16, marginLeft: index == 0 ? 8 : 2}}>
            <Image source={{uri: item.image, cache: 'force-cache'}} style={{width: (this.fw - 22) / 4, height: (this.fw - 22) / 4 * 16 / 9, backgroundColor: '#eee'}} />
          </TouchableOpacity>)}
          <View style={{height: 8, marginTop: 16, backgroundColor: '#f1f1f1', width: this.fw}}></View>
        </View>)}
        <Text style={{height: 50, fontSize: 15, color: '#666', fontWeight: 'bold', lineHeight: 50, paddingLeft: 8}}>最新发布</Text>
      </View>
    );
  }

  renderItem(info) {
    return (
      <TouchableOpacity onPress={() => this.openPreview(info.item)} activeOpacity={0.8} style={{width: (this.fw - 32) / 3, height: (this.fw - 32) / 3 * 16 / 9, marginTop: 8, marginLeft: 8}}>
        <Image source={{uri: info.item.image}} style={{width: (this.fw - 32) / 3, height: (this.fw - 32) / 3 * 16 / 9, backgroundColor: '#eee'}} />
      </TouchableOpacity>
    );
  }
}
