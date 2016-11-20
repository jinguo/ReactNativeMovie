'use strict';
import React, { Component } from 'react';

import {
  View,
  Image,
  Text,
  ListView,
  ScrollView,
} from 'react-native';

const API_DETAIL = "https://api.douban.com/v2/movie/subject/";

export default class MovieContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      movie: null,
      loaded: false,
    };
    this.naprop = props;
  }
  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let url = API_DETAIL + this.naprop.id;
    let response = await fetch(url);
    let responsejson = await response.json();
    this.setState({
      loaded: true,
      movie: responsejson,
    });
  }

  render() {
    var dataSource = this.state.loaded?new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(this.state.movie.casts):null;
    var dataSource2 = this.state.loaded?new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(new Array(5).fill(this.state.movie.images.large)):null;
    return (
        <ScrollView style={{backgroundColor:'rgb(245,245,245)', flex:1}}>
          <View style={{backgroundColor:'rgb(245,245,245)', flex:1}}>
            <View style={{backgroundColor:'rgb(243,77,65)', height:240, padding:10, paddingTop:20, paddingBottom:20, flexDirection:'row'}}>
              <Image
                  style={{width:130, height:200, borderColor:'#fff', borderWidth:1, borderRadius:3}}
                  source={ this.state.loaded ? {uri: this.state.movie.images.large} : require('../images/1.jpg') } />
              <View style={{flex:1, justifyContent:'space-between', marginLeft:10, paddingBottom:20}}>
                <Text umberOfLines={1} style={{color:'#fff', fontSize:24}}>
                  {this.state.loaded?this.state.movie.title:''}
                </Text>
                <Text numberOfLines={1} style={{color:'#fff', fontSize:14}}>
                  {this.state.loaded?this.state.movie.aka[this.state.movie.aka.length-1]:''}
                </Text>
                <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                  <Text style={{color:'rgb(255,198,0)', fontSize:24, lineHeight:28}}>
                    {this.state.loaded?this.state.movie.rating.average:''}
                  </Text>
                  <Text style={{color:'#fff', fontSize:12, marginLeft:2}}>
                    ({this.state.loaded?this.state.movie.ratings_count:''}评分)
                  </Text>
                </View>
                <Text style={{color:'#fff', fontSize:14}}>
                  {this.state.loaded?this.state.movie.genres:''}
                </Text>
                <Text style={{color:'#fff', fontSize:14}}>
                  {this.state.loaded?this.state.movie.countries:''}
                </Text>
                <Text style={{color:'#fff', fontSize:14}}>
                  {this.state.loaded?this.state.movie.year:''}
                </Text>
              </View>
            </View>
            <View style={{backgroundColor:'#fff', alignItems:'center', paddingBottom:5}}>
              <Text numberOfLines={this.state.summaryMore?100:3} style={{lineHeight:25, color:'#000', fontSize:16, marginLeft:10, marginRight:10, marginTop:15}}>
                {this.state.loaded?this.state.movie.summary:'\n\n\n\n'}
              </Text>
              {this.state.summaryMore?<View/>:<Text onPress={()=>this.setState({summaryMore:!this.state.summaryMore})} style={{height:20}}>{this.state.summaryMore?'收起 ▲':'展开 ▼'}</Text>}
            </View>
            <View style={{backgroundColor:'#fff', marginTop:20}}>
              <View style={{flexDirection:'row', margin:10}}>
                <Text style={{color:'#000', fontSize:16, width:70}}>
                  导演
                </Text>
                <Text style={{color:'#000', fontSize:16, marginLeft:10}}>
                  主演
                </Text>
              </View>
              <View style={{flexDirection:'row', marginLeft:10}}>
                <View style={{}}>
                  <Image
                      style={{width:70, height:100}}
                      source={ this.state.loaded ? {uri: this.state.movie.directors[0].avatars.medium} : require('../images/1.jpg') } />

                  <Text style={{color:'#888', fontSize:14, marginTop:7}}>
                    {this.state.loaded?this.state.movie.directors[0].name:''}
                  </Text>
                </View>

                {this.state.loaded?
                    <ListView
                        style={{marginLeft:10}}
                        showsHorizontalScrollIndicator ={false}
                        horizontal={true}
                        dataSource={dataSource}
                        renderRow={(cast) => {
                          return (
                              <View style={{marginRight:10}}>
                                <Image
                                    style={{width:70, height:100}}
                                    source={  {uri: cast.avatars.medium} } />

                                <Text style={{color:'#888', fontSize:14, marginTop:7}}>
                                  {cast.name}
                                </Text>
                              </View>
                          );
                        }
                        }
                    />:<View/>}
              </View>
            </View>
            <View style={{backgroundColor:'#fff', marginTop:20}}>
              <View style={{flexDirection:'row', margin:10}}>
                <Text style={{color:'#000', fontSize:16, width:70}}>
                  剧照
                </Text>
              </View>
              {this.state.loaded?
                  <ListView

                      style={{marginLeft:10}}
                      showsHorizontalScrollIndicator ={false}
                      horizontal={true}
                      dataSource={dataSource2}
                      renderRow={(img) => {
                        return (
                            <View style={{marginRight:10}}>
                              <Image
                                  style={{width:105, height:150}}
                                  source={  {uri: img} } />

                            </View>
                        );
                      }
                      }
                  />:<View/>
              }
            </View>
          </View>
        </ScrollView>
    );
  }
}