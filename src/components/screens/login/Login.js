// @flow

import React, { Component } from 'react';
import { StatusBar, FlatList, View } from 'react-native';
import styled from 'styled-components';

import RegisterComponent from './components/RegisterComponent';
import BackgroundImage from './components/BackgroundImage';
import LoginComponent from './components/LoginComponent';
import CONSTANTS from '~/utils/CONSTANTS';
import Header from './components/Header';

const Wrapper = styled(View)`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ContentWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

type Props = {
  navigation: Object,
};

const LAYOUTS = [
  { Layout: LoginComponent, id: 'login' },
  { Layout: RegisterComponent, id: 'register' },
];

class Login extends Component<Props, {}> {
  _flatListRef: Object = {};

  onChangeListIndex = (index: number): void => {
    this._flatListRef.scrollToIndex({ animated: true, index });
  };

  onNavigateToMainStack = (): void => {
    const { navigation } = this.props;

    navigation.navigate(CONSTANTS.ROUTES.INTERESTS);
  };

  render() {
    return (
      <Wrapper>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
          animated
        />
        <BackgroundImage />
        <Header />
        <FlatList
          renderItem={({ item }) => {
            const { Layout } = item;

            return (
              <ContentWrapper>
                <Layout
                  onNavigateToMainStack={this.onNavigateToMainStack}
                  onChangeListIndex={this.onChangeListIndex}
                />
              </ContentWrapper>
            );
          }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          ref={(ref: any): void => {
            this._flatListRef = ref;
          }}
          scrollEnabled={false}
          data={LAYOUTS}
          pagingEnabled
          horizontal
        />
      </Wrapper>
    );
  }
}

export default Login;
