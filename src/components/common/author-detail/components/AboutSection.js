// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import SectionTitle from './SectionTitle';

const Wrapper = styled(View)`
  width: 100%;
  padding-right: ${({ theme }) => theme.metrics.smallSize}px;
`;

const About = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.2}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.white};
`;

const AboutSection = (): Object => (
  <Wrapper>
    <SectionTitle
      title="About"
    />
    <About>
      English mathematician, computer scientist, logician, cryptanalyst,
      philosopher and theorical biologist.
    </About>
  </Wrapper>
);

export default AboutSection;
