// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('25%')}px;
  flex-direction: row;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ContentWrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex-direction: row;
`;

const TextContent = styled(View)`
  width: 50%;
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const PodcastTitle = styled(Text).attrs({
  numberOfLines: 2,
})`
  width: 100%;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.white};
`;

const DurationText = styled(Text)`
  width: 14%;
  margin-left: ${({ theme }) => theme.metrics.largeSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const AuthorName = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.2}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.subTextWhite};
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: 15%;
  height: 100%;
  border-radius: 4px;
`;

const ActionButton = styled(TouchableOpacity)`
  width: 10%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Index = styled(Text)`
  margin-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.2}px;
  color: ${({ theme }) => theme.colors.white};
  font-family: CircularStd-Book;
`;

type Props = {
  onPressItem: Function,
  podcast: Object,
  index: number,
};

const PodcastsDownloadedListItem = ({
  onPressItem,
  podcast,
  index,
}: Props): Object => (
  <Wrapper
    onPress={onPressItem}
    index={index}
  >
    <Index>{index + 1}</Index>
    <PodcastImage
      uri={podcast.imageURL}
    />
    <TextContent>
      <PodcastTitle>{podcast.title}</PodcastTitle>
      <AuthorName>{podcast.author.name}</AuthorName>
    </TextContent>
    <DurationText>{podcast.duration}</DurationText>
  </Wrapper>
);

export default PodcastsDownloadedListItem;
