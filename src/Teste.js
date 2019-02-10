// @flow

import React from 'react';

import { View, Text } from 'react-native';

const sum = (n1: number, n2: number): number => n1 + n2;

const App = (): Object => {
  sum(1, '1');

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f',
      }}
    >
      <Text>BJS</Text>
    </View>
  );
};

export default App;
