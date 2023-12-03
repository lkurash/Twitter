import {
  GET_MAIN_CONTENT_FOR_AUTH_USER,
  GET_MAIN_CONTENT_FOR_NOT_AUTH_USER,
  REQUEST_CONTENT_FOR_AUTH_USER_FAILED,
  REQUEST_CONTENT_FOR_AUTH_USER_STARTED,
  REQUEST_CONTENT_FOR_NOT_AUTH_FAILED,
  REQUEST_CONTENT_FOR_NOT_AUTH_STARTED,
  SET_MAIN_CONTENT_FOR_AUTH_USER,
  SET_MAIN_CONTENT_FOR_NOT_AUTH_USER,
} from "../visibilityPage/consts";

class VisibilityPageActions {
  getContentForAuthUser(userId, limit, list) {
    return {
      type: GET_MAIN_CONTENT_FOR_AUTH_USER,
      userId,
      limit,
      list,
    };
  }

  setContentForAuthUser() {
    return {
      type: SET_MAIN_CONTENT_FOR_AUTH_USER,
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

  requestStartedForAuthUser() {
    return {
      type: REQUEST_CONTENT_FOR_AUTH_USER_STARTED,
    };
  }

  requestFailedForAuthUser(error) {
    return {
      type: REQUEST_CONTENT_FOR_AUTH_USER_FAILED,
      error,
    };
  }

  requestStartedForNotAuthUser() {
    return {
      type: REQUEST_CONTENT_FOR_NOT_AUTH_STARTED,
    };
  }

  requestFailedForNotAuthUser(error) {
    return {
      type: REQUEST_CONTENT_FOR_NOT_AUTH_FAILED,
      error,
    };
  }
}

export const visibilityPageActions = new VisibilityPageActions();
