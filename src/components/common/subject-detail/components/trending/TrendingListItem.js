// @flow

import React from 'react';
import {
  TouchableOpacity, Platform, View, Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import AuthorInfo from '../../../AuthorInfo';

const ButtonWrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('45%')}px;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: 100%;
  height: ${({ theme, index, side }) => {
    const isEven = index % 2 === 0;
    let percentage;

    if (side === 'left') {
      percentage = isEven ? '25%' : '33%';
    }

    if (side === 'right') {
      percentage = isEven ? '33%' : '25%';
    }

    return theme.metrics.getHeightFromDP(percentage);
  }}px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const BottomContent = styled(View)`
  width: 100%;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const PodcastTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.3}px;
  font-family: CircularStd-Medium;
`;

const AuthorInfoWrapper = styled(View)`
  width: 70%;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

type AuthorProps = {
  thumbnailImageURL: string,
  name: string,
};

type Props = {
  podcastImage: string,
  author: AuthorProps,
  onPress: Function,
  index: number,
  title: string,
  side: string,
};

const TrendingListItem = ({
  podcastImage,
  onPress,
  author,
  index,
  title,
  side,
}: Props): Object => (
  <ButtonWrapper
    onPress={onPress}
  >
    <PodcastImage
      uri={podcastImage}
      index={index}
      side={side}
    />
    <BottomContent>
      <PodcastTitle>{title}</PodcastTitle>
      <AuthorInfoWrapper>
        <AuthorInfo
          imageURL={author.thumbnailImageURL}
          numberOfLines={2}
          name={author.name}
          textColor="dark"
        />
      </AuthorInfoWrapper>
    </BottomContent>
  </ButtonWrapper>
);

export default TrendingListItem;
