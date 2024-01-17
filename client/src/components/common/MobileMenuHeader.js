import { useNavigate } from "react-router-dom";
import getUserPhoto from "../../utils/getUserPhoto";
import {
  FOLLOWERS_PAGE_PATH,
  FOLLOWINGS_PAGE_PATH,
  PROFILE_PAGE_USER_PATH,
} from "../../utils/routs";

const MobileMenuHeader = ({ profile }) => {
  const navigate = useNavigate();
  return (
    <div className="main-page-name-wrapper">
      <div>
        <div
          className="button-user-profile"
          onClick={() => navigate(PROFILE_PAGE_USER_PATH)}
        >
          <div className="user-info-photo">
            <img alt="User" src={getUserPhoto(profile)} />
          </div>
        </div>
        <div className="user-info-on-mobile-menu">
          <div
            className="preview-user-name"
            onClick={() => navigate(PROFILE_PAGE_USER_PATH)}
          >
            <h4 className="user-name">{profile.user_name}</h4>
            <p className="profile-name">@{profile.user_name}</p>
          </div>
          <div className="preview-user-follow-info">
            <span
              className="preview-user-count-follow"
              onClick={() => navigate(FOLLOWERS_PAGE_PATH)}
            >
              {profile.followers}
            </span>
            <p onClick={() => navigate(FOLLOWERS_PAGE_PATH)}>Followers</p>
            <span
              className="preview-user-count-follow"
              onClick={() => navigate(FOLLOWINGS_PAGE_PATH)}
            >
              {profile.following}
            </span>
            <p
              className="preview-user-follow-info-followings"
              onClick={() => navigate(FOLLOWINGS_PAGE_PATH)}
            >
              Following
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuHeader;
