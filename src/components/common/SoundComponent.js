// @flow

import React from 'react';
import Sound from 'react-native-video';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

type PlayerProps = {
  currentPodcast: Object,
  paused: boolean,
};

type Props = {
  setCurrentTime: Function,
  playNext: Function,
  player: PlayerProps,
};

const SoundComponent = ({
  setCurrentTime,
  playNext,
  player,
}: Props): Object => {
  const { currentPodcast, paused } = player;

  const isPodcastDefined = !!currentPodcast
    && !!currentPodcast.uri
    && typeof currentPodcast.uri === 'string';

  return isPodcastDefined ? (
    <Sound
      source={{
        uri: currentPodcast.uri,
      }}
      onError={() => {}}
      onBuffer={() => console.tron.log('onBuffer')}
      playInBackground
      paused={paused}
      repeat={false}
      audioOnly
      rate={1.0}
      ignoreSilentSwitch="ignore"
      onLoad={() => console.tron.log('onLoad')}
      onProgress={({ currentTime }) => setCurrentTime(currentTime)}
      onEnd={() => playNext()}
    />
  ) : null;
};

const mapDispatchToProps = dispatch => bindActionCreators(PlayerCreators, dispatch);

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SoundComponent);
