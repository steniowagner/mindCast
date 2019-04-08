// @flow

import React from 'react';
import { TouchableOpacity, Platform, View } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Container = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const PlayOutterCircle = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
  justify-content: center;
  align-items: center;
  margin-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  background-color: ${({ theme }) => theme.colors.primaryColorAlpha};
`;

const PlayInnerCircleButton = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  padding-top: ${Platform.OS === 'ios' ? 2 : 0}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('7.5%')}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

type Props = {
  playPrevious: Function,
  playNext: Function,
  paused: boolean,
  pause: Function,
  play: Function,
};

const renderCenterButton = (
  paused: boolean,
  pause: Function,
  play: Function,
): Object => {
  const { onPress, iconName } = paused
    ? { onPress: play, iconName: 'play' }
    : { onPress: pause, iconName: 'pause' };

  return (
    <PlayOutterCircle>
      <PlayInnerCircleButton
        onPress={onPress}
      >
        <Icon
          size={appStyles.metrics.getWidthFromDP('9%')}
          color={appStyles.colors.white}
          name={iconName}
        />
      </PlayInnerCircleButton>
    </PlayOutterCircle>
  );
};

const renderSideButton = (iconName: string, action: Function): Object => (
  <TouchableOpacity
    onPress={action}
    hitSlop={{
      bottom: appStyles.metrics.smallSize,
      right: appStyles.metrics.smallSize,
      left: appStyles.metrics.smallSize,
      top: appStyles.metrics.smallSize,
    }}
  >
    <Icon
      size={appStyles.metrics.getWidthFromDP('9%')}
      color={appStyles.colors.white}
      name={iconName}
    />
  </TouchableOpacity>
);

const PlayerControls = ({
  playPrevious,
  playNext,
  paused,
  pause,
  play,
}: Props): Object => (
  <Container>
    <Wrapper>
      {renderSideButton('skip-previous', playPrevious)}
      {renderCenterButton(paused, pause, play)}
      {renderSideButton('skip-next', playNext)}
    </Wrapper>
  </Container>
);

export default PlayerControls;
