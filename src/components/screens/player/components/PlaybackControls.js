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
  playPrevious: Function,
  player: PlaybackProps,
  playNext: Function,
  pause: Function,
  play: Function,
};

const getMainButtonConfig = (
  play: Function,
  pause: Function,
  paused: boolean,
): Object => {
  const mainButtonConfig = {
    paused: {
      text: 'PLAYING',
      action: pause,
    },

    playing: {
      text: 'PAUSED',
      action: play,
    },
  };

  return paused ? mainButtonConfig.playing : mainButtonConfig.paused;
};

const PlaybackControls = ({
  playPrevious,
  pause,
  playNext,
  play,
  player,
}: Props): Object => {
  const { paused, currentTime } = player;
  const { text, action } = getMainButtonConfig(play, pause, paused);

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
          onPress={() => playPrevious()}
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
