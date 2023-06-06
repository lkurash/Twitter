import { observer } from "mobx-react-lite";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "./router";

const AppRouter = observer(() => (
  <Routes>
    {authRoutes.map(({ path, Component }) => (
      <Route key={path} path={path} element={<Component />} exact />
    ))}
    {publicRoutes.map(({ path, Component }) => (
      <Route key={path} path={path} element={<Component />} exact />
    ))}
  </Routes>
));

export default AppRouter;
