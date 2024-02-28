import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../Context";

import { useSelector } from "react-redux";

import getFlagIsAuth from "../utils/getFlagIsAuth";
import getAuthUserID from "../utils/getAuthUserID";
import { loadingSetup } from "../utils/loadingSetup";

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
import {
  visibilityPrivatePage,
  visibilityPublicPage,
} from "../redux/visibilityPage/visibilityPage.selectors";
import MessageAboutLoading from "../components/common/MessageAboutLoading";

const AppLayout = observer(() => {
  const { infoMessageStore } = useContext(Context);
  const { visiblePopUpStore } = useContext(Context);
  const visibilityPublic = useSelector(visibilityPublicPage);
  const visibilityPrivate = useSelector(visibilityPrivatePage);
  const authUserID = getAuthUserID();
  const path = useLocation().pathname;
  const ref = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const boundedSetup = loadingSetup.setup.bind(
    authUserID ? visibilityPrivate : visibilityPublic
  );

  const getLoadingStatus = () => {
    if (visibilityPublic.visibilityPage || visibilityPrivate.visibilityPage) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    boundedSetup(setIsLoading);
  }, [getLoadingStatus()]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [path]);

  return (
    <div>
      {isLoading ? (
        <MessageAboutLoading />
      ) : (
        <>
          <div
            className={authUserID ? "private-page" : "public-page"}
            ref={ref}
          >
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
        </>
      )}
    </div>
  );
});
export default AppLayout;
