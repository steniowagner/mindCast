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

type Props = {
  size: ?string,
};

const Loading = ({ size }: Props): Object => (
  <LoadingWrapper>
    <ActivityIndicator
      color={appStyles.colors.primaryColor}
      size={size || 'large'}
    />
  </LoadingWrapper>
);

export default Loading;
