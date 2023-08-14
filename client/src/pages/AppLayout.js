import { Outlet } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";

import MenuComponent from "../components/MenuComponent";
import getFlagIsAuth from "../utils/getFlagIsAuth";


export default function AppLayout() {
  const userAuth = getFlagIsAuth();

  return (
    <div>
      <div className="page">
        <MenuComponent />
        <Outlet />
      </div>
      {!userAuth && <FooterComponent />}
    </div>
  );
}
