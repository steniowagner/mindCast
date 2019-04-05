// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

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
  navigate: Function,
  theme: Object,
};

const SearchComponent = ({
  onSearchForAuthor,
  onToggleDarkLayer,
  isTextInputFocused,
  onTypeAuthorName,
  navigate,
  theme,
}: Props): Object => (
  <Container>
    <ScreenTitle
      title="Search"
    />
    <SearchAuthorTextInputWrapper
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }}
    >
      <SearchAuthorTextInput
        onSearchForAuthor={onSearchForAuthor}
        onToggleDarkLayer={onToggleDarkLayer}
        onTypeAuthorName={onTypeAuthorName}
        navigate={navigate}
      />
    </SearchAuthorTextInputWrapper>
    <SubjectsListWrapper
      isTextInputFocused={isTextInputFocused}
    >
      <SubjectsList
        isTextInputFocused={isTextInputFocused}
        navigate={navigate}
      />
    </SubjectsListWrapper>
  </Container>
);

export default SearchComponent;
