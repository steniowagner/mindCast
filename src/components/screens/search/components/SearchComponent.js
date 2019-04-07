// @flow

import React from 'react';
import { StatusBar, View } from 'react-native';
import styled, { withTheme } from 'styled-components';

import ScreenTitle from '~/components/common/ScreenTitle';
import SearchAuthorTextInput from './SearchAuthorTextInput';
import SubjectsList from './subjects-list/SubjectList';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('8.5%')};
  background-color: ${({ theme }) => theme.colors.lightDark};
  position: absolute;
`;

const SubjectsListWrapper = styled(View)`
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  opacity: ${({ isTextInputFocused }) => (isTextInputFocused ? 0.35 : 1)};
`;

const SearchAuthorTextInputWrapper = styled(View)`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

type Props = {
  onSearchForAuthor: Function,
  onToggleDarkLayer: Function,
  isTextInputFocused: boolean,
  onTypeAuthorName: Function,
  navigation: Object,
  theme: Object,
};

const SearchComponent = ({
  onSearchForAuthor,
  onToggleDarkLayer,
  isTextInputFocused,
  onTypeAuthorName,
  navigation,
  theme,
}: Props): Object => {
  const barStyle = theme.colors.secondaryColor === '#111' ? 'light-content' : 'dark-content';

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        barStyle={barStyle}
        translucent
        animated
      />
      <ScreenTitle
        title="Search"
      />
      <SearchAuthorTextInputWrapper>
        <SearchAuthorTextInput
          onSearchForAuthor={onSearchForAuthor}
          onToggleDarkLayer={onToggleDarkLayer}
          onTypeAuthorName={onTypeAuthorName}
        />
      </SearchAuthorTextInputWrapper>
      <SubjectsListWrapper
        isTextInputFocused={isTextInputFocused}
      >
        <SubjectsList
          isTextInputFocused={isTextInputFocused}
          navigation={navigation}
        />
      </SubjectsListWrapper>
    </Container>
  );
};

export default withTheme(SearchComponent);
