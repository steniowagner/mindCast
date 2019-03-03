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

const AuthorName = styled(Text).attrs({
  numberOfLines: 2,
})`
  color: ${({ theme, textColor }) => theme.colors[textColor]};
  font-size: ${({ theme }) => theme.metrics.largeSize};
  font-family: CircularStd-Bold;
`;

type Props = {
  textColor: string,
  imageURL: string,
  name: string,
};

const AuthorInfoWrapper = ({ imageURL, textColor, name }: Props): Object => (
  <Wrapper>
    <AuthorImage
      uri={imageURL}
    />
    <AuthorName
      textColor={textColor}
    >
      {name}
    </AuthorName>
  </Wrapper>
);

export default AuthorInfoWrapper;
