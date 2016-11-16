'use strict';
import React, {Component} from 'react';
import {
  Image,
} from 'react-native';
import Home from './page/Home';
import Recommend from './page/Recommend';
import Mine from './page/Mine';
import TabNavigator from 'react-native-tab-navigator';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }

  render() {
    return (
        <TabNavigator tabBarStyle={{ height: 60, overflow: 'hidden' }}>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'home'}
              title="首页"
              titleStyle={{color: 'rgb(169,183,183)', fontSize: 11}}
              selectedTitleStyle={{color: 'rgb(234,128,16)', fontSize: 11}}
              renderIcon={() => <Image source={require('./images/home_normal.png')}/>}
              renderSelectedIcon={() => <Image source={require('./images/home_selected.png')}/>}
              //badgeText ="1"
              onPress={() => this.setState({selectedTab: 'home'})}
          >
            < Home/>
          </TabNavigator.Item>

          <TabNavigator.Item
              selected={this.state.selectedTab === 'recommend'}
              title="推荐"
              titleStyle={{color: 'rgb(169,183,183)', fontSize: 11}}
              selectedTitleStyle={{color: 'rgb(234,128,16)', fontSize: 11}}
              renderIcon={() => <Image source={require('./images/recommend_normal.png')}/>}
              renderSelectedIcon={() => <Image source={require('./images/recommend_selected.png')}/>}
              onPress={() => this.setState({selectedTab: 'recommend'})}
          >
            < Recommend />
          </TabNavigator.Item>

          <TabNavigator.Item
              selected={this.state.selectedTab === 'mine'}
              title="我的"
              titleStyle={{color: 'rgb(169,183,183)', fontSize: 11}}
              selectedTitleStyle={{color: 'rgb(234,128,16)', fontSize: 11}}
              renderIcon={() => <Image source={require('./images/mine_normal.png')}/>}
              renderSelectedIcon={() => <Image source={require('./images/mine_selected.png')}/>}
              onPress={() => this.setState({selectedTab: 'mine'})}
          >
            < Mine { ...this.props }/>
          </TabNavigator.Item>

        </TabNavigator>

    );
  }

}
