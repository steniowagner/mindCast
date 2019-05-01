// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ContentWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  margin-top: -${({ theme }) => theme.metrics.extraLargeSize * 1.2}px;
`;

const AuthorNotFoundText = styled(Text).attrs({
  numberOfLines: 2,
})`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.1}px;
  color: ${({ theme }) => theme.colors.textColor};
  font-family: CircularStd-Medium;
  text-align: center;
`;

type Props = {
  authorName: string,
};

const AuthorNotFound = ({ authorName }: Props): Object => (
  <Wrapper>
    <ContentWrapper>
      <Icon
        name="magnify-close"
        size={150}
      />
      <AuthorNotFoundText>{`No results for "${authorName}"`}</AuthorNotFoundText>
    </ContentWrapper>
  </Wrapper>
);

export default AuthorNotFound;
