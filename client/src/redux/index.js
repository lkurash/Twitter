import { all, call } from "redux-saga/effects";
import { tweetSagas } from "./tweet/tweet.sagas";
import { userSagas } from "./user/user.sagas";
import { userOptionalsSagas } from "./userOptions/userOptions.sagas";
import { trendSagas } from "./trend/trend.sagas";
import { visibilityPageSagas } from "./visibilityPage/visibilityPage.sagas";
import { tweetOptionsSagas } from "./tweetOptions/tweetOptions.sagas";

export function* appWatcher() {
  yield all([
    call(visibilityPageSagas),
    call(tweetSagas),
    call(tweetOptionsSagas),
    call(userSagas),
    call(userOptionalsSagas),
    call(trendSagas),
  ]);
}
