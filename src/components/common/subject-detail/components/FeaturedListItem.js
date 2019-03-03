// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

import ReviewStars from '~/components/common/ReviewStars';
import AuthorInfo from './AuthorInfo';

const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('20%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.smallSize}px;
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

const Button = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.darkLayer};
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  border-radius: 4px;
`;

const UpperContent = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PodcastTitle = styled(Text).attrs({
  numberOfLines: 2,
})`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.35}px;
  font-family: CircularStd-Black;
`;

const FeaturedListitem = (): Object => (
  <Wrapper>
    <Button>
      <PodcastImage
        uri="https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/events/large/thursday-seafood.jpeg"
      />
      <DarkLayer>
        <UpperContent>
          <ReviewStars
            shouldShowReviewsText={false}
            isSmall={false}
            stars={4.5}
          />
          <AuthorInfo
            imageURL="https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg"
            name="Stenio Wagner"
            textColor="white"
          />
        </UpperContent>
        <PodcastTitle>
          How solve puzzles can make you a better cryptographer
        </PodcastTitle>
      </DarkLayer>
    </Button>
  </Wrapper>
);

export default FeaturedListitem;
