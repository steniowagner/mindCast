// @flow

import React, { Component } from 'react';
import Sound from 'react-native-video';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

type PlayerProps = {
  shouldSeekProgressSlider: boolean,
  shouldRepeatCurrent: boolean,
  currentPodcast: Object,
  seekValue: number,
  paused: boolean,
};

type Props = {
  seekProgressTimerSuccess: Function,
  setCurrentTime: Function,
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

  /** onError={() => console.tron.log('err')}
        onLoad={() => console.tron.log('onLoad')}
        onBuffer={() => console.tron.log('onBuffer')} */

  render() {
    const { setCurrentTime, playNext, player } = this.props;
    const { currentPodcast, shouldRepeatCurrent, paused } = player;

    const isPodcastDefined = !!currentPodcast
      && !!currentPodcast.uri
      && typeof currentPodcast.uri === 'string';

    return isPodcastDefined ? (
      <Sound
        source={{
          uri: currentPodcast.uri,
        }}
        playInBackground
        ref={(ref) => {
          this._soundRef = ref;
        }}
        paused={paused}
        repeat={shouldRepeatCurrent}
        audioOnly
        rate={1.0}
        ignoreSilentSwitch="ignore"
        onProgress={({ currentTime }) => setCurrentTime(currentTime)}
        onEnd={() => {
          if (!shouldRepeatCurrent) {
            playNext();
          }
        }}
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
