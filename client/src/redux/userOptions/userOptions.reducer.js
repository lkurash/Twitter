import { combineReducers } from "redux";
import {
  CREATE_FOLLOWING,
  DELETE_FOLLOWING,
  GET_PREVIEW_PROFILE,
  GET_SEARCHED_USERS,
  SET_FOLLOW_PREVIEW_PROFILE,
  SET_PREVIEW_PROFILE,
  SET_SEARCHED_USERS,
} from "../../utils/consts";
import { defaultState } from "../store/defaultState";

const changeFollow = (userInfo) => {
  userInfo.following = !userInfo.following;

  return userInfo;
};

export const userInfo = (state = defaultState.userInfo, action) => {
  switch (action.type) {
    case GET_PREVIEW_PROFILE:
      return state;

    case SET_PREVIEW_PROFILE:
      return {
        ...state,
        loadingStatus: "COMPLETE",
        userInfo: action.profile,
      };

    case CREATE_FOLLOWING:
      return state;

    case DELETE_FOLLOWING:
      return state;

    case SET_FOLLOW_PREVIEW_PROFILE:
      return {
        ...state,
        userInfo: changeFollow(state.userInfo),
      };

    default:
      return state;
  }
};

export const users = (state = defaultState.users, action) => {
  switch (action.type) {
    case GET_SEARCHED_USERS:
      return state;

    case SET_SEARCHED_USERS:
      return {
        ...state,
        users: [...action.users],
      };

    default:
      return state;
  }
};

export const userOptionsReducer = combineReducers({
  userInfo,
  users,
});
