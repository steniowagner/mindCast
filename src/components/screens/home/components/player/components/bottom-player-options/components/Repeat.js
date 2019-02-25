// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

import Button from './Button';

const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.smallSize + 22}px;
  height: ${({ theme }) => theme.metrics.smallSize + 22}px;
  justify-content: center;
  align-items: center;
`;

type Props = {
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
  disableRepetition: Function,
  setRepeatPlaylist: Function,
  setRepeatCurrent: Function,
  iconSize: number,
};

const handlePress = (
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
  setRepeatPlaylist: Function,
  disableRepetition: Function,
  setRepeatCurrent: Function,
): void => {
  if (!shouldRepeatPlaylist && !shouldRepeatCurrent) {
    setRepeatPlaylist();
  }

  if (shouldRepeatPlaylist && !shouldRepeatCurrent) {
    setRepeatCurrent();
  }

  if (!shouldRepeatPlaylist && shouldRepeatCurrent) {
    disableRepetition();
  }
};

const getIconConfig = (
  defaultSize: number,
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
): Object => {
  const config = {
    name: 'repeat-off',
    color: appStyles.colors.white,
    size: defaultSize,
  };

  if (shouldRepeatPlaylist) {
    config.color = appStyles.colors.primaryColor;
    config.name = 'repeat';
    config.size = defaultSize + 2;
  }

  if (shouldRepeatCurrent) {
    config.color = appStyles.colors.primaryColor;
    config.name = 'repeat-once';
    config.size = defaultSize + 2;
  }

  return config;
};

const Repeat = ({
  shouldRepeatPlaylist,
  shouldRepeatCurrent,
  disableRepetition,
  setRepeatPlaylist,
  setRepeatCurrent,
  iconSize,
}: Props): Object => {
  const { name, color, size } = getIconConfig(
    iconSize,
    shouldRepeatPlaylist,
    shouldRepeatCurrent,
  );

  return (
    <Wrapper>
      <Button
        onPress={() => handlePress(
          shouldRepeatPlaylist,
          shouldRepeatCurrent,
          setRepeatPlaylist,
          disableRepetition,
          setRepeatCurrent,
        )
        }
      >
        <Icon
          color={color}
          name={name}
          size={size}
        />
      </Button>
    </Wrapper>
  );
};

export default Repeat;
