// @flow

import React from 'react';
import { StatusBar, View } from 'react-native';
import styled from 'styled-components';

import BottomPlayerOptions from './bottom-player-options/BottomPlayerOptions';
import PodcastTextContent from './PodcastTextContent';
import BackgroundImage from './BackgroundImage';
import ProgressSlider from './ProgressSlider';
import PlayerControls from './PlayerControls';
import PodcastImage from './PodcastImage';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  justify-content: space-between;
`;

const UpperSection = styled(View)`
  padding-top: ${({ theme }) => theme.metrics.getHeightFromDP('12%')}px;
`;

const BottomSection = styled(View)`
  padding-bottom: ${({ theme }) => theme.metrics.getHeightFromDP('3.5%')}px;
`;

type Props = {
  isCurrentPodcastDownloaded: boolean,
  onToggleAddPlaylistModal: Function,
  isAddPlaylistModalOpen: boolean,
  isAddPlaylistModalOpen: boolean,
  shouldShufflePlaylist: boolean,
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
  seekProgressTimer: Function,
  disableRepetition: Function,
  setRepeatPlaylist: Function,
  setRepeatCurrent: Function,
  shufflePlaylist: Function,
  playlist: Array<Object>,
  currentPodcast: Object,
  playPrevious: Function,
  playlistIndex: number,
  playNext: Function,
  pause: Function,
  paused: boolean,
  play: Function,
};

const PlayerComponent = ({
  isCurrentPodcastDownloaded,
  onToggleAddPlaylistModal,
  isAddPlaylistModalOpen,
  shouldShufflePlaylist,
  shouldRepeatPlaylist,
  shouldRepeatCurrent,
  seekProgressTimer,
  disableRepetition,
  setRepeatPlaylist,
  setRepeatCurrent,
  shufflePlaylist,
  currentPodcast,
  playlistIndex,
  playPrevious,
  playNext,
  playlist,
  paused,
  pause,
  play,
}: Props): Object => (
  <Wrapper>
    <StatusBar
      backgroundColor="#111"
      barStyle="light-content"
      animated
    />
    <BackgroundImage
      imageURL={currentPodcast.thumbnailImageURL}
    />
    <UpperSection>
      <PodcastImage
        thumbnailImageURL={currentPodcast.thumbnailImageURL}
        imageURL={currentPodcast.imageURL}
      />
      <PodcastTextContent
        author={currentPodcast.author.name}
        title={currentPodcast.title}
      />
      <ProgressSlider
        seekProgressTimer={seekProgressTimer}
      />
      <PlayerControls
        playPrevious={playPrevious}
        playNext={playNext}
        paused={paused}
        pause={pause}
        play={play}
      />
    </UpperSection>
    <BottomSection>
      <BottomPlayerOptions
        isCurrentPodcastDownloaded={isCurrentPodcastDownloaded}
        onToggleAddPlaylistModal={onToggleAddPlaylistModal}
        isAddPlaylistModalOpen={isAddPlaylistModalOpen}
        shouldShufflePlaylist={shouldShufflePlaylist}
        shouldRepeatPlaylist={shouldRepeatPlaylist}
        shouldRepeatCurrent={shouldRepeatCurrent}
        disableRepetition={disableRepetition}
        setRepeatPlaylist={setRepeatPlaylist}
        setRepeatCurrent={setRepeatCurrent}
        shufflePlaylist={shufflePlaylist}
        currentPodcast={currentPodcast}
        playlistIndex={playlistIndex}
        playlist={playlist}
      />
    </BottomSection>
  </Wrapper>
);

export default PlayerComponent;
