// @flow

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

import FeaturedListItem from './FeaturedListItem';
import AuthorsListItem from '~/components/common/AuthorListItem';
import TrendingList from './trending/Trending';
import appStyles from '~/styles';

import CONSTANTS from '~/utils/CONSTANTS';

type Props = {
  trendingPodcasts: Array<Object>,
  featuredPodcasts: Array<Object>,
  authors: Array<Object>,
  setListRef: Function,
  navigation: Object,
};

class TabContent extends Component<Props, {}> {
  handleRef = (ref: Object): void => {
    const { setListRef } = this.props;

    if (ref) {
      ref.getScrollResponder().setNativeProps({
        scrollEnabled: false,
      });

      setListRef(ref);
    }
  };

  render() {
    const {
      trendingPodcasts,
      featuredPodcasts,
      navigation,
      authors,
    } = this.props;

    const items = [
      {
        id: 'featured',
        UI: (
          <FlatList
            renderItem={({ item, index }) => (
              <FeaturedListItem
                onPress={() => navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
                  [CONSTANTS.KEYS
                    .PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
                  [CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
                })
                }
                podcast={item}
              />
            )}
            style={{
              paddingHorizontal: appStyles.metrics.mediumSize,
              width: appStyles.metrics.width,
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item.id}`}
            data={featuredPodcasts}
          />
        ),
      },
      {
        id: 'trending',
        UI: (
          <TrendingList
            podcasts={trendingPodcasts}
            onPress={podcast => navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
              [CONSTANTS.KEYS
                .PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
              [CONSTANTS.PARAMS.PODCAST_DETAIL]: podcast,
            })
            }
          />
        ),
      },
      {
        id: 'authors',
        UI: (
          <FlatList
            renderItem={({ item, index }) => (
              <AuthorsListItem
                onPressItem={() => navigation.navigate(CONSTANTS.ROUTES.AUTHOR_DETAIL, {
                  [CONSTANTS.PARAMS.AUTHOR_DETAIL]: {
                    id: item.id,
                  },
                })
                }
                author={item}
              />
            )}
            style={{
              paddingHorizontal: appStyles.metrics.mediumSize,
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{ marginVertical: 5 }}
              />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item.id}`}
            data={authors}
          />
        ),
      },
    ];

    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => item.UI}
        ref={ref => this.handleRef(ref)}
        keyExtractor={item => item.id}
        style={{
          paddingTop: appStyles.metrics.mediumSize,
        }}
        data={items}
        pagingEnabled
        horizontal
      />
    );
  }
}

export default withNavigation(TabContent);
