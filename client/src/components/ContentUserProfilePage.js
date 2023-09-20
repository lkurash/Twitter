import { observer } from "mobx-react-lite";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";

import loadPageUserInfo from "./loadComponents/loadPageUserInfo";

import ProfileButtonPanel from "./ProfileButtonPanel";
import ProfileUserInfo from "./ProfileUserInfo";

import arrowLeft from "./Imgs/arrow_left_icon.png";

const ContentUserProfilePage = observer(({ pathHomeProfileUser }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { usersStore } = useContext(Context);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  }, [usersStore.userPage.id]);

  if (isLoading || !usersStore.userPage.id) {
    return loadPageUserInfo();
  }

  return (
    <>
      <div className="main-stiky-panel users-page-stiky-panel">
        <div
          className="main-search-block-button-return"
          onClick={() => navigate(-1)}
        >
          <img src={arrowLeft} alt="Button return" />
        </div>
        <div className="main-page-name">
          <h2>{usersStore.userPage.user_name}</h2>
          <p>@{usersStore.userPage.user_name}</p>
        </div>
      </div>
      <>
        <div className="main-content-profile-panel">
          <ProfileUserInfo pathHomeProfileUser={pathHomeProfileUser} />
          <ProfileButtonPanel pathHomeProfileUser={pathHomeProfileUser} />
        </div>
        <Outlet />
      </>
    </>
  );
});

export default ContentUserProfilePage;
