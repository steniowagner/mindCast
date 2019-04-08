// @flow

import React from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const BlurredImage = styled(Image).attrs(({ imageURL }) => ({
  source: { uri: imageURL },
  resize: 'cover',
  blurRadius: 1,
}))`
  width: 100%;'
  height: 100%;
`;

const BlackLayer = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

type Props = {
  imageURL: string,
};

const BackgroundImage = ({ imageURL }: Props): Object => (
  <Container>
    <BlurredImage
      imageURL={imageURL}
    />
    <BlackLayer />
  </Container>
);

export default BackgroundImage;
