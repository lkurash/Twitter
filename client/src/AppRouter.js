import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Routes, Route} from "react-router-dom";
import { Context } from ".";
import { checkToken } from "./http/userApi";
import { authRoutes, publicRoutes } from "./router";

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    try {
      checkToken()
        .then((data) => {
          user.setAuth(true);
        })
        .finally(() => setLoadingPage(false));
    } catch (e) {
      console.log(e.response.data.message);
    }
  }, []);

  if (loadingPage) {
    return <div>Loading...</div>;
  }
  return (
    <Routes>
      {authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
    </Routes>
  );
});

export default AppRouter;
