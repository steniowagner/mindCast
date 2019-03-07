// @flow

import React, { PureComponent } from 'react';
import { Animated, Text, View } from 'react-native';
import styled from 'styled-components';

import SearchAuthorListItem from './SearchAuthorListItem';
import Loading from '~/components/common/Loading';
import { ROUTE_NAMES } from '../../../routes';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const SearchResultText = styled(Text).attrs({
  numberOfLines: 3,
})`
  margin-left: ${({ theme }) => theme.metrics.extraLargeSize * 2};
  margin-right: ${({ theme }) => theme.metrics.extraLargeSize};
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize};
  font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.2}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  authors: Array<Object>,
  authorName: string,
  navigation: Object,
  loading: boolean,
};

class SearchAuthorListComponent extends PureComponent<Props, {}> {
  _authorSearchListPosition = new Animated.ValueXY({
    x: 0,
    y: appStyles.metrics.getHeightFromDP('40%'),
  });

  componentWillReceiveProps(nextProps: Props) {
    const { loading, authors } = nextProps;

    const shouldShowList = !loading && authors.length > 0;

    if (shouldShowList) {
      Animated.spring(this._authorSearchListPosition.y, {
        bounciness: 4,
        toValue: 0,
        speed: 3.5,
        useNativeDriver: true,
      }).start();
    }
  }

  renderSearchAuthorsList = (
    authors: Array<Object>,
    authorName: string,
    navigation: Object,
  ): Object => {
    const resultsText = `Results for: '${authorName}'`;

    return (
      <Animated.FlatList
        ListHeaderComponent={<SearchResultText>{resultsText}</SearchResultText>}
        style={[
          {
            transform: [
              {
                translateY: this._authorSearchListPosition.y,
              },
            ],
          },
        ]}
        renderItem={({ item }) => (
          <SearchAuthorListItem
            numberPodcasts={item.numberPodcasts}
            onPress={() => navigation.navigate(CONSTANTS.NAVIGATE_AUTHOR_DETAIL, {
              [CONSTANTS.AUTHOR_DETAIL_PARAMS]: {
                id: item.id,
              },
            })
            }
            profileImage={item.profileImage}
            subjects={item.subjects}
            name={item.name}
            id={item.id}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        data={authors}
      />
    );
  };

  render() {
    const {
      authorName, navigation, authors, loading,
    } = this.props;

    return (
      <Container>
        {loading ? (
          <Loading />
        ) : (
          this.renderSearchAuthorsList(authors, authorName, navigation)
        )}
      </Container>
    );
  }
}

export default SearchAuthorListComponent;
