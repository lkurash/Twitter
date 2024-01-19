import { combineReducers } from "redux";
import { defaultState } from "../store/defaultState";
import {
  GET_MAIN_CONTENT_FOR_AUTH_USER,
  GET_MAIN_CONTENT_FOR_NOT_AUTH_USER,
  SET_MAIN_CONTENT_FOR_AUTH_USER,
  SET_MAIN_CONTENT_FOR_NOT_AUTH_USER,
  REQUEST_CONTENT_FOR_AUTH_USER_FAILED,
  REQUEST_CONTENT_FOR_AUTH_USER_STARTED,
  REQUEST_CONTENT_FOR_NOT_AUTH_FAILED,
  REQUEST_CONTENT_FOR_NOT_AUTH_STARTED,
} from "./consts";

export const visibilityPrivatePage = (
  state = defaultState.visibilityPrivatePage,
  action
) => {
  switch (action.type) {
    case GET_MAIN_CONTENT_FOR_AUTH_USER:
      return state;

    case SET_MAIN_CONTENT_FOR_AUTH_USER:
      return {
        ...state,
        visibilityPage: true,
        loadingStatus: "COMPLETE",
      };

    case REQUEST_CONTENT_FOR_AUTH_USER_FAILED:
      return {
        ...state,
        visibilityPage: false,
        loadingStatus: "ERROR",
        error: action.error,
      };

    case REQUEST_CONTENT_FOR_AUTH_USER_STARTED:
      return {
        ...state,
        visibilityPage: false,
        loadingStatus: "PENDING",
        error: false,
      };

    default:
      return state;
  }
};

export const visibilityPublicPage = (
  state = defaultState.visibilityPublicPage,
  action
) => {
  switch (action.type) {
    case GET_MAIN_CONTENT_FOR_NOT_AUTH_USER:
      return state;

    case SET_MAIN_CONTENT_FOR_NOT_AUTH_USER:
      return {
        ...state,
        visibilityPage: true,
        loadingStatus: "COMPLETE",
      };

    case REQUEST_CONTENT_FOR_NOT_AUTH_STARTED:
      return {
        ...state,
        visibilityPage: false,
        loadingStatus: "PENDING",
        error: false,
      };

    case REQUEST_CONTENT_FOR_NOT_AUTH_FAILED:
      return {
        ...state,
        visibilityPage: false,
        loadingStatus: "ERROR",
        error: action.error,
      };

    default:
      return state;
  }
};

export const visibilityPageReducer = combineReducers({
  visibilityPrivatePage,
  visibilityPublicPage,
});
