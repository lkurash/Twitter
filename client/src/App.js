import { observer } from "mobx-react-lite";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { authorizationRoutes, privateRoutes, publicRoutes } from "./router";

const App = observer(() => {
  const router = createBrowserRouter([privateRoutes, publicRoutes, authorizationRoutes]);

  return <RouterProvider router={router}></RouterProvider>;
});

export default App;
