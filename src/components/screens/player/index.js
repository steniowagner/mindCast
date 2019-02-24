// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';
import { Creators as LocalPodcastsManagerCreators } from '~/store/ducks/localPodcastsManager';

import PlayerComponent from './components';

type PlayerProps = {
  currentPodcast: Object,
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
  playNext: Function,
  pause: Function,
  play: Function,
};

class PlayerContainer extends Component<Props, {}> {
  componentDidMount() {
    const { setPodcastsDownloadedList, setPodcast } = this.props;

    setPodcastsDownloadedList();

    setTimeout(() => setPodcast(), 1000);
  }

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
