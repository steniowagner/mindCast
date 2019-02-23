// @flow

import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as LocalPodcastsManagerCreators } from '~/store/ducks/localPodcastsManager';
import { Creators as PlayerCreators } from '~/store/ducks/player';

import BottomPlayerOptionsComponent from './components';

type PlayerProps = {
  isCurrentPodcastDownloaded: boolean,
  shouldShufflePlaylist: boolean,
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
  currentPodcast: Object,
};

type LocalPodcastsManagerProps = {
  podcastsDownloaded: Array<Object>,
  downloadingList: Array<Object>,
};

type Props = {
  localPodcastsManager: LocalPodcastsManagerProps,
  disableRepetition: Function,
  setRepeatPlaylist: Function,
  setRepeatCurrent: Function,
  downloadPodcast: Function,
  shufflePlaylist: Function,
  removePodcast: Function,
  player: PlayerProps,
};

type State = {
  isAddPodcastToPlaylistModalOpen: boolean,
};

class BottomPlayerOptionsContainer extends Component<Props, State> {
  state = {
    isAddPodcastToPlaylistModalOpen: false,
  };

  onToggleAddPodcastToPlaylistModal = (): void => {
    const { isAddPodcastToPlaylistModalOpen } = this.state;

    this.setState({
      isAddPodcastToPlaylistModalOpen: !isAddPodcastToPlaylistModalOpen,
    });
  };

  render() {
    const {
      disableRepetition,
      setRepeatPlaylist,
      setRepeatCurrent,
      downloadPodcast,
      shufflePlaylist,
      localPodcastsManager,
      removePodcast,
      player,
    } = this.props;

    return (
      <Fragment>
        <BottomPlayerOptionsComponent
          onToggleAddPodcastToPlaylistModal={
            this.onToggleAddPodcastToPlaylistModal
          }
          disableRepetition={disableRepetition}
          setRepeatPlaylist={setRepeatPlaylist}
          setRepeatCurrent={setRepeatCurrent}
          downloadPodcast={downloadPodcast}
          shufflePlaylist={shufflePlaylist}
          localPodcastsManager={localPodcastsManager}
          removePodcast={removePodcast}
          player={player}
        />
      </Fragment>
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
)(BottomPlayerOptionsContainer);
