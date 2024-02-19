import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { Context } from "./Context";

import AppRouter from "./AppRouter";

import { store } from "./redux/store";

import RepliesStore from "./store/RepliesStore";
import FavoriteTweetsStore from "./store/FavoriteTweetsStore";
import UsersFollowStore from "./store/UsersFollowStore";
import RetweetsStore from "./store/RetweetStore";
import TweetsStore from "./store/TweetsStore";
import UserStore from "./store/UserStore";
import InfoMessageStore from "./store/InfoMessageStore";
import VisiblePopUpStore from "./store/VisiblePopUpStore";

import reportWebVitals from "./reportWebVitals";

import "./App.css";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Context.Provider
      value={{
        userStore: new UserStore(),
        tweetsStore: new TweetsStore(),
        repliesStore: new RepliesStore(),
        retweetsStore: new RetweetsStore(),
        favoriteTweetsStore: new FavoriteTweetsStore(),
        usersFollowingsStore: new UsersFollowStore(),
        infoMessageStore: new InfoMessageStore(),
        visiblePopUpStore: new VisiblePopUpStore(),
      }}
    >
      <CookiesProvider>
        <AppRouter />
      </CookiesProvider>
    </Context.Provider>
  </Provider>
);

reportWebVitals();
