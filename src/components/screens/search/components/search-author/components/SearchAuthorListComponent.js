// @flow

import React, { PureComponent } from 'react';
import { Animated, Text, View } from 'react-native';
import styled from 'styled-components';

import SearchAuthorListItem from '~/components/common/AuthorListItemWithSubjects';
import Loading from '~/components/common/Loading';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const SearchResultText = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-left: ${({ theme }) => theme.metrics.getWidthFromDP('15%')};
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
  ): Object => (
    <Animated.FlatList
      ListHeaderComponent={
        <SearchResultText>{`Results for: '${authorName}'`}</SearchResultText>
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
          numberPodcasts={item.numberPodcasts}
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

  render() {
    const {
      authorName, navigation, authors, loading,
    } = this.props;

    const shouldRenderLoading = loading && authors.length === 0;

    return (
      <Container>
        {shouldRenderLoading ? (
          <Loading />
        ) : (
          this.renderSearchAuthorsList(authors, authorName, navigation)
        )}
      </Container>
    );
  }
}

export default SearchAuthorListComponent;
