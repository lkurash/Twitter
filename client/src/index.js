import { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CommentsStore from "./store/CommentsStore";
import FavoriteTwitsStore from "./store/FavoriteTwitsStore";
import RetwitsStore from "./store/RetwitStore";
import TopicsStore from "./store/TopicsStore";
import TwitsStore from "./store/TwitsStore";
import UserStore from "./store/UserStore";

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      topics: new TopicsStore(),
      twits: new TwitsStore(),
      comments: new CommentsStore(),
      retwits: new RetwitsStore(),
      favoriteTwits: new FavoriteTwitsStore(),
    }}
  >
    <App />
  </Context.Provider>
);

reportWebVitals();
