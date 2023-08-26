import { Outlet } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent";

import MenuComponent from "../../components/MenuComponent";
import getFlagIsAuth from "../../utils/getFlagIsAuth";

import "../../../src/App.css";
import "../../components/menu.css";
import "../../components/main.css";
import "../../components/sideBar.css";
import "../../components/footer.css";
import "../../components/userpage.css";
import "../../components/userTwitPanel.css";
import "../../components/comment.css";
import "../../components/common/common.css";


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
