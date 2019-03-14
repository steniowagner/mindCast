// @flow

import React, { Component } from 'react';

import PlaylistListComponent from './components/PlaylistListComponent';

const PODCASTS = [
  {
    author: {
      thumbnailImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      smallImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      name: 'Tech N9ne, 2Pac & Eminem',
      id: 1,
      about:
        'English mathematician, computer scientist, logician, cryptanalyst, philosopher and theoretical biologist.',
      numberPodcasts: 7,
    },
    title:
      'The line is displayed so that the beginning fits in the container and.',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    id: 1,
    url: 'https://s3-sa-east-1.amazonaws.com/mind-cast/till_i_die2.mp3',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/ragnar-thumbnail.jpeg',
    imageURL: 'https://s3-sa-east-1.amazonaws.com/mind-cast/images/ragnar.jpeg',
    smallImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/ragnar.jpeg',
    subject: 'literature',
    fileName: 'file_name',
    duration: '04:00',
    totalDurationInSeconds: 240,
    stars: 3.5,
    uploadedAt: '21/02/1990',
  },
  {
    author: {
      thumbnailImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      smallImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      name: 'Kungs vs Cookin’ on 3 Burners',
      id: 1,
      about:
        'English mathematician, computer scientist, logician, cryptanalyst, philosopher and theoretical biologist.',
      numberPodcasts: 7,
    },
    title: 'This Girl',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    id: 2,
    url: 'https://s3-sa-east-1.amazonaws.com/mind-cast/this_girl.mp3',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/girl.jpeg',
    imageURL: 'https://s3-sa-east-1.amazonaws.com/mind-cast/images/girl.jpg',
    smallImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/girl.jpg',
    subject: 'pop-culture',
    fileName: 'file_name',
    duration: '03:17',
    totalDurationInSeconds: 197,
    stars: 3.5,
    uploadedAt: '21/02/1990',
  },
  {
    author: {
      thumbnailImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      smallImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      name: 'Tomorrows Bad Seeds',
      id: 1,
      about:
        'English mathematician, computer scientist, logician, cryptanalyst, philosopher and theoretical biologist.',
      numberPodcasts: 7,
    },
    title: 'Valerie',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    id: 3,
    url: 'https://s3-sa-east-1.amazonaws.com/mind-cast/valerie.mp3',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/tomorrows-bad-seeds-thumbnail.jpeg',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/tomorrows-bad-seeds.jpg',
    smallImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/tomorrows-bad-seeds.jpg',
    subject: 'science',
    fileName: 'file_name',
    duration: '04:11',
    totalDurationInSeconds: 251,
    stars: 3.5,
    uploadedAt: '21/02/1990',
  },
  {
    author: {
      thumbnailImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      smallImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      name: 'Skrillex - Summit (feat. Ellie Goulding)',
      id: 1,
      about:
        'English mathematician, computer scientist, logician, cryptanalyst, philosopher and theoretical biologist.',
      numberPodcasts: 7,
    },
    title: 'Summit',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    id: 4,
    url: 'https://s3-sa-east-1.amazonaws.com/mind-cast/summit.mp3',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/skrillex-summit-thumbnail.jpg',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/skrillex-summit.jpeg',
    smallImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/djck.jpeg',
    subject: 'philosofy',
    fileName: 'file_name',
    duration: '04:11',
    totalDurationInSeconds: 251,
    stars: 3.5,
    uploadedAt: '21/02/1990',
  },
  {
    author: {
      thumbnailImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      smallImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      name: 'Dj 6RB REMiX',
      id: 1,
      about:
        'English mathematician, computer scientist, logician, cryptanalyst, philosopher and theoretical biologist.',
      numberPodcasts: 7,
    },
    title: 'Oh Nana',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    id: 5,
    url: 'https://s3-sa-east-1.amazonaws.com/mind-cast/oh_nana.mp3',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/djck-thumbnail.png',
    imageURL: 'https://s3-sa-east-1.amazonaws.com/mind-cast/images/djck.jpeg',
    smallImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/djck.jpeg',
    subject: 'technology',
    fileName: 'file_name',
    duration: '04:11',
    totalDurationInSeconds: 251,
    stars: 3.5,
    uploadedAt: '21/02/1990',
  },
];

const PLAYLISTS = Array(5)
  .fill({})
  .map((playlist, index) => ({
    title: `Playlist ${index}`,
    id: index,
    podcasts: PODCASTS,
    isDownloaded: index % 2 === 0,
  }));

type Props = {
  onToggleModal: Function,
  podcast: Object,
};

class PlaylistListContainer extends Component<Props, {}> {
  onAddPodcastPlaylist = (playlistId: string): void => {
    const { onToggleModal } = this.props;

    console.tron.log(playlistId);

    onToggleModal();
  };

  render() {
    const { onToggleModal, podcast } = this.props;
    console.tron.log(podcast);

    return (
      <PlaylistListComponent
        onAddPodcastPlaylist={this.onAddPodcastPlaylist}
        onToggleModal={onToggleModal}
        playlists={PLAYLISTS}
      />
    );
  }
}

export default PlaylistListContainer;
