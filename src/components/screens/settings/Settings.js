// @flow

import React from 'react';
import { Platform, View } from 'react-native';
import styled from 'styled-components';

import ThemeContextConsumer from '~/ThemeContextProvider';
import Switch from '~/components/common/Switch';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

const Settings = (): Object => (
  <Wrapper>
    <ThemeContextConsumer>
      {(context) => {
        const { onToggleDarkTheme, isDarkThemeActivated } = context;

        return (
          <Switch
            onToggle={onToggleDarkTheme}
            value={isDarkThemeActivated}
          />
        );
      }}
    </ThemeContextConsumer>
  </Wrapper>
);

export default Settings;
