'use strict';
import React, { Component } from 'react';

import {
  Image, TouchableOpacity
} from 'react-native';

export default class LeftButton extends Component {
  constructor(props) {
    super(props);
    this.naprops = this.props;
  }
  render() {
    return (
        <TouchableOpacity onPress={() => this.naprops.navigator.pop()}>
          <Image
              source={require('../images/back.png') }
              style={{ width: 20, height: 20, marginLeft: 12, marginTop: 10}}/>
        </TouchableOpacity>
    );
  }
}