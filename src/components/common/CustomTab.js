// @flow

import React, { Component } from 'react';
import {
  TouchableOpacity,
  Animated,
  FlatList,
  Platform,
  Text,
  View,
} from 'react-native';

import styled from 'styled-components';
import appStyles from '~/styles';

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '8%' : '7%';
    return theme.metrics.getHeightFromDP(percentage);
  }};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ListWrapper = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const Cell = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: 100%;
`;

const MarkerWrapper = styled(Animated.View)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('0.5%')};
  width: ${({ width }) => width}px;
  background-color: transparent;
  align-self: flex-end;
  position: absolute;
`;

const Marker = styled(View)`
  height: 100%;
  width: ${({ width }) => width};
  background-color: ${({ color }) => color};
`;

const OptionText = styled(Text)`
  color: ${({ color }) => color}
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '4.5%' : '4%';
    return theme.metrics.getWidthFromDP(percentage);
  }}px;
  font-family: CircularStd-Medium;
`;

type Props = {
  onChangeTabIndex: Function,
  contentWidth: number,
  data: Array<Object>,
  theme: string,
};

type State = {
  itemSelectedIndex: number,
  clickTimestamp: number,
  cellWidth: number,
};

class CustomTab extends Component<Props, State> {
  _markerPaddingLeft = new Animated.Value(0);
  _flatListRef = null;

  state = {
    itemSelectedIndex: 0,
    clickTimestamp: 0,
    cellWidth: 0,
  };

  componentDidMount() {
    const cellWidth = this.getCellWidth();

    this.setState({
      cellWidth,
    });
  }

  onCellPress = (newIndexSelected: number): void => {
    const { data } = this.props;

    const shouldAllowPress = this.shouldAllowPress();
    if (!shouldAllowPress) {
      return;
    }

    const { onChangeTabIndex } = this.props;
    const { itemSelectedIndex } = this.state;

    if (newIndexSelected === itemSelectedIndex) {
      return;
    }

    onChangeTabIndex(newIndexSelected);

    if (data.length > 3) {
      this.onMoveList(newIndexSelected);
    }

    this.setMarkerPosition(newIndexSelected);

    this.setState({
      itemSelectedIndex: newIndexSelected,
      clickTimestamp: Date.now(),
    });
  };

  onMoveList = (indexSelected: number): void => {
    const { data } = this.props;

    const isFirstCell = indexSelected === 0;
    const isLastCell = indexSelected === data.length - 1;

    if (isFirstCell || isLastCell) {
      return;
    }

    this._flatListRef.scrollToIndex({
      animated: true,
      index: indexSelected - 1,
    });
  };

  getCellWidth = (): number => {
    const { data, contentWidth } = this.props;
    const datasetLength = data.length;
    const cellWidth = datasetLength >= 3 ? contentWidth / 3 : contentWidth / datasetLength;

    return cellWidth;
  };

  setMarkerPosition = (newIndexSelected: number): any => {
    const { itemSelectedIndex, cellWidth } = this.state;
    const { data } = this.props;

    const shouldNotRenderMarker = itemSelectedIndex > 0
      && itemSelectedIndex < data.length - 1
      && (newIndexSelected > 0 && newIndexSelected < data.length - 1);

    if (shouldNotRenderMarker) {
      return;
    }

    let newMarkerMargin = cellWidth;

    const isFirstCellSelected = newIndexSelected === 0;
    if (isFirstCellSelected) {
      newMarkerMargin = 0;
    }

    const isMiddleCellSelected = newIndexSelected === 1;
    if (isMiddleCellSelected) {
      newMarkerMargin = cellWidth;
    }

    const isLastCellSelected = newIndexSelected === data.length - 1;
    if (isLastCellSelected) {
      const marginFactor = data.length < 3 ? 1 : 2;
      newMarkerMargin = cellWidth * marginFactor;
    }

    Animated.timing(this._markerPaddingLeft, {
      toValue: newMarkerMargin,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  getThemeColors = (themeSelected: string): Object => {
    const themes = {
      light: {
        markerColor: appStyles.colors.primaryColor,
        cellColor: appStyles.colors.white,
        activeTextColor: appStyles.colors.primaryColor,
        inactiveTextoColor: appStyles.colors.subText,
      },
      dark: {
        markerColor: appStyles.colors.primaryColor,
        cellColor: appStyles.colors.white,
        activeTextColor: appStyles.colors.primaryColor,
        inactiveTextoColor: appStyles.colors.subTextWhite,
      },
    };

    return themes[themeSelected];
  };

  shouldAllowPress = () => {
    const { clickTimestamp } = this.state;
    const now = Date.now();

    const passedTimeEnough = now - clickTimestamp >= 600;

    return passedTimeEnough;
  };

  renderList = (
    cellColor: string,
    activeTextColor: string,
    inactiveTextoColor: string,
  ): Object => {
    const { itemSelectedIndex, cellWidth } = this.state;
    const { data } = this.props;

    return (
      <ListWrapper>
        <FlatList
          ref={(ref) => {
            this._flatListRef = ref;
          }}
          alwaysBounceHorizontal={data.length > 3}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          extraData={this.state}
          data={data}
          horizontal
          renderItem={({ item, index }) => (
            <Cell
              onPress={() => {
                this.onCellPress(index);
              }}
              color={cellColor}
              width={cellWidth}
            >
              <OptionText
                color={
                  itemSelectedIndex === index
                    ? activeTextColor
                    : inactiveTextoColor
                }
              >
                {item.title}
              </OptionText>
            </Cell>
          )}
        />
      </ListWrapper>
    );
  };

  renderMarker = (markerColor: string) => {
    const { itemSelectedIndex, cellWidth } = this.state;
    const { contentWidth } = this.props;

    return (
      <MarkerWrapper
        width={contentWidth}
        style={{
          paddingLeft: this._markerPaddingLeft._value,
          transform: [
            {
              translateX: this._markerPaddingLeft.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
        }}
      >
        <Marker
          currentIndex={itemSelectedIndex}
          color={markerColor}
          width={cellWidth}
        />
      </MarkerWrapper>
    );
  };

  render() {
    const { theme } = this.props;

    const {
      inactiveTextoColor,
      activeTextColor,
      markerColor,
      cellColor,
    } = this.getThemeColors(theme);

    return (
      <Container
        color={cellColor}
      >
        {this.renderList(cellColor, activeTextColor, inactiveTextoColor)}
        {this.renderMarker(markerColor)}
      </Container>
    );
  }
}

export default CustomTab;
