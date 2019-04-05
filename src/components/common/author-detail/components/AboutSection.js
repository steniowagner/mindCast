// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import SectionTitle from '~/components/common/SectionTitle';

const Wrapper = styled(View)`
  width: 100%;
`;

const About = styled(Text)`
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.2}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.textColor};
`;

type Props = {
  about: string,
};

const AboutSection = ({ about }: Props): Object => (
  <Wrapper>
    <SectionTitle
      title="About"
    />
    <About>{about}</About>
  </Wrapper>
);

export default AboutSection;
