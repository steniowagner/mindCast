// @flow

import React, { PureComponent } from 'react';
import { Animated, Text, View } from 'react-native';
import styled from 'styled-components';

import SearchAuthorListItem from '~/components/common/AuthorListItemWithSubjects';
import ErrorMessage from '~/components/common/ErrorMessage';
import Loading from '~/components/common/Loading';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const SearchResultText = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-left: ${({ theme }) => theme.metrics.getWidthFromDP('15%')};
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize};
  font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.2}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.textColor};
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

  renderSearchAuthorsList = (): Object => {
    const { authorName, navigation, authors } = this.props;

    return (
      <Animated.FlatList
        ListHeaderComponent={
          authors.length > 0 && (
            <SearchResultText>{`Results for: '${authorName}'`}</SearchResultText>
          )
        }
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
            onPress={() => navigation.navigate(CONSTANTS.ROUTES.AUTHOR_DETAIL, {
              [CONSTANTS.PARAMS.AUTHOR_DETAIL]: {
                id: item.id,
              },
            })
            }
            numberPodcasts={item.podcasts.length}
            profileImage={item.profileImageURL}
            subjects={item.categories}
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
    const { authorName, loading, authors } = this.props;

    return (
      <Container>
        {loading ? <Loading /> : this.renderSearchAuthorsList()}
        {!loading && authors.length === 0 && (
          <ErrorMessage
            title={`No results for "${authorName}"`}
            icon="magnify-close"
            message=""
          />
        )}
      </Container>
    );
  }
}

export default SearchAuthorListComponent;
