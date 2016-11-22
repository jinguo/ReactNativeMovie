'use strict';
import React, {Component} from 'react';

import {
  View, Text, Image, Dimensions, ScrollView,
} from 'react-native';

var deviceWidth = Dimensions.get('window').width;
export default class Mine extends Component {
  render() {
    return (
        <View style={{flex: 1, backgroundColor: '#a9a9a9'}}>
          <Image
              style={{height: 250, width: deviceWidth}}
              source={require('../images/meizhi.jpg')}
          />
          <ScrollView>
            <View style={{margin: 10, backgroundColor: '#fff'}}>
              <Text style={{padding: 10, paddingBottom: 0, fontSize: 16}}>
                我是JangGwa，原名张锞卫。{'\n'}
                一名 Andorid Developer，{'\n'}
                目前在学习 React Native 和 Node.js，{'\n'}
                期望成为全栈工程师。{'\n'}
              </Text>
            </View>

            <View style={{margin: 10, backgroundColor: '#fff'}}>
              <Text style={{padding: 10, paddingBottom: 0, fontSize: 16}}>
                本项目是基于豆瓣电影 Api 的 React Native 项目，
                使用了一些常见的开源库，
                可在 Andorid 和 iOS 上运行使用。{'\n'}
              </Text>
            </View>
            <View style={{margin: 10, backgroundColor: '#fff'}}>
              <Text style={{padding: 10, paddingBottom: 0, fontSize: 16, fontWeight: 'bold'}}>
                运行步骤：{'\n'}
              </Text>
              <View style={{marginLeft: 10, marginTop: -10}}>
                <Text sytle={{fontSize: 14}}>
                  1.Clone the project, cd into the root folder{'\n'}
                  2.Open Terminal and run the following command:
                </Text>
              </View>
              <View style={{marginLeft: 23}}>
                <Text style={{fontSize: 14}}>
                  npm install{'\n'}
                  react-native run-android 或 react-native run-ios{'\n'}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
    );
  }
}
