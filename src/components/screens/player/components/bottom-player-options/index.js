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

type Props = {
  downloadingList: Array<number>,
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
      downloadingList,
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
          downloadingList={downloadingList}
          removePodcast={removePodcast}
          player={player}
        />
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={this.props.clearAllLocalPodcastsReferences}
            style={{
              width: 80,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f0f',
            }}
          >
            <Text>CLEAR</Text>
          </TouchableOpacity>
        </View>
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
  downloadingList: state.localPodcastsManager.downloadingList,
  player: state.player,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BottomPlayerOptionsContainer);
