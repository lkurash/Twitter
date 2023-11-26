import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { appWatcher } from "..";
import { tweetReducer } from "../tweet/tweet.reducer";
import { userReducer } from "../user/user.reducer";
import { visibilityPageReducer } from "../visibilityPage/visibilityPage.reducer";
import { trendReducer } from "../trend/trend.reducer";
import { userOptionsReducer } from "../userOptions/userOptions.reducer";

const sagaMiddleware = createSagaMiddleware();

const appReducer = combineReducers({
  twitsStore: tweetReducer,
  userStore: userReducer,
  userPreview: userOptionsReducer,
  trendStore: trendReducer,
  visibilityState: visibilityPageReducer,
});

export const store = createStore(appReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(appWatcher);
