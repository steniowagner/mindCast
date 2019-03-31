// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import DefaultButton from './DefaultButton';
import SectionTitle from './SectionTitle';

const ContentWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

type Props = {
  sectionTitle: string,
  buttonSize: string,
  buttonText: string,
  onPress: Function,
};

const SectionWithButton = ({
  sectionTitle,
  buttonText,
  buttonSize,
  onPress,
}: Props): Object => (
  <ContentWrapper>
    <SectionTitle
      title={sectionTitle}
    />
    <DefaultButton
      translucent={false}
      onPress={onPress}
      size={buttonSize}
      text={buttonText}
    />
  </ContentWrapper>
);

export default SectionWithButton;
