// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Swipeout from 'react-native-swipeout';
import styled, { withTheme } from 'styled-components';

import PlaylistCompositionImages from '~/components/common/PlaylistCompositionImages';
import SwipeOutButton from '~/components/common/SwipeOutButton';
import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
`;

const TextWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('70%')}px;
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const PlaylistTitle = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.textColor};
`;

const BottomContentWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const NumberPodcasts = styled(Text)`
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
  color: ${({ theme }) => theme.colors.subTextColor};
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.3}px;
  font-family: CircularStd-Bold;
`;

const ContentWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

type Props = {
  onRemovePlaylist: Function,
  onEditPlaylist: Function,
  numberOfPodcasts: number,
  isDownloaded: boolean,
  images: Array<string>,
  onPress: Function,
  title: string,
  theme: Object,
};

const PlaylistListItem = ({
  onRemovePlaylist,
  numberOfPodcasts,
  onEditPlaylist,
  isDownloaded,
  onPress,
  images,
  title,
  theme,
}: Props): Object => (
  <Wrapper>
    <Swipeout
      autoClose
      backgroundColor="transparent"
      right={[
        {
          component: (
            <SwipeOutButton
              color={appStyles.colors.primaryColor}
              icon="trash-can-outline"
            />
          ),
          onPress: onRemovePlaylist,
          type: 'delete',
        },
        {
          component: (
            <SwipeOutButton
              color={appStyles.colors.subTextWhite}
              icon="pencil"
            />
          ),
          onPress: onEditPlaylist,
          type: 'primary',
        },
      ]}
    >
      <ContentWrapper
        onPress={onPress}
      >
        <PlaylistCompositionImages
          images={images}
          size="small"
        />
        <TextWrapper>
          <PlaylistTitle>{title}</PlaylistTitle>
          <BottomContentWrapper>
            <NumberPodcasts>
              {`${numberOfPodcasts} ${
                numberOfPodcasts === 1 ? 'Podcast' : 'Podcasts'
              }`}
            </NumberPodcasts>
            <Icon
              color={
                isDownloaded
                  ? appStyles.colors.primaryColor
                  : appStyles.colors.subTextWhite
              }
              name={isDownloaded ? 'cloud-check' : 'cloud-download-outline'}
              size={22}
            />
          </BottomContentWrapper>
        </TextWrapper>
      </ContentWrapper>
    </Swipeout>
  </Wrapper>
);

export default withTheme(PlaylistListItem);
