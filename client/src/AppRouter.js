import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from ".";
import { authRoutes, publicRoutes } from "./router";
import { LOGIN_PAGE_NOT_AUTH } from "./utils/constans";
const Cookies = require("js-cookie");

const AppRouter = observer(() => {
  const { usersStore } = useContext(Context);

  return (
    <Routes>
      {authRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            // Cookies.get("token") || usersStore.isAuth ? (
              <Component />
            // ) : (
            //   // <Navigate to={LOGIN_PAGE_NOT_AUTH} />
            // )
          }
          exact
        />
      ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
    </Routes>
  );
});

export default AppRouter;
