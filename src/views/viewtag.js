import React from 'react';
import ViewBase from './viewbase';
import { Styles } from '../config/constants';
import { Tag, View, FlatList, Image, Text, TouchableOpacity } from '../';

export default class ViewTag extends ViewBase {
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
    this.state = {
      tags: []
    };
  }

  componentWillMount() {
    this.getCache('VIEWCATEGORY_TAGS').then(e => {
      this.setState({tags: e || []});
      Tag.query.equalTo('tag', null).equalTo('status', 0).find().then(results => {
        let ls = results.map(item => {
          return {key: item.id, id: item.id, name: item.get('name'), cover: item.get('cover').url(), wallpaper_count: item.get('wallpaper_count')};
        });
        this.setCache('VIEWCATEGORY_TAGS', ls);
        this.setState({tags: ls});
      });
    });
  }

  onNavigatorEvent(event) {
    if (event.id == 'btnToggleDrawer') {
      this.props.navigator.toggleDrawer();
    }
  }

  render() {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{flex: 1, paddingTop: 8}}
        data={this.state.tags}
        ListHeaderComponent={this.renderHeader()}
        renderItem={this.renderItem.bind(this)}
      />
    );
  }

  renderHeader() {
    let w = this.fw - 16;
    return (
      <TouchableOpacity activeOpacity={0.8} style={{width: w, height: 30, marginLeft: 8, marginBottom: 8, backgroundColor: '#f1f1f1', borderRadius: 5, borderWidth: this.px, borderColor: '#ddd', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <Image source={require('../assets/icon_search.png')} style={{tintColor: '#999'}} />
        <Text style={{fontSize: 12, color: '#999'}}>&nbsp;搜索</Text>
      </TouchableOpacity>
    );
  }

  renderItem(info) {
    let w = this.fw - 16;
    let h = w * 9 / 16;
    return (
      <TouchableOpacity onPress={() => this.props.navigator.push({screen: 'WallpaperList', title: info.item.name, passProps: {id: info.item.id}})} style={{width: w, height: h, marginBottom: info.index == (this.state.tags.length - 1) ? 16 : 8, marginLeft: 8}} activeOpacity={0.8}>
        <Image style={{width: w, height: h, borderRadius: 5, flexDirection: 'row'}} source={{uri: info.item.cover, cache: 'force-cache'}}>
          <View style={{height: 40, width: 40, borderRadius: 20, backgroundColor: this.mc, justifyContent: 'center', alignItems: 'center', marginLeft: 8, marginTop: 8, zIndex: 2}}>
            <Text style={{fontSize: 14, color: '#fff', backgroundColor: 'transparent'}}>{info.item.name}</Text>
          </View>
          <View style={{height: 24, width: 50, borderRadius: 12, backgroundColor: this.mc, justifyContent: 'center', alignItems: 'center', marginLeft: -16, marginTop: 16, zIndex: 1}}>
            <Text style={{fontSize: 12, color: '#fff', backgroundColor: 'transparent', paddingLeft: 8}}>{info.item.wallpaper_count}</Text>
          </View>
        </Image>
      </TouchableOpacity>
    );
  }
}