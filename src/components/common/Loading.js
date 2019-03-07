// @flow

import React from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';

import styled from 'styled-components';
import appStyles from '~/styles';

const LoadingWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loading = (): Object => (
  <LoadingWrapper>
    <ActivityIndicator
      size={Platform.OS === 'ios' ? 'small' : 'large'}
      color={appStyles.colors.primaryColor}
    />
  </LoadingWrapper>
);

export default Loading;
