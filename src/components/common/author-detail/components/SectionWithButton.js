// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import DefaultButton from '../../DefaultButton';
import SectionTitle from './SectionTitle';

const UpperContent = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-right: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

type Props = {
  sectionTitle: string,
  onPress: Function,
};

const SectionWithButton = ({ sectionTitle, onPress }: Props): Object => (
  <UpperContent>
    <SectionTitle
      title={sectionTitle}
    />
    <DefaultButton
      onPress={onPress}
      text="LISTEN NOW"
      size="large"
    />
  </UpperContent>
);

export default SectionWithButton;
