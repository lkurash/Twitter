import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { privateRoutes, privateUserPageRoutes, publicRoutes } from "./router";

const AppRouter = () => {
  const router = createBrowserRouter([
    privateRoutes,
    privateUserPageRoutes,
    publicRoutes,
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default AppRouter;
