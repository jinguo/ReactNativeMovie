'use strict';
import React, { Component } from 'react';

import {
  View,
  Text,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
export default class Mine extends Component {
  render() {
    return(
        <View>
          <NavigationBar
              style = {{height:40}}
              title={{title: '我的'}}/>
          <Text>
            mine
          </Text>
        </View>
    );
  }
}
