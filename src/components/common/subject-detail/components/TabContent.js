// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';

import FeaturedListItem from './FeaturedListItem';
import AuthorsListItem from './AuthorsListItem';
import TrendingListItem from './trending';
import List from './List';

type Props = {
  trendingPodcasts: Array<Object>,
  featuredPodcasts: Array<Object>,
  authors: Array<Object>,
  setListRef: Function,
};

class TabContent extends Component<Props, {}> {
  render() {
    const {
      trendingPodcasts,
      featuredPodcasts,
      setListRef,
      authors,
    } = this.props;

    const items = [
      {
        id: 'trending',
        UI: <TrendingListItem
          podcasts={trendingPodcasts}
        />,
      },
      {
        id: 'featured',
        UI: (
          <List
            dataset={featuredPodcasts}
            render={(item, index) => (
              <FeaturedListItem
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
      {
        id: 'authors',
        UI: (
          <List
            dataset={authors}
            render={(item, index) => (
              <AuthorsListItem
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
        style={{
          flex: 1,
        }}
        ref={ref => setListRef(ref)}
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

export default TabContent;
