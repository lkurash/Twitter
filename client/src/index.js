import { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import reportWebVitals from "./reportWebVitals";
import CommentsStore from "./store/CommentsStore";
import FavoriteTwitsStore from "./store/FavoriteTwitsStore";
import UsersFollowStore from "./store/UsersFollowStore";
import RetwitsStore from "./store/RetwitStore";
import TwitsStore from "./store/TwitsStore";
import UserStore from "./store/UserStore";
import InfoMessageStore from "./store/InfoMessageStore";
import { store } from "./redux/store";
import VisiblePopUpStore from "./store/VisiblePopUpStore";

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Context.Provider
      value={{
        userStore: new UserStore(),
        twitsStore: new TwitsStore(),
        commentsStore: new CommentsStore(),
        retwitsStore: new RetwitsStore(),
        favoriteTwitsStore: new FavoriteTwitsStore(),
        usersFollowingsStore: new UsersFollowStore(),
        infoMessageStore: new InfoMessageStore(),
        visiblePopUpStore: new VisiblePopUpStore(),
      }}
    >
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Context.Provider>
  </Provider>
);

reportWebVitals();
