'use strict';
import React, {Component} from 'react';

import {
  StyleSheet, Dimensions, Image, View
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import HotMoviesList from '../component/HotMoviesList';

var deviceWidth = Dimensions.get('window').width;
const API_SOON = 'https://api.douban.com/v2/movie/coming_soon';
// var IMGS = ['https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
//   'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
//   'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
//   'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
//   'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
//   'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
//   'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this._fetchData = this._fetchData.bind(this);
    this.renderPage = this._renderPage.bind(this);
    this.state = {
      dataSource: new ViewPager.DataSource({
        pageHasChanged: (p1, p2) => p1 !== p2
      })
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  async _fetchData() {
    try {
      // 注意这里的await语句，其所在的函数必须有async关键字声明
      let response = await fetch(API_SOON);
      let responseJson = await response.json();
      var contentData = [];
      for (let i = 0; i < 5; i++) {
        var tempItem = {};
        tempItem = responseJson.subjects[i].images.large;
        contentData.push(tempItem);
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithPages(contentData),
      });
    } catch (error) {
      console.error(error);
    }

  }

  _renderPage(data) {
    return (
        <Image style={ styles.pager } source={{uri: data}}/>
    );
  }

  render() {
    return (
        <View style={styles.container}>
          <View style = {styles.page}>
            <ViewPager
              dataSource={this.state.dataSource}
              renderPage={this.renderPage}
              isLoop={true}
              autoPlay={true}>
            </ViewPager>
          </View>
          <HotMoviesList/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, pager: {
    height: 180, width: deviceWidth,
  }, page: {
      height: 180, width: deviceWidth,
  }
});
