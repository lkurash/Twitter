import { takeEvery } from "redux-saga/effects";

export function* fetchDataWatcher(typeAction, worker) {
  yield takeEvery(typeAction, worker);
}
