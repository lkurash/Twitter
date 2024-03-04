import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { CookiesProvider } from "react-cookie";

import { store } from "../../redux/store";
import {
  privateRoutes,
  privateUserPageRoutes,
  publicRoutes,
} from "../../router";

export const renderWithRouter = (initialRoute = "") => {
  const routs = [publicRoutes, privateRoutes, privateUserPageRoutes];

  const router = createMemoryRouter(routs, {
    initialEntries: ["/", initialRoute],
  });

  return render(<RouterProvider router={router} />);
};
