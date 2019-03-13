import {
  call, select, delay, put,
} from 'redux-saga/effects';

import { Creators as AuthorCreators } from '../ducks/author';

const AUTHORS = Array(3)
  .fill({
    profileImage:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
    name: 'Alan Turing',
    subjects: ['math', 'science', 'philosofy', 'technology'],
    numberPodcasts: 17,
  })
  .map((item, index) => ({ ...item, id: index.toString() }));

export function* searchAuthorByName({ payload }) {
  try {
    yield delay(1000);
    yield put(AuthorCreators.searchAuthorByNameSuccess(AUTHORS));
  } catch (err) {
    yield put(AuthorCreators.searchAuthorByNameFailure());
  }
}
const PODCASTS = [
  {
    author: {
      thumbnailImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      name: 'Tech N9ne, 2Pac & Eminem',
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
  },
  {
    author: {
      thumbnailImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      name: 'Kungs vs Cookin’ on 3 Burners',
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
  },
  {
    author: {
      thumbnailImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      name: 'Tomorrows Bad Seeds',
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
  },
  {
    author: {
      thumbnailImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      name: 'Skrillex - Summit (feat. Ellie Goulding)',
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
  },
  {
    author: {
      thumbnailImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      name: 'Dj 6RB REMiX',
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
  },
];

const PODCASTS_REVERSE = [
  PODCASTS[4],
  PODCASTS[3],
  PODCASTS[2],
  PODCASTS[1],
  PODCASTS[0],
];

export function* getAuthorById({ payload }) {
  try {
    yield delay(1000);
    yield put(
      AuthorCreators.getAuthorByIdSuccess({
        id: 1,
        profileImage:
          'https://s2.glbimg.com/3auOxS3cG2mc_H5jFXDpxC7ol-w=/e.glbimg.com/og/ed/f/original/2016/09/12/dr-alan-turing-2956483.jpg',
        profileImageThumbnail:
          'https://s2.glbimg.com/3auOxS3cG2mc_H5jFXDpxC7ol-w=/e.glbimg.com/og/ed/f/original/2016/09/12/dr-alan-turing-2956483.jpg',
        name: 'Stenio Wagner',
        about:
          'Brazilian mathematician, computer scientist, logician, cryptanalyst, philosopher and theorical biologist.',
        subjects: ['math', 'science', 'philosofy', 'technology'],
        newReleases: PODCASTS_REVERSE,
        featured: PODCASTS,
        relatedAuthors: Array(5)
          .fill({
            profileImage:
              'https://s3-sa-east-1.amazonaws.com/mind-cast/images/ragnar.jpeg',
            profileImageThumbnail:
              'https://s3-sa-east-1.amazonaws.com/mind-cast/images/ragnar.jpeg',
          })
          .map((item, index) => ({
            ...item,
            id: index.toString(),
            name: `Stenio Wagner - ${index}`,
          })),
      }),
    );
  } catch (err) {
    yield put(AuthorCreators.getAuthorByIdFailure());
  }
}
