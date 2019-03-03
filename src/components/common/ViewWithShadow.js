// @flow

import React from 'react';
import { Platform, View } from 'react-native';

type Props = {
  children: Object,
};

const ViewWithShadow = ({ children }: Props): Object => (
  <View
    style={{
      ...Platform.select({
        ios: {
          elevation: 1,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowRadius: 3,
          shadowOpacity: 0.35,
        },
        android: {
          elevation: 4,
          shadowOffset: {
            width: 1,
            height: -3,
          },
          shadowRadius: 2,
          shadowOpacity: 5.0,
        },
      }),
    }}
  >
    {children}
  </View>
);

export default ViewWithShadow;
