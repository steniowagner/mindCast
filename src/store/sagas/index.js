import { all, takeLatest } from 'redux-saga/effects';

import { Types as PlayerTypes } from '../ducks/player';

import { setPodcast } from './player';

export default function* rootSaga() {
  return yield all([takeLatest(PlayerTypes.SET_PODCAST, setPodcast)]);
}
