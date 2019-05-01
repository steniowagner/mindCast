// @flow

import React from 'react';
import {
  TouchableWithoutFeedback, Platform, View, Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import AuthorInfo from '~/components/common/AuthorInfo';

const ButtonWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('45%')}px;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
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
  thumbnailProfileImageURL: string,
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
  <TouchableWithoutFeedback
    onPress={onPress}
  >
    <ButtonWrapper>
      <PodcastImage
        uri={podcastImage}
        index={index}
        side={side}
      />
      <BottomContent
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        }}
      >
        <PodcastTitle>{title}</PodcastTitle>
        <AuthorInfoWrapper>
          <AuthorInfo
            imageURL={author.thumbnailProfileImageURL}
            numberOfLines={2}
            name={author.name}
            textColor="dark"
          />
        </AuthorInfoWrapper>
      </BottomContent>
    </ButtonWrapper>
  </TouchableWithoutFeedback>
);

export default TrendingListItem;
