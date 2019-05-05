// @flow

import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components';

import CONSTANTS from '~/utils/CONSTANTS';
import {
  getItemFromStorage,
  persistItemInStorage,
} from '~/utils/AsyncStorageManager';

import InterestsListItem from './InterestsListItem';

const DEFAULT_INTERESTS = [
  {
    isSelected: true,
    title: 'ALL',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/all/all.jpg',
  },
  {
    isSelected: false,
    title: 'TECHNOLOGY',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/technology/big.jpg',
  },
  {
    isSelected: false,
    title: 'PHILOSOFY',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/philosofy/big.jpg',
  },
  {
    isSelected: false,
    title: 'SCIENCE',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/science/big.jpeg',
  },
  {
    isSelected: false,
    title: 'BUSINESS',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/business/big.jpg',
  },
  {
    isSelected: false,
    title: 'POP CULTURE',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/pop-culture/big.jpg',
  },
  {
    isSelected: false,
    title: 'HISTORY',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/history/big.jpg',
  },
];

type Interest = {
  isSelected: boolean,
  imageURL: string,
  title: string,
};

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const ListText = styled(Text)`
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.1};
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.textColor};
  text-align: center;
`;

type State = {
  interests: Array<Interest>,
};

class Interests extends Component<{}, State> {
  state = {
    interests: [],
  };

  async componentDidMount() {
    const rawInterests = await getItemFromStorage(
      CONSTANTS.KEYS.INTERESTS_STORAGE_KEY,
      [],
    );

    const interests = typeof rawInterests === 'string'
      ? JSON.parse(rawInterests)
      : rawInterests;

    if (interests.length === 0) {
      this.setState({
        interests: DEFAULT_INTERESTS,
      });

      await persistItemInStorage(
        CONSTANTS.KEYS.INTERESTS_STORAGE_KEY,
        DEFAULT_INTERESTS,
      );
    }

    if (interests.length > 0) {
      this.setState({
        interests,
      });
    }
  }

  async componentDidUpdate() {
    const { interests } = this.state;

    await persistItemInStorage(CONSTANTS.KEYS.INTERESTS_STORAGE_KEY, interests);
  }

  handleStateOptionAll = (interests: Array<Object>): Object => {
    const hasSomeSubjectSelected = interests.some(
      interest => interest.title !== 'ALL' && interest.isSelected === true,
    );

    if (!hasSomeSubjectSelected) {
      return {
        ...interests[0],
        isSelected: true,
      };
    }

    return interests[0];
  };

  onSelectItem = (indexSelected: number): void => {
    const { interests } = this.state;

    if (indexSelected === 0) {
      this.setState({
        interests: interests.map(interest => (interest.title === 'ALL'
          ? { ...interest, isSelected: true }
          : { ...interest, isSelected: false })),
      });

      return;
    }

    const interestsWithoutFirstOptionChecked = interests.map(
      (interest, index) => {
        if (index === 0 && !interests[indexSelected].isSelected) {
          return {
            ...interest,
            isSelected: false,
          };
        }

        if (index === indexSelected) {
          return {
            ...interest,
            isSelected: !interest.isSelected,
          };
        }

        return interest;
      },
    );

    const optionAllState = this.handleStateOptionAll(
      interestsWithoutFirstOptionChecked,
    );

    const indexAllOption = 0;

    const interestsUpdated = Object.assign(
      [...interestsWithoutFirstOptionChecked],
      {
        [indexAllOption]: optionAllState,
      },
    );

    this.setState({
      interests: interestsUpdated,
    });
  };

  render() {
    const { interests } = this.state;

    return (
      <Wrapper>
        <ListText>Choose the topics that you're interested in.</ListText>
        <FlatList
          renderItem={({ item, index }) => (
            <InterestsListItem
              onPressItem={() => this.onSelectItem(index)}
              isSelected={item.isSelected}
              imageURL={item.imageURL}
              title={item.title}
              index={index}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={interest => `${interest.title}`}
          data={interests}
        />
      </Wrapper>
    );
  }
}

export default Interests;
