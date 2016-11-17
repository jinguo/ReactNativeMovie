'use strict';
import React, { Component } from 'react';
import {
  StyleSheet, Text, Image, ListView, ActivityIndicator, View, TouchableHighlight,
} from 'react-native';

const API_THEATERS = 'https://api.douban.com/v2/movie/in_theaters';

class HotMoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      }),
      loaded: false,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let response = await fetch(API_THEATERS);
    let responseJson = await response.json();
    let responseData = responseJson.subjects;
    console.log('responseData' + JSON.stringify(responseData));
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(responseData),
      loaded: true,
    });
  }

  render () {
    if (!this.state.loaded) {
      return this.renderLoading();
    } else {
      return this.renderList();
    }
  }

    renderLoading() {
      return (
          <View style={[styles.box, {alignItems:'center', flex:1}]}>
            <ActivityIndicator
                style={[{margin:10}, {backgroundColor:'#0000'}, {height: 80}]}
                color="#000"
                size="large"
            >
            </ActivityIndicator>
          </View>
      );
    }

  renderList() {
    return (
        <View style = {{flex: 1}}>
          <ListView
              dataSource = {this.state.dataSource}
              renderRow = {this._renderItem.bind(this)}
          />
        </View>
    );
  }

  _renderItem(rowData) {
    return (
        <TouchableHighlight>
          <View style = {styles.boxRow}>
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
                主演：{rowData.casts.map((cast)=>cast.name).join('/')}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({

  box: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  boxRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#ffff',
    padding: 10,
    borderBottomWidth:0.5,
    borderBottomColor:'#eee',
  },
  rowRight: {
    flex: 1,
    height: 100,
    paddingTop: 5,
    paddingLeft: 10,
  },
  image: {
    width: 78,
    height: 106,
  },
  title: {
    fontSize: 20,
    color: '#000',
  }
});

export default HotMoviesList;