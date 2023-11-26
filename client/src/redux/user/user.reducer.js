import { combineReducers } from "redux";
import {
  AUTHENTICATION,
  DELETE_USER_IN_LIST_WHO_NOT_READING,
  GET_AUTH,
  GET_FOLLOWERS,
  GET_FOLLOWINGS,
  GET_LIST_WHO_NOT_READING,
  GET_USER,
  GET_USERS_WHO_TO_FOLLOW,
  GET_USER_PROFILE,
  GET_USER_PROFILE_BY_ID,
  REGISTRATION,
  REQUEST_AUTHENTICATION_FAILED,
  REQUEST_AUTHENTICATION_STARTED,
  REQUEST_DATA_FAILED,
  REQUEST_DATA_STARTED,
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
  SET_AUTH,
  SET_DELETED_FOLLOW_IN_FOLLOWERS_LIST,
  SET_DELETED_FOLLOW_IN_FOLLOWING_LIST,
  SET_FOLLOWERS,
  SET_FOLLOWINGS,
  SET_LIST_WHO_NOT_READING,
  SET_NEW_FOLLOWING_IN_FOLLOWERS_LIST,
  SET_NEW_FOLLOWING_IN_FOLLOWING_LIST,
  SET_USER,
  SET_USERS_WHO_TO_FOLLOW,
  SET_USER_PROFILE,
  SET_USER_PROFILE_BY_ID,
  UPDATE_PROFILE,
} from "../../utils/consts";
import { defaultState } from "../store/defaultState";

const deleteFollowInFollowingsList = (users, userFollowingId) => {
  users.map((user) => {
    if (user.id === userFollowingId) {
      user.following = false;
    }

    return users;
  });
  return users;
};

const createFollowInFollowingsList = (users, userFollowingId) => {
  users.map((user) => {
    if (user.id === userFollowingId) {
      user.following = true;
    }

    return users;
  });
  return users;
};

const deleteFollowInFollowersList = (users, userFollowingId) => {
  users.map((user) => {
    if (user.id === userFollowingId) {
      user.following = false;
    }
    return users;
  });
  return users;
};

const createFollowInFollowersList = (users, userFollowingId) => {
  users.map((user) => {
    if (user.id === userFollowingId) {
      user.following = true;
    }
    return users;
  });
  return users;
};

const deleteUserInListWhoNotReading = (users, id) => {
  let userIndex = users.findIndex((user) => user.id === id);
  users.splice(userIndex, 1);

  return users;
};

export const userProfile = (state = defaultState.User.userProfile, action) => {
  switch (action.type) {
    case REQUEST_USER_PROFILE_STARTED:
      return state;

    case REQUEST_USER_PROFILE_FAILED:
      return {
        ...state,
        loadingStatus: "ERROR",
        error: action.error,
      };

    case GET_USER_PROFILE:
      return state;

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
        loadingStatus: "COMPLETE",
        error: false,
      };

    case UPDATE_PROFILE:
      return state;

    default:
      return state;
  }
};

export const isAuth = (state = defaultState.isAuth, action) => {
  switch (action.type) {
    case REQUEST_AUTHENTICATION_STARTED:
      return {
        ...state,
        isAuth: false,
        loadingStatus: "PENDING",
        error: false,
      };

    case REQUEST_AUTHENTICATION_FAILED:
      return {
        ...state,
        isAuth: false,
        loadingStatus: "ERROR",
        error: action.error,
      };

    case GET_AUTH:
      return state;

    case SET_AUTH:
      return {
        ...state,
        isAuth: action.auth,
        token: action.token,
        loadingStatus: "COMPLETE",
      };

    default:
      return state;
  }
};

export const userProfileById = (
  state = defaultState.User.userProfileById,
  action
) => {
  switch (action.type) {
    case REQUEST_USER_PROFILE_BY_ID_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
      };

    case REQUEST_USER_PROFILE_BY_ID_FAILED:
      return {
        ...state,
        loadingStatus: "ERROR",
        error: action.error,
      };

    case GET_USER_PROFILE_BY_ID:
      return state;

    case SET_USER_PROFILE_BY_ID:
      return {
        ...state,
        profile: action.profile,
        loadingStatus: "COMPLETE",
        error: false,
      };

    case UPDATE_PROFILE:
      return state;

    default:
      return state;
  }
};

export const userFollowers = (
  state = defaultState.User.userFollowers,
  action
) => {
  switch (action.type) {
    case REQUEST_FOLLOWERS_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
      };

    case REQUEST_FOLLOWERS_FAILED:
      return {
        ...state,
        loadingStatus: "ERROR",
        error: action.error,
      };

    case GET_FOLLOWERS:
      return state;

    case SET_FOLLOWERS:
      return {
        ...state,
        followers: [...action.followers],
        loadingStatus: "COMPLETE",
        error: false,
      };

    case SET_NEW_FOLLOWING_IN_FOLLOWERS_LIST:
      return {
        ...state,
        followers: createFollowInFollowersList(
          state.followers,
          action.userFollowingId
        ),
      };

    case SET_DELETED_FOLLOW_IN_FOLLOWERS_LIST:
      return {
        ...state,
        followers: deleteFollowInFollowersList(
          state.followers,
          action.userFollowingId
        ),
      };

    default:
      return state;
  }
};

export const userFollowings = (
  state = defaultState.User.userFollowings,
  action
) => {
  switch (action.type) {
    case REQUEST_FOLLOWINGS_STARTED:
      return {
        ...state,
        loadingStatus: "PENDING",
      };

    case REQUEST_FOLLOWINGS_FAILED:
      return {
        ...state,
        loadingStatus: "ERROR",
        error: action.error,
      };

    case GET_FOLLOWINGS:
      return state;

    case SET_FOLLOWINGS:
      return {
        ...state,
        followings: [...action.followings],
        loadingStatus: "COMPLETE",
        error: false,
      };

    case SET_NEW_FOLLOWING_IN_FOLLOWING_LIST:
      return {
        ...state,
        followings: createFollowInFollowingsList(
          state.followings,
          action.userFollowingId
        ),
      };

    case SET_DELETED_FOLLOW_IN_FOLLOWING_LIST:
      return {
        ...state,
        followings: deleteFollowInFollowingsList(
          state.followings,
          action.userFollowingId
        ),
      };

    default:
      return state;
  }
};

export const userListWhoNotReading = (
  state = defaultState.User.userListWhoNotReading,
  action
) => {
  switch (action.type) {
    case REQUEST_LIST_WHO_NOT_READING_STARTED:
      return state;

    case REQUEST_LIST_WHO_NOT_READING_FAILED:
      return {
        ...state,
        loadingStatus: "ERROR",
        error: action.error,
      };

    case GET_LIST_WHO_NOT_READING:
      return state;

    case SET_LIST_WHO_NOT_READING:
      return {
        ...state,
        listWhoNotReading: [...action.users],
        loadingStatus: "COMPLETE",
        error: false,
      };

    case DELETE_USER_IN_LIST_WHO_NOT_READING:
      return {
        ...state,
        listWhoNotReading: deleteUserInListWhoNotReading(
          state.listWhoNotReading,
          action.userId
        ),
      };

    case GET_USERS_WHO_TO_FOLLOW:
      return state;

    case SET_USERS_WHO_TO_FOLLOW:
      return {
        ...state,
        listWhoNotReading: [...action.users],
        loadingStatus: "COMPLETE",
        error: false,
      };

    default:
      return state;
  }
};

export const userReducer = combineReducers({
  isAuth,
  userProfile,
  userProfileById,
  userFollowers,
  userFollowings,
  userListWhoNotReading,
});

// export const userReducer = (state = defaultState.User, action) => {
//   switch (action.type) {
//     case REQUEST_DATA_STARTED:
//       return {
//         ...state,
//         User: state.User,
//       };

//     case REQUEST_DATA_FAILED:
//       return {
//         ...state,
//         User: state.User,
//       };

//     case SET_USER:
//       return {
//         ...state,
//         User: {
//           userProfile: {
//             profile: action.user.profile,
//             loadingStatus: "COMPLETE",
//             error: false,
//           },
//           userFollowers: {
//             followers: [...action.user.followers],
//             loadingStatus: "COMPLETE",
//             error: false,
//           },
//           userFollowings: {
//             followings: [...action.user.followings],
//             loadingStatus: "COMPLETE",
//             error: false,
//           },
//           userListWhoNotReading: state.User.userListWhoNotReading,
//         },
//       };

//     case SET_USER_PROFILE:
//       return {
//         ...state,
//         User: {
//           userProfile: Object.assign({}, state, {
//             profile: userProfile(state.User, action),
//           }),
//           userFollowers: state.User.userFollowers,
//           userFollowings: state.User.userFollowings,
//           userListWhoNotReading: state.User.userListWhoNotReading,
//         },
//       };

//     case AUTHENTICATION:
//       return state;

//     case REGISTRATION:
//       return state;

//     case GET_USER:
//       return state;

//     // case GET_USER_PROFILE:
//     //   return state;

//     case UPDATE_PROFILE:
//       return state;

//     case GET_FOLLOWERS:
//       return state;

//     case SET_FOLLOWERS:
//       return {
//         ...state,
//         User: {
//           userProfile: state.User.userProfile,
//           userFollowers: {
//             followers: [...action.followers],
//             profile: action.user.profile,
//             loadingStatus: "COMPLETE",
//             error: false,
//           },
//           userFollowings: state.User.userFollowings,
//           userListWhoNotReading: state.User.userListWhoNotReading,
//         },
//       };

//     case GET_FOLLOWINGS:
//       return state;

//     case SET_FOLLOWINGS:
//       return {
//         ...state,
//         User: {
//           userProfile: state.User.userProfile,
//           userFollowers: state.User.userFollowers,
//           userFollowings: {
//             followings: [...action.user.followings],
//             loadingStatus: "COMPLETE",
//             error: false,
//           },
//           userListWhoNotReading: state.User.userListWhoNotReading,
//         },
//       };

//     case GET_LIST_WHO_NOT_READING:
//       return state;

//     case SET_LIST_WHO_NOT_READING:
//       return {
//         ...state,
//         User: {
//           userProfile: state.User.userProfile,
//           userFollowers: state.User.userFollowers,
//           userFollowings: state.User.userFollowings,
//           userListWhoNotReading: {
//             listWhoNotReading: [...action.users],
//             loadingStatus: "COMPLETE",
//             error: false,
//           },
//         },
//       };

//     default:
//       return state;
//   }
// };
