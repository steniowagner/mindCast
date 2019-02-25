// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import CurrentPodcastPlaying from './CurrentPodcastPlaying';
import BottomPlayerOptions from './bottom-player-options';
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

type PlayerProps = {
  isCurrentPodcastDownloaded: boolean,
  shouldSeekProgressSlider: boolean,
  shouldShufflePlaylist: boolean,
  shouldRepeatPlaylist: boolean,
  currentTimeInSeconds: number,
  shouldRepeatCurrent: boolean,
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
      <BackgroundImage
        imageURL={thumbnailImageURL}
      />
      <UpperSection>
        <PodcastImage
          thumbnailImageURL={thumbnailImageURL}
          imageURL={imageURL}
        />
        <CurrentPodcastPlaying
          author={author}
          title={title}
        />
        <ProgressSlider
          seekProgressTimer={seekProgressTimer}
          player={player}
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
          localPodcastsManager={localPodcastsManager}
          disableRepetition={disableRepetition}
          setRepeatPlaylist={setRepeatPlaylist}
          setRepeatCurrent={setRepeatCurrent}
          downloadPodcast={downloadPodcast}
          shufflePlaylist={shufflePlaylist}
          removePodcast={removePodcast}
          player={player}
        />
      </BottomSection>
    </Wrapper>
  );
};

export default PlayerComponent;
