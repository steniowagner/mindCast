// @flow

import React, { Fragment } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import DefaultText from '../../login/components/DefaultText';
import appStyles from '~/styles';

const DotsWrapper = styled(View)`
  justify-content: space-between;
  flex-direction: row;
`;

const PaginationDot = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('0.5%')}px;
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.primaryColor : theme.colors.subTextWhite)};
`;

const ButtonsWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #eaedf2;
`;

const GetStartedButton = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const Button = styled(TouchableOpacity)`
  width: 35%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const renderControlButtons = ({
  onPressPrevious,
  currentIndex,
  onPressNext,
  onPressSkip,
  pagesLength,
}): Object => {
  const { leftButtonTitle, leftButtonAction } = currentIndex === 0
    ? { leftButtonTitle: 'SKIP', leftButtonAction: onPressSkip }
    : { leftButtonTitle: 'PREV', leftButtonAction: onPressPrevious };

  return (
    <ButtonsWrapper>
      <Button
        onPress={leftButtonAction}
      >
        <DefaultText
          text={leftButtonTitle}
          color={appStyles.colors.darkText}
        />
      </Button>
      <DotsWrapper>
        {Array(pagesLength)
          .fill({})
          .map((_, index) => (
            <PaginationDot
              isSelected={index === currentIndex}
              key={`DOT${index - 1}`}
            >
              {'\u2022'}
            </PaginationDot>
          ))}
      </DotsWrapper>
      <Button
        onPress={onPressNext}
      >
        <DefaultText
          text="NEXT"
          color={appStyles.colors.darkText}
        />
      </Button>
    </ButtonsWrapper>
  );
};

const renderGetStartedButton = (onPressSkip: Function): Object => (
  <GetStartedButton
    onPress={onPressSkip}
  >
    <DefaultText
      color={appStyles.colors.white}
      text="GET STARTED"
    />
  </GetStartedButton>
);

type Props = {
  onPressPrevious: Function,
  onPressNext: Function,
  onPressSkip: Function,
  currentIndex: number,
  pagesLength: number,
};

const BottomContent = (props: Props): Object => {
  const { onPressSkip, currentIndex, pagesLength } = props;

  return (
    <Fragment>
      {currentIndex === pagesLength - 1
        ? renderGetStartedButton(onPressSkip)
        : renderControlButtons({ ...props })}
    </Fragment>
  );
};

export default BottomContent;
