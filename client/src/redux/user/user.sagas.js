import {
  call,
  put,
  takeEvery,
  all,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import { userActions } from "./user.actions";
import userAPI from "../../http/userAPI";
import pageAPI from "../../http/pageAPI";
import {
  AUTHENTICATION,
  GET_AUTH,
  GET_FOLLOWERS,
  GET_FOLLOWINGS,
  GET_LIST_WHO_NOT_READING,
  GET_USER,
  GET_USERS_WHO_TO_FOLLOW,
  GET_USER_PROFILE,
  GET_USER_PROFILE_BY_ID,
  REGISTRATION,
  UPDATE_PROFILE,
} from "../../utils/consts";
import { userErrorActions } from "./user.error.actions";

export function* register(action) {
  yield put(userErrorActions.requestAuthenticationStarted());

  try {
    const authenticationResult = yield call(
      userAPI.register,
      action.name,
      action.email,
      action.password,
      action.birthdate
    );

    yield put(userActions.setAuth(true, authenticationResult.token));
  } catch (error) {
    yield put(userErrorActions.requestAuthenticationFailed(error));
  }
}

export function* authentication(action) {
  yield put(userErrorActions.requestAuthenticationStarted());

  try {
    const authenticationResult = yield call(
      userAPI.authentication,
      action.email,
      action.password
    );

    yield put(userActions.setAuth(true, authenticationResult.token));
  } catch (error) {
    yield put(userErrorActions.requestAuthenticationFailed(error));
  }
}

export function* isAuth(action) {
  yield put(userActions.setAuth(action.auth));
}

export function* fetchUser(action) {
  // yield put(userActions.requestStarted());
  try {
    const user = yield call(pageAPI.getUser, action.userId);

    yield put(userActions.setUser(user));
  } catch (error) {
    yield put(userActions.requestFailed(error));
  }
}

export function* fetchUserProfile(action) {
  yield put(userErrorActions.requestUserProfileStarted());
  try {
    const userProfile = yield call(userAPI.getUserProfile, action.userId);

    yield put(userActions.setUserProfile(userProfile));
  } catch (error) {
    yield put(userErrorActions.requestUserProfileFailed(error));
  }
}

export function* fetchUserProfileById(action) {
  yield put(userErrorActions.requestUserProfileByIdStarted());

  try {
    const userProfile = yield call(userAPI.getUserProfile, action.userId);

    yield put(userActions.setUserProfileById(userProfile));
  } catch (error) {
    yield put(userErrorActions.requestUserProfileByIdFailed(error));
  }
}

export function* updateProfile(action) {
  yield put(userErrorActions.requestUserProfileByIdStarted());
  try {
    const userProfile = yield call(
      userAPI.updateUserProfile,
      action.userId,
      action.updateProfile
    );

    yield put(userActions.setUserProfileById(userProfile));
  } catch (error) {
    yield put(userErrorActions.requestUserProfileByIdFailed(error));
  }
}

export function* fetchFollowers(action) {
  yield put(userErrorActions.requestFollowersStarted());
  try {
    const followers = yield call(userAPI.getFollowersUser, action.userId);

    yield put(userActions.setFollowers(followers));
  } catch (error) {
    yield put(userErrorActions.requestFollowersFailed(error));
  }
}

export function* fetchFollowings(action) {
  yield put(userErrorActions.requestFollowingsStarted());
  try {
    const followings = yield call(userAPI.getFollowingsUser, action.userId);

    yield put(userActions.setFollowings(followings));
  } catch (error) {
    yield put(userErrorActions.requestFollowingsFailed(error));
  }
}

export function* fetchListWhoNotReading(action) {
  yield put(userErrorActions.requestListWhoNotReadingStarted());
  try {
    const listWhoNotReading = yield call(
      userAPI.getWhoNotReadingUsers,
      action.userId
    );

    yield put(userActions.setListWhoNotReading(listWhoNotReading));
  } catch (error) {
    yield put(userErrorActions.requestListWhoNotReadingFailed(error));
  }
}

export function* fetchListWhoToFollow(action) {
  yield put(userErrorActions.requestListWhoNotReadingStarted());
  try {
    const listWhoNotReading = yield call(userAPI.getUsers);

    yield put(userActions.setListWhoToFollow(listWhoNotReading));
  } catch (error) {
    yield put(userErrorActions.requestListWhoNotReadingFailed(error));
  }
}

export function* wathAuth() {
  yield takeLatest(GET_AUTH, isAuth);
}

export function* wathRegister() {
  yield takeEvery(REGISTRATION, register);
}

export function* watchAuthentication() {
  yield takeEvery(AUTHENTICATION, authentication);
}

export function* wathFetchUserProfile() {
  yield takeEvery(GET_USER_PROFILE, fetchUserProfile);
}

export function* wathFetchUserProfileById() {
  yield takeLeading(GET_USER_PROFILE_BY_ID, fetchUserProfileById);
}

export function* wathFetchUser() {
  yield takeEvery(GET_USER, fetchUser);
}

export function* wathUpdateProfile() {
  yield takeEvery(UPDATE_PROFILE, updateProfile);
}

export function* watchFetchFollowers() {
  yield takeEvery(GET_FOLLOWERS, fetchFollowers);
}

export function* watchFetchFollowings() {
  yield takeEvery(GET_FOLLOWINGS, fetchFollowings);
}

export function* watchFetchListWhoNotReading() {
  yield takeEvery(GET_LIST_WHO_NOT_READING, fetchListWhoNotReading);
}

export function* watchFetchListWhoToFollow() {
  yield takeEvery(GET_USERS_WHO_TO_FOLLOW, fetchListWhoToFollow);
}

export function* userSagas() {
  yield all([
    call(wathAuth),
    call(wathRegister),
    call(watchAuthentication),
    call(wathFetchUser),
    call(wathFetchUserProfile),
    call(wathUpdateProfile),
    call(watchFetchFollowers),
    call(watchFetchFollowings),
    call(watchFetchListWhoNotReading),
    call(wathFetchUserProfileById),
  ]);
}
