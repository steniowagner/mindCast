// @flow

import React from 'react';
import {
  TouchableOpacity, Platform, View, Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';

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

const CardContent = styled(View)`
  width: 100%;
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
  font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.25}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.darkText};
`;

const NumberPodcasts = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.subText};
`;

const SubjectItemWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize * 1.2}px;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const DetailButtonWrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  align-items: flex-end;
`;

const DetailButton = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('13%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('13%')}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('7.5%')}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
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

type Props = {
  subjects: Array<string>,
  numberPodcasts: number,
  profileImage: string,
  onPress: Function,
  name: string,
};

const renderSubjects = (subjects: Array<string>): Object => (
  <SubjectsWrapper>
    {subjects.map(subject => (
      <SubjectItemWrapper
        key={subject}
      >
        <SubjectItemText>{`#${subject}`}</SubjectItemText>
      </SubjectItemWrapper>
    ))}
  </SubjectsWrapper>
);

const renderDetailButton = (onPress: Function): Object => (
  <DetailButtonWrapper>
    <DetailButton
      onPress={onPress}
    >
      <Icon
        name="magnify"
        size={22}
      />
    </DetailButton>
  </DetailButtonWrapper>
);

const renderCardContent = (
  subjects: Array<string>,
  numberPodcasts: number,
  onPress: Function,
  name: string,
): Object => (
  <CardWrapper>
    <CardContent>
      <AuthorName>{name}</AuthorName>
      <NumberPodcasts>
        {`${numberPodcasts} ${numberPodcasts === 1 ? 'Podcast' : 'Podcasts'}`}
      </NumberPodcasts>
      {renderSubjects(subjects)}
      {renderDetailButton(onPress)}
    </CardContent>
  </CardWrapper>
);

const SearchAuthorListItem = ({
  numberPodcasts,
  profileImage,
  subjects,
  onPress,
  name,
}: Props): Object => (
  <Wrapper>
    {renderCardContent(subjects, numberPodcasts, onPress, name)}
    <ProfileImage
      uri={profileImage}
    />
  </Wrapper>
);

export default SearchAuthorListItem;
