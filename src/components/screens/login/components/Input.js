// @flow

import React from 'react';
import { TextInput, View } from 'react-native';

import Icon from '~/components/common/Icon';
import styled from 'styled-components';

import appStyles from '~/styles';

const InputWrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ContentContainer = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('8%')}px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ color }) => color};
  border-radius: 4px;
`;

const CustomInput = styled(TextInput).attrs(({ placeholder, type, theme }) => ({
  placeholderTextColor: theme.colors.subTextWhite,
  selectionColor: theme.colors.darkText,
  underlineColorAndroid: 'transparent',
  secureTextEntry: type === 'password',
  autoCapitalize: 'none',
  textContentType: type,
  autoCorrect: false,
  placeholder,
}))`
  width: 90%;
  height: 100%;
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
  font-size: ${({ theme }) => 1.1 * theme.metrics.largeSize}px;
  font-family: CircularStd-Book;
  color: ${({ theme }) => theme.colors.darkText};
`;

type InputProps = {
  placeholder: string,
  iconName: string,
  type: string,
};

const Input = ({ placeholder, iconName, type }: InputProps): Object => (
  <ContentContainer
    color={appStyles.colors.white}
  >
    <InputWrapper>
      <Icon
        name={iconName}
        color={appStyles.colors.darkText}
        size={22}
      />
      <CustomInput
        placeholder={placeholder}
        type={type}
      />
    </InputWrapper>
  </ContentContainer>
);

export default Input;
