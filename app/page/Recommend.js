'use strict';
import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  ListView,
  Image,
  Text,
} from 'react-native';

const API_TOP = 'https://api.douban.com/v2/movie/top250';
export default class Recommend extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      loaded: false,
      number: 1,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let response = await fetch(API_TOP);
    let responseJson = await response.json();
    let responseData = responseJson.subjects;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(responseData),
      loaded: true,
    });
  }

  render() {
    return(
        <View>
          <ListView
              dataSource = {this.state.dataSource}
              renderRow = {this._renderItem.bind(this)}
          >
          </ListView>
        </View>
    );
  }

  _renderItem(rowData) {
    return (
        <View style = {styles.container}>
          <Image style = {styles.image} source={{uri: rowData.images.small}}></Image>
          <View style = {styles.rowRight}>
            <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={[styles.title]}>{rowData.title}</Text>
              <Text style={{color:'rgb(255,188,0)', fontSize:18}}>
                {rowData.rating.average}分
              </Text>
            </View>
            <Text style={{marginTop:18, color:'#aaa', fontSize: 13}}>
              类型：{rowData.genres.join(', ')}
            </Text>
            <Text style={{marginTop:4, color:'#aaa', fontSize: 13}}>
              主演：{rowData.casts.map((s)=>s.name).join('/')}
            </Text>
          </View>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
    margin: 10,
    height: 120,
    borderColor: '#000',
    borderWidth: 0.5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  image: {
    marginTop: 10,
    marginLeft: 16,
    width: 70,
    height: 90,
  },
  rowRight: {
    flex: 1,
    marginLeft: 18,
    marginTop: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: '#000',
  }

});