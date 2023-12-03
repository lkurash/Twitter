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
} from "../tweet/const";

export const tweetOptionsReducer = (state, action) => {
  switch (action.type) {
    case CREATE_TWEET:
      return state;

    case CREATE_LIKE:
      return state;

    case CREATE_RETWEET:
      return state;

    case CREATE_BOOKMARKS:
      return state;

    case DELETE_BOOKMARK:
      return state;

    case CREATE_COMMET:
      return state;

    case DELETE_TWEET:
      return state;

    case DELETE_RETWEET:
      return state;

    case COUNT_RETWEETS:
      return state;

    case COUNT_LIKES:
      return state;

    case COUNT_COMMENTS:
      return state;

    default:
      break;
  }
};
