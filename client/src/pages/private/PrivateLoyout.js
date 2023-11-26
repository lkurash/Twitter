import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { useDispatch, useSelector } from "react-redux";

import getAuthUserID from "../../utils/getAuthUserID";
import getFlagIsAuth from "../../utils/getFlagIsAuth";

import SidebarContent from "../../components/SidebarContent";
import MenuComponent from "../../components/MenuComponent";
import MessageOnWindow from "../../components/common/MessageOnWindow";

import "../../components/main.css";
import "../../components/sideBar.css";
import "../../components/footer.css";
import "../../components/userpage.css";
import "../../components/Twit/twitActions.css";
import "../../components/comment.css";
import "../../components/common/common.css";
import { visibilityPageActions } from "../../redux/visibilityPage/visibilityPage.actions";
import { userActions } from "../../redux/user/user.actions";
import { auth, userProfile } from "../../redux/user/user.selectors";
import { visibility } from "../../redux/visibilityPage/visibilityPage.selectors";

const PrivateLoyout = observer(() => {
  const { infoMessageStore } = useContext(Context);
   const { profile } = useSelector(userProfile);
  const { isAuth } = useSelector(auth);
  const authUserID = getAuthUserID();
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const ref = useRef();

  useEffect(() => {
    dispatch(visibilityPageActions.getContent(authUserID));
    dispatch(userActions.getAuth(getFlagIsAuth()));
  }, []);

  useLayoutEffect(() => {
    ref.current.scrollIntoView();
  }, [path]);

  return (
    <div>
      <div className="page">
        <MenuComponent page="privatePage" />
        <main className="main-wrapper">
          <div className="main">
            <div className="main-content">
              <div className="main-content-block" ref={ref}>
                {isAuth && profile && <Outlet />}
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
    </div>
  );
});
export default PrivateLoyout;
