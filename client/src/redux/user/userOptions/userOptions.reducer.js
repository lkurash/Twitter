import { combineReducers } from "redux";
import {
  GET_PREVIEW_PROFILE,
  CREATE_FOLLOWING,
  DELETE_FOLLOWING,
  GET_SEARCHED_USERS,
  SET_FOLLOW_PREVIEW_PROFILE,
  SET_PREVIEW_PROFILE,
  SET_SEARCHED_USERS,
  REQUEST_PREVIEW_PROFILE_STARTED,
  REQUEST_PREVIEW_PROFILE_FAILED,
} from "../consts";
import { defaultState } from "../../store/defaultState";
import { changingUsers } from "../changingUsers";

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
        userInfo: changingUsers.changeFollow(state.userInfo),
      };

    case REQUEST_PREVIEW_PROFILE_STARTED:
      return {
        state,
      };

    case REQUEST_PREVIEW_PROFILE_FAILED:
      return {
        ...state,
        loadingStatus: "FAILED",
        error: action.error,
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
