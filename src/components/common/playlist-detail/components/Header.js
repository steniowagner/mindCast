// @flow

import React from 'react';
import { Switch, View, Text } from 'react-native';
import styled from 'styled-components';

import PlaylistCompositionImages from '~/components/common/PlaylistCompositionImages';
import DefaultButton from '~/components/common/DefaultButton';

const Wrapper = styled(View)`
  width: 100%
  height: ${({ theme }) => theme.metrics.getHeightFromDP('50%')}px;
  padding-top: ${({ theme }) => theme.metrics.navigationHeaderHeight}px;
  justify-content: center;
  align-items: center;
`;

const TextContentWrapper = styled(View)`
  width: 61%;
  margin-left: ${({ theme }) => theme.metrics.mediumSize};
`;

const PlaylistTitle = styled(Text).attrs({
  numberOfLines: 3,
})`
  width: 80%
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const AvailableOfflineText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.white};
`;

const DefaultWrapper = styled(View)`
  width: 60%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize * 1.2}px;
`;

type Props = {
  onPressPlayAllButton: Function,
  onPressShuffleButton: Function,
  isAvailableOffline: boolean,
  images: Array<string>,
  title: string,
};

const Header = ({
  onPressPlayAllButton,
  onPressShuffleButton,
  isAvailableOffline,
  images,
  title,
}: Props): Object => (
  <Wrapper>
    <PlaylistCompositionImages
      images={images}
      size="large"
    />
    <PlaylistTitle>{title}</PlaylistTitle>
    <DefaultWrapper>
      <AvailableOfflineText>Available Offline</AvailableOfflineText>
      <Switch
        value={isAvailableOffline}
      />
    </DefaultWrapper>
    <DefaultWrapper>
      <DefaultButton
        onPress={onPressPlayAllButton}
        text="PLAY ALL"
        size="large"
      />
      <DefaultButton
        translucent
        onPress={onPressShuffleButton}
        text="SHUFFLE"
        size="large"
      />
    </DefaultWrapper>
  </Wrapper>
);

export default Header;
