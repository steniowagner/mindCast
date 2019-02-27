// @flow

import React, { Component } from 'react';
import Sound from 'react-native-video';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

type PlayerProps = {
  shouldSeekProgressSlider: boolean,
  shouldRepeatCurrent: boolean,
  playlist: Array<Object>,
  currentPodcast: Object,
  playlistIndex: number,
  seekValue: number,
  paused: boolean,
};

type Props = {
  seekProgressTimerSuccess: Function,
  setCurrentTime: Function,
  setPodcast: Function,
  player: PlayerProps,
  playNext: Function,
};

class SoundComponent extends Component<Props, {}> {
  _soundRef: Object = null;

  componentWillReceiveProps(nextProps) {
    const { seekProgressTimerSuccess, player } = nextProps;
    const { shouldSeekProgressSlider, seekValue } = player;

    if (shouldSeekProgressSlider) {
      this._soundRef.seek(seekValue, 50);
      seekProgressTimerSuccess(seekValue);
    }
  }

  /*
    onLoad={() => console.tron.log('onLoad')}
    onBuffer={() => console.tron.log('onBuffer')}
  */

  onEnd = (): void => {
    const { setPodcast, player, playNext } = this.props;
    const {
      shouldRepeatCurrent,
      currentPodcast,
      playlist,
      playlistIndex,
    } = player;

    if (!shouldRepeatCurrent) {
      playNext();
      return;
    }

    const currentPodcastChangedURI = currentPodcast.uri !== playlist[playlistIndex].uri;

    if (currentPodcastChangedURI) {
      setPodcast();
    }
  };

  render() {
    const { setCurrentTime, player } = this.props;
    const { currentPodcast, shouldRepeatCurrent, paused } = player;

    const isPodcastDefined = !!currentPodcast.uri && typeof currentPodcast.uri === 'string';
    console.tron.log('SOUND-COMPONENT');
    return isPodcastDefined ? (
      <Sound
        onProgress={({ currentTime }) => {
          if (!paused) {
            setCurrentTime(currentTime);
          }
        }}
        onError={() => console.tron.log('currentPodcast')}
        onEnd={this.onEnd}
        source={{
          uri: currentPodcast.uri,
        }}
        ref={(ref) => {
          this._soundRef = ref;
        }}
        repeat={shouldRepeatCurrent}
        ignoreSilentSwitch="ignore"
        playInBackground
        paused={paused}
        rate={1.0}
        audioOnly
      />
    ) : null;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(PlayerCreators, dispatch);

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SoundComponent);
