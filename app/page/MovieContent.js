'use strict';
import React, { Component } from 'react';

import {
  View,
  Text,
} from 'react-native';

export default class MovieContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
    this.naprop = props;
  }
  componentDidMount() {
    this.setState({
      id: this.naprop.id,
    });
  }
  render() {
    return(
        <View>
          <Text style = {{marginTop: 20}}>
            {this.state.id}
          </Text>
        </View>
    );
  }
}