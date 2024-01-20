import { defaultState } from "../store/defaultState";
import { changingTweets } from "./changingTweets";
import {
  GET_ANSWERS,
  GET_FAVORITE_TWEETS,
  GET_MORE_TWEETS,
  GET_MORE_TWEETS_FOR_AUTH_USER,
  GET_MORE_TWEETS_FOR_TRENDS,
  GET_PUBLIC_TWEETS_BY_USER,
  GET_TWEETS,
  GET_TWEETS_BY_FOLLOWING_USERS,
  GET_TWEETS_BY_USER,
  GET_TWEETS_FOR_AUTH_USER,
  GET_TWEETS_FOR_TRENDS,
  GET_TWEETS_WITH_LIKES,
  GET_TWEETS_WITH_MEDIA,
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
  SET_BOOKMARK,
  SET_LIKE,
  SET_MORE_TWEETS,
  SET_NEW_TWEET,
  SET_RETWEET,
  SET_TWEETS,
  UNSET_RETWEET,
  UNSET_TWEET,
} from "./const";

export const tweetReducer = (state = defaultState.Tweets, action) => {
  switch (action.type) {
    case SET_TWEETS:
      return {
        ...state,
        tweets:
          action.tweets.tweets.length !== 0 ? [...action.tweets.tweets] : [],
        moreTweets: action.tweets.moreTweets,
        loadingStatus: "COMPLETE",
      };

    case SET_MORE_TWEETS:
      return {
        ...state,
        tweets: state.tweets.concat([...action.tweets.tweets]),
        moreTweets: action.tweets.moreTweets,
      };

    case SET_BOOKMARK:
      return {
        ...state,
        tweets: changingTweets.bookmark(state.tweets, action.bookmark),
      };

    case SET_LIKE:
      return {
        ...state,
        tweets: changingTweets.like(state.tweets, action.like),
      };

    case SET_RETWEET:
      return {
        ...state,
        tweets: changingTweets.addRetweet(state.tweets, ...action.retweet),
      };

    case SET_NEW_TWEET:
      return {
        ...state,
        tweets: state.tweets
          ? [...action.tweet.tweet].concat(state.tweets)
          : [...action.tweet.tweet],
      };

    case UNSET_RETWEET:
      return {
        ...state,
        tweets: changingTweets.deleteRetweet(state.tweets, action.retweet),
      };

    case UNSET_TWEET:
      return {
        ...state,
        tweets: changingTweets.deleteTweet(state.tweets, action.tweet),
      };

    case GET_TWEETS:
      return state;

    case GET_MORE_TWEETS:
      return state;

    case GET_MORE_TWEETS_FOR_TRENDS:
      return state;

    case GET_TWEETS_BY_USER:
      return state;

    case GET_PUBLIC_TWEETS_BY_USER:
      return state;

    case GET_TWEETS_FOR_TRENDS:
      return state;

    case GET_MORE_TWEETS_FOR_AUTH_USER:
      return state;

    case GET_TWEETS_BY_FOLLOWING_USERS:
      return state;

    case GET_FAVORITE_TWEETS:
      return state;

    case GET_TWEETS_FOR_AUTH_USER:
      return state;

    case GET_TWEETS_WITH_MEDIA:
      return state;

    case GET_TWEETS_WITH_LIKES:
      return state;

    case GET_ANSWERS:
      return state;

    case REQUEST_TWEETS_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        tweets: state.Tweets ? state.Tweets.tweets : null,
        error: false,
      };

    case REQUEST_TWEETS_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        tweets: state.Tweets ? state.Tweets.tweets : [],
        error: action.error,
      };

    case REQUEST_TWEETS_WHO_YOU_READING_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        tweets: state.Tweets ? state.Tweets.tweets : null,
        error: false,
      };

    case REQUEST_TWEETS_WHO_YOU_READING_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        tweets: state.Tweets ? state.Tweets.tweets : [],
        error: action.error,
      };

    case REQUEST_TWEETS_FOR_AUTH_USER_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        tweets: state.Tweets ? state.Tweets.tweets : null,
        error: false,
      };

    case REQUEST_USER_TWEETS_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        tweets: state.Tweets ? state.Tweets.tweets : null,
        error: false,
      };

    case REQUEST_USER_TWEETS_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        tweets: state.Tweets ? state.Tweets.tweets : [],
        error: action.error,
      };
    case REQUEST_TWEETS_FOR_AUTH_USER_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        tweets: state.Tweets ? state.Tweets.tweets : [],
        error: action.error,
      };

    case REQUEST_TWEETS_WITH_LIKES_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        tweets: state.Tweets ? state.Tweets.tweets : null,
        error: false,
      };

    case REQUEST_TWEETS_WITH_LIKES_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        tweets: state.Tweets ? state.Tweets.tweets : [],
        error: action.error,
      };

    case REQUEST_TWEETS_WITH_MEDIA_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        tweets: state.Tweets ? state.Tweets.tweets : null,
        error: false,
      };

    case REQUEST_TWEETS_WITH_MEDIA_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        tweets: state.Tweets ? state.Tweets.tweets : [],
        error: action.error,
      };

    case REQUEST_ANSWERS_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        tweets: state.Tweets ? state.Tweets.tweets : null,
        error: false,
      };

    case REQUEST_ANSWERS_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        tweets: state.Tweets ? state.Tweets.tweets : [],
        error: action.error,
      };

    case REQUEST_BOOKMARKS_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        tweets: state.Tweets ? state.Tweets.tweets : null,
        error: false,
      };

    case REQUEST_BOOKMARKS_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        tweets: state.Tweets ? state.Tweets.tweets : [],
        error: action.error,
      };

    case REQUEST_TWEETS_FOR_TRENDS_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        tweets: state.Tweets ? state.Tweets.tweets : null,
        error: false,
      };

    case REQUEST_TWEETS_FOR_TRENDS_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        tweets: state.Tweets ? state.Tweets.tweets : [],
        error: action.error,
      };

    default:
      return state;
  }
};
