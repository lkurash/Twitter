import {
  REQUEST_ANSWERS_FAILED,
  REQUEST_ANSWERS_STARTED,
  REQUEST_BOOKMARKS_FAILED,
  REQUEST_BOOKMARKS_STARTED,
  REQUEST_TWEETS_FAILED,
  REQUEST_TWEETS_FOR_AUTH_USER_FAILED,
  REQUEST_TWEETS_FOR_AUTH_USER_STARTED,
  REQUEST_TWEETS_FOR_TRENDS_FAILED,
  REQUEST_TWEETS_FOR_TRENDS_STARTED,
  REQUEST_TWEETS_STARTED,
  REQUEST_TWEETS_WHO_YOU_READING_FAILED,
  REQUEST_TWEETS_WHO_YOU_READING_STARTED,
  REQUEST_TWEETS_WITH_LIKES_FAILED,
  REQUEST_TWEETS_WITH_LIKES_STARTED,
  REQUEST_TWEETS_WITH_MEDIA_FAILED,
  REQUEST_TWEETS_WITH_MEDIA_STARTED,
  REQUEST_USER_TWEETS_FAILED,
  REQUEST_USER_TWEETS_STARTED,
} from "./const";

class TweetLoadingActions {
  requestStartedTweets() {
    return {
      type: REQUEST_TWEETS_STARTED,
    };
  }

  requestFailedTweets(error) {
    return {
      type: REQUEST_TWEETS_FAILED,
      error,
    };
  }

  requestStartedTweetsAuthUser() {
    return {
      type: REQUEST_TWEETS_FOR_AUTH_USER_STARTED,
    };
  }

  requestFailedTweetsAuthUser(error) {
    return {
      type: REQUEST_TWEETS_FOR_AUTH_USER_FAILED,
      error,
    };
  }

  requestStartedTweetsWhoYouReading() {
    return {
      type: REQUEST_TWEETS_WHO_YOU_READING_STARTED,
    };
  }

  requestFailedTweetsWhoYouReading(error) {
    return {
      type: REQUEST_TWEETS_WHO_YOU_READING_FAILED,
      error,
    };
  }

  requestStartedUserTweets() {
    return {
      type: REQUEST_USER_TWEETS_STARTED,
    };
  }

  requestFailedUserTweets(error) {
    return {
      type: REQUEST_USER_TWEETS_FAILED,
      error,
    };
  }
  requestStartedTweetsWithLikes() {
    return {
      type: REQUEST_TWEETS_WITH_LIKES_STARTED,
    };
  }

  requestFailedTweetsWithLikes(error) {
    return {
      type: REQUEST_TWEETS_WITH_LIKES_FAILED,
      error,
    };
  }
  requestStartedTweetsWithMedia() {
    return {
      type: REQUEST_TWEETS_WITH_MEDIA_STARTED,
    };
  }

  requestFailedTweetsWithMedia(error) {
    return {
      type: REQUEST_TWEETS_WITH_MEDIA_FAILED,
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

  requestStartedTweetsForTrends() {
    return {
      type: REQUEST_TWEETS_FOR_TRENDS_STARTED,
    };
  }

  requestFailedTweetsForTrends(error) {
    return {
      type: REQUEST_TWEETS_FOR_TRENDS_FAILED,
      error,
    };
  }
}

export const tweetLoadingActions = new TweetLoadingActions();
