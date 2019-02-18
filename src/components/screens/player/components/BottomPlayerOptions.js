// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as FileManagerCreators } from '~/store/ducks/fileManager';
import { Creators as PlayerCreators } from '~/store/ducks/player';

type PlayerProps = {
  shouldShufflePlaylist: boolean,
};

type Props = {
  downloadPodcast: Function,
  shufflePlaylist: Function,
  removePodcast: Function,
  player: PlayerProps,
};

const BottomPlayerOptions = (x): Object => {
  const {
    shouldShufflePlaylist,
    shouldRepeatCurrent,
    currentPodcast,
  } = x.player;
  const {
    downloadPodcast,
    removePodcast,
    shufflePlaylist,
    setRepeatCurrent,
  } = x;

  return (
    <View
      style={{
        width: '100%',
        height: 80,
        backgroundColor: '#00f',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 24,
      }}
    >
      <TouchableOpacity
        onPress={() => shufflePlaylist()}
      >
        <Text
          style={{
            color: shouldShufflePlaylist ? 'white' : 'black',
          }}
        >
          ALEAT
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setRepeatCurrent()}
      >
        <Text
          style={{
            color: shouldRepeatCurrent ? 'white' : 'black',
          }}
        >
          REP
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => downloadPodcast(currentPodcast)}
      >
        <Text>DOWN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {}}
      >
        <Text>ADD PLIST</Text>
      </TouchableOpacity>
    </View>
  );
};

const Creators = Object.assign({}, FileManagerCreators, PlayerCreators);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BottomPlayerOptions);
