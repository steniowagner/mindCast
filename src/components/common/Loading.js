// @flow

import React from 'react';
import { ActivityIndicator, View } from 'react-native';

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
      color={appStyles.colors.primaryColor}
      size="large"
    />
  </LoadingWrapper>
);

export default Loading;
