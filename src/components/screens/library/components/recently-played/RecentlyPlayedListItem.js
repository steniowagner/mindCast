// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('24%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('18%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('18%')}px;
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('9%')}px;
`;

const ContentContainer = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('57%')}px;
  justify-content: center;
`;

const PodcastTitle = styled(Text).attrs({
  numberOfLines: 2,
})`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.white};
`;

const AuthorName = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-left: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.subTextWhite};
`;

const BottomContent = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  flex-direction: row;
  align-items: center;
`;

const PodcastDuration = styled(Text)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.subTextWhite};
`;

type Props = {
  onPressItem: Function,
  podcast: Object,
};

const RecentlyPlayedListItem = ({ onPressItem, podcast }: Props): Object => {
  const iconConfig = podcast.isDonwloaded
    ? {
      name: 'cloud-check',
      color: appStyles.colors.primaryColor,
    }
    : {
      name: 'cloud-download-outline',
      color: appStyles.colors.white,
    };

  return (
    <Wrapper
      onPress={() => onPressItem(podcast)}
    >
      <PodcastImage
        uri={podcast.imageURL}
      />
      <ContentContainer>
        <PodcastTitle>{podcast.title}</PodcastTitle>
        <BottomContent>
          <Icon
            {...iconConfig}
            size={20}
          />
          <AuthorName>{podcast.author.name}</AuthorName>
        </BottomContent>
      </ContentContainer>
      <PodcastDuration>{podcast.duration}</PodcastDuration>
    </Wrapper>
  );
};

export default RecentlyPlayedListItem;
