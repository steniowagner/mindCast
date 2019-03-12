// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import DefaultButton from './DefaultButton';
import SectionTitle from './SectionTitle';

const UpperContent = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

type Props = {
  sectionTitle: string,
  buttonTitle: string,
  onPress: Function,
};

const SectionWithButton = ({
  sectionTitle,
  buttonTitle,
  onPress,
}: Props): Object => (
  <UpperContent>
    <SectionTitle
      title={sectionTitle}
    />
    <DefaultButton
      translucent={false}
      onPress={onPress}
      text={buttonTitle}
      size="large"
    />
  </UpperContent>
);

export default SectionWithButton;
