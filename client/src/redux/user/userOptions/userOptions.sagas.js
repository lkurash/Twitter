import { call, put, takeEvery, all } from "redux-saga/effects";

import { userActions } from "../user.actions";
import { userOptionsActions } from "./userOptions.actions";
import {
  CREATE_FOLLOWING,
  DELETE_FOLLOWING,
  GET_PREVIEW_PROFILE,
  GET_SEARCHED_USERS,
} from "../consts";
import userAPI from "../../../http/userAPI";

export function* fetchPreviewProfile(action) {
  try {
    const user = yield call(
      userAPI.getPreviewProfile,
      action.userId,
      action.authUserId
    );

    yield put(userOptionsActions.setPreviewProfile(user));
  } catch (error) {}
}

export function* addNewFollowingInFollowingList(newFollowing) {
  yield put(userActions.setNewFollowingInFollowingList(newFollowing));
}

export function* addNewFollowingInFollowersList(newFollowing) {
  yield put(userActions.setNewFollowingInFollowersList(newFollowing));
}

export function* deleteFollowingInFollowingList(deletedFollowing) {
  yield put(userActions.setDeleteFollowingInFollowingList(deletedFollowing));
}

export function* deleteFollowingInFollowersList(deletedFollow) {
  yield put(userActions.setDeleteFollowingInFollowersList(deletedFollow));
}

export function* deleteUserInListWhoNotReading(newFollowing) {
  yield put(userActions.deleteUserInListWhoNotReading(newFollowing));
}
export function* changeFollowPreviewProfile() {
  yield put(userOptionsActions.setFollowPreviewProfile());
}

export function* createFollowing(action) {
  try {
    const newFollowing = yield call(
      userAPI.createFollowings,
      action.id,
      action.followUserId
    );

    yield all([
      addNewFollowingInFollowingList(newFollowing),
      addNewFollowingInFollowersList(newFollowing),
      deleteUserInListWhoNotReading(newFollowing),
      changeFollowPreviewProfile(newFollowing),
    ]);
  } catch (error) {}
}

export function* deleteFollowing(action) {
  try {
    const deletedFollow = yield call(
      userAPI.deleteFollowings,
      action.id,
      action.followUserId
    );

    yield all([
      deleteFollowingInFollowersList(deletedFollow),
      deleteFollowingInFollowingList(deletedFollow),
      changeFollowPreviewProfile(deletedFollow),
    ]);
  } catch (error) {}
}

export function* fetchSearchUsers(action) {
  const users = yield call(userAPI.getSearchUsers, action.name);

  yield put(userOptionsActions.setSearchedUsers(users));
}

export function* watchFetchPreviewProfile() {
  yield takeEvery(GET_PREVIEW_PROFILE, fetchPreviewProfile);
}

export function* watchCreateFollowing() {
  yield takeEvery(CREATE_FOLLOWING, createFollowing);
}

export function* watchDeleteFollowing() {
  yield takeEvery(DELETE_FOLLOWING, deleteFollowing);
}

export function* watchFetchSearchUsers() {
  yield takeEvery(GET_SEARCHED_USERS, fetchSearchUsers);
}

export function* userOptionalsSagas() {
  yield all([
    call(watchFetchPreviewProfile),
    call(watchCreateFollowing),
    call(watchDeleteFollowing),
    call(watchFetchSearchUsers),
  ]);
}
