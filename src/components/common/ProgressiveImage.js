// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import styled from 'styled-components';

const ForegroundLayer = styled(View)`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.progressiveImageForeground};
`;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },

  imageOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

type Props = {
  thumbnailImageURL: string,
  imageURL: string,
};

class ProgressiveImage extends Component<Props, {}> {
  _thumbnailOpacity = new Animated.Value(0);
  _imageOpacity = new Animated.Value(0);

  onThumbnailLoaded = (): void => {
    Animated.timing(this._thumbnailOpacity, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  onImageLoaded = (): void => {
    Animated.timing(this._imageOpacity, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { thumbnailImageURL, imageURL } = this.props;

    return (
      <ForegroundLayer>
        <Animated.Image
          style={[
            styles.container,
            {
              opacity: this._thumbnailOpacity,
            },
          ]}
          source={{ uri: thumbnailImageURL }}
          onLoad={this.onThumbnailLoaded}
          blurRadius={1}
          resize="cover"
        />
        <Animated.Image
          style={[
            styles.imageOverlay,
            {
              opacity: this._imageOpacity,
            },
            styles.container,
          ]}
          onLoad={this.onImageLoaded}
          source={{ uri: imageURL }}
          resize="cover"
        />
      </ForegroundLayer>
    );
  }
}

export default ProgressiveImage;
