// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import HandlePodcastInPlaylists from './components/HandlePodcastInPlaylists';
import ShufflePlaylist from './components/ShufflePlaylist';
import Download from './components/Download';
import Repeat from './components/Repeat';

type PlayerProps = {
  isCurrentPodcastDownloaded: boolean,
  shouldShufflePlaylist: boolean,
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
  currentPodcast: Object,
};

const Wrapper = styled(View)`
  width: 100%;
  height: 30px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
`;

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
      localPodcastsManager,
      disableRepetition,
      setRepeatPlaylist,
      setRepeatCurrent,
      downloadPodcast,
      shufflePlaylist,
      removePodcast,
      player,
    } = this.props;

    const {
      isCurrentPodcastDownloaded,
      shouldShufflePlaylist,
      shouldRepeatPlaylist,
      shouldRepeatCurrent,
      currentPodcast,
    } = player;

    return (
      <Wrapper>
        <ShufflePlaylist
          shouldShufflePlaylist={shouldShufflePlaylist}
          shufflePlaylist={shufflePlaylist}
        />
        <Repeat
          shouldRepeatPlaylist={shouldRepeatPlaylist}
          shouldRepeatCurrent={shouldRepeatCurrent}
          disableRepetition={disableRepetition}
          setRepeatPlaylist={setRepeatPlaylist}
          setRepeatCurrent={setRepeatCurrent}
        />
        <Download
          isCurrentPodcastDownloaded={isCurrentPodcastDownloaded}
          localPodcastsManager={localPodcastsManager}
          downloadPodcast={downloadPodcast}
          currentPodcast={currentPodcast}
          removePodcast={removePodcast}
        />
        <HandlePodcastInPlaylists
          onToggleAddPodcastToPlaylistModal={
            this.onToggleAddPodcastToPlaylistModal
          }
        />
      </Wrapper>
    );
  }
}

export default BottomPlayerOptionsContainer;
