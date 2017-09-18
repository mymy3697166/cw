import React, { Component } from 'react';
import { requireNativeComponent, findNodeHandle, NativeModules } from 'react-native';

const CWLoader = requireNativeComponent('CWLoader');

export default class Loader extends Component {
  download(uri) {
    NativeModules.CWLoader.download(uri, findNodeHandle(this.refs.loader));
  }

  render() {
    return (
      <CWLoader ref='loader' {...this.props} />
    );
  }
}