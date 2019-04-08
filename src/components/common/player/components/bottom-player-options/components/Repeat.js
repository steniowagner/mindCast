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
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
): Object => {
  const iconSize = appStyles.metrics.getWidthFromDP('6%');

  const config = {
    name: 'repeat-off',
    color: appStyles.colors.white,
    size: iconSize,
  };

  if (shouldRepeatPlaylist) {
    config.color = appStyles.colors.primaryColor;
    config.name = 'repeat';
    config.size = iconSize + 2;
  }

  if (shouldRepeatCurrent) {
    config.color = appStyles.colors.primaryColor;
    config.name = 'repeat-once';
    config.size = iconSize + 2;
  }

  return config;
};

const Repeat = ({
  shouldRepeatPlaylist,
  shouldRepeatCurrent,
  disableRepetition,
  setRepeatPlaylist,
  setRepeatCurrent,
}: Props): Object => {
  const { name, color, size } = getIconConfig(
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
