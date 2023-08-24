import { observer } from "mobx-react-lite";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";

import { PRIVATE_HOME_PAGE_PATH } from "../utils/constans";
import loadPageUserInfo from "./loadComponents/loadPageUserInfo";

import ProfileButtonPanel from "./ProfileButtonPanel";
import ProfileUserInfo from "./ProfileUserInfo";

import arrowLeft from "./Img/arrow_left_icon.png";

const ContentUserProfilePage = observer(
  ({ pathHomeProfileUser}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { usersStore } = useContext(Context);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }, []);

    if (isLoading || !usersStore.userPage.id) {
      return loadPageUserInfo();
    }

    return (
      <div className="user-main-content-block">
        <div className="page-name main-stiky-panel">
          <div
            className="main-search-block-button-return"
            onClick={() => navigate(PRIVATE_HOME_PAGE_PATH)}
          >
            <img src={arrowLeft} alt="Button return" />
          </div>
          <div className="page-name-user-name">
            <h2>{usersStore.userPage.user_name}</h2>
            <p>@{usersStore.userPage.user_name}</p>
          </div>
        </div>
        <>
          <div className="user-main-content-profile-panel">
            <ProfileUserInfo pathHomeProfileUser={pathHomeProfileUser} />
            <ProfileButtonPanel pathHomeProfileUser={pathHomeProfileUser} />
          </div>
          <Outlet />
        </>
      </div>
    );
  }
);

export default ContentUserProfilePage;
