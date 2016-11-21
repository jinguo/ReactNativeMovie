'use strict';
import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  ListView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Image,
  Text,
} from 'react-native';
import MovieContent from './MovieContent';
import Animation from '../view/Animation';

const API_TOP = 'https://api.douban.com/v2/movie/top250';
export default class Recommend extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      data: null,
      loaded: false,
      isRefreshing: false,
      loadMore: false,
      start: 0,
      count: 20,
    };
    this.naprop = this.props;
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let response = await fetch(API_TOP + '?count=' + this.state.count + '&start=0');
    let responseJson = await response.json();
    let responseData = responseJson.subjects;
    this.setState({
      data: responseData,
      dataSource: this.state.dataSource.cloneWithRows(responseData),
      loaded: true,
      isRefreshing: false,
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
   return(
       <View style = {styles.box}>
         <ActivityIndicator
         style = {[{margin: 10}, {backgroundColor:'#0000'}, {height: 80}]}
         >
         </ActivityIndicator>
       </View>
   );
  }

  renderList() {
    return(
        <View>
          <ListView
              dataSource = {this.state.dataSource}
              renderRow = {this._renderItem.bind(this)}
              onEndReached={this._loadMore.bind(this)}
              renderFooter={this._renderFooter.bind(this)}
              onEndReachedThreshold = {29}
              refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._refresh.bind(this)}
                    tintColor='#aaaaaa'
                    title='Loading...'
                    progressBackgroundColor='#aaaaaa'/>
              }
          >
          </ListView>
        </View>
    );
  }

  async _refresh() {
    this.setState({isRefreshing: true});
    this.fetchData();
  }

  async _loadMore() {
    if (this.state.loadMore) {
      return;
    }
    // this.setState({count: this.state.count +10, start: this.state.start + 10, loadMore: true});
    // let urlMore = API_TOP + '?count=' + this.state.count + 10+ '&start=' + this.state.start +10;
    // let responseMore = await fetch(urlMore);
    // let responseJsonMore = await responseMore.json();
    // console.log('api'+API_TOP + '?count=' + this.state.count + '&start=' + this.state.start+'count:'+this.state.count+'start='+this.state.start+'responseJson'+JSON.stringify(responseJsonMore));
    // // let responseData = [...this.state.data, ...responseJson];
    // this.setState({
    //   // data: responseData,
    //   dataSource: this.state.dataSource.cloneWithRows(responseJsonMore),
    //   loadMore: false,
    // });
  }

  _renderFooter () {
    return (
        this.state.loadMore
            ? (<View style={[styles.indicatorWrapper]}>
          <Animation timingLength = {50} duration = {500} bodyColor={'#aaaaaa'}/>
        </View>)
            : null
    );
  }

  _renderItem(rowData) {
    return (
        <TouchableOpacity
            onPress={() => this._onPress(rowData)}
        >
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
        </TouchableOpacity>
    );
  }

  _onPress(rowData) {
    let {navigator} = this.naprop;
    if(navigator){
      navigator.push({
        component: MovieContent,
        params: {
          id: rowData.id,
        }
      });
    }
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
  box: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
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
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    color: '#000',
  },
  indicatorWrapper: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252528'
  },

});