import { call, put, all, takeLeading, takeLatest } from "redux-saga/effects";
import { visibilityPageActions } from "./visibilityPage.actions";
import {
  fetchListWhoNotReading,
  fetchListWhoToFollow,
  fetchUserProfile,
} from "../user/user.sagas";

import { getTrends, getTrendsForAuthUser } from "../trend/trend.sagas";
import {
  GET_MAIN_CONTENT_FOR_AUTH_USER,
  GET_MAIN_CONTENT_FOR_NOT_AUTH_USER,
} from "./consts";

export function* content(action) {
  yield all([
    call(fetchUserProfile, action),
    call(fetchListWhoNotReading, action),
    call(getTrendsForAuthUser, action),
  ]);
}

export function* getMainContentForAuthUser(action) {
  yield put(visibilityPageActions.requestStartedForAuthUser());

  yield content(action);

  yield put(visibilityPageActions.setContentForAuthUser());
}

export function* getMainContentForNotAuth(action) {
  yield put(visibilityPageActions.requestStartedForNotAuthUser());

  yield all([call(getTrends, action), call(fetchListWhoToFollow)]);

  yield put(visibilityPageActions.setContentForNotAuthUser());
}

export function* watchGetMainContentForAuthUser() {
  yield takeLeading(GET_MAIN_CONTENT_FOR_AUTH_USER, getMainContentForAuthUser);
}

export function* watchGetMainContentForNotAuth() {
  yield takeLatest(
    GET_MAIN_CONTENT_FOR_NOT_AUTH_USER,
    getMainContentForNotAuth
  );
}

export function* visibilityPageSagas() {
  yield all([
    call(watchGetMainContentForAuthUser),
    call(watchGetMainContentForNotAuth),
  ]);
}
