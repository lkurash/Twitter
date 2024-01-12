import { Outlet, useNavigate } from "react-router-dom";

import { userProfileById } from "../redux/user/user.selectors";
import { useSelector } from "react-redux";

import ProfileButtonPanel from "./ProfileButtonPanel";
import ProfileUserInfo from "./ProfileUserInfo";

import arrowLeft from "./Imgs/arrow_left_icon.png";

const LoyoutProfilePage = ({ pathHomeProfileUser }) => {
  const { profile } = useSelector(userProfileById);
  const navigate = useNavigate();

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
          {profile.user_name && (
            <>
              <h2>{profile.user_name}</h2>
              <p>@{profile.user_name}</p>
            </>
          )}
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
