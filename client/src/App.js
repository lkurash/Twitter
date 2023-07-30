import { observer } from "mobx-react-lite";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { authenticationRoutes, authRoutes, publicRoutes } from "./router";

const App = observer(() => {
  const router = createBrowserRouter([
    authRoutes,
    publicRoutes,
    authenticationRoutes,
  ]);

  return <RouterProvider router={router}></RouterProvider>;
});

export default App;
