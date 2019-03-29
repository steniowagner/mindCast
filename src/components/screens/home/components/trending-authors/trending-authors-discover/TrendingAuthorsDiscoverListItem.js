// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('40%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('42%')}px;
  margin-left: ${({ theme }) => theme.metrics.largeSize}px;
  margin-right: ${({ theme, isLastIndex }) => (isLastIndex ? theme.metrics.largeSize : 0)}px;
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.lightSecondaryColor};
  border-radius: 4px;
`;

const AuthorImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('18%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('18%')}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('9%')}px;
  align-self: center;
  background-color: #f0f;
`;

const AuthorName = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.05}px;
  color: ${({ theme }) => theme.colors.white};
  font-family: CircularStd-Bold;
  text-align: center;
`;

type Props = {
  isLastIndex: boolean,
  navigation: Object,
};

const TrendingAuthorsListItem = ({
  isLastIndex,
  navigation,
}: Props): Object => (
  <Wrapper
    onPress={() => navigation.navigate(CONSTANTS.ROUTES.AUTHOR_DETAIL, {
      [CONSTANTS.PARAMS.AUTHOR_DETAIL]: {
        id: 'item.id',
      },
    })
    }
    isLastIndex={isLastIndex}
  >
    <AuthorImage />
    <AuthorName>Stenio Wagner Pereira de Freitas</AuthorName>
  </Wrapper>
);

export default TrendingAuthorsListItem;
