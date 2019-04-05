// @flow

import React from 'react';
import {
  TouchableOpacity, Platform, View, Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import DefaultButton from '~/components/common/DefaultButton';
import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const CardWrapper = styled(View)`
  width: 80%;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-left: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
  padding-left: ${({ theme }) => theme.metrics.mediumSize + theme.metrics.getWidthFromDP('12%')}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
`;

const ProfileImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('24%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('24%')}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('14%')}px;
  position: absolute;
`;

const AuthorName = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.darkText};
`;

const NumberPodcasts = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.subText};
`;

const SubjectItemWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize * 1.1}px;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const SubjectItemText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.3}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.white};
`;

const SubjectsWrapper = styled(View)`
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
`;

const DetailButton = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('14%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('14%')}px;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  padding-top: ${({ theme }) => (Platform.OS === 'ios' ? 2 : 0)}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

type Props = {
  subjects: Array<string>,
  numberPodcasts: number,
  profileImage: string,
  onPress: Function,
  name: string,
};

const SearchAuthorListItem = ({
  numberPodcasts,
  profileImage,
  subjects,
  onPress,
  name,
}: Props): Object => (
  <Wrapper>
    <CardWrapper
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <AuthorName>{name}</AuthorName>
      <NumberPodcasts>
        {`${numberPodcasts} ${numberPodcasts === 1 ? 'Podcast' : 'Podcasts'}`}
      </NumberPodcasts>
      <SubjectsWrapper>
        {subjects.map(subject => (
          <SubjectItemWrapper
            key={subject}
          >
            <SubjectItemText>{`#${subject}`}</SubjectItemText>
          </SubjectItemWrapper>
        ))}
      </SubjectsWrapper>
      <DetailButton
        onPress={onPress}
      >
        <Icon
          color={appStyles.colors.white}
          name="magnify"
          size={24}
        />
      </DetailButton>
    </CardWrapper>
    <ProfileImage
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,
      }}
      uri={profileImage}
    />
  </Wrapper>
);

export default SearchAuthorListItem;
