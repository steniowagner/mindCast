// @flow

import React from 'react';

import FeaturedListItem from './FeaturedListItem';
import AuthorsListItem from './AuthorsListItem';
import TrendingListItem from './trending';
import List from './List';

const getTabContent = (
  trendingPodcasts: Array<Object>,
  featuredPodcasts: Array<Object>,
  authors: Array<Object>,
) => {
  const tabContent = [
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

  return tabContent;
};

export default getTabContent;
