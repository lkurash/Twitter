import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { Context } from "../../Context";

import { store } from "../../redux/store";
import UserStore from "../../store/UserStore";
import TweetsStore from "../../store/TweetsStore";
import RepliesStore from "../../store/RepliesStore";
import RetweetsStore from "../../store/RetweetStore";
import FavoriteTweetsStore from "../../store/FavoriteTweetsStore";
import UsersFollowStore from "../../store/UsersFollowStore";
import InfoMessageStore from "../../store/InfoMessageStore";
import VisiblePopUpStore from "../../store/VisiblePopUpStore";
import {
  privateRoutes,
  privateUserPageRoutes,
  publicRoutes,
} from "../../router";

export const renderApp = (initialRoute = "") => {
  const routs = [publicRoutes, privateRoutes, privateUserPageRoutes];

  const router = createMemoryRouter(routs, {
    initialEntries: ["/", initialRoute],
  });

  const contextValues = {
    userStore: new UserStore(),
    tweetsStore: new TweetsStore(),
    repliesStore: new RepliesStore(),
    retweetsStore: new RetweetsStore(),
    favoriteTweetsStore: new FavoriteTweetsStore(),
    usersFollowingsStore: new UsersFollowStore(),
    infoMessageStore: new InfoMessageStore(),
    visiblePopUpStore: new VisiblePopUpStore(),
  };

  return render(
    <Provider store={store}>
      <Context.Provider value={contextValues}>
        <CookiesProvider>
          <RouterProvider router={router} />
        </CookiesProvider>
      </Context.Provider>
    </Provider>
  );
};
