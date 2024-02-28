import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../Context";

import { useDispatch } from "react-redux";
import { visibilityPageActions } from "../redux/visibilityPage/visibilityPage.actions";
import { userActions } from "../redux/user/user.actions";

import getFlagIsAuth from "../utils/getFlagIsAuth";
import getAuthUserID from "../utils/getAuthUserID";

import MenuComponent from "./MenuComponent";
import Sidebar from "./Sidebar";
import LoginPage from "./public/LoginPage";
import SignUpPage from "./public/SignUpPage";
import MessageOnWindow from "../components/common/MessageOnWindow";
import PublicFooter from "./PublicFooter";
import PrivateFooter from "./PrivateFooter";

import "./main.css";
import "./sideBar.css";
import "./footer.css";
import "../components/userpage.css";
import "../components/Tweets/Tweet/tweetActions.css";
import "../components/comment.css";
import "../components/common/common.css";

const AppLayout = observer(() => {
  const { infoMessageStore } = useContext(Context);
  const { visiblePopUpStore } = useContext(Context);
  const authUserID = getAuthUserID();
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const ref = useRef();

  useLayoutEffect(() => {
    if (authUserID) {
      dispatch(userActions.getAuth(getFlagIsAuth()));
      dispatch(visibilityPageActions.getContentForAuthUser(authUserID));
    } else {
      dispatch(visibilityPageActions.getContentForNotAuthUser());
    }
  }, [authUserID]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [path]);

  return (
    <div>
      <div className={authUserID ? "private-page" : "public-page"} ref={ref}>
        <MenuComponent page={authUserID ? "privatePage" : "publicPage"} />
        <main className="main-wrapper">
          <div className="main">
            <div className="main-content">
              <Outlet />
            </div>
          </div>
        </main>
        <Sidebar />
      </div>
      {visiblePopUpStore.loginPage && <LoginPage />}
      {visiblePopUpStore.signUpPage && <SignUpPage />}

      {infoMessageStore.infoMessageVisible && (
        <div className="message-on-window">
          <MessageOnWindow />
        </div>
      )}
      {getFlagIsAuth() && <PrivateFooter />}
      {!getFlagIsAuth() && <PublicFooter />}
    </div>
  );
});
export default AppLayout;
