import { call, put, takeEvery, all } from "redux-saga/effects";
import { tweetActions } from "./tweet.actions";
import twitAPI from "../../http/twitAPI";
import {
  GET_ANSWERS,
  GET_FAVORITE_TWEETS,
  GET_MORE_ANSWERS,
  GET_MORE_BOOKMARKS,
  GET_MORE_PUBLIC_TWEETS_BY_USER,
  GET_MORE_TWEETS,
  GET_MORE_TWEETS_FOR_AUTH_USER,
  GET_MORE_TWEETS_FOR_TRENDS,
  GET_MORE_TWEETS_WHO_YOU_READING,
  GET_MORE_TWEETS_WITH_LIKES,
  GET_MORE_TWEETS_WITH_MEDIA,
  GET_MORE_USER_TWEETS,
  GET_PUBLIC_TWEETS_BY_USER,
  GET_TWEETS,
  GET_TWEETS_BY_FOLLOWING_USERS,
  GET_TWEETS_BY_USER,
  GET_TWEETS_FOR_AUTH_USER,
  GET_TWEETS_FOR_TRENDS,
  GET_TWEETS_FOR_TRENDS_AUTH_USER,
  GET_TWEETS_WITH_LIKES,
  GET_TWEETS_WITH_MEDIA,
} from "./const";
import { tweetLoadingActions } from "./tweet.loading.actions";
import trendAPI from "../../http/trendAPI";

export function* fetchAllTweets() {
  yield put(tweetLoadingActions.requestStartedTwits());

  try {
    const tweets = yield call(twitAPI.getAllTwits);

    yield put(tweetActions.setTweets(tweets));
  } catch (error) {
    yield put(tweetLoadingActions.requestFailedTwits(error));
  }
}

export function* fetchMoreTweets(action) {
  try {
    const tweets = yield call(twitAPI.getAllTwits, action.limit, action.list);

    yield put(tweetActions.setMoreTweets(tweets));
  } catch (error) {}
}

export function* fetchMoreUserTweets(action) {
  try {
    const tweets = yield call(
      twitAPI.getTwitsByUser,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setMoreTweets(tweets));
  } catch (error) {}
}

export function* fetchMoreTweetsWithMedia(action) {
  try {
    const tweets = yield call(
      twitAPI.getUserTwitsWithMedia,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setMoreTweets(tweets));
  } catch (error) {}
}

export function* fetchMoreTweetsWithLikes(action) {
  try {
    const tweets = yield call(
      twitAPI.getTwitsWithUserLikes,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setMoreTweets(tweets));
  } catch (error) {}
}

export function* fetchMoreAnswers(action) {
  try {
    const tweets = yield call(
      twitAPI.getCommentsByUser,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setMoreTweets(tweets));
  } catch (error) {}
}

export function* fetchMoreTwitsForAuthUser(action) {
  try {
    const tweets = yield call(
      twitAPI.getTwitsForAuthUser,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setMoreTweets(tweets));
  } catch (error) {}
}

export function* fetchMoreTwitsWhoYouReading(action) {
  try {
    const tweets = yield call(
      twitAPI.getTwitsByFollowingsUsers,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setMoreTweets(tweets));
  } catch (error) {}
}

export function* fetchMoreBookmarks(action) {
  try {
    const tweets = yield call(
      twitAPI.getFavoriteTwits,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setMoreTweets(tweets));
  } catch (error) {}
}

export function* fetchTweetsByUser(action) {
  yield put(tweetLoadingActions.requestStartedUserTwits());

  try {
    const tweets = yield call(
      twitAPI.getTwitsByUser,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setTweets(tweets));
  } catch (error) {
    yield put(tweetLoadingActions.requestFailedUserTwits(error));
  }
}

export function* fetchPublicTweetsByUser(action) {
  try {
    const tweets = yield call(
      twitAPI.getPublicTwitsByUser,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setTweets(tweets));
  } catch (error) {}
}

export function* fetchMorePublicTweetsByUser(action) {
  try {
    const tweets = yield call(
      twitAPI.getPublicTwitsByUser,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setMoreTweets(tweets));
  } catch (error) {}
}

export function* fetchTweetsWhoYouRead(action) {
  yield put(tweetLoadingActions.requestStartedTwitsWhoYouReading());

  try {
    const tweets = yield call(
      twitAPI.getTwitsByFollowingsUsers,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setTweets(tweets));
  } catch (error) {
    yield put(tweetLoadingActions.requestFailedTwitsWhoYouReading(error));
  }
}

export function* fetchFavoriteTweets(action) {
  yield put(tweetLoadingActions.requestStartedBookmarks());
  try {
    const tweets = yield call(
      twitAPI.getFavoriteTwits,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setTweets(tweets));
  } catch (error) {
    yield put(tweetLoadingActions.requestFailedBookmarks(error));
  }
}

export function* fetchTweetsForAuthUser(action) {
  yield put(tweetLoadingActions.requestStartedTwitsAuthUser());

  try {
    const tweets = yield call(
      twitAPI.getTwitsForAuthUser,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setTweets(tweets));
  } catch (error) {
    yield put(tweetLoadingActions.requestFailedTwitsAuthUser(error));
  }
}

export function* fetchTweetsWithMedia(action) {
  yield put(tweetLoadingActions.requestStartedTwitsWithMedia());

  try {
    const tweets = yield call(
      twitAPI.getUserTwitsWithMedia,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setTweets(tweets));
  } catch (error) {
    yield put(tweetLoadingActions.requestFailedTwitsWithMedia(error));
  }
}

export function* fetchTweetsWithLikes(action) {
  yield put(tweetLoadingActions.requestStartedTwitsWithLikes());

  try {
    const tweets = yield call(
      twitAPI.getTwitsWithUserLikes,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setTweets(tweets));
  } catch (error) {
    yield put(tweetLoadingActions.requestFailedTwitsWithLikes(error));
  }
}

export function* fetchAnswers(action) {
  yield put(tweetLoadingActions.requestStartedAnswers());

  try {
    const tweets = yield call(
      twitAPI.getCommentsByUser,
      action.userId,
      action.limit,
      action.list
    );

    yield put(tweetActions.setTweets(tweets));
  } catch (error) {
    yield put(tweetLoadingActions.requestFailedAnswerss(error));
  }
}

export function* fetchTweetsForTrends(action) {
  yield put(tweetLoadingActions.requestStartedTwitsForTrends());

  try {
    const tweets = yield call(
      trendAPI.getPublicTrendsTwits,
      action.trend,
      action.limit,
      action.list
    );

    yield put(tweetActions.setTweets(tweets));
  } catch (error) {
    yield put(tweetLoadingActions.requestFailedTwitsForTrends(error));
  }
}

export function* fetchTweetsForTrendsAuthUser(action) {
  yield put(tweetLoadingActions.requestStartedTwitsForTrends());

  try {
    const tweets = yield call(
      trendAPI.getTrendsTwitsForAuthUser,
      action.trend,
      action.limit,
      action.list
    );

    yield put(tweetActions.setTweets(tweets));
  } catch (error) {
    yield put(tweetLoadingActions.requestFailedTwitsForTrends(error));
  }
}

export function* fetchMoreTweetForTrend(action) {
  try {
    if (action.userId) {
      const tweets = yield call(
        trendAPI.getTrendsTwitsForAuthUser,
        action.trend,
        action.limit,
        action.list
      );
      yield put(tweetActions.setMoreTweets(tweets));
    } else {
      const tweets = yield call(
        trendAPI.getPublicTrendsTwits,
        action.trend,
        action.limit,
        action.list
      );
      yield put(tweetActions.setMoreTweets(tweets));
    }
  } catch (error) {}
}

export function* watchFetchAllTweets() {
  yield takeEvery(GET_TWEETS, fetchAllTweets);
}

export function* watchFetchMoreTweets() {
  yield takeEvery(GET_MORE_TWEETS, fetchMoreTweets);
}

export function* watchFetchMoreUserTweets() {
  yield takeEvery(GET_MORE_USER_TWEETS, fetchMoreUserTweets);
}

export function* watchFetchMoreAnswers() {
  yield takeEvery(GET_MORE_ANSWERS, fetchMoreAnswers);
}

export function* watchFetchMoreBookmarks() {
  yield takeEvery(GET_MORE_BOOKMARKS, fetchMoreBookmarks);
}

export function* watchFetchMoreTweetsWithLikes() {
  yield takeEvery(GET_MORE_TWEETS_WITH_LIKES, fetchMoreTweetsWithLikes);
}

export function* watchFetchMoreTweetsWithMedia() {
  yield takeEvery(GET_MORE_TWEETS_WITH_MEDIA, fetchMoreTweetsWithMedia);
}

export function* watchFetchMoreTweetsForAuthUser() {
  yield takeEvery(GET_MORE_TWEETS_FOR_AUTH_USER, fetchMoreTwitsForAuthUser);
}

export function* watchFetchMoreTweetsWhoYouReading() {
  yield takeEvery(GET_MORE_TWEETS_WHO_YOU_READING, fetchMoreTwitsWhoYouReading);
}

export function* watchFetchTweetsByUser() {
  yield takeEvery(GET_TWEETS_BY_USER, fetchTweetsByUser);
}

export function* watchFetchPublicTweetsByUser() {
  yield takeEvery(GET_PUBLIC_TWEETS_BY_USER, fetchPublicTweetsByUser);
}

export function* watchFetchMorePublicTweetsByUser() {
  yield takeEvery(GET_MORE_PUBLIC_TWEETS_BY_USER, fetchMorePublicTweetsByUser);
}

export function* watchFetchTweetsWhoYouRead() {
  yield takeEvery(GET_TWEETS_BY_FOLLOWING_USERS, fetchTweetsWhoYouRead);
}

export function* watchFetchFavoriteTweets() {
  yield takeEvery(GET_FAVORITE_TWEETS, fetchFavoriteTweets);
}

export function* watchFetchTweetsForAuthUser() {
  yield takeEvery(GET_TWEETS_FOR_AUTH_USER, fetchTweetsForAuthUser);
}

export function* watchFetchTweetsWithMedia() {
  yield takeEvery(GET_TWEETS_WITH_MEDIA, fetchTweetsWithMedia);
}

export function* watchFetchTweetsWithLikes() {
  yield takeEvery(GET_TWEETS_WITH_LIKES, fetchTweetsWithLikes);
}

export function* watchFetchAnswers() {
  yield takeEvery(GET_ANSWERS, fetchAnswers);
}

export function* watchFetchTweetsForTrendsAuthUser() {
  yield takeEvery(GET_TWEETS_FOR_TRENDS, fetchTweetsForTrends);
}

export function* watchFetchTweetsForTrends() {
  yield takeEvery(
    GET_TWEETS_FOR_TRENDS_AUTH_USER,
    fetchTweetsForTrendsAuthUser
  );
}

export function* watchFetchMoreTweetForTrend() {
  yield takeEvery(GET_MORE_TWEETS_FOR_TRENDS, fetchMoreTweetForTrend);
}

export function* tweetSagas() {
  yield all([
    call(watchFetchAllTweets),
    call(watchFetchMoreTweets),
    call(watchFetchTweetsByUser),
    call(watchFetchPublicTweetsByUser),
    call(watchFetchTweetsWhoYouRead),
    call(watchFetchFavoriteTweets),
    call(watchFetchTweetsForAuthUser),
    call(watchFetchTweetsWithMedia),
    call(watchFetchTweetsWithLikes),
    call(watchFetchAnswers),
    call(watchFetchMoreAnswers),
    call(watchFetchMoreBookmarks),
    call(watchFetchMoreTweetsForAuthUser),
    call(watchFetchMoreTweetsWhoYouReading),
    call(watchFetchMoreTweetsWithLikes),
    call(watchFetchMoreTweetsWithMedia),
    call(watchFetchMoreUserTweets),
    call(watchFetchTweetsForTrends),
    call(watchFetchTweetsForTrendsAuthUser),
    call(watchFetchMoreTweetForTrend),
    call(watchFetchMorePublicTweetsByUser),
  ]);
}
