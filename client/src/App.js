import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { privateRoutes, privateUserPageRoutes, publicRoutes } from "./router";

const App = () => {
  const router = createBrowserRouter([
    privateRoutes,
    privateUserPageRoutes,
    publicRoutes,
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
