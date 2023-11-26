import {
  call,
  put,
  takeEvery,
  all,
  takeLeading,
  spawn,
  fork,
  takeLatest,
  take,
} from "redux-saga/effects";
import { visibilityPageActions } from "./visibilityPage.actions";
import {
  fetchListWhoNotReading,
  fetchListWhoToFollow,
  fetchUserProfile,
  isAuth,
} from "../user/user.sagas";
import {
  GET_MAIN_CONTENT,
  GET_MAIN_CONTENT_FOR_NOT_AUTH_USER,
  GET_VISIBILITY_ANSWERS,
  GET_VISIBILITY_BOOKMARKS,
  GET_VISIBILITY_TWEETS_BY_USER,
  GET_VISIBILITY_TWEETS_FOR_AUTH_USER,
  GET_VISIBILITY_TWEETS_WHO_YOU_READ,
  GET_VISIBILITY_TWEETS_WITH_LIKES,
  GET_VISIBILITY_TWEETS_WITH_MEDIA,
} from "../../utils/consts";
import { getTrends, getTrendsForAuthUser } from "../trend/trend.sagas";
import {
  fetchAnswers,
  fetchFavoriteTweets,
  fetchTweetsByUser,
  fetchTweetsForAuthUser,
  fetchTweetsWhoYouRead,
  fetchTweetsWithLikes,
  fetchTweetsWithMedia,
} from "../tweet/tweet.sagas";

export function* mm(action) {
  yield all([
    call(fetchUserProfile, action),
    call(fetchListWhoNotReading, action),
    call(getTrendsForAuthUser, action),
  ]);
}

export function* getMainContentForAuthUser(action) {
  yield put(visibilityPageActions.requestStarted());

  yield mm(action);

  yield put(visibilityPageActions.setContent());
}

export function* getMainContentForNotAuth(action) {
  yield put(visibilityPageActions.requestStarted());

  yield all([call(getTrends, action), call(fetchListWhoToFollow)]);

  // yield put(visibilityPageActions.setContentForNotAuthUser());
}

export function* visibilityBookmarks(action) {
  yield put(visibilityPageActions.requestStarted());

  yield call(fetchFavoriteTweets, action);

  yield put(visibilityPageActions.setVisibilityBookmarks());
}

export function* visibilityTwitsForAuthUser(action) {
  yield put(visibilityPageActions.requestStarted());

  yield call(fetchTweetsForAuthUser, action);

  yield put(visibilityPageActions.setVisibilityTwitsForAuthUser());
}

export function* visibilityTwitsWhoYouRead(action) {
  yield put(visibilityPageActions.requestStarted());

  yield call(fetchTweetsWhoYouRead, action);

  yield put(visibilityPageActions.setVisibilityTwitsWhoYouRead());
}

export function* visibilityTwitsByUser(action) {
  yield put(visibilityPageActions.requestStarted());

  yield call(fetchTweetsByUser, action);

  yield put(visibilityPageActions.setVisibilityTwitsWhoYouRead());
}

export function* visibilityTwitsWithMedia(action) {
  yield put(visibilityPageActions.requestStarted());

  yield call(fetchTweetsWithMedia, action);

  yield put(visibilityPageActions.setVisibilityTwitsWhoYouRead());
}

export function* visibilityTwitsWithLikes(action) {
  yield put(visibilityPageActions.requestStarted());

  yield call(fetchTweetsWithLikes, action);

  yield put(visibilityPageActions.setVisibilityTwitsWhoYouRead());
}

export function* visibilityAnswers(action) {
  yield put(visibilityPageActions.requestStarted());

  yield call(fetchAnswers, action);

  yield put(visibilityPageActions.setVisibilityTwitsWhoYouRead());
}

export function* watchGetMainContentForAuthUser() {
  yield takeLeading(GET_MAIN_CONTENT, getMainContentForAuthUser);
}

export function* watchGetMainContentForNotAuth() {
  yield takeLatest(
    GET_MAIN_CONTENT_FOR_NOT_AUTH_USER,
    getMainContentForNotAuth
  );
}

export function* watchVisibilityBookmarks() {
  yield takeLeading(GET_VISIBILITY_BOOKMARKS, visibilityBookmarks);
}

export function* watchVisibilityTwitsForAuthUser() {
  yield takeLeading(
    GET_VISIBILITY_TWEETS_FOR_AUTH_USER,
    visibilityTwitsForAuthUser
  );
}

export function* watchVisibilityWhoYouRead() {
  yield takeLeading(
    GET_VISIBILITY_TWEETS_WHO_YOU_READ,
    visibilityTwitsWhoYouRead
  );
}

export function* watchVisibilityTweetsByUser() {
  yield takeLeading(GET_VISIBILITY_TWEETS_BY_USER, visibilityTwitsByUser);
}

export function* watchVisibilityTweetsWithMedia() {
  yield takeLeading(GET_VISIBILITY_TWEETS_WITH_MEDIA, visibilityTwitsWithMedia);
}

export function* watchVisibilityTweetsWithLikes() {
  yield takeLeading(GET_VISIBILITY_TWEETS_WITH_LIKES, visibilityTwitsWithLikes);
}

export function* watchVisibilityAnswers() {
  yield takeLeading(GET_VISIBILITY_ANSWERS, visibilityAnswers);
}

export function* visibilityPageSagas() {
  yield all([
    call(watchGetMainContentForAuthUser),
    call(watchGetMainContentForNotAuth),
    call(watchVisibilityTwitsForAuthUser),
    call(watchVisibilityWhoYouRead),
    call(watchVisibilityTweetsByUser),
    call(watchVisibilityTweetsWithMedia),
    call(watchVisibilityTweetsWithLikes),
    call(watchVisibilityAnswers),
  ]);
}
