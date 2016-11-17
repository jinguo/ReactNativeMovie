/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';
import Main from './app/Main';

export default class ReactNativeMovie extends Component {
  render() {
    return (
        <Navigator
            initialRoute={{ name: 'HomePage', component: Main, index: 0}}
            renderScene={(route,navigator) => {
              return < route.component navigator = {navigator} {...route.params}/>;
            }}
        >
        </Navigator>
    );
  }
}


AppRegistry.registerComponent('ReactNativeMovie', () => ReactNativeMovie);
