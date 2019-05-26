// @flow

import React, { Component } from 'react';
import {
  StatusBar, Animated, FlatList, View,
} from 'react-native';
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
  _headerAnimation = new Animated.Value(0);
  _formAnimation = new Animated.Value(0);

  componentDidMount() {
    Animated.stagger(100, [
      Animated.timing(this._headerAnimation, {
        duration: 500,
        toValue: 1,
      }),
      Animated.timing(this._formAnimation, {
        duration: 600,
        toValue: 1,
      }),
    ]).start();
  }

  onChangeListIndex = (index: number): void => {
    this._flatListRef.scrollToIndex({ animated: true, index });
  };

  onNavigateToMainStack = (): void => {
    const { navigation } = this.props;

    navigation.navigate(CONSTANTS.ROUTES.INTERESTS);
  };

  createFadeAnimationStyle = (animation: Object): Object => {
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-5, 0],
    });

    return {
      opacity: animation,
      transform: [
        {
          translateY,
        },
      ],
    };
  };

  render() {
    const formAnimation = this.createFadeAnimationStyle(this._formAnimation);
    const headerAnimation = this.createFadeAnimationStyle(
      this._headerAnimation,
    );

    return (
      <Wrapper>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
          animated
        />
        <BackgroundImage />
        <Animated.View
          style={headerAnimation}
        >
          <Header />
        </Animated.View>
        <Animated.View
          style={formAnimation}
        >
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
        </Animated.View>
      </Wrapper>
    );
  }
}

export default Login;
