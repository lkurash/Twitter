import {
  CREATE_TWEET,
  COUNT_COMMENTS,
  COUNT_LIKES,
  COUNT_RETWEETS,
  CREATE_BOOKMARKS,
  CREATE_COMMET,
  CREATE_LIKE,
  CREATE_RETWEET,
  DELETE_RETWEET,
  DELETE_TWEET,
  DELETE_BOOKMARK,
  DELETE_LIKE,
} from "../const";

class TweetOptionsActions {
  createTweet(tweet) {
    return {
      type: CREATE_TWEET,
      tweet,
    };
  }

  deleteTweet(tweetId) {
    return {
      type: DELETE_TWEET,
      tweetId,
    };
  }

  createLike(userId, tweetId) {
    return {
      type: CREATE_LIKE,
      userId,
      tweetId,
    };
  }

  deleteLike(userId, tweetId) {
    return {
      type: DELETE_LIKE,
      userId,
      tweetId,
    };
  }

  createRetweet(userId, tweetId, tweet) {
    return {
      type: CREATE_RETWEET,
      userId,
      tweetId,
      tweet,
    };
  }

  deleteRetweet(retweetId, userId) {
    return {
      type: DELETE_RETWEET,
      retweetId,
      userId,
    };
  }

  createBookmark(userId, tweetId) {
    return {
      type: CREATE_BOOKMARKS,
      userId,
      tweetId,
    };
  }

  deleteBookmark(userId, tweetId) {
    return {
      type: DELETE_BOOKMARK,
      userId,
      tweetId,
    };
  }

  createComment(userId, tweetId, text) {
    return {
      type: CREATE_COMMET,
      userId,
      tweetId,
      text,
    };
  }

  countRetweets(tweetId) {
    return {
      type: COUNT_RETWEETS,
      tweetId,
    };
  }

  countLikes(tweetId) {
    return {
      type: COUNT_LIKES,
      tweetId,
    };
  }

  countComments(tweetId) {
    return {
      type: COUNT_COMMENTS,
      tweetId,
    };
  }
}

export const tweetOptionsActions = new TweetOptionsActions();
