// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('20%')}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: {
    priority: FastImage.priority.high,
    uri,
  },
}))`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 4px;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.interestSelectedColor : theme.colors.darkLayer)};
  border-radius: 4px;
`;

const InterestTitle = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  onPressItem: Function,
  isSelected: boolean,
  imageURL: string,
  title: string,
};

const InterestsListItem = ({
  onPressItem,
  isSelected,
  imageURL,
  title,
}: Props): Object => (
  <Wrapper
    onPress={onPressItem}
  >
    <PodcastImage
      uri={imageURL}
    />
    <DarkLayer
      isSelected={isSelected}
    >
      <InterestTitle>{title}</InterestTitle>
    </DarkLayer>
  </Wrapper>
);

export default InterestsListItem;
