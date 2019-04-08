// @flow

import React from 'react';
import {
  TouchableOpacity, Platform, Linking, View, Text,
} from 'react-native';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

import Icon from '~/components/common/Icon';
import SOCIAL_BUTTONS from './SOCIAL_BUTTONS';
import HeartBeating from './HeartBeating';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  align-items: center;
  padding-top: ${({ theme }) => theme.metrics.getWidthFromDP('24%')}px;
`;

const CardWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('85%')}px;
  padding: ${({ theme }) => theme.metrics.largeSize}px;
  padding-top: 0px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
`;

const BeautifulRoleWrapper = styled(View)`
  height: ${({ theme }) => theme.metrics.getWidthFromDP('10%')};
  flex-direction: row;
  justify-content: center;
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const ContentWrapper = styled(View)`
  width: 100%;
  align-items: center;
`;

const BeautifulImageBack = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('34%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('34%')}px;
  align-self: center;
  margin-top: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('17%')}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const BeautifulName = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  color: ${({ theme }) => theme.colors.darkText};
`;

const BeautifulRole = styled(Text)`
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
  color: ${({ theme }) => theme.colors.subText};
`;

const BeautifulImage = styled(FastImage).attrs(() => ({
  source: {
    uri:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/user-profile/user-profile.jpg',
  },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('32%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('32%')}px;
  margin-top: -${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  align-self: center;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  border-width: ${({ theme }) => theme.metrics.smallSize}px;
  border-color: ${({ theme }) => theme.colors.white};
`;

const AboutText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
  color: ${({ theme }) => theme.colors.subText};
  text-align: center;
`;

const SocialButtonsWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const SocialButton = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('11%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('11%')}px;
  padding-top: ${({ withPadingTop, theme }) => (Platform.OS === 'ios' && withPadingTop ? 2 : 0)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
`;

const RedLine = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
  height: 2.5px;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize + 4}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const onPressSocialButton = async (url: string) => {
  const canOpenURL = await Linking.canOpenURL(url);

  if (canOpenURL) {
    Linking.openURL(url);
  } else {
    alert("Unfortunately, this URL can't be opened on your devices! :(");
  }
};

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
};

const About = (): Object => (
  <Wrapper>
    <BeautifulImageBack
      style={shadowStyle}
    />
    <CardWrapper
      style={shadowStyle}
    >
      <BeautifulImage />
      <ContentWrapper>
        <BeautifulName>Stenio Wagner</BeautifulName>
        <BeautifulRoleWrapper>
          <BeautifulRole>Full-Stack Engineer</BeautifulRole>
          <HeartBeating />
        </BeautifulRoleWrapper>
        <SocialButtonsWrapper>
          {SOCIAL_BUTTONS.map(button => (
            <SocialButton
              onPress={() => onPressSocialButton(button.url)}
              withPadingTop={button.withPadingTop}
              key={button.iconName}
              color={button.color}
            >
              <Icon
                color={appStyles.colors.white}
                name={button.iconName}
                size={22}
              />
            </SocialButton>
          ))}
        </SocialButtonsWrapper>
        <RedLine />
        <AboutText>
          Hey! I'm Full-Stack JavaScript Engineer that loves apply his knowledge
          to solve problems, create amazing products and impact lives!
        </AboutText>
      </ContentWrapper>
    </CardWrapper>
  </Wrapper>
);

export default About;
