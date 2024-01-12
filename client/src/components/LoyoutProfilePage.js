import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import loadPageUserInfo from "./loadComponents/loadPageUserInfo";

import ProfileButtonPanel from "./ProfileButtonPanel";
import ProfileUserInfo from "./ProfileUserInfo";

import arrowLeft from "./Imgs/arrow_left_icon.png";
import { auth, userProfileById } from "../redux/user/user.selectors";
import { useSelector } from "react-redux";

const LoyoutProfilePage = ({ pathHomeProfileUser }) => {
  const { profile, loadingStatus } = useSelector(userProfileById);
  const { isAuth } = useSelector(auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (loadingStatus === "PENDING") {
      setTimeout(() => {
        setIsLoading(false);
      }, 250);
    }
  }, [loadingStatus]);

  if (isLoading || !profile) {
    return loadPageUserInfo(isAuth);
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
          <h2>{profile.user_name}</h2>
          <p>@{profile.user_name}</p>
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
};

export default LoyoutProfilePage;
