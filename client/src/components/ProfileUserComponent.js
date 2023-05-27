import { observer } from "mobx-react-lite";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useContext } from "react";
import ProfilePageAnswers from "./ProfilePageAnswers";
import ProfilePageLikes from "./ProfilePageLikes";
import ProfilePageMedia from "./ProfilePageMedia";
import UserTwits from "./UserTwits";
import ProfileButtonPanel from "./ProfileButtonPanel";
import ProfileUserInfo from "./ProfileUserInfo";
import { Context } from "..";
import arrowLeft from "./Img/arrow_left_icon.png";
import { HOME_PAGE } from "../utils/constans";

const ProfileUserComponent = observer(() => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { id } = useParams();

  return (
    <div className="user-main-content-block">
      <div className="page-name">
        <div
          className="main-search-block-button-return"
          onClick={() => navigate(HOME_PAGE + user.user.id)}
        >
          <img src={arrowLeft} alt="Button return" />
        </div>
        <div className="page-name-user-name">
          <h2>{user.userPage.user_name}</h2>
          <p>@{user.userPage.user_name}</p>
        </div>
      </div>
      {location === `/profile/${id}` && (
        <>
          <div className="user-main-content-profile-panel">
            <ProfileUserInfo />
            <ProfileButtonPanel />
          </div>
          <UserTwits />
        </>
      )}
      {location === `/profile/answers/${id}` && (
        <>
          <div className="user-main-content-profile-panel">
            <ProfileUserInfo />
            <ProfileButtonPanel />
          </div>
          <ProfilePageAnswers />
        </>
      )}
      {location === `/profile/media/${id}` && (
        <>
          <div className="user-main-content-profile-panel">
            <ProfileUserInfo />
            <ProfileButtonPanel />
          </div>
          <ProfilePageMedia />
        </>
      )}
      {location === `/profile/likes/${id}` && (
        <>
          <div className="user-main-content-profile-panel">
            <ProfileUserInfo />
            <ProfileButtonPanel />
          </div>
          <ProfilePageLikes />
        </>
      )}
    </div>
  );
});

export default ProfileUserComponent;