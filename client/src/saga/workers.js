import { call, put } from "redux-saga/effects";

export default function* fetchDataWorker(
  fetch,
  actionRequestStarted,
  actionRequestSuccess,
  actionRequestFailed,
  limit,
  list
) {
  yield put(actionRequestStarted());
  try {
    const data = yield call(fetch, limit, list);
    yield put(actionRequestSuccess(data));
  } catch (error) {
    yield put(actionRequestFailed(error));
  }
}
