'use strict';
import React, {Component} from 'react';

import {
  StyleSheet, Dimensions, Image, View
} from 'react-native';
import ViewPager from 'react-native-viewpager';

var deviceWidth = Dimensions.get('window').width;

var IMGS = ['https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
  'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
  'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
  'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
  'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
  'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'];

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: deviceWidth,
  },
  pager: {
    height: 200,
    width: deviceWidth,
  }
});

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this._fetchData.bind(this);
    this.renderPage = this._renderPage.bind(this);
    this.state = {
      dataSource: new ViewPager.DataSource({
        pageHasChanged: (p1, p2) => p1 !== p2
      })
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  _fetchData() {
    // getImageList().then(dataList => {
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithPages(dataList)
    //   });
    // });
    this.setState({
      dataSource: this.state.dataSource.cloneWithPages(IMGS)
    });
  }

  _renderPage(data) {
    return (
        <Image style={ styles.pager } source={{uri: data}}/>
    );
  }

  render() {
    return (
        <View style={styles.container}>
          <ViewPager
              dataSource={this.state.dataSource}
              renderPage={this.renderPage}
              isLoop={true}
              autoPlay={true}>
          </ViewPager>
        </View>
    );
  }
}
