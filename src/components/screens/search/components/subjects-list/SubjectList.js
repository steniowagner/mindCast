// @flow

import React from 'react';
import { FlatList } from 'react-native';

import SubjectsListItem from './SubjectListItem';
import CONSTANTS from '~/utils/CONSTANTS';

const items = [
  {
    id: 'technology',
    title: 'TECHNOLOGY',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/technology/big.jpg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/technology/thumbnail.jpg',
  },
  {
    id: 'philosofy',
    title: 'PHILOSOFY',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/philosofy/big.jpg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/philosofy/thumbnail.jpg',
  },
  {
    id: 'business',
    title: 'BUSINESS',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/business/big.jpg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/business/thumbnail.jpg',
  },
  {
    id: 'science',
    title: 'SCIENCE',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/science/big.jpeg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/science/thumbnail.jpg',
  },
  {
    id: 'pop-culture',
    title: 'POP CULTURE',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/pop-culture/big.jpg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/pop-culture/thumbnail.jpg',
  },
  {
    id: 'history',
    title: 'HISTORY',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/history/big.jpg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/history/thumbnail.jpg',
  },
];

type Props = {
  isTextInputFocused: boolean,
  navigation: Object,
};

const SubjectsList = ({ isTextInputFocused, navigation }: Props): Object => (
  <FlatList
    renderItem={({ item, index }) => (
      <SubjectsListItem
        onPress={() => {
          navigation.navigate(CONSTANTS.ROUTES.SUBJECT_DETAIL, {
            [CONSTANTS.PARAMS.SUBJECT_DETAIL]: item,
          });
        }}
        isTextInputFocused={isTextInputFocused}
        imageURL={item.imageURL}
        title={item.title}
        index={index}
      />
    )}
    showsVerticalScrollIndicator={false}
    keyExtractor={item => `${item.id}`}
    numColumns={2}
    data={items}
  />
);

export default SubjectsList;
