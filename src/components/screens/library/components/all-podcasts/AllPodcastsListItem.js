// @flow

import React from 'react';
import {
  TouchableOpacity, FlatList, View, Text,
} from 'react-native';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

import ReviewStars from '~/components/common/ReviewStars';

const ListItemWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('35%')}px;
  flex-direction: row;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: 5px;
`;

const TextContentWrapper = styled(View)`
  width: 75%;
  height: 100%;
  justify-content: space-between;
  padding-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const BottomContentWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: 24%;
  height: 100%;
  border-radius: 4px;
`;

const PodcastTitle = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.white};
`;

const ButtonText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.white};
`;

const LearnMoreButton = styled(TouchableOpacity)`
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const SubjectWrapper = styled(View)`
  align-items: flex-start;
`;

const SubjectTextWrapper = styled(View)`
  padding-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.black};
`;

type Props = {
  onPressDetailButton: Function,
  podcast: Object,
};

const AllPodcasts = ({ onPressDetailButton, podcast }: Props): Object => (
  <ListItemWrapper>
    <PodcastImage
      uri={podcast.imageURL}
    />
    <TextContentWrapper>
      <View>
        <PodcastTitle>{podcast.title}</PodcastTitle>
        <SubjectWrapper>
          <SubjectTextWrapper>
            <ButtonText>{`#${podcast.subject}`}</ButtonText>
          </SubjectTextWrapper>
        </SubjectWrapper>
      </View>
      <BottomContentWrapper>
        <ReviewStars
          stars={podcast.stars}
        />
        <LearnMoreButton
          onPress={onPressDetailButton}
        >
          <ButtonText>DETAILS</ButtonText>
        </LearnMoreButton>
      </BottomContentWrapper>
    </TextContentWrapper>
  </ListItemWrapper>
);

export default AllPodcasts;
