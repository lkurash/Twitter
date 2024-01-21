import {
  CREATE_FOLLOWING,
  DELETE_FOLLOWING,
  GET_PREVIEW_PROFILE,
  GET_SEARCHED_USERS,
  REQUEST_PREVIEW_PROFILE_FAILED,
  REQUEST_PREVIEW_PROFILE_STARTED,
  SET_FOLLOW_PREVIEW_PROFILE,
  SET_PREVIEW_PROFILE,
  SET_SEARCHED_USERS,
} from "../consts";

class UserOptionsActions {
  getPreviewProfile(userId, authUserId) {
    return {
      type: GET_PREVIEW_PROFILE,
      userId,
      authUserId,
    };
  }

  getSearchedUsers(name) {
    return {
      type: GET_SEARCHED_USERS,
      name,
    };
  }

  setSearchedUsers(users) {
    return {
      type: SET_SEARCHED_USERS,
      users,
    };
  }

  setPreviewProfile(profile) {
    return {
      type: SET_PREVIEW_PROFILE,
      profile,
    };
  }

  setFollowPreviewProfile() {
    return {
      type: SET_FOLLOW_PREVIEW_PROFILE,
    };
  }

  createFollowing(id, followUserId) {
    return {
      type: CREATE_FOLLOWING,
      id,
      followUserId,
    };
  }

  deleteFollowing(id, followUserId) {
    return {
      type: DELETE_FOLLOWING,
      id,
      followUserId,
    };
  }

  requestPreviewProfileFailed(error) {
    return {
      type: REQUEST_PREVIEW_PROFILE_FAILED,
      error,
    };
  }

  requestPreviewProfileStarted() {
    return {
      type: REQUEST_PREVIEW_PROFILE_STARTED,
    };
  }
}

export const userOptionsActions = new UserOptionsActions();
