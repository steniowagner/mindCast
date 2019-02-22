// @flow

import React, { Component } from 'react';

import { getItemFromStorage } from '~/utils/AsyncStorageManager';
import Icon from '~/components/common/Icon';
import CONSTANTS from '~/utils/CONSTANTS';
import styles from '~/styles';

import Button from './Button';

type Props = {
  downloadPodcast: Function,
  removePodcast: Function,
  currentPodcast: Object,
};

type State = {
  podcastsSaved: Array<Object>,
};

class Download extends Component<Props, State> {
  state = {
    podcastsSaved: [],
  };

  async componentDidMount() {
    const podcastsSaved = await this.getPodcastsSaved();

    this.setState({
      podcastsSaved,
    });
  }

  componentWillReceiveProps(n, z) {
    console.tron.log(n, z);
  }

  getPodcastsSaved = async () => {
    const rawPodcastsSaved = await getItemFromStorage(
      CONSTANTS.PODCASTS_SAVED,
      [],
    );

    const podcastsSaved = typeof rawPodcastsSaved === 'string'
      ? JSON.parse(rawPodcastsSaved)
      : rawPodcastsSaved;

    return podcastsSaved;
  };

  handleIconColor = async (currentPodcast: Object): void => {
    const { podcastsSaved } = this.state;
    const isCurrentPodcastSaved = podcastsSaved.findIndex(podcast => podcast.id === currentPodcast.id) >= 0;
    const iconColor = isCurrentPodcastSaved
      ? styles.colors.primaryColor
      : styles.colors.white;

    return iconColor;
  };

  render() {
    return (
      <Button
        onPress={() => alert('asd')}
      >
        <Icon
          name="cloud-download"
          size={22}
        />
      </Button>
    );
  }
}

export default Download;
