// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import PlaylistList from '~/components/common/playlists-list/PlaylistsListContainer';
import AddPodcastPlaylist from './components/AddPodcastPlaylist';
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

type Props = {
  isCurrentPodcastDownloaded: boolean,
  onToggleAddPlaylistModal: Function,
  shouldShufflePlaylist: boolean,
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
  disableRepetition: Function,
  setRepeatPlaylist: Function,
  setRepeatCurrent: Function,
  shufflePlaylist: Function,
  playlist: Array<Object>,
  currentPodcast: Object,
  playlistIndex: number,
};

const BottomPlayerOptions = ({
  isCurrentPodcastDownloaded,
  onToggleAddPlaylistModal,
  shouldShufflePlaylist,
  shouldRepeatPlaylist,
  shouldRepeatCurrent,
  disableRepetition,
  setRepeatPlaylist,
  setRepeatCurrent,
  shufflePlaylist,
  currentPodcast,
  playlistIndex,
  playlist,
}: Props): Object => (
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
      currentPodcast={currentPodcast}
    />
    <AddPodcastPlaylist
      onToggleAddPlaylistModal={onToggleAddPlaylistModal}
    />
  </Wrapper>
);

export default BottomPlayerOptions;
