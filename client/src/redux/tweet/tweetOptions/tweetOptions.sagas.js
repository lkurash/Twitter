import { call, put, takeEvery, all } from "redux-saga/effects";
import tweetAPI from "../../../http/tweetAPI";
import {
  COUNT_COMMENTS,
  COUNT_LIKES,
  COUNT_RETWEETS,
  CREATE_BOOKMARKS,
  CREATE_COMMET,
  CREATE_LIKE,
  CREATE_RETWEET,
  CREATE_TWEET,
  DELETE_RETWEET,
  DELETE_TWEET,
  DELETE_BOOKMARK,
  DELETE_LIKE,
} from "../const";
import { tweetActions } from "../tweet.actions";

export function* createTweet(action) {
  // yield put(tweetActions.requestStarted());

  try {
    const tweet = yield call(tweetAPI.createTweetByUser, action.tweet);

    yield put(tweetActions.setNewTweet(tweet));
  } catch (error) {
    // yield put(tweetActions.requestFailed(error));
  }
}

export function* deleteTweet(action) {
  try {
    const tweet = yield call(tweetAPI.deleteTweetByUser, action.tweetId);

    yield put(tweetActions.unSetTweet(tweet));
  } catch (error) {}
}

export function* createLike(action) {
  // yield put(tweetActions.requestStarted());

  try {
    const like = yield call(
      tweetAPI.createLikeTweetByUser,
      action.userId,
      action.tweetId
    );

    yield put(tweetActions.setLike(like));
  } catch (error) {
    // yield put(tweetActions.requestFailed(error));
  }
}

export function* deleteLike(action) {
  // yield put(tweetActions.requestStarted());
  try {
    const dislike = yield call(
      tweetAPI.deleteLike,
      action.userId,
      action.tweetId
    );

    yield put(tweetActions.setLike(dislike));
  } catch (error) {
    // yield put(tweetActions.requestFailed(error));
  }
}

export function* createRetweet(action) {
  // yield put(tweetActions.requestStarted());

  try {
    const retweet = yield call(
      tweetAPI.createRetweetByUser,
      action.userId,
      action.tweetId,
      action.tweet
    );
    yield put(tweetActions.setRetweet(retweet));
  } catch (error) {
    // yield put(tweetActions.requestFailed(error));
  }
}

export function* deleteRetweet(action) {
  // yield put(tweetActions.requestStarted());
  try {
    const retweet = yield call(
      tweetAPI.deleteRetweet,
      action.retweetId,
      action.userId
    );
    yield put(tweetActions.unSetRetweet(retweet));
  } catch (error) {
    // yield put(tweetActions.requestFailed(error));
  }
}

export function* createBookmark(action) {
  // yield put(tweetActions.requestStarted());

  try {
    const bookmark = yield call(
      tweetAPI.createFavoriteTweetByUser,
      action.userId,
      action.tweetId
    );

    yield put(tweetActions.setBookmark(bookmark));
  } catch (error) {
    // yield put(tweetActions.requestFailed(error));
  }
}

export function* deleteBookmark(action) {
  // yield put(tweetActions.requestStarted());

  try {
    const bookmark = yield call(
      tweetAPI.deleteFavoriteTweetByUser,
      action.userId,
      action.tweetId
    );

    yield put(tweetActions.setBookmark(bookmark));
  } catch (error) {
    // yield put(tweetActions.requestFailed(error));
  }
}

export function* createComment(action) {
  try {
    const tweet = yield call(
      tweetAPI.createCommentTweetByUser,
      action.userId,
      action.tweetId,
      action.text
    );

    yield put(tweetActions.setTweets(tweet));
  } catch (error) {}
}

export function* countRetweets(action) {
  // yield put(tweetActions.requestStarted());

  try {
    const tweet = yield call(tweetAPI.getCountRetweets, action.tweetId);

    yield put(tweetActions.setTweets(tweet));
  } catch (error) {
    // yield put(tweetActions.requestFailed(error));
  }
}

export function* countLikes(action) {
  // yield put(tweetActions.requestStarted());

  try {
    const tweet = yield call(tweetAPI.getCountLikes, action.tweetId);

    yield put(tweetActions.setTweets(tweet));
  } catch (error) {
    // yield put(tweetActions.requestFailed(error));
  }
}

export function* countComments(action) {
  // yield put(tweetActions.requestStarted());

  try {
    const tweet = yield call(tweetAPI.getCountComments, action.tweetId);

    yield put(tweetActions.setTweets(tweet));
  } catch (error) {
    // yield put(tweetActions.requestFailed(error));
  }
}

export function* watchCreateTweet() {
  yield takeEvery(CREATE_TWEET, createTweet);
}

export function* watchCreateLike() {
  yield takeEvery(CREATE_LIKE, createLike);
}

export function* watchDeleteLike() {
  yield takeEvery(DELETE_LIKE, deleteLike);
}

export function* watchCreateRetweet() {
  yield takeEvery(CREATE_RETWEET, createRetweet);
}

export function* watchDeleteRetweet() {
  yield takeEvery(DELETE_RETWEET, deleteRetweet);
}

export function* watchCreateBookmark() {
  yield takeEvery(CREATE_BOOKMARKS, createBookmark);
}

export function* watchDeleteBookmark() {
  yield takeEvery(DELETE_BOOKMARK, deleteBookmark);
}

export function* watchCreateComment() {
  yield takeEvery(CREATE_COMMET, createComment);
}

export function* watchDeleteTweet() {
  yield takeEvery(DELETE_TWEET, deleteTweet);
}

export function* watchCountRetweets() {
  yield takeEvery(COUNT_RETWEETS, countRetweets);
}

export function* watchCountLikes() {
  yield takeEvery(COUNT_LIKES, countLikes);
}

export function* watchCountComments() {
  yield takeEvery(COUNT_COMMENTS, countComments);
}

export function* tweetOptionsSagas() {
  yield all([
    call(watchCreateTweet),
    call(watchCreateRetweet),
    call(watchCreateLike),
    call(watchDeleteLike),
    call(watchCreateBookmark),
    call(watchDeleteBookmark),
    call(watchCreateComment),
    call(watchDeleteTweet),
    call(watchDeleteRetweet),
    call(watchCountRetweets),
    call(watchCountLikes),
    call(watchCountComments),
  ]);
}
