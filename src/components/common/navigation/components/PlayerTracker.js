// @flow

import React, { Fragment } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

import ProgressTimeLine from './ProgressTimeLine';
import Icon from '~/components/common/Icon';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-right: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const ContentWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('13%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  border-radius: 3px;
`;

const PlayerButtonsWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const TextContentWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('55%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.smallSize}px;
`;

const PodcastTitle = styled(Text).attrs({
  numberOfLines: 1,
})`
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.textColor};
`;

const AuthorName = styled(Text).attrs({
  numberOfLines: 1,
})`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.2}px;
  color: ${({ theme }) => theme.colors.subTextColor};
`;

const PlayerIcon = styled(Icon).attrs(({ theme, size, name }) => ({
  color: theme.colors.textColor,
  size,
  name,
}))``;

type AuthorProps = {
  name: string,
};

type PodcastProps = {
  author: AuthorProps,
  imageURL: string,
  title: string,
};

type Props = {
  currentPodcast: PodcastProps,
  playlist: Array<Object>,
  navigation: Object,
  playNext: Function,
  paused: boolean,
  pause: Function,
  play: Function,
};

const PlayerTracker = ({
  currentPodcast,
  navigation,
  playlist,
  playNext,
  paused,
  pause,
  play,
}: Props): Object => {
  if (!currentPodcast) {
    return null;
  }

  return (
    <Fragment>
      <ProgressTimeLine />
      <Wrapper>
        <ContentWrapper
          onPress={() => navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
            [CONSTANTS.PARAMS.PLAYER]: {
              [CONSTANTS.KEYS.LOOKUP_PLAYER]: true,
            },
          })
          }
        >
          <PodcastImage
            uri={currentPodcast.imageURL}
          />
          <TextContentWrapper>
            <PodcastTitle>{currentPodcast.title}</PodcastTitle>
            <AuthorName>{currentPodcast.author.name}</AuthorName>
          </TextContentWrapper>
        </ContentWrapper>
        <PlayerButtonsWrapper>
          <TouchableOpacity
            onPress={() => (paused ? play() : pause())}
            style={{
              marginHorizontal: 4,
            }}
          >
            <PlayerIcon
              name={paused ? 'play-circle' : 'pause-circle'}
              size={36}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={playNext}
          >
            <PlayerIcon
              name="skip-next"
              size={28}
            />
          </TouchableOpacity>
        </PlayerButtonsWrapper>
      </Wrapper>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  currentPodcast: state.player.currentPodcast,
  playlist: state.player.playlist,
  paused: state.player.paused,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlayerCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerTracker);
