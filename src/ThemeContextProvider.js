// @flow

import React, { Fragment, Component, createContext } from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import appStyles, { lightTheme, darkTheme } from './styles';

const { Provider, Consumer } = createContext();

type Props = {
  children: Object,
};

type State = {
  isDarkThemeActivated: boolean,
};

class ThemeContextProvider extends Component<Props, State> {
  state = {
    isDarkThemeActivated: false,
  };

  onToggleDarkTheme = (isDarkThemeActivated: boolean): void => {
    this.setState({
      isDarkThemeActivated,
    });
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
              translucent
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
