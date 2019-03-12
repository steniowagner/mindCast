// @flow

import React from 'react';
import { Switch, View, Text } from 'react-native';
import styled from 'styled-components';

import DefaultButton from '~/components/common/DefaultButton';

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const DownloadText = styled(Text)`
  margin-right: ${({ theme }) => theme.metrics.mediumSize}px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Bold;
`;

const DownloadWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const ButtonsWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonsSeparator = styled(View)`
  width: ${({ theme }) => theme.metrics.mediumSize}px;
`;

type Props = {
  onMoveDownloadSwitch: Function,
  onPressAddToPlaylist: Function,
  isPodcastDownloaded: boolean,
  onPressPlay: Function,
};

const ActionButtons = ({
  onMoveDownloadSwitch,
  onPressAddToPlaylist,
  isPodcastDownloaded,
  onPressPlay,
}: Props): Object => (
  <Wrapper>
    <ButtonsWrapper>
      <DefaultButton
        onPress={onPressPlay}
        size="large"
        text="PLAY"
      />
      <ButtonsSeparator />
      <DefaultButton
        onPress={onPressAddToPlaylist}
        translucent
        size="large"
        text="+ PLAYLIST"
      />
    </ButtonsWrapper>
    <DownloadWrapper>
      <DownloadText>Download</DownloadText>
      <Switch
        onValueChange={onMoveDownloadSwitch}
        value
      />
    </DownloadWrapper>
  </Wrapper>
);

export default ActionButtons;
