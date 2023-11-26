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
  REQUEST_DATA_FAILED,
  REQUEST_DATA_STARTED,
  SET_MAIN_CONTENT,
  SET_MAIN_CONTENT_FOR_NOT_AUTH_USER,
  SET_VISIBILITY_ANSWERS,
  SET_VISIBILITY_BOOKMARKS,
  SET_VISIBILITY_TWEETS_BY_USER,
  SET_VISIBILITY_TWEETS_FOR_AUTH_USER,
  SET_VISIBILITY_TWEETS_WHO_YOU_READ,
  SET_VISIBILITY_TWEETS_WITH_LIKES,
  SET_VISIBILITY_TWEETS_WITH_MEDIA,
} from "../../utils/consts";

class VisibilityPageActions {
  requestStarted() {
    return {
      type: REQUEST_DATA_STARTED,
    };
  }

  requestFailed(error) {
    return {
      type: REQUEST_DATA_FAILED,
      error,
    };
  }

  getContent(userId, limit, list) {
    return {
      type: GET_MAIN_CONTENT,
      userId,
      limit,
      list,
    };
  }

  setContent() {
    return {
      type: SET_MAIN_CONTENT,
    };
  }

  getContentForNotAuthUser(limit, list) {
    return {
      type: GET_MAIN_CONTENT_FOR_NOT_AUTH_USER,
      limit,
      list,
    };
  }

  setContentForNotAuthUser() {
    return {
      type: SET_MAIN_CONTENT_FOR_NOT_AUTH_USER,
    };
  }

  getVisibilityBookmarks(userId, limit, list) {
    return {
      type: GET_VISIBILITY_BOOKMARKS,
      userId,
      limit,
      list,
    };
  }

  setVisibilityBookmarks() {
    return {
      type: SET_VISIBILITY_BOOKMARKS,
    };
  }

  getVisibilityTwitsForAuthUser(userId, limit, list) {
    return {
      type: GET_VISIBILITY_TWEETS_FOR_AUTH_USER,
      userId,
      limit,
      list,
    };
  }

  setVisibilityTwitsForAuthUser() {
    return {
      type: SET_VISIBILITY_TWEETS_FOR_AUTH_USER,
    };
  }

  getVisibilityTwitsWhoYouRead(userId, limit, list) {
    return {
      type: GET_VISIBILITY_TWEETS_WHO_YOU_READ,
      userId,
      limit,
      list,
    };
  }

  setVisibilityTwitsWhoYouRead() {
    return {
      type: SET_VISIBILITY_TWEETS_WHO_YOU_READ,
    };
  }

  getVisibilityTweetsByUser(userId, limit, list) {
    return {
      type: GET_VISIBILITY_TWEETS_BY_USER,
      userId,
      limit,
      list,
    };
  }

  setVisibilityTweetsByUser() {
    return {
      type: SET_VISIBILITY_TWEETS_BY_USER,
    };
  }

  getVisibilityTweetsWithMedia(userId, limit, list) {
    return {
      type: GET_VISIBILITY_TWEETS_WITH_MEDIA,
      userId,
      limit,
      list,
    };
  }

  setVisibilityTweetsWithMedia() {
    return {
      type: SET_VISIBILITY_TWEETS_WITH_MEDIA,
    };
  }

  getVisibilityTweetsWithLikes(userId, limit, list) {
    return {
      type: GET_VISIBILITY_TWEETS_WITH_LIKES,
      userId,
      limit,
      list,
    };
  }

  setVisibilityTweetsWithLikes() {
    return {
      type: SET_VISIBILITY_TWEETS_WITH_LIKES,
    };
  }

  getVisibilityAnswers(userId, limit, list) {
    return {
      type: GET_VISIBILITY_ANSWERS,
      userId,
      limit,
      list,
    };
  }

  setVisibilityAnswers() {
    return {
      type: SET_VISIBILITY_ANSWERS,
    };
  }
}

export const visibilityPageActions = new VisibilityPageActions();
