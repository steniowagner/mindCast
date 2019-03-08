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

const PODCASTS = Array(5)
  .fill({
    stars: 3.5,
    title: 'How solve puzzles can make you a better cryptographer',
    imageURL: 'https://s3-sa-east-1.amazonaws.com/mind-cast/images/ragnar.jpeg',
    smallImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/ragnar.jpeg',
    subject: 'technology',
    fileName: 'file_name',
  })
  .map((item, index) => ({ ...item, id: index.toString() }));

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
        newReleases: PODCASTS,
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
