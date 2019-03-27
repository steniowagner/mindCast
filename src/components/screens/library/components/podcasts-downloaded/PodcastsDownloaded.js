// @flow

import React, { PureComponent } from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { Creators as PlaylistsCreators } from '~/store/ducks/playlist';

import PodcastsDownloadedListItem from './PodcastsDownloadedListItem';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;

type Props = {
  podcastsDownloaded: Array<Object>,
  navigation: Object,
};

class PodcastsDownloaded extends PureComponent<Props, {}> {
  componentDidMount() {
    const { podcastsDownloaded, navigation } = this.props;
    const { params } = navigation.state;

    const setHeaderPlayButtonPress = params[CONSTANTS.PARAMS.HEADER_PLAY_FUNCTION_PARAM];

    setHeaderPlayButtonPress(podcastsDownloaded, navigation);
  }

  render() {
    const { podcastsDownloaded, navigation } = this.props;

    return (
      <Wrapper>
        <FlatList
          renderItem={({ item, index }) => (
            <PodcastsDownloadedListItem
              onPressItem={() => navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
                [CONSTANTS.PARAMS.PLAYER]: {
                  [CONSTANTS.KEYS.PLAYLIST]: [item],
                },
              })
              }
              podcast={item}
              index={index}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          data={podcastsDownloaded}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  podcastsDownloaded: state.localPodcastsManager.podcastsDownloaded,
});

export default connect(mapStateToProps)(PodcastsDownloaded);
