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
  // REQUEST_DATA_FAILED,
  // REQUEST_DATA_STARTED,
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
import { defaultState } from "../store/defaultState";

export const visibilityPageReducer = (
  state = defaultState.visibility,
  action
) => {
  switch (action.type) {
    // case REQUEST_DATA_STARTED:
    //   return state;

    // case REQUEST_DATA_FAILED:
    //   return {
    //     ...state,

    //     loadingStatus: "EROR",
    //     visibilityPage: false,
    //     error: action.error,
    //   };

    case GET_MAIN_CONTENT:
      return state;

    case SET_MAIN_CONTENT:
      return {
        ...state,
        visibilityPage: true,
        loadingStatus: "COMPLETE",
      };

    case GET_MAIN_CONTENT_FOR_NOT_AUTH_USER:
      return state;

    case SET_MAIN_CONTENT_FOR_NOT_AUTH_USER:
      return {
        ...state,
        visibilityPage: true,
        loadingStatus: "COMPLETE",
      };

    case GET_VISIBILITY_BOOKMARKS:
      return state;

    case SET_VISIBILITY_BOOKMARKS:
      return {
        ...state,
        visibilityPage: true,
      };

    case GET_VISIBILITY_TWEETS_FOR_AUTH_USER:
      return state;

    case SET_VISIBILITY_TWEETS_FOR_AUTH_USER:
      return {
        ...state,
        visibilityPage: true,
      };

    case GET_VISIBILITY_TWEETS_WHO_YOU_READ:
      return state;

    case SET_VISIBILITY_TWEETS_WHO_YOU_READ:
      return {
        ...state,
        visibilityPage: true,
      };

    case GET_VISIBILITY_TWEETS_BY_USER:
      return state;

    case SET_VISIBILITY_TWEETS_BY_USER:
      return {
        ...state,
        visibilityPage: true,
      };

    case GET_VISIBILITY_TWEETS_WITH_MEDIA:
      return state;

    case SET_VISIBILITY_TWEETS_WITH_MEDIA:
      return {
        ...state,
        visibilityPage: true,
      };

    case GET_VISIBILITY_TWEETS_WITH_LIKES:
      return state;

    case SET_VISIBILITY_TWEETS_WITH_LIKES:
      return {
        ...state,
        visibilityPage: true,
      };

    case GET_VISIBILITY_ANSWERS:
      return state;

    case SET_VISIBILITY_ANSWERS:
      return {
        ...state,
        visibilityPage: true,
      };

    default:
      return state;
  }
};
