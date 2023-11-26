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
} from "../../utils/consts";
import { DELETE_BOOKMARK, DELETE_LIKE } from "../tweet/const";

class TweetOptionsActions {
  createTweet(tweet) {
    return {
      type: CREATE_TWEET,
      tweet,
    };
  }

  deleteTweet(twitId) {
    return {
      type: DELETE_TWEET,
      twitId,
    };
  }

  createLike(userId, twitId) {
    return {
      type: CREATE_LIKE,
      userId,
      twitId,
    };
  }

  deleteLike(userId, twitId) {
    return {
      type: DELETE_LIKE,
      userId,
      twitId,
    };
  }

  createRetweet(userId, twitId, tweet) {
    return {
      type: CREATE_RETWEET,
      userId,
      twitId,
      tweet,
    };
  }

  deleteRetweet(retwitId, userId) {
    return {
      type: DELETE_RETWEET,
      retwitId,
      userId,
    };
  }

  createBookmark(userId, twitId) {
    return {
      type: CREATE_BOOKMARKS,
      userId,
      twitId,
    };
  }

  deleteBookmark(userId, twitId) {
    return {
      type: DELETE_BOOKMARK,
      userId,
      twitId,
    };
  }

  createCommet(userId, twitId, text) {
    return {
      type: CREATE_COMMET,
      userId,
      twitId,
      text,
    };
  }

  countRetweets(twitId) {
    return {
      type: COUNT_RETWEETS,
      twitId,
    };
  }

  countLikes(twitId) {
    return {
      type: COUNT_LIKES,
      twitId,
    };
  }

  countComments(twitId) {
    return {
      type: COUNT_COMMENTS,
      twitId,
    };
  }
}

export const tweetOptionsActions = new TweetOptionsActions();
