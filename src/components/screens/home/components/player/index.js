// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';
import { Creators as LocalPodcastsManagerCreators } from '~/store/ducks/localPodcastsManager';

import HeaderRightButton from './components/HeaderRightButton';
import PlayerComponent from './components';
import CONSTANTS from '~/utils/CONSTANTS';

type PlayerProps = {
  isCurrentPodcastDownloaded: boolean,
  shouldSeekProgressSlider: boolean,
  shouldShufflePlaylist: boolean,
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
  currentTimeInSeconds: number,
  playlist: Array<Object>,
  playlistIndex: number,
  currentPodcast: Object,
  currentTime: string,
  paused: boolean,
};

type LocalPodcastManagerProps = {
  podcastsDownloaded: Array<Object>,
  downloadingList: Array<Object>,
};

type Props = {
  localPodcastsManager: LocalPodcastManagerProps,
  seekProgressTimer: Function,
  disableRepetition: Function,
  setRepeatPlaylist: Function,
  setRepeatCurrent: Function,
  downloadPodcast: Function,
  shufflePlaylist: Function,
  removePodcast: Function,
  playPrevious: Function,
  setPodcast: Function,
  player: PlayerProps,
  navigation: Object,
  playNext: Function,
  pause: Function,
  play: Function,
};

class PlayerContainer extends Component<Props, {}> {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <HeaderRightButton
        onPress={() => {
          const { state } = navigation;
          const isNavigationParamsDefined = !!state && !!state.params;

          if (isNavigationParamsDefined) {
            const onPressHeaderRightButton = state.params[CONSTANTS.BUTTON_RIGHT_PLAYER_ACTION];

            onPressHeaderRightButton();
          }
        }}
      />
    ),
  });

  componentDidMount() {
    const { setPodcast } = this.props;

    setPodcast();

    this.setHeaderRightButtonPressAction();
  }

  setHeaderRightButtonPressAction = (): void => {
    const { navigation } = this.props;

    navigation.setParams({
      [CONSTANTS.BUTTON_RIGHT_PLAYER_ACTION]: this.onPressHeaderRightButton,
    });
  };

  onPressHeaderRightButton = (): void => {
    console.tron.log('onPressHeaderRightButton');
  };

  render() {
    const {
      localPodcastsManager,
      disableRepetition,
      seekProgressTimer,
      setRepeatPlaylist,
      setRepeatCurrent,
      downloadPodcast,
      shufflePlaylist,
      removePodcast,
      playPrevious,
      playNext,
      player,
      pause,
      play,
    } = this.props;

    return (
      <PlayerComponent
        localPodcastsManager={localPodcastsManager}
        disableRepetition={disableRepetition}
        setRepeatPlaylist={setRepeatPlaylist}
        seekProgressTimer={seekProgressTimer}
        setRepeatCurrent={setRepeatCurrent}
        downloadPodcast={downloadPodcast}
        shufflePlaylist={shufflePlaylist}
        removePodcast={removePodcast}
        playPrevious={playPrevious}
        playNext={playNext}
        player={player}
        pause={pause}
        play={play}
      />
    );
  }
}

const Creators = Object.assign(
  {},
  LocalPodcastsManagerCreators,
  PlayerCreators,
);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  localPodcastsManager: state.localPodcastsManager,
  player: state.player,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerContainer);
