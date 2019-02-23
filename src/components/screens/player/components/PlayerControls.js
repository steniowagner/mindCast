// @flow

import React from 'react';
import { TouchableOpacity, Platform, View } from 'react-native';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

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

type PlayerProps = {
  paused: boolean,
};

type Props = {
  playPrevious: Function,
  player: PlayerProps,
  playNext: Function,
  pause: Function,
  play: Function,
};

const PlayOutterCircle = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
  justify-content: center;
  align-items: center;
  margin-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  background-color: ${({ theme }) => theme.colors.primaryColorAlpha};
`;

const PlayInnerCircle = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  padding-top: ${Platform.OS === 'ios' ? 2 : 0}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('7.5%')}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const renderCenterButton = (
  player: PlayerProps,
  pause: Function,
  play: Function,
): Object => {
  const { paused } = player;
  console.log('paused', paused);

  const { onPress, iconName } = paused
    ? { onPress: play, iconName: 'play' }
    : { onPress: pause, iconName: 'pause' };

  return (
    <PlayOutterCircle>
      <PlayInnerCircle
        onPress={onPress}
      >
        <Icon
          name={iconName}
          size={28}
        />
      </PlayInnerCircle>
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
      name={iconName}
      size={28}
    />
  </TouchableOpacity>
);

const PlayerControls = ({
  playPrevious,
  playNext,
  player,
  pause,
  play,
}: Props): Object => (
  <Container>
    <Wrapper>
      {renderSideButton('rewind', playPrevious)}
      {renderCenterButton(player, pause, play)}
      {renderSideButton('fast-forward', playNext)}
    </Wrapper>
  </Container>
);

const mapDispatchToProps = dispatch => bindActionCreators(PlayerCreators, dispatch);

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerControls);
