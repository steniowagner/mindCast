// @flow

import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const Image = styled(FastImage).attrs({
  source: {
    uri:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/background-image.jpg',
  },
})`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const BackgroundImage = (): Object => (
  <Wrapper>
    <Image />
    <DarkLayer />
  </Wrapper>
);

export default BackgroundImage;
