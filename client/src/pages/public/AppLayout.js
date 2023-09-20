import { Outlet, useLocation } from "react-router-dom";
import { useContext, useLayoutEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

import getFlagIsAuth from "../../utils/getFlagIsAuth";

import SidebarContent from "../../components/SidebarContent";
import FooterComponent from "../../components/FooterComponent";
import MenuComponent from "../../components/MenuComponent";
import MessageOnWindow from "../../components/common/MessageOnWindow";

import "../../components/main.css";
import "../../components/sideBar.css";
import "../../components/footer.css";
import "../../components/userpage.css";
import "../../components/Twit/twitActions.css";
import "../../components/comment.css";
import "../../components/common/common.css";


const AppLayout = observer(() => {
  const { infoMessageStore } = useContext(Context);
  const userAuth = getFlagIsAuth();
  const path = useLocation().pathname;
  const ref = useRef();

  useLayoutEffect(() => {
    ref.current.scrollIntoView();
  }, [path]);

  return (
    <div>
      <div className="page">
        <MenuComponent />
        <main className="main-wrapper">
          <div className="main">
            <div className="main-content">
              <div className="main-content-block" ref={ref}>
                <Outlet />
              </div>
            </div>
          </div>
        </main>
        <SidebarContent />
      </div>
      {infoMessageStore.infoMessageVisible && (
        <div className="message-on-window">
          <MessageOnWindow />
        </div>
      )}
      {!userAuth && <FooterComponent />}
    </div>
  );
});
export default AppLayout;
