// @flow

import React, { Fragment, Component, createContext } from 'react';
import { StatusBar } from 'react-native';

import { ThemeProvider } from 'styled-components';

import {
  getItemFromStorage,
  persistItemInStorage,
} from '~/utils/AsyncStorageManager';

import appStyles, { lightTheme, darkTheme } from './styles';
import CONSTANTS from '~/utils/CONSTANTS';

const { Provider, Consumer } = createContext();

type Props = {
  children: Object,
};

type State = {
  isDarkThemeActivated: boolean,
};

class ThemeContextProvider extends Component<Props, State> {
  state = {
    isDarkThemeActivated: null,
  };

  async componentDidMount() {
    const isFirstTimeRunningApp = await getItemFromStorage(
      CONSTANTS.KEYS.FIRST_TIME_RUNNING_APP,
      false,
    );

    if (typeof isFirstTimeRunningApp === 'boolean') {
      this.setState({
        isDarkThemeActivated: true,
      });

      return;
    }

    const appThemeFromStorage = await getItemFromStorage(
      CONSTANTS.KEYS.APP_THEME,
      false,
    );

    const isDarkThemeActivated = appThemeFromStorage === 'true';

    this.setState({
      isDarkThemeActivated,
    });
  }

  onToggleDarkTheme = async (): void => {
    const { isDarkThemeActivated } = this.state;

    this.setState({
      isDarkThemeActivated: !isDarkThemeActivated,
    });

    await persistItemInStorage(CONSTANTS.KEYS.APP_THEME, !isDarkThemeActivated);
    await persistItemInStorage(CONSTANTS.KEYS.FIRST_TIME_RUNNING_APP, true);
  };

  getAppTheme = (): Object => {
    const { isDarkThemeActivated } = this.state;

    const themeSelected = isDarkThemeActivated ? darkTheme : lightTheme;

    return {
      ...appStyles,
      colors: {
        ...appStyles.colors,
        ...themeSelected,
      },
    };
  };

  render() {
    const { isDarkThemeActivated } = this.state;
    const { children } = this.props;

    if (typeof isDarkThemeActivated !== 'boolean') {
      return null;
    }

    const appTheme = this.getAppTheme();

    return (
      <Provider
        value={{
          onToggleDarkTheme: this.onToggleDarkTheme,
          isDarkThemeActivated,
        }}
      >
        <ThemeProvider
          theme={appTheme}
        >
          <Fragment>
            <StatusBar
              backgroundColor={appTheme.colors.androidToolbarColor}
              barStyle={isDarkThemeActivated ? 'light-content' : 'dark-content'}
              animated
            />
            {children}
          </Fragment>
        </ThemeProvider>
      </Provider>
    );
  }
}

export { ThemeContextProvider };

export default Consumer;
