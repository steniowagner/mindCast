// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import ScreenTitle from '~/components/common/ScreenTitle';
import SearchAuthorTextInput from './SearchAuthorTextInput';
import SubjectsList from './subjects-list';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const ContentWrapper = styled(View)`
  flex: 1;
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
};

const SearchComponent = ({
  onSearchForAuthor,
  onToggleDarkLayer,
  isTextInputFocused,
  onTypeAuthorName,
  navigate,
}: Props): Object => (
  <Container>
    <ScreenTitle
      title="Search"
    />
    <ContentWrapper>
      <SearchAuthorTextInputWrapper>
        <SearchAuthorTextInput
          onSearchForAuthor={onSearchForAuthor}
          onToggleDarkLayer={onToggleDarkLayer}
          onTypeAuthorName={onTypeAuthorName}
          navigate={navigate}
        />
      </SearchAuthorTextInputWrapper>
      <SubjectsListWrapper>
        <SubjectsList
          navigate={navigate}
        />
      </SubjectsListWrapper>
      {isTextInputFocused && <DarkLayer />}
    </ContentWrapper>
  </Container>
);

export default SearchComponent;
