// @flow

import React from 'react';
import {
  TouchableOpacity, Platform, View, Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import AuthorInfo from '~/components/common/AuthorInfo';

const Wrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('60%')};
  height: ${({ theme }) => theme.metrics.getWidthFromDP('70%')};
  margin-left: ${({ theme }) => theme.metrics.largeSize}px;
  margin-right: ${({ theme, isLastIndex }) => (isLastIndex ? theme.metrics.largeSize : 0)}px;
  border-radius: 4px;
`;

const AuthorInfoWrapper = styled(View)`
  width: 80%;
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  position: absolute;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.lightDark};
`;

const PodcastTitle = styled(Text).attrs({
  numberOfLines: 3,
})`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
  font-family: ${Platform.OS === 'android'
    ? 'CircularStd-Medium'
    : 'CircularStd-Black'};
  color: ${({ theme }) => theme.colors.white};
`;

const PodcastCategory = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.primaryColor};
`;

type Props = {
  isLastIndex: boolean,
  onPressItem: Function,
  isLastIndex: boolean,
  podcastImage: string,
  authorImage: string,
  authorName: string,
  subject: string,
  title: string,
};

const NewReleasesDiscoverListItem = ({
  podcastImage,
  isLastIndex,
  onPressItem,
  authorImage,
  authorName,
  subject,
  title,
}: Props): Object => (
  <Wrapper
    isLastIndex={isLastIndex}
    onPress={onPressItem}
  >
    <PodcastImage
      uri={podcastImage}
    />
    <DarkLayer>
      <AuthorInfoWrapper>
        <AuthorInfo
          imageURL={authorImage}
          numberOfLines={2}
          textColor="white"
          name={authorName}
        />
      </AuthorInfoWrapper>
      <View>
        <PodcastTitle>{title}</PodcastTitle>
        <PodcastCategory>{`#${subject}`}</PodcastCategory>
      </View>
    </DarkLayer>
  </Wrapper>
);

export default NewReleasesDiscoverListItem;
