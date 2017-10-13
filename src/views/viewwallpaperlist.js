import React from 'react';
import ViewBase from './viewbase';
import { Styles } from '../config/constants';
import { View, FlatList, Image, Text, TouchableOpacity, ScrollView } from '../';

export default class ViewWallpaperList extends ViewBase {
  static navigatorStyle = Styles.noTabBarNavigatorStyle;

  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.data.tags,
      wallpapers: [],
      tagIndex: -1
    };
    this.tag = this.props.data;
  }

  componentDidMount() {
    this.fetchWallpapers();
  }

  onTagPress(index) {
    if (index == -1) this.tag = this.props.data;
    else this.tag = this.props.data.tags[index];
    this.state.tagIndex = index;
    this.fetchWallpapers();
  }

  fetchWallpapers(page) {
    this.post(this.urls.FETCH_WALLPAPERS, {tag_id: this.tag.id, rows: 30, page: page || 0}).then(e => {
      this.setState({wallpapers: e.data, tagIndex: this.state.tagIndex});
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 32}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingLeft: 16, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.onTagPress(-1)} style={{height: 32, marginRight: 16}}>
              <Text style={{backgroundColor: 'transparent', color: -1 == this.state.tagIndex ? this.mc : '#999', lineHeight: 32}}>全部</Text>
            </TouchableOpacity>
            {this.state.tags.map((item, index) => <TouchableOpacity onPress={() => this.onTagPress(index)} key={item.id} style={{height: 32, marginRight: 16}}>
              <Text style={{backgroundColor: 'transparent', color: index == this.state.tagIndex ? this.mc : '#999', lineHeight: 32}}>{item.name}</Text>
            </TouchableOpacity>)}
          </ScrollView>
        </View>
        <FlatList
          numColumns={3}
          showsVerticalScrollIndicator={false}
          data={this.state.wallpapers}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }

  renderItem(info) {
    let w = (this.fw - 32) / 3;
    let h = w * 16 / 9;
    return (
      <TouchableOpacity activeOpacity={0.8} style={{width: w, height: h, marginTop: 8, marginLeft: 8}}>
        <Image source={{uri: info.item.image, cache: 'force-cache'}} style={{width: w, height: h, backgroundColor: '#eee'}} />
      </TouchableOpacity>
    );
  }
}