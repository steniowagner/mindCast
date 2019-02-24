// @flow

import React from 'react';
import { StatusBar, View } from 'react-native';
import styled from 'styled-components';

import CurrentPodcastPlaying from './CurrentPodcastPlaying';
import BottomPlayerOptions from './bottom-player-options';
import BackgroundImage from './BackgroundImage';
import ProgressSlider from './ProgressSlider';
import PlayerControls from './PlayerControls';
import PodcastImage from './PodcastImage';

const Wrapper = styled(View)`
  flex: 1;
  padding-top: 72px;
`;

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
  player: PlayerProps,
  playNext: Function,
  pause: Function,
  play: Function,
};

const PlayerComponent = ({
  localPodcastsManager,
  seekProgressTimer,
  disableRepetition,
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
}: Props): Object => {
  const { currentPodcast, paused } = player;
  const {
    thumbnailImageURL, imageURL, author, title,
  } = currentPodcast;

  return (
    <Wrapper>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
        animated
      />
      <BackgroundImage
        imageURL={thumbnailImageURL}
      />
      <PodcastImage
        thumbnailImageURL={thumbnailImageURL}
        imageURL={imageURL}
      />
      <CurrentPodcastPlaying
        author={author}
        title={title}
      />
      <PlayerControls
        playPrevious={playPrevious}
        playNext={playNext}
        paused={paused}
        pause={pause}
        play={play}
      />
      <ProgressSlider
        seekProgressTimer={seekProgressTimer}
        player={player}
      />
      <BottomPlayerOptions
        localPodcastsManager={localPodcastsManager}
        disableRepetition={disableRepetition}
        setRepeatPlaylist={setRepeatPlaylist}
        setRepeatCurrent={setRepeatCurrent}
        downloadPodcast={downloadPodcast}
        shufflePlaylist={shufflePlaylist}
        removePodcast={removePodcast}
        player={player}
      />
    </Wrapper>
  );
};

export default PlayerComponent;
