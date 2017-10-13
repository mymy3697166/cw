import React from 'react';
import ViewBase from './viewbase';
import { Styles } from '../config/constants';
import { View, FlatList, Image, Text, TouchableOpacity, MAINCOLOR } from '../';

export default class ViewComment extends ViewBase {
  static navigatorStyle = Styles.noTabBarNavigatorStyle;

  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
    this.page = 0;
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.post(this.urls.FETCH_COMMENTS, {
      object_type: this.props.type,
      object_id: this.props.id,
      page: this.page
    }).then(e => {
      this.setState({comments: e.data});
      this.page++;
    }, this.errorHandler);
  }

  onItemPress(item) {

  }

  render() {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        data={this.state.comments}
        ListHeaderComponent={this.renderHeader()}
        renderItem={this.renderItem.bind(this)}
        keyExtractor={item => item.id}
      />
    );
  }

  renderHeader() {
    return (
      <View style={{height: 64, marginTop: 8, flexDirection: 'row'}}>
        <Image
          source={{uri: this.props.image, cache: 'force-cache'}}
          style={{width: 64, height: 64, marginLeft: 8}}
        />
        <View style={{backgroundColor: '#eee'}}>
          <View style={{backgroundColor: MAINCOLOR, flexDirection: 'row'}}>
            <Image source={require('../assets/star.png')} />
            <Image source={require('../assets/star.png')} />
            <Image source={require('../assets/star.png')} />
            <Image source={require('../assets/star.png')} />
            <Image source={require('../assets/star.png')} />
          </View>
        </View>
      </View>
    );
  }

  renderItem(info) {
    let w = this.fw - 16;
    let h = w * 9 / 16;
    return (
      <TouchableOpacity onPress={() => this.onItemPress(info.item)} style={{width: w, height: h, marginBottom: info.index == (this.state.comments.length - 1) ? 16 : 8, marginLeft: 8}} activeOpacity={0.8}>
        
      </TouchableOpacity>
    );
  }
}