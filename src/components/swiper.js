import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform } from 'react-native';

export default class Swiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index || 0
    };
    this.index = 0;
  }

  onScrollEndDrag(e) {
    this.animating = false;
    this.endDragData = e.nativeEvent.contentOffset;
    setTimeout(() => {
      if (this.animating) return;
      this.index = Math.round(this.endDragData.x / this.props.rowScale);
      if (this.props.onValueChange) this.props.onValueChange(this.index);
      if (Platform.OS == 'ios') return;
      this.snapToInterval(this.endDragData);
    }, 10);
  }

  onMomentumScrollBegin() {
    this.animating = true;
  }

  onMomentumScrollEnd(e) {
    this.index = Math.round(e.nativeEvent.contentOffset.x / this.props.rowScale);
    if (this.props.onValueChange) this.props.onValueChange(this.index);
    if (Platform.OS == 'ios') return;
    this.snapToInterval(e.nativeEvent.contentOffset);
  }

  onScroll(e) {
    this.setState({index: e.nativeEvent.contentOffset.x / this.props.rowScale});
  }

  snapToInterval(e) {
    let index = Math.round(e.x / this.props.rowScale);
    this.scrollView.scrollTo({x: index * this.props.rowScale, animated: true})
  }

  getIndex() {
    return this.index;
  }

  render() {
    let { width, height } = Dimensions.get('window');
    return (
      <View style={[this.props.style, {alignItems: 'center'}]}>
        <ScrollView
          ref={e => this.scrollView = e}
          style={{flex: 1}}
          horizontal={true}
          bounces={false}
          snapToInterval={this.props.rowScale}
          scrollEventThrottle={100}
          showsHorizontalScrollIndicator={false}
          onScrollEndDrag={this.onScrollEndDrag.bind(this)}
          onMomentumScrollBegin={this.onMomentumScrollBegin.bind(this)}
          onMomentumScrollEnd={this.onMomentumScrollEnd.bind(this)}
          onScroll={this.onScroll.bind(this)}
        >
          <View style={{width: (width - this.props.rowScale) / 2}}></View>
          {this.props.list.map((item, index) => this.props.renderRow(item, index, this.state.index))}
          <View style={{width: (width - this.props.rowScale) / 2}}></View>
        </ScrollView>
        <View style={{width: this.props.rowScale, height: 3, backgroundColor: '#f94'}}></View>
      </View>
    );
  }
}