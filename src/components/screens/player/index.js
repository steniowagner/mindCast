// @flow

import React, { Component } from 'react';
import { View } from 'react-native';

import PlayerControls from './components/PlayerControls';

class Player extends Component<{}, {}> {
  componentDidMount() {
    console.tron.log('');
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PlayerControls />
      </View>
    );
  }
}

export default Player;
