// @flow

import React from 'react';

import { View, Text } from 'react-native';
import { connect } from 'react-redux';

type Props = {
  player: Object,
};

const CurrentPodcast = ({ player }: Props): Object => (
  <View
    style={{
      width: '100%',
      height: 60,
      backgroundColor: '#a64dff',
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        color: '#66ff66',
        fontSize: 18,
      }}
    >
      {player.currentPodcast.author}
    </Text>
    <Text
      style={{
        color: '#ff33ff',
        fontSize: 24,
      }}
    >
      {player.currentPodcast.title}
    </Text>
  </View>
);

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps)(CurrentPodcast);
