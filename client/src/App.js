import { observer } from "mobx-react-lite";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  authRoutes,
  privateRoutes,
  privateUserPageRoutes,
  publicRoutes,
} from "./router";

const App = observer(() => {
  const router = createBrowserRouter([
    privateRoutes,
    privateUserPageRoutes,
    publicRoutes,
    authRoutes,
  ]);

  return <RouterProvider router={router}></RouterProvider>;
});

export default App;
