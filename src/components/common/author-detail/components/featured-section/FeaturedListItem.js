// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

const Content = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const Container = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const Index = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.textColor};
`;

const Image = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: 3px;
`;

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: ${({ theme }) => theme.metrics.getWidthFromDP('6%')};
`;

const TextContent = styled(View)`
  width: 75%;
`;

const Title = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.textColor};
`;

const Subject = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.25}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.subTextColor};
`;

const MainContent = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const BottomLine = styled(View)`
  width: 100%;
  height: 1.5px;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.subTextColor};
`;

type Props = {
  onPress: Function,
  imageURL: string,
  fileName: string,
  subject: string,
  title: string,
  index: number,
};

const FeaturedListItem = ({
  imageURL,
  fileName,
  onPress,
  subject,
  title,
  index,
}: Props): Object => (
  <Content>
    <Container
      onPress={onPress}
    >
      <Index>{index}</Index>
      <Wrapper>
        <MainContent>
          <Image
            uri={imageURL}
          />
          <TextContent>
            <Title>{title}</Title>
            <Subject>{`#${subject}`}</Subject>
          </TextContent>
        </MainContent>
      </Wrapper>
    </Container>
    <BottomLine />
  </Content>
);

export default FeaturedListItem;
