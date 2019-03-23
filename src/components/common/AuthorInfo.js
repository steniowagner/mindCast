// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const AuthorImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  margin-right: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const AuthorName = styled(Text).attrs(({ numberOfLines }) => ({
  ellipsizeMode: 'tail',
  numberOfLines,
}))`
  color: ${({ theme, textColor }) => theme.colors[textColor]};
  font-size: ${({ theme }) => theme.metrics.largeSize};
  font-family: CircularStd-Bold;
`;

type Props = {
  numberOfLines: number,
  textColor: string,
  imageURL: string,
  name: string,
};

const AuthorInfo = ({
  numberOfLines,
  imageURL,
  textColor,
  name,
}: Props): Object => (
  <Wrapper>
    <AuthorImage
      uri={imageURL}
    />
    <AuthorName
      numberOfLines={numberOfLines}
      textColor={textColor}
    >
      {name}
    </AuthorName>
  </Wrapper>
);

export default AuthorInfo;
