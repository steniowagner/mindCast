// @flow

import React, { PureComponent } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import PlaylistList from '~/components/common/playlists-list/PlaylistsListContainer';
import HandlePodcastInPlaylists from './components/HandlePodcastInPlaylists';
import ShufflePlaylist from './components/ShufflePlaylist';
import Download from './components/Download';
import Repeat from './components/Repeat';

import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  height: 30px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
`;

type LocalPodcastsManagerProps = {
  podcastsDownloaded: Array<Object>,
  downloadingList: Array<Object>,
};

type Props = {
  localPodcastsManager: LocalPodcastsManagerProps,
  isCurrentPodcastDownloaded: boolean,
  shouldShufflePlaylist: boolean,
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
  disableRepetition: Function,
  setRepeatPlaylist: Function,
  setRepeatCurrent: Function,
  downloadPodcast: Function,
  shufflePlaylist: Function,
  removePodcast: Function,
  playlist: Array<Object>,
  currentPodcast: Object,
  playlistIndex: number,
};

type State = {
  isAddPlaylistModalOpen: boolean,
};

class BottomPlayerOptionsContainer extends PureComponent<Props, State> {
  state = {
    isAddPlaylistModalOpen: false,
  };

  onToggleAddPlaylistModal = (): void => {
    const { isAddPlaylistModalOpen } = this.state;

    this.setState({
      isAddPlaylistModalOpen: !isAddPlaylistModalOpen,
    });
  };

  render() {
    const { isAddPlaylistModalOpen } = this.state;

    const {
      isCurrentPodcastDownloaded,
      shouldShufflePlaylist,
      localPodcastsManager,
      shouldRepeatPlaylist,
      shouldRepeatCurrent,
      disableRepetition,
      setRepeatPlaylist,
      setRepeatCurrent,
      downloadPodcast,
      shufflePlaylist,
      removePodcast,
      playlistIndex,
      playlist,
      currentPodcast,
    } = this.props;

    const iconSize = appStyles.metrics.getWidthFromDP('6%');

    return (
      <Wrapper>
        <ShufflePlaylist
          shouldShufflePlaylist={shouldShufflePlaylist}
          shufflePlaylist={shufflePlaylist}
          iconSize={iconSize}
        />
        <Repeat
          shouldRepeatPlaylist={shouldRepeatPlaylist}
          shouldRepeatCurrent={shouldRepeatCurrent}
          disableRepetition={disableRepetition}
          setRepeatPlaylist={setRepeatPlaylist}
          setRepeatCurrent={setRepeatCurrent}
          iconSize={iconSize}
        />
        <Download
          isCurrentPodcastDownloaded={isCurrentPodcastDownloaded}
          localPodcastsManager={localPodcastsManager}
          currentPodcast={currentPodcast}
          downloadPodcast={downloadPodcast}
          removePodcast={removePodcast}
          iconSize={iconSize}
        />
        <HandlePodcastInPlaylists
          onToggleAddPlaylistModal={this.onToggleAddPlaylistModal}
          iconSize={iconSize}
        />
        {isAddPlaylistModalOpen && (
          <PlaylistList
            onToggleModal={this.onToggleAddPlaylistModal}
            podcast={currentPodcast}
          />
        )}
      </Wrapper>
    );
  }
}

export default BottomPlayerOptionsContainer;
