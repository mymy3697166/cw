import React from 'react';
import ViewBase from './viewbase';
import { Styles } from '../config/constants';
import { View, ScrollView, Image, Text, TouchableOpacity, PanResponder, Theme, FlatList, User } from '../';
import AV from 'leancloud-storage';

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
      wallpapers: []
    };
  }
  componentDidMount() {
    Theme.query.equalTo('status', 0).descending('createdAt').limit(5).find().then(e => {
      let ls = e.map(item => {
        return {id: item.id, name: item.get('name'), cover: item.get('cover').url()};
      });
      this.setState({themes: ls});
    });
    User.query.find().then(e => {
      alert(JSON.stringify(e));
      let ls = e.map(item => {
        return {id: item.id, name: item.get('nickname'), avatar: item.get('avatar').url(), description: item.get('description')};
      });
      this.setState({users: ls});
    });
  }

  onNavigatorEvent(event) {
    if (event.id == 'btnToggleDrawer') {
      this.props.navigator.toggleDrawer();
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
        ListHeaderComponent={this.renderHeader()}
        numColumns={3}
        data={this.state.wallpapers}
        renderItem={this.renderItem.bind(this)}
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
            {this.state.themes.map((item, index) => <TouchableOpacity activeOpacity={0.8} key={index} style={{width: this.fw, height: h + 16, justifyContent: 'center', alignItems: 'center'}}>
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
        <Text style={{paddingLeft: 8, paddingTop: 16, paddingBottom: 16, fontSize: 15, color: '#999', fontWeight: 'bold'}}>设计师作品</Text>
        {this.state.users.map((item, index) => <View style={{width: this.fw}}>
          <TouchableOpacity>
            <Image source={{uri: item.avatar, cache: 'force-cache'}} style={{width: 36, height: 36, borderRadius: 18, padding: 8}} />
          </TouchableOpacity>
        </View>)}
      </View>
    );
  }

  renderItem(info) {
    return (
      <TouchableOpacity>
        
      </TouchableOpacity>
    );
  }
}