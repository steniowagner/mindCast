// @flow

import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import styled, { withTheme } from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

import { setHeaderPlayButtonPress } from '~/routes/utils/navigationOptions';
import RecentlyPlayedListItem from '~/components/common/PodcastItemLIst';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const RecentlyPlayedList = styled(FlatList)`
  width: 100%;
  height: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

type Props = {
  podcastsRecentlyPlayed: Array<Object>,
  podcastsDownloaded: Array<Object>,
  navigation: Object,
};

type State = {
  podcastsRecentlyPlayed: Array<Object>,
};

class RecentlyPlayed extends PureComponent<Props, State> {
  state = {
    podcastsRecentlyPlayed: [],
  };

  componentDidMount() {
    this.setPodcastsRecentlyPlayed(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setPodcastsRecentlyPlayed(nextProps);
  }

  componentDidUpdate(_, prevState) {
    const { podcastsRecentlyPlayed } = this.state;

    const isListLengthChanged = podcastsRecentlyPlayed.length !== prevState.podcastsRecentlyPlayed.length;

    let listOrderChanged = false;

    for (let i = 0; i < prevState.podcastsRecentlyPlayed.length; i++) {
      const isSamePodcast = prevState.podcastsRecentlyPlayed[i].id === podcastsRecentlyPlayed[i].id;

      if (!isSamePodcast) {
        listOrderChanged = true;
        break;
      }
    }

    if (isListLengthChanged || listOrderChanged) {
      const { navigation } = this.props;
      const { params } = navigation.state;

      setHeaderPlayButtonPress(podcastsRecentlyPlayed, navigation);
    }
  }

  setPodcastsRecentlyPlayed = (props: Props): void => {
    const { podcastsRecentlyPlayed, podcastsDownloaded } = props;

    const podcastsRecentlyPlayedWithDownloadStatus = podcastsRecentlyPlayed.map(
      (podcastRecentlyPlayed) => {
        const isDownloaded = podcastsDownloaded.some(
          podcast => podcast.id === podcastRecentlyPlayed.id,
        );

        return {
          ...podcastRecentlyPlayed,
          isDownloaded,
        };
      },
    );

    this.setState({
      podcastsRecentlyPlayed: podcastsRecentlyPlayedWithDownloadStatus,
    });
  };

  render() {
    const { podcastsRecentlyPlayed } = this.state;
    const { navigation } = this.props;

    return (
      <Wrapper>
        <RecentlyPlayedList
          renderItem={({ item, index }) => (
            <RecentlyPlayedListItem
              onPressItem={() => navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
                [CONSTANTS.KEYS
                  .PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
                [CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
              })
              }
              shouldShowDownloadStatus
              isDownloading={false}
              index={index + 1}
              podcast={item}
              roundedImage
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          data={podcastsRecentlyPlayed}
        />
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(PlayerCreators, dispatch);

const mapStateToProps = state => ({
  podcastsRecentlyPlayed: state.localPodcastsManager.podcastsRecentlyPlayed,
  podcastsDownloaded: state.localPodcastsManager.podcastsDownloaded,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentlyPlayed);
