import React from 'react';
import ViewBase from './ViewBase';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Styles } from '../config/constants';
import { Tag } from '../config/models';

export default class ViewCategory extends ViewBase {
  static navigatorStyle = Styles.navigatorStyle;

  constructor(props) {
    super(props);
  
    this.state = {
      tags: []
    };
  }

  componentWillMount() {
    this.getCache('TAGS').then(e => {
      this.setState({tags: e || []});
    });
    Tag.query.equalTo('tag', null).equalTo('status', 0).find().then(results => {
      let ls = results.map(item => {
        return {id: item.id, name: item.get('name'), cover: item.get('cover').url(), key: item.id};
      });
      this.setState({tags: ls});
    });
  }

  render() {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{flex: 1, paddingTop: 8}}
        data={this.state.tags}
        renderItem={this.renderItem.bind(this)}
      />
    );
  }

  renderItem(info) {
    let w = this.fw - 16;
    let h = w * 9 / 16;
    return (
      <TouchableOpacity style={{width: w, height: h, marginBottom: info.index == (this.state.tags.length - 1) ? 16 : 8, marginLeft: 8}} activeOpacity={0.8}>
        <Image style={{width: w, height: h, borderRadius: 5}} source={{uri: info.item.cover}}>
          <View style={{height: 40, width: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', marginLeft: 8, marginTop: 8}}>
              <Text style={{fontSize: 14, color: '#fff', backgroundColor: 'transparent'}}>{info.item.name}</Text>
          </View>
        </Image>
      </TouchableOpacity>
    );
  }
}