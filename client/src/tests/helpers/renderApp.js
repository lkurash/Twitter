import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";

import { store } from "../../redux/store";
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

  return render(
    <Provider store={store}>
        <CookiesProvider>
          <RouterProvider router={router} />
        </CookiesProvider>
    </Provider>
  );
};
