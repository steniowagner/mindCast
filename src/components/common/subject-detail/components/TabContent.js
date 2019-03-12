// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

import FeaturedListItem from './FeaturedListItem';
import AuthorsListItem from './AuthorsListItem';
import TrendingListItem from './trending/Trending';
import List from './List';

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
        id: 'trending',
        UI: (
          <TrendingListItem
            podcasts={trendingPodcasts}
            onPress={podcast => navigation.navigate(CONSTANTS.NAVIGATE_PODCAST_DETAIL, {
              [CONSTANTS.PODCAST_DETAIL_PARAMS]: podcast,
            })
            }
          />
        ),
      },
      {
        id: 'featured',
        UI: (
          <List
            dataset={featuredPodcasts}
            render={(podcast, index) => (
              <FeaturedListItem
                onPress={() => navigation.navigate(CONSTANTS.NAVIGATE_PODCAST_DETAIL, {
                  [CONSTANTS.PODCAST_DETAIL_PARAMS]: podcast,
                })
                }
                podcastImage={podcast.imageURL}
                isFirst={index === 0}
                author={podcast.author}
                title={podcast.title}
                stars={podcast.stars}
              />
            )}
          />
        ),
      },
      {
        id: 'authors',
        UI: (
          <List
            dataset={authors}
            render={(item, index) => (
              <AuthorsListItem
                onPress={() => navigation.navigate(CONSTANTS.NAVIGATE_AUTHOR_DETAIL, {
                  [CONSTANTS.AUTHOR_DETAIL_PARAMS]: {
                    id: item.id,
                  },
                })
                }
                podcastImage={item.imageURL}
                isFirst={index === 0}
                author={item.author}
                title={item.title}
                stars={item.stars}
              />
            )}
          />
        ),
      },
    ];

    return (
      <FlatList
        ref={ref => this.handleRef(ref)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => item.UI}
        keyExtractor={item => item.id}
        data={items}
        pagingEnabled
        horizontal
      />
    );
  }
}

export default withNavigation(TabContent);
