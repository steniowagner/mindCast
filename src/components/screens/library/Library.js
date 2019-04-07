// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

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
};

const Library = ({ navigation }: Props) => (
  <Wrapper>
    <ScreenTitle
      title="Library"
    />
    <Sections
      navigation={navigation}
    />
  </Wrapper>
);

export default Library;
