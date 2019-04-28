// @flow

import React from 'react';
import {
  TouchableOpacity, Platform, View, Text,
} from 'react-native';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

import ReviewStars from '~/components/common/ReviewStars';

const Container = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('55%')};
  height: ${({ theme }) => theme.metrics.getWidthFromDP('55%')};
  border-radius: 3px;
  margin-left: ${({ theme }) => theme.metrics.largeSize}px;
  margin-right: ${({ theme, isLastIndex }) => (isLastIndex ? theme.metrics.largeSize : 0)}px;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.lightDark};
  border-radius: 3px;
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: 100%;
  height: 100%;
  border-radius: 3px;
`;

const BackgroundImage = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 3px;
`;

const ContentWrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const Title = styled(Text).attrs({
  numberOfLines: 3,
})`
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.2}px;
  font-family: ${Platform.OS === 'android'
    ? 'CircularStd-Medium'
    : 'CircularStd-Bold'};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const Category = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.primaryColor};
`;

type Props = {
  isLastIndex: boolean,
  onPress: Function,
  imageURL: string,
  subject: string,
  title: string,
  stars: number,
};

const NewReleasesSectionItemList = ({
  isLastIndex,
  imageURL,
  onPress,
  subject,
  title,
  stars,
}: Props): Object => (
  <Container
    isLastIndex={isLastIndex}
    onPress={onPress}
  >
    <BackgroundImage>
      <PodcastImage
        uri={imageURL}
      />
      <DarkLayer />
    </BackgroundImage>
    <ContentWrapper>
      <ReviewStars
        shouldShowReviewsText={false}
        isSmall={false}
        stars={stars}
      />
      <View>
        <Title>{title}</Title>
        <Category>{`#${subject}`}</Category>
      </View>
      <View />
    </ContentWrapper>
  </Container>
);

export default NewReleasesSectionItemList;
