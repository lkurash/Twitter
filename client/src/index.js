import { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CookiesProvider } from "react-cookie";

import reportWebVitals from "./reportWebVitals";
import CommentsStore from "./store/CommentsStore";
import FavoriteTwitsStore from "./store/FavoriteTwitsStore";
import UsersFollowStore from "./store/UsersFollowStore";
import RetwitsStore from "./store/RetwitStore";
import TopicsStore from "./store/TopicsStore";
import TwitsStore from "./store/TwitsStore";
import UserStore from "./store/UserStore";

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Context.Provider
    value={{
      usersStore: new UserStore(),
      topicsStore: new TopicsStore(),
      twitsStore: new TwitsStore(),
      commentsStore: new CommentsStore(),
      retwitsStore: new RetwitsStore(),
      favoriteTwitsStore: new FavoriteTwitsStore(),
      usersFollowingsStore: new UsersFollowStore(),
    }}
  >
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Context.Provider>
);

reportWebVitals();
