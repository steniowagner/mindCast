// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

import appStyles from '~/styles';

const TotalDurationLine = styled(View)`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.subTextWhite};
  position: absolute;
`;

const CurrentTimeLine = styled(View)`
  width: ${({ width }) => width};
  height: 2px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

type Props = {
  durationInSeconds: number,
  currentTime: string,
};

const getTotalSecondsFromCurrentTime = (currentTime: string): number => {
  const rawMinutes = currentTime.split(':')[0];
  const rawSeconds = currentTime.split(':')[1];

  const minutes = parseInt(rawMinutes, 10);
  const seconds = parseInt(rawSeconds, 10);

  const currentTimeInSeconds = minutes * 60 + seconds;

  return currentTimeInSeconds;
};

const getCurrentTimeLineWidth = (
  durationInSeconds: number,
  currentTime: string,
): number => {
  const currentTimeInSeconds = getTotalSecondsFromCurrentTime(currentTime);
  const screenWidth = appStyles.metrics.width;

  const currentTimeLineWidth = (currentTimeInSeconds * screenWidth) / durationInSeconds;

  return currentTimeLineWidth;
};

const ProgressTimeLine = ({
  durationInSeconds,
  currentTime,
}: Props): Object => {
  const currentTimeLineWidth = getCurrentTimeLineWidth(
    durationInSeconds,
    currentTime,
  );

  return (
    <View>
      <TotalDurationLine />
      <CurrentTimeLine
        width={currentTimeLineWidth}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  durationInSeconds: state.player.currentPodcast.durationInSeconds,
  currentTime: state.player.currentTime,
});

export default connect(mapStateToProps)(ProgressTimeLine);
