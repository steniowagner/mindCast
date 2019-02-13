// @flow

import React from 'react';
import Sound from 'react-native-video';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

type PlayerProps = {
  paused: boolean,
};

type Props = {
  setCurrentTime: Function,
  nextPodcast: Function,
  player: PlayerProps,
};

const SoundComponent = ({
  setCurrentTime,
  nextPodcast,
  player,
}: Props): Object => {
  const { paused } = player;

  return (
    <Sound
      source={require('./teste.mp3')}
      playInBackground
      paused={paused}
      repeat={false}
      audioOnly
      rate={1.0}
      ignoreSilentSwitch="ignore"
      onLoad={() => console.tron.log('loaded')}
      onProgress={({ currentTime }) => setCurrentTime(currentTime)}
      onEnd={() => nextPodcast()}
    />
  );
};

const mapDispatchToProps = dispatch => bindActionCreators(PlayerCreators, dispatch);

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SoundComponent);
