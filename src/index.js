// @flow

import React, { Fragment } from 'react';
import { Provider } from 'react-redux';

import SoundComponent from './components/common/SoundComponent';
import Player from './components/screens/player';
import store from './store';

import './config/ReactotronConfig';

const App = (): Object => (
  <Fragment>
    <Provider
      store={store}
    >
      <Fragment>
        <Player />
        <SoundComponent />
      </Fragment>
    </Provider>
  </Fragment>
);
export default App;
