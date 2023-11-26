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
  SET_BOOKMARK,
  SET_LIKE,
  SET_MORE_TWEETS,
  SET_NEW_TWEET,
  SET_RETWEET,
  SET_TWEETS,
  UNSET_RETWEET,
  UNSET_TWEET,
} from "./const";

class TweetActions {
  setTweets(tweets) {
    return {
      type: SET_TWEETS,
      tweets,
    };
  }

  setNewTweet(tweet) {
    return {
      type: SET_NEW_TWEET,
      tweet,
    };
  }

  setBookmark(bookmark) {
    return {
      type: SET_BOOKMARK,
      bookmark,
    };
  }

  setLike(like) {
    return {
      type: SET_LIKE,
      like,
    };
  }

  setRetweet(retweet) {
    return {
      type: SET_RETWEET,
      retweet,
    };
  }

  unSetRetweet(retweet) {
    return {
      type: UNSET_RETWEET,
      retweet,
    };
  }

  unSetTweet(tweet) {
    return {
      type: UNSET_TWEET,
      tweet,
    };
  }

  getTweets() {
    return {
      type: GET_TWEETS,
    };
  }

  setMoreTweets(tweets) {
    return {
      type: SET_MORE_TWEETS,
      tweets,
    };
  }

  getMoreTweets(limit, list) {
    return {
      type: GET_MORE_TWEETS,
      limit,
      list,
    };
  }

  getMoreTweetsForAuthUser(userId, limit, list) {
    return {
      type: GET_MORE_TWEETS_FOR_AUTH_USER,
      userId,
      limit,
      list,
    };
  }

  getMoreBookmarks(userId, limit, list) {
    return {
      type: GET_MORE_BOOKMARKS,
      userId,
      limit,
      list,
    };
  }

  getMoreAnswers(userId, limit, list) {
    return {
      type: GET_MORE_ANSWERS,
      userId,
      limit,
      list,
    };
  }

  getMoreUserTweets(userId, limit, list) {
    return {
      type: GET_MORE_USER_TWEETS,
      userId,
      limit,
      list,
    };
  }

  getMoreUserPublicTweets(userId, limit, list) {
    return {
      type: GET_MORE_PUBLIC_TWEETS_BY_USER,
      userId,
      limit,
      list,
    };
  }

  getMoreTweetsWithMedia(userId, limit, list) {
    return {
      type: GET_MORE_TWEETS_WITH_MEDIA,
      userId,
      limit,
      list,
    };
  }

  getMoreTweetsWithLikes(userId, limit, list) {
    return {
      type: GET_MORE_TWEETS_WITH_LIKES,
      userId,
      limit,
      list,
    };
  }

  getMoreTweetsWhoYouReading(userId, limit, list) {
    return {
      type: GET_MORE_TWEETS_WHO_YOU_READING,
      userId,
      limit,
      list,
    };
  }

  getTweetsByUser(userId, limit, list) {
    return {
      type: GET_TWEETS_BY_USER,
      userId,
      limit,
      list,
    };
  }

  getPublicTweetsByUser(userId, limit, list) {
    return {
      type: GET_PUBLIC_TWEETS_BY_USER,
      userId,
      limit,
      list,
    };
  }

  getTweetsByFollowingUsers(userId, limit, list) {
    return {
      type: GET_TWEETS_BY_FOLLOWING_USERS,
      userId,
      limit,
      list,
    };
  }

  getFavoriteTweets(userId, limit, list) {
    return {
      type: GET_FAVORITE_TWEETS,
      userId,
      limit,
      list,
    };
  }

  getTweetsForTrendsAuthUser(trend, limit, list) {
    return {
      type: GET_TWEETS_FOR_TRENDS_AUTH_USER,
      trend,
      limit,
      list,
    };
  }

  getTweetsForTrends(trend, limit, list) {
    return {
      type: GET_TWEETS_FOR_TRENDS,
      trend,
      limit,
      list,
    };
  }

  getMoreTweetsForTrends(trend, limit, list, userId) {
    return {
      type: GET_MORE_TWEETS_FOR_TRENDS,
      trend,
      limit,
      list,
      userId,
    };
  }

  getTweetsForAuthUser(userId, limit, list) {
    return {
      type: GET_TWEETS_FOR_AUTH_USER,
      userId,
      limit,
      list,
    };
  }

  getTweetsWithMedia(userId, limit, list) {
    return {
      type: GET_TWEETS_WITH_MEDIA,
      userId,
      limit,
      list,
    };
  }

  getTweetsWithLikes(userId, limit, list) {
    return {
      type: GET_TWEETS_WITH_LIKES,
      userId,
      limit,
      list,
    };
  }

  getAnswers(userId, limit, list) {
    return {
      type: GET_ANSWERS,
      userId,
      limit,
      list,
    };
  }
}

export const tweetActions = new TweetActions();
