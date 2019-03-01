// @flow

import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import SoundComponent from './components/common/SoundComponent';
import AuthorDetail from './components/common/author-detail';
import ApplicationNavigator from './routes';
import AppTheme from './styles';
import store from './store';

import './config/ReactotronConfig';

const App = (): Object => (
  <Fragment>
    <ThemeProvider
      theme={AppTheme}
    >
      <Provider
        store={store}
      >
        <Fragment>
          <AuthorDetail />
          <SoundComponent />
        </Fragment>
      </Provider>
    </ThemeProvider>
  </Fragment>
);
export default App;
