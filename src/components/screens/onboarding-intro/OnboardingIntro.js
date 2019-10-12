// @flow

import React, { Component } from 'react';
import { StatusBar, FlatList, View } from 'react-native';
import styled from 'styled-components';

import BottomContent from './components/BottomContent';
import MiddleContent from './components/MiddleContent';

import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  flex: 1;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.metrics.getHeightFromDP('15%')}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const IntroScreenWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: ${({ theme }) => theme.metrics.height}px;
`;

type Props = {
  navigation: Object,
};

type State = {
  currentPageIndex: number,
};

class OnboardingIntro extends Component<Props, State> {
  _pagesListRef: Object = {};

  state = {
    currentPageIndex: 0,
  };

  onPressNextButton = (): void => {
    const { currentPageIndex } = this.state;

    this.setState(
      {
        currentPageIndex: currentPageIndex + 1,
      },
      () => this._pagesListRef.scrollToIndex({
        animated: true,
        index: currentPageIndex + 1,
      }),
    );
  };

  onPressPreviousButton = (): void => {
    const { currentPageIndex } = this.state;

    this.setState(
      {
        currentPageIndex: currentPageIndex - 1,
      },
      () => this._pagesListRef.scrollToIndex({
        animated: true,
        index: currentPageIndex - 1,
      }),
    );
  };

  onNavigateLogin = (): void => {
    const { navigation } = this.props;

    navigation.navigate(CONSTANTS.ROUTES.LOGIN);
  };

  onFlatlistMomentumScrollEnd = (event: Object): void => {
    const { contentOffset } = event.nativeEvent;

    const isHorizontalSwipeMovement = contentOffset.x > 0;
    const currentPageIndex = isHorizontalSwipeMovement
      ? Math.ceil(contentOffset.x / appStyles.metrics.width)
      : 0;

    this.setState({
      currentPageIndex,
    });
  };

  render() {
    const PAGES = ['discover', 'learn', 'listen'];
    const { currentPageIndex } = this.state;

    return (
      <Wrapper>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
          animated
        />
        <FlatList
          onMomentumScrollEnd={event => this.onFlatlistMomentumScrollEnd(event)}
          renderItem={({ item, index }) => (
            <IntroScreenWrapper>
              <MiddleContent
                currentIndex={index}
              />
            </IntroScreenWrapper>
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          ref={(ref: any): void => {
            this._pagesListRef = ref;
          }}
          bounces={false}
          pagingEnabled
          data={PAGES}
          horizontal
        />
        <BottomContent
          onPressPrevious={this.onPressPreviousButton}
          onPressNext={this.onPressNextButton}
          onPressSkip={this.onNavigateLogin}
          currentIndex={currentPageIndex}
          pagesLength={PAGES.length}
        />
      </Wrapper>
    );
  }
}

export default OnboardingIntro;
