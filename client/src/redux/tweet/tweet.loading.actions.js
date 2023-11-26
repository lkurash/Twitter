import {
  REQUEST_ANSWERS_FAILED,
  REQUEST_ANSWERS_STARTED,
  REQUEST_BOOKMARKS_FAILED,
  REQUEST_BOOKMARKS_STARTED,
  REQUEST_TWITS_FAILED,
  REQUEST_TWITS_FOR_AUTH_USER_FAILED,
  REQUEST_TWITS_FOR_AUTH_USER_STARTED,
  REQUEST_TWITS_FOR_TRENDS_FAILED,
  REQUEST_TWITS_FOR_TRENDS_STARTED,
  REQUEST_TWITS_STARTED,
  REQUEST_TWITS_WHO_YOU_READING_FAILED,
  REQUEST_TWITS_WHO_YOU_READING_STARTED,
  REQUEST_TWITS_WITH_LIKES_FAILED,
  REQUEST_TWITS_WITH_LIKES_STARTED,
  REQUEST_TWITS_WITH_MEDIA_FAILED,
  REQUEST_TWITS_WITH_MEDIA_STARTED,
  REQUEST_USER_TWITS_FAILED,
  REQUEST_USER_TWITS_STARTED,
} from "./const";

class TweetLoadingActions {
  requestStartedTwits() {
    return {
      type: REQUEST_TWITS_STARTED,
    };
  }

  requestFailedTwits(error) {
    return {
      type: REQUEST_TWITS_FAILED,
      error,
    };
  }

  requestStartedTwitsAuthUser() {
    return {
      type: REQUEST_TWITS_FOR_AUTH_USER_STARTED,
    };
  }

  requestFailedTwitsAuthUser(error) {
    return {
      type: REQUEST_TWITS_FOR_AUTH_USER_FAILED,
      error,
    };
  }

  requestStartedTwitsWhoYouReading() {
    return {
      type: REQUEST_TWITS_WHO_YOU_READING_STARTED,
    };
  }

  requestFailedTwitsWhoYouReading(error) {
    return {
      type: REQUEST_TWITS_WHO_YOU_READING_FAILED,
      error,
    };
  }

  requestStartedUserTwits() {
    return {
      type: REQUEST_USER_TWITS_STARTED,
    };
  }

  requestFailedUserTwits(error) {
    return {
      type: REQUEST_USER_TWITS_FAILED,
      error,
    };
  }
  requestStartedTwitsWithLikes() {
    return {
      type: REQUEST_TWITS_WITH_LIKES_STARTED,
    };
  }

  requestFailedTwitsWithLikes(error) {
    return {
      type: REQUEST_TWITS_WITH_LIKES_FAILED,
      error,
    };
  }
  requestStartedTwitsWithMedia() {
    return {
      type: REQUEST_TWITS_WITH_MEDIA_STARTED,
    };
  }

  requestFailedTwitsWithMedia(error) {
    return {
      type: REQUEST_TWITS_WITH_MEDIA_FAILED,
      error,
    };
  }

  requestStartedAnswers() {
    return {
      type: REQUEST_ANSWERS_STARTED,
    };
  }

  requestFailedAnswerss(error) {
    return {
      type: REQUEST_ANSWERS_FAILED,
      error,
    };
  }

  requestStartedBookmarks() {
    return {
      type: REQUEST_BOOKMARKS_STARTED,
    };
  }

  requestFailedBookmarks(error) {
    return {
      type: REQUEST_BOOKMARKS_FAILED,
      error,
    };
  }

  requestStartedTwitsForTrends() {
    return {
      type: REQUEST_TWITS_FOR_TRENDS_STARTED,
    };
  }

  requestFailedTwitsForTrends(error) {
    return {
      type: REQUEST_TWITS_FOR_TRENDS_FAILED,
      error,
    };
  }
}

export const tweetLoadingActions = new TweetLoadingActions();
