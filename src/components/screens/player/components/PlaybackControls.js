// @flow

import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

import { View, TouchableOpacity, Text } from 'react-native';

type PlaybackProps = {
  paused: boolean,
};

type Props = {
  previousPodcast: Function,
  pausePodcast: Function,
  playNext: Function,
  playPodcast: Function,
  player: PlaybackProps,
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

const PlaybackControls = ({
  previousPodcast,
  pausePodcast,
  playNext,
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
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f',
        }}
      >
        <Text
          style={{
            fontSize: 28,
          }}
        >
          {currentTime}
        </Text>
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
          onPress={() => playNext()}
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
)(PlaybackControls);
