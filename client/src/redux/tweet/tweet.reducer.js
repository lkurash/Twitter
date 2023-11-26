import { defaultState } from "../store/defaultState";
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
  SET_BOOKMARK,
  SET_LIKE,
  SET_MORE_TWEETS,
  SET_NEW_TWEET,
  SET_RETWEET,
  SET_TWEETS,
  UNSET_RETWEET,
  UNSET_TWEET,
} from "./const";

const bookmark = (twits, bookmark) => {
  twits.map((tweet) => {
    if (tweet.id === bookmark.twitId) {
      tweet.authUserFavorite = !tweet.authUserFavorite;
    }
    return twits;
  });
  return twits;
};

const like = (twits, like) => {
  twits.map((tweet) => {
    if (tweet.id === like.id) {
      tweet.countLikes = like.countLikes;
      tweet.authUserLike = !tweet.authUserLike;
    }
    return twits;
  });
  return twits;
};

const addRetweet = (twits, retweet) => {
  twits.unshift(retweet);

  twits.map((tweet) => {
    if (tweet.id === retweet.twitId) {
      tweet.authUserRetwits = !tweet.authUserRetwits;
      tweet.countRetwits = retweet.countRetwits;
    }
    if (tweet.id === retweet.id) {
      tweet.authUserRetwits = !tweet.authUserRetwits;
      tweet.countRetwits = retweet.countRetwits;
    }
    return twits;
  });
  return twits;
};

const deleteRetweet = (twits, retweet) => {
  let originalTwitsIndex = twits.findIndex(
    (twit) => twit.id === retweet.tweet.twitId
  );

  let retwitsIndex = twits.findIndex((twit) => twit.id === retweet.tweet.id);

  twits[originalTwitsIndex].authUserRetwits = false;
  twits[originalTwitsIndex].countRetwits = retweet.count;
  twits.splice(retwitsIndex, 1);

  return twits;
};

const deleteTweet = (tweets, deletedTweet) => {
  let tweetIndex = tweets.findIndex((twit) => twit.id === deletedTweet.id);

  tweets.splice(tweetIndex, 1);

  return tweets;
};

export const tweetReducer = (state = defaultState.Twits, action) => {
  switch (action.type) {
    case SET_TWEETS:
      return {
        ...state,
        twits:
          action.tweets.tweets.length !== 0 ? [...action.tweets.tweets] : null,
        moreTweets: action.tweets.moreTwits,
        loadingStatus: "COMPLETE",
      };

    case SET_MORE_TWEETS:
      return {
        ...state,
        twits: state.twits.concat([...action.tweets.tweets]),
        moreTweets: action.tweets.moreTwits,
      };

    case SET_BOOKMARK:
      return {
        ...state,
        twits: bookmark(state.twits, action.bookmark),
      };

    case SET_LIKE:
      return {
        ...state,
        twits: like(state.twits, action.like),
      };

    case SET_RETWEET:
      return {
        ...state,
        twits: addRetweet(state.twits, ...action.retweet),
      };

    case SET_NEW_TWEET:
      return {
        ...state,
        twits: [...action.tweet.twit].concat(state.twits),
      };

    case UNSET_RETWEET:
      return {
        ...state,
        twits: deleteRetweet(state.twits, action.retweet),
      };

    case UNSET_TWEET:
      return {
        ...state,
        twits: deleteTweet(state.twits, action.tweet),
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

    case REQUEST_TWITS_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        twits: state.Twits ? state.Twits.twits : null,
        error: false,
      };

    case REQUEST_TWITS_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        twits: state.Twits ? state.Twits.twits : null,
        error: action.error,
      };

    case REQUEST_TWITS_WHO_YOU_READING_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        twits: state.Twits ? state.Twits.twits : null,
        error: false,
      };

    case REQUEST_TWITS_WHO_YOU_READING_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        twits: state.Twits ? state.Twits.twits : null,
        error: action.error,
      };

    case REQUEST_TWITS_FOR_AUTH_USER_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        twits: state.Twits ? state.Twits.twits : null,
        error: false,
      };

    case REQUEST_USER_TWITS_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        twits: state.Twits ? state.Twits.twits : null,
        error: false,
      };

    case REQUEST_USER_TWITS_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        twits: state.Twits ? state.Twits.twits : null,
        error: action.error,
      };
    case REQUEST_TWITS_FOR_AUTH_USER_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        twits: state.Twits ? state.Twits.twits : null,
        error: action.error,
      };

    case REQUEST_TWITS_WITH_LIKES_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        twits: state.Twits ? state.Twits.twits : null,
        error: false,
      };

    case REQUEST_TWITS_WITH_LIKES_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        twits: state.Twits ? state.Twits.twits : null,
        error: action.error,
      };

    case REQUEST_TWITS_WITH_MEDIA_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        twits: state.Twits ? state.Twits.twits : null,
        error: false,
      };

    case REQUEST_TWITS_WITH_MEDIA_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        twits: state.Twits ? state.Twits.twits : null,
        error: action.error,
      };

    case REQUEST_ANSWERS_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        twits: state.Twits ? state.Twits.twits : null,
        error: false,
      };

    case REQUEST_ANSWERS_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        twits: state.Twits ? state.Twits.twits : null,
        error: action.error,
      };

    case REQUEST_BOOKMARKS_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        twits: state.Twits ? state.Twits.twits : null,
        error: false,
      };

    case REQUEST_BOOKMARKS_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        twits: state.Twits ? state.Twits.twits : null,
        error: action.error,
      };

    case REQUEST_TWITS_FOR_TRENDS_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
        twits: state.Twits ? state.Twits.twits : null,
        error: false,
      };

    case REQUEST_TWITS_FOR_TRENDS_FAILED:
      return {
        ...state,
        loadingStatus: "EROR",
        twits: state.Twits ? state.Twits.twits : null,
        error: action.error,
      };

    default:
      return state;
  }
};
