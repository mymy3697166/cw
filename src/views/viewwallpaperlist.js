import React from 'react';
import ViewBase from './viewbase';
import { Styles, Tag, View, FlatList, Image, Text, TouchableOpacity } from '../';

export default class ViewWallpaperList extends ViewBase {
  static navigatorStyle = Styles.navigatorStyle;

  constructor(props) {
    super(props);
  
    this.state = {
      tags: [],
      wallpapers: []
    };
  }

  componentDidMount() {
    Tag.query.equalTo('tag', Tag.createWithoutData(this.props.id)).find().then(e => {
      let ls = e.map(item => {
        return {id: item.id, name: item.get('name'), key: item.id};
      });
      this.setState({tags: ls})
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 32}}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingLeft: 8}}
            data={this.state.tags}
            renderItem={info => <TouchableOpacity activeOpacity={0.8} style={{height: 32, marginRight: 8}}>
              <Text style={{backgroundColor: 'transparent', color: this.mc}}>{info.item.name}</Text>
            </TouchableOpacity>}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{flex: 1, paddingTop: 8}}
          data={this.state.wallpapers}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }

  renderItem() {

  }
}