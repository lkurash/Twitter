import {
  CREATE_FOLLOWING,
  DELETE_FOLLOWING,
  GET_PREVIEW_PROFILE,
  GET_SEARCHED_USERS,
  SET_DELETED_FOLLOW_IN_FOLLOWING_LIST,
  SET_FOLLOW_PREVIEW_PROFILE,
  SET_NEW_FOLLOWING_IN_FOLLOWING_LIST,
  SET_PREVIEW_PROFILE,
  SET_SEARCHED_USERS,
} from "../../utils/consts";

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
}

export const userOptionsActions = new UserOptionsActions();
