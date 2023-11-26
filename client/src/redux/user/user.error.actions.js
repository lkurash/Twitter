import {
  REQUEST_AUTHENTICATION_FAILED,
  REQUEST_AUTHENTICATION_STARTED,
  REQUEST_FOLLOWERS_FAILED,
  REQUEST_FOLLOWERS_STARTED,
  REQUEST_FOLLOWINGS_FAILED,
  REQUEST_FOLLOWINGS_STARTED,
  REQUEST_LIST_WHO_NOT_READING_FAILED,
  REQUEST_LIST_WHO_NOT_READING_STARTED,
  REQUEST_USER_PROFILE_BY_ID_FAILED,
  REQUEST_USER_PROFILE_BY_ID_STARTED,
  REQUEST_USER_PROFILE_FAILED,
  REQUEST_USER_PROFILE_STARTED,
} from "../../utils/consts";

class UserErrorActions {
  requestAuthenticationStarted() {
    return {
      type: REQUEST_AUTHENTICATION_STARTED,
    };
  }

  requestAuthenticationFailed() {
    return {
      type: REQUEST_AUTHENTICATION_FAILED,
    };
  }

  requestUserProfileStarted() {
    return {
      type: REQUEST_USER_PROFILE_STARTED,
    };
  }

  requestUserProfileByIdStarted() {
    return {
      type: REQUEST_USER_PROFILE_BY_ID_STARTED,
    };
  }

  requestFollowersStarted() {
    return {
      type: REQUEST_FOLLOWERS_STARTED,
    };
  }

  requestFollowingsStarted() {
    return {
      type: REQUEST_FOLLOWINGS_STARTED,
    };
  }

  requestListWhoNotReadingStarted() {
    return {
      type: REQUEST_LIST_WHO_NOT_READING_STARTED,
    };
  }

  requestUserProfileFailed(error) {
    return {
      type: REQUEST_USER_PROFILE_FAILED,
      error,
    };
  }

  requestUserProfileByIdFailed(error) {
    return {
      type: REQUEST_USER_PROFILE_BY_ID_FAILED,
      error,
    };
  }

  requestFollowersFailed(error) {
    return {
      type: REQUEST_FOLLOWERS_FAILED,
      error,
    };
  }

  requestFollowingsFailed(error) {
    return {
      type: REQUEST_FOLLOWINGS_FAILED,
      error,
    };
  }

  requestListWhoNotReadingFailed(error) {
    return {
      type: REQUEST_LIST_WHO_NOT_READING_FAILED,
      error,
    };
  }
}

export const userErrorActions = new UserErrorActions();
