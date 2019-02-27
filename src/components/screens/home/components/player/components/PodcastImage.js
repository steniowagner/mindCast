// @flow

import React, { PureComponent } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import ProgressiveImage from '~/components/common/ProgressiveImage';

const Wrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-content: center;
`;

const ImageContainer = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('35%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  align-self: center;
`;

type Props = {
  thumbnailImageURL: string,
  imageURL: string,
};

class PodcastImage extends PureComponent<Props, {}> {
  render() {
    const { thumbnailImageURL, imageURL } = this.props;

    return (
      <Wrapper>
        <ImageContainer>
          <ProgressiveImage
            thumbnailImageURL={thumbnailImageURL}
            imageURL={imageURL}
          />
        </ImageContainer>
      </Wrapper>
    );
  }
}

export default PodcastImage;
