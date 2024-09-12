import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { appWatcher } from "..";
import { tweetReducer } from "../tweet/tweet.reducer";
import { userReducer } from "../user/user.reducer";
import { visibilityPageReducer } from "../visibilityPage/visibilityPage.reducer";
import { trendReducer } from "../trend/trend.reducer";
import { userOptionsReducer } from "../user/userOptions/userOptions.reducer";
import buttonsOnTweet from "../buttons/buttonsOnTweet";
import buttonFollow from "../buttons/followButton";
import infoMessage from "../popupElements/infoMessage";
import popupForm from "../popupElements/popupForm";
import visibilityUserInfo from "../user/visibilityUserInfo/visibilityUserInfo";

const sagaMiddleware = createSagaMiddleware();

export const appReducer = combineReducers({
  tweetsStore: tweetReducer,
  userStore: userReducer,
  userPreview: userOptionsReducer,
  trendStore: trendReducer,
  visibilityState: visibilityPageReducer,
  buttonStateOnTweet: buttonsOnTweet,
  buttonStateOnFollow: buttonFollow,
  infoMessageStore: infoMessage,
  popUpFormStore: popupForm,
  visibilityUserInfoStore: visibilityUserInfo,
});

export const store = createStore(appReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(appWatcher);
