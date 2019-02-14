// @flow

import React from 'react';
import Sound from 'react-native-video';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

type PlayerProps = {
  currentPodcastURI: Object,
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
  const { currentPodcastURI, paused } = player;
  console.tron.log(currentPodcastURI);
  return currentPodcastURI ? (
    <Sound
      source={{
        uri: currentPodcastURI,
      }}
      onError={() => console.tron.log('errr')}
      onBuffer={() => console.tron.log('onBuffer')}
      playInBackground
      paused={false}
      repeat={false}
      audioOnly
      rate={1.0}
      ignoreSilentSwitch="ignore"
      onLoad={() => console.tron.log('onLoad')}
      onProgress={({ currentTime }) => setCurrentTime(currentTime)}
      onEnd={() => nextPodcast()}
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
