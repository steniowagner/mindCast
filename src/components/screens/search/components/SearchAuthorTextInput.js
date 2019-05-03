// @flow

import React from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.smallSize}px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Input = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.subText,
  selectionColor: theme.colors.subText,
  underlineColorAndroid: 'transparent',
  autoCapitalize: 'none',
  autoCorrect: false,
  placeholder: 'Search for a specific Author',
  returnKeyLabel: 'search',
  returnKeyType: 'search',
}))`
  width: 90%;
  height: 100%;
  margin-left: ${({ theme }) => theme.metrics.smallSize}px;
  font-family: CircularStd-Book;
  color: ${({ theme }) => theme.colors.darkText};
`;

const IconWrapper = styled(View)`
  padding-top: ${({ theme }) => theme.metrics.mediumSize};
  padding-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('2.5%')};
`;

type Props = {
  onSearchForAuthor: Function,
  onToggleDarkLayer: Function,
  onTypeAuthorName: Function,
};

const SearchAuthorTextInput = ({
  onSearchForAuthor,
  onToggleDarkLayer,
  onTypeAuthorName,
}: Props): Object => (
  <Wrapper
    style={{
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    }}
  >
    <IconWrapper>
      <Icon
        name="magnify"
        color={appStyles.colors.darkText}
        size={20}
      />
    </IconWrapper>
    <Input
      onChangeText={text => onTypeAuthorName(text)}
      onFocus={() => onToggleDarkLayer(true)}
      onBlur={() => onToggleDarkLayer(false)}
      onSubmitEditing={onSearchForAuthor}
    />
  </Wrapper>
);

export default SearchAuthorTextInput;
