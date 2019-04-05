// @flow

import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  View,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled, { withTheme } from 'styled-components';

import Icon from '~/components/common/Icon';

const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  margin-horizontal: ${({ theme }) => theme.metrics.smallSize}px;
  border-radius: ${({ roundedImage, theme }) => (roundedImage ? theme.metrics.getWidthFromDP('8%') : 4)}px;
`;

const ContentContainer = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('55%')}px;
  padding-top: ${({ shouldShowDownloadStatus, theme }) => (shouldShowDownloadStatus ? theme.metrics.smallSize : 0)}px;
  justify-content: center;
`;

const PodcastTitle = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.35}px;
  font-family: ${Platform.OS === 'android'
    ? 'CircularStd-Medium'
    : 'CircularStd-Bold'};
  color: ${({ theme }) => theme.colors.textColor};
`;

const AuthorName = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-left: ${({ shouldShowDownloadStatus, theme }) => (shouldShowDownloadStatus ? theme.metrics.smallSize : 0)}px;
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.2}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.subTextColor};
`;

const BottomContent = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('47%')}px;
  flex-direction: row;
  align-items: center;
`;

const PodcastDuration = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  text-align: right;
  color: ${({ theme }) => theme.colors.textColor};
`;

const Index = styled(Text)`
  margin-right: ${({ isFirstIndex }) => (isFirstIndex ? 2 : 0)}px;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.2}px;
  font-family: CircularStd-Book;
  color: ${({ theme }) => theme.colors.textColor};
`;

const IconWrapper = styled(View)`
  width: 24px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

const getDonwloadStatusIconConfig = (
  isDownloaded: boolean,
  isDownloading: boolean,
  theme,
): Object => {
  if (isDownloading) {
    return <ActivityIndicator
      color={theme.colors.primaryColor}
      size="small"
    />;
  }

  const iconConfig = isDownloaded
    ? {
      name: 'cloud-check',
      color: theme.colors.primaryColor,
    }
    : {
      name: 'cloud-download-outline',
      color: theme.colors.subTextColor,
    };

  return <Icon
    {...iconConfig}
    size={20}
  />;
};

type Props = {
  shouldShowDownloadStatus: boolean,
  isDownloading: ?boolean,
  roundedImage: ?boolean,
  onPressItem: Function,
  podcast: Object,
  index: number,
  theme: Object,
};

const RecentlyPlayedListItem = ({
  shouldShowDownloadStatus,
  isDownloading,
  roundedImage,
  onPressItem,
  podcast,
  index,
  theme,
}: Props): Object => (
  <Wrapper
    onPress={() => onPressItem(podcast)}
  >
    <Index
      isFirstIndex={index === 1}
    >
      {index}
    </Index>
    <PodcastImage
      roundedImage={roundedImage}
      uri={podcast.imageURL}
    />
    <ContentContainer
      shouldShowDownloadStatus={shouldShowDownloadStatus}
    >
      <PodcastTitle>{podcast.title}</PodcastTitle>
      <BottomContent>
        {shouldShowDownloadStatus && (
          <IconWrapper>
            {getDonwloadStatusIconConfig(
              podcast.isDownloaded,
              !!isDownloading,
              theme,
            )}
          </IconWrapper>
        )}
        <AuthorName
          shouldShowDownloadStatus={shouldShowDownloadStatus}
        >
          {podcast.author.name}
        </AuthorName>
      </BottomContent>
    </ContentContainer>
    <PodcastDuration>{podcast.duration}</PodcastDuration>
  </Wrapper>
);

export default withTheme(RecentlyPlayedListItem);
