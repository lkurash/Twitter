import {
  AUTHENTICATION,
  DELETE_USER_IN_LIST_WHO_NOT_READING,
  GET_AUTH,
  GET_FOLLOWERS,
  GET_FOLLOWINGS,
  GET_LIST_WHO_NOT_READING,
  GET_LOG_OUT,
  GET_USER,
  GET_USERS_WHO_TO_FOLLOW,
  GET_USER_PROFILE,
  GET_USER_PROFILE_BY_ID,
  REGISTRATION,
  SET_AUTH,
  SET_DELETED_FOLLOW_IN_FOLLOWERS_LIST,
  SET_DELETED_FOLLOW_IN_FOLLOWING_LIST,
  SET_FOLLOWERS,
  SET_FOLLOWINGS,
  SET_LIST_WHO_NOT_READING,
  SET_LOG_OUT,
  SET_NEW_FOLLOWING_IN_FOLLOWERS_LIST,
  SET_NEW_FOLLOWING_IN_FOLLOWING_LIST,
  SET_USER,
  SET_USERS_WHO_TO_FOLLOW,
  SET_USER_PROFILE,
  SET_USER_PROFILE_BY_ID,
  UPDATE_PROFILE,
} from "../user/consts";

class UserActions {
  setLogOut() {
    return {
      type: SET_LOG_OUT,
    };
  }

  setUser(user) {
    return {
      type: SET_USER,
      user,
    };
  }

  setDeleteFollowingInFollowingList(userFollowingId) {
    return {
      type: SET_DELETED_FOLLOW_IN_FOLLOWING_LIST,
      userFollowingId,
    };
  }

  setNewFollowingInFollowingList(userFollowingId) {
    return {
      type: SET_NEW_FOLLOWING_IN_FOLLOWING_LIST,
      userFollowingId,
    };
  }

  setDeleteFollowingInFollowersList(userFollowingId) {
    return {
      type: SET_DELETED_FOLLOW_IN_FOLLOWERS_LIST,
      userFollowingId,
    };
  }

  setNewFollowingInFollowersList(userFollowingId) {
    return {
      type: SET_NEW_FOLLOWING_IN_FOLLOWERS_LIST,
      userFollowingId,
    };
  }

  setAuth(auth, token) {
    return {
      type: SET_AUTH,
      auth,
      token,
    };
  }

  setUserProfile(profile) {
    return {
      type: SET_USER_PROFILE,
      profile,
    };
  }

  setListWhoNotReading(users) {
    return {
      type: SET_LIST_WHO_NOT_READING,
      users,
    };
  }

  setListWhoToFollow(users) {
    return {
      type: SET_USERS_WHO_TO_FOLLOW,
      users,
    };
  }

  setUserProfileById(profile) {
    return {
      type: SET_USER_PROFILE_BY_ID,
      profile,
    };
  }

  setFollowers(followers) {
    return {
      type: SET_FOLLOWERS,
      followers,
    };
  }

  setFollowings(followings) {
    return {
      type: SET_FOLLOWINGS,
      followings,
    };
  }

  register(name, email, password, birthdate) {
    return {
      type: REGISTRATION,
      name,
      email,
      password,
      birthdate,
    };
  }

  authentication(email, password) {
    return {
      type: AUTHENTICATION,
      email,
      password,
    };
  }

  getAuth(auth) {
    return {
      type: GET_AUTH,
      auth,
    };
  }

  getLogOut() {
    return {
      type: GET_LOG_OUT,
    };
  }

  getUser(userId) {
    return {
      type: GET_USER,
      userId,
    };
  }

  getUserProfile(userId) {
    return {
      type: GET_USER_PROFILE,
      userId,
    };
  }

  getUserProfileById(userId) {
    return {
      type: GET_USER_PROFILE_BY_ID,
      userId,
    };
  }

  updateProfile(userId, updateProfile) {
    return {
      type: UPDATE_PROFILE,
      userId,
      updateProfile,
    };
  }

  getFollowers(userId) {
    return {
      type: GET_FOLLOWERS,
      userId,
    };
  }

  getFollowings(userId) {
    return {
      type: GET_FOLLOWINGS,
      userId,
    };
  }

  getListWhoNotReading(userId) {
    return {
      type: GET_LIST_WHO_NOT_READING,
      userId,
    };
  }

  getListWhoToFollow(userId) {
    return {
      type: GET_USERS_WHO_TO_FOLLOW,
      userId,
    };
  }

  deleteUserInListWhoNotReading(userId) {
    return {
      type: DELETE_USER_IN_LIST_WHO_NOT_READING,
      userId,
    };
  }
}

export const userActions = new UserActions();
