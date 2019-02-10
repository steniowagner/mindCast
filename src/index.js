// @flow

import React, { Fragment } from 'react';
import { View, Text } from 'react-native';

import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import store from './store';

const App = (): Object => (
  <Fragment>
    <Provider
      store={store}
    >
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
    </Provider>
  </Fragment>
);

export default App;
