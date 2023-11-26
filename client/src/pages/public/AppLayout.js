import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import { visibilityPageActions } from "../../redux/visibilityPage/visibilityPage.actions";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import { auth } from "../../redux/user/user.selectors";
import getAuthUserID from "../../utils/getAuthUserID";
import { userActions } from "../../redux/user/user.actions";

const AppLayout = observer(() => {
  const { infoMessageStore } = useContext(Context);
  const { visiblePopUpStore } = useContext(Context);
  const { isAuth } = useSelector(auth);
  const authUserID = getAuthUserID();
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const ref = useRef();

  useEffect(() => {
    if (authUserID) {
      dispatch(visibilityPageActions.getContent(authUserID));
    } else {
      dispatch(visibilityPageActions.getContentForNotAuthUser());
    }
    dispatch(userActions.getAuth(getFlagIsAuth()));
  }, [authUserID]);

  useLayoutEffect(() => {
    ref.current.scrollIntoView();
  }, [path]);

  return (
    <div>
      <div className="page">
        <MenuComponent page={authUserID ? "privatePage" : "publicPage"} />
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
      {visiblePopUpStore.loginPage && <LoginPage />}
      {visiblePopUpStore.signUpPage && <SignUpPage />}

      {infoMessageStore.infoMessageVisible && (
        <div className="message-on-window">
          <MessageOnWindow />
        </div>
      )}
      {!isAuth && <FooterComponent />}
    </div>
  );
});
export default AppLayout;
