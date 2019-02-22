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

const handlePress = (props: Props): void => {
  const {
    shouldRepeatPlaylist,
    shouldRepeatCurrent,
    setRepeatPlaylist,
    disableRepetition,
    setRepeatCurrent,
  } = props;

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

const handleIconColor = (
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
): string => {
  const shouldShowAsSelected = shouldRepeatPlaylist || shouldRepeatCurrent;
  const color = shouldShowAsSelected
    ? appStyles.colors.primaryColor
    : appStyles.colors.white;

  return color;
};

const handleIconName = (
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
): string => {
  let iconName = 'repeat-off';

  if (shouldRepeatPlaylist) {
    iconName = 'repeat';
  }

  if (shouldRepeatCurrent) {
    iconName = 'repeat-once';
  }

  return iconName;
};

const handleIconSize = (
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
): number => {
  let iconSize = 20;

  if (shouldRepeatPlaylist) {
    iconSize = 22;
  }

  if (shouldRepeatCurrent) {
    iconSize = 22;
  }

  return iconSize;
};

const Repeat = ({
  shouldRepeatPlaylist,
  shouldRepeatCurrent,
  disableRepetition,
  setRepeatPlaylist,
  setRepeatCurrent,
}: Props): Object => {
  const iconColor = handleIconColor(shouldRepeatPlaylist, shouldRepeatCurrent);
  const iconName = handleIconName(shouldRepeatPlaylist, shouldRepeatCurrent);
  const iconSize = handleIconSize(shouldRepeatPlaylist, shouldRepeatCurrent);

  return (
    <Wrapper>
      <Button
        onPress={() => handlePress({
          shouldRepeatPlaylist,
          shouldRepeatCurrent,
          setRepeatPlaylist,
          setRepeatCurrent,
          disableRepetition,
        })
        }
      >
        <Icon
          color={iconColor}
          name={iconName}
          size={iconSize}
        />
      </Button>
    </Wrapper>
  );
};

export default Repeat;
