// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import styled, { withTheme } from 'styled-components';

import ScreenTitle from '~/components/common/ScreenTitle';
import Playlists from './components/playlists/Playlists';
import Sections from './components/sections/Sections';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

type Props = {
  navigation: Object,
  theme: Object,
};

const Library = ({ navigation, theme }: Props) => (
  <Wrapper>
    <ScreenTitle
      title="Library"
    />
    <Sections
      navigation={navigation}
      theme={theme}
    />
  </Wrapper>
);

export default withTheme(Library);
