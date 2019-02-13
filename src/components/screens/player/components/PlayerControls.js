// @flow

import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

import { View, TouchableOpacity, Text } from 'react-native';

type PlayerProps = {
  paused: boolean,
};

type Props = {
  previousPodcast: Function,
  pausePodcast: Function,
  nextPodcast: Function,
  playPodcast: Function,
  player: PlayerProps,
};

const getMainButtonConfig = (
  playPodcast: Function,
  pausePodcast: Function,
  paused: boolean,
): Object => {
  const mainButtonConfig = {
    paused: {
      text: 'PLAYING',
      action: pausePodcast,
    },

    playing: {
      text: 'PAUSED',
      action: playPodcast,
    },
  };

  return paused ? mainButtonConfig.playing : mainButtonConfig.paused;
};

const PlayerControls = ({
  previousPodcast,
  pausePodcast,
  nextPodcast,
  playPodcast,
  player,
}: Props): Object => {
  const { paused, currentTime } = player;
  const { text, action } = getMainButtonConfig(
    playPodcast,
    pausePodcast,
    paused,
  );

  return (
    <View
      style={{
        width: '100%',
        height: '50%',
      }}
    >
      <View
        style={{
          width: '100%',
          height: 60,
          backgroundColor: '#f0f',
        }}
      >
        <Text>{currentTime}</Text>
      </View>
      <View
        style={{
          width: '100%',
          height: 80,
          backgroundColor: '#f00',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => previousPodcast()}
        >
          <Text>PREVIOUS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => action()}
        >
          <Text>{text}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => nextPodcast()}
        >
          <Text>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators(PlayerCreators, dispatch);

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerControls);
