// @flow

import React, { Fragment } from 'react';
import {
  TouchableOpacity, Platform, View, Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import SectionTitle from '~/components/common/SectionTitle';
import DefaultButton from '~/components/common/DefaultButton';
import Icon from '~/components/common/Icon';

const ContentWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const AuthorImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('17%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('17%')}px;
  margin-right: ${({ theme }) => theme.metrics.largeSize}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('8.5%')}px;
`;

const AuthorName = styled(Text).attrs({
  numberOfLines: 2,
})`
  width: 80%;
  color: ${({ theme }) => theme.colors.textColor};
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
`;

const DetailButton = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('13%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('13%')}px;
  justify-content: center;
  align-items: center;
  padding-top: ${({ theme }) => (Platform.OS === 'ios' ? 2 : 0)}px;
  padding-left: ${({ theme }) => (Platform.OS === 'ios' ? 2 : 0)}px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('6.5%')}px;
`;

const Index = styled(Text)`
  margin-right: ${({ theme }) => theme.metrics.largeSize}px;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.white};
`;

const RightContent = styled(View)`
  width: ${({ theme, withIndex }) => {
    const percentage = withIndex ? '60%' : '67%';
    return theme.metrics.getWidthFromDP(percentage);
  }};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
type AuthorProps = {
  onPressItem: Function,
  imageURL: string,
  name: string,
  id: string,
};

type Props = {
  withBottomline: ?boolean,
  onPressItem: Function,
  author: AuthorProps,
  withIndex: ?boolean,
  index: ?number,
};

const AuthorListItem = ({
  withBottomline,
  onPressItem,
  withIndex,
  author,
  index,
}: Props): Object => (
  <ContentWrapper>
    {withIndex && <Index>{index}</Index>}
    <AuthorImage
      uri={author.profileImageURL}
    />
    <RightContent
      withIndex={withIndex}
    >
      <AuthorName>{author.name}</AuthorName>
      <DetailButton
        onPress={onPressItem}
      >
        <Icon
          size={22}
          name="magnify"
        />
      </DetailButton>
    </RightContent>
  </ContentWrapper>
);

export default AuthorListItem;
