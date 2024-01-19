import { call, put, takeEvery, all } from "redux-saga/effects";
import trendAPI from "../../http/trendAPI";
import {
  CREATE_NOT_INTERESTING_TREND,
  GET_TRENDS,
  GET_TRENDS_FOR_AUTH_USER,
} from "../trend/consts";
import { trendActions } from "./trend.actions";

export function* getTrends(action) {
  yield put(trendActions.requestStarted());
  try {
    const trends = yield call(trendAPI.getAllTrends, action.limit);

    yield put(trendActions.setTrends(trends));
  } catch (error) {
    console.log("error");
    console.log(error);
    yield put(trendActions.requestFailed(error));
  }
}

export function* getTrendsForAuthUser(action) {
  yield put(trendActions.requestStarted());
  try {
    const trends = yield call(
      trendAPI.getAllTrends,
      action.userId,
      action.limit
    );

    yield put(trendActions.setTrends(trends));
  } catch (error) {
    yield put(trendActions.requestFailed(error.response.data.message));
  }
}

export function* getAuthUserTweetsForTrend(action) {
  yield put(trendActions.requestStarted());
  try {
    const trends = yield call(
      trendAPI.getAuthUserTweetsForTrend,
      action.trend,
      action.userId,
      action.limit,
      action.list
    );

    yield put(trendActions.setTrends(trends));
  } catch (error) {
    yield put(trendActions.requestFailed(error.response.data.message));
  }
}

export function* createNotInterestingTrend(action) {
  try {
    const trend = yield call(
      trendAPI.createNotInterestingTrend,
      action.trendId,
      action.userId
    );

    yield put(trendActions.setNotInterestingTrend(trend));
  } catch (error) {}
}

export function* watchGetTrends() {
  yield takeEvery(GET_TRENDS, getTrends);
}

export function* watchGetTrendsTweetsForAuthUser() {
  yield takeEvery(GET_TRENDS_FOR_AUTH_USER, getAuthUserTweetsForTrend);
}

export function* watchCreateNotInterestingTrend() {
  yield takeEvery(CREATE_NOT_INTERESTING_TREND, createNotInterestingTrend);
}

export function* trendSagas() {
  yield all([
    call(watchGetTrends),
    call(watchGetTrendsTweetsForAuthUser),
    call(watchCreateNotInterestingTrend),
  ]);
}
