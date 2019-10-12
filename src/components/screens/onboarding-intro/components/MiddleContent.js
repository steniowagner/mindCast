// @flow

import React from 'react';
import { Platform, View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const IconWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  justify-content: center;
  align-items: center;
  padding-top: ${({ theme }) => (Platform.OS === 'ios' ? theme.metrics.mediumSize : 0)}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('25%')}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const Title = styled(Text)`
  margin-top: ${({ theme }) => 1.2 * theme.metrics.extraLargeSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => 1.3 * theme.metrics.extraLargeSize};
  font-family: CircularStd-Black;
`;

const Description = styled(Text)`
  font-size: ${({ theme }) => 1.2 * theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.subTextWhite};
  text-align: center;
`;

const ITEMS = [
  {
    title: 'DISCOVER',
    description: 'Find a new way to sharp your knowledge about the world.',
    icon: 'compass',
  },
  {
    title: 'LEARN',
    description:
      'Learn about a new subject everyday and start to see the world with a new perspective.',
    icon: 'brain',
  },
  {
    title: 'LISTEN ANY TIME',
    description:
      'Download your favorite podcasts and playlists to listen offline.',
    icon: 'headphones',
  },
];

type Props = {
  currentIndex: number,
};

const MiddleContent = ({ currentIndex }: Props): Object => {
  const { title, description, icon } = ITEMS[currentIndex];

  return (
    <Wrapper>
      <IconWrapper>
        <Icon
          color={appStyles.colors.white}
          name={icon}
          size={100}
        />
      </IconWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Wrapper>
  );
};

export default MiddleContent;
