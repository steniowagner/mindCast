// @flow

import React from 'react';
import {
  TouchableOpacity, Platform, View, Text,
} from 'react-native';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

import ViewWithShadow from '~/components/common/ViewWithShadow';
import AuthorInfo from './AuthorInfo';

const ButtonWrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('45%')}px;
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('33%')}px;
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
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

const TrendingListItem = (): Object => (
  <ButtonWrapper>
    <PodcastImage
      uri="https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg"
    />
    <BottomContent
      style={{
        ...Platform.select({
          ios: {
            elevation: 1,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 3,
            shadowOpacity: 0.35,
          },
          android: {
            elevation: 4,
            shadowOffset: {
              width: 1,
              height: -3,
            },
            shadowRadius: 2,
            shadowOpacity: 5.0,
          },
        }),
      }}
    >
      <PodcastTitle>
        How solve puzzles can make you a better cryptographer
      </PodcastTitle>
      <AuthorInfoWrapper>
        <AuthorInfo
          imageURL="https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg"
          name="Ada Lovelace"
          textColor="dark"
        />
      </AuthorInfoWrapper>
    </BottomContent>
  </ButtonWrapper>
);

export default TrendingListItem;
