import React from 'react';
import ViewBase from './viewbase';
import { Styles } from '../config/constants';
import { Tag, WallpaperTags, View, FlatList, Image, Text, TouchableOpacity, ScrollView } from '../';

export default class ViewWallpaperList extends ViewBase {
  static navigatorStyle = Styles.noTabBarNavigatorStyle;

  constructor(props) {
    super(props);
  
    this.state = {
      tags: [],
      wallpapers: [],
      tagIndex: -1
    };

    this.tag = Tag.createWithoutData('Tag', this.props.id);
  }

  componentDidMount() {
    Tag.query.equalTo('tag', this.tag).equalTo('status', 0).find().then(e => {
      let ls = e.map(item => {
        return {id: item.id, name: item.get('name'), key: item.id};
      });
      this.setState({tags: ls})
    });
    this.fetchWallpapers();
  }

  onTagPress(index, id) {
    this.tag = Tag.createWithoutData('Tag', id);
    this.state.tagIndex = index;
    this.fetchWallpapers();
  }

  fetchWallpapers(page) {
    WallpaperTags.query.include('wallpaper').equalTo('tag', this.tag).descending('createdAt').skip(page * 30).limit(30).find().then(e => {
      let ls = e.map(item => {
        let wp = item.get('wallpaper');
        return {key: wp.id, id: wp.id, image: wp.get('image').thumbnailURL(this.getPixel(160), this.getPixel(90))};
      });
      this.setState({wallpapers: ls, tagIndex: this.state.tagIndex});
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 32}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingLeft: 16, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.onTagPress(-1, this.props.id)} style={{height: 32, marginRight: 16}}>
              <Text style={{backgroundColor: 'transparent', color: -1 == this.state.tagIndex ? this.mc : '#999', lineHeight: 32}}>全部</Text>
            </TouchableOpacity>
            {this.state.tags.map((item, index) => <TouchableOpacity onPress={() => this.onTagPress(index, item.id)} key={item.id} style={{height: 32, marginRight: 16}}>
              <Text style={{backgroundColor: 'transparent', color: index == this.state.tagIndex ? this.mc : '#999', lineHeight: 32}}>{item.name}</Text>
            </TouchableOpacity>)}
          </ScrollView>
        </View>
        <FlatList
          numColumns={3}
          showsVerticalScrollIndicator={false}
          data={this.state.wallpapers}
          renderItem={this.renderItem.bind(this)}
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