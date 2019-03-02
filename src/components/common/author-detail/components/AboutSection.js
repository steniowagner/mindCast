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
