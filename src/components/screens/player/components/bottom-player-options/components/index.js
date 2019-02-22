// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import HandlePodcastInPlaylists from './HandlePodcastInPlaylists';
import ShufflePlaylist from './ShufflePlaylist';
import Download from './Download';
import Repeat from './Repeat';

const Wrapper = styled(View)`
  width: 100%;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  align-self: flex-end;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
`;

type PlayerProps = {
  isCurrentPodcastDownloaded: boolean,
  shouldShufflePlaylist: boolean,
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
  currentPodcast: Object,
};

type Props = {
  onToggleAddPodcastToPlaylistModal: Function,
  downloadingList: Array<number>,
  setRepeatPlaylist: Function,
  disableRepetition: Function,
  setRepeatCurrent: Function,
  downloadPodcast: Function,
  shufflePlaylist: Function,
  removePodcast: Function,
  player: PlayerProps,
};

const BottomPlayerOptions = ({
  onToggleAddPodcastToPlaylistModal,
  setRepeatPlaylist,
  disableRepetition,
  setRepeatCurrent,
  downloadPodcast,
  shufflePlaylist,
  removePodcast,
  downloadingList,
  player,
}: Props): Object => {
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
        downloadPodcast={downloadPodcast}
        downloadingList={downloadingList}
        currentPodcast={currentPodcast}
        removePodcast={removePodcast}
      />
      <HandlePodcastInPlaylists
        onToggleAddPodcastToPlaylistModal={onToggleAddPodcastToPlaylistModal}
      />
    </Wrapper>
  );
};

export default BottomPlayerOptions;
