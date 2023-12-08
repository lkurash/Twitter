import { observer } from "mobx-react-lite";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { userProfileById } from "../redux/user/user.selectors";

import path from "../utils/path";
import {
  FOLLOWERS_PAGE_PATH,
  FOLLOWINGS_PAGE_PATH,
  USER_FOLLOWER_PAGE_PATH,
  USER_FOLLOWING_PAGE_PATH,
} from "../utils/routs";

const FollowPageContent = observer(() => {
  const { profile } = useSelector(userProfileById);
  const location = useLocation().pathname;
  const pathHomeProfileUser = location.includes("home");

  return (
    <>
      <div className="follow-page-header">
        <div className="follow-page-header-main-page-name">
          {profile.user_name && (
            <div className="follow-page-header-user-name">
              <h2>{profile.user_name}</h2>
              <p>@{profile.user_name}</p>
            </div>
          )}
        </div>

        <div className="main-content-button-panel">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `follow-page-main-button-onpanel follow-page-active-button-panel`
                : `follow-page-main-button-onpanel`
            }
            to={
              pathHomeProfileUser
                ? FOLLOWINGS_PAGE_PATH
                : path(USER_FOLLOWING_PAGE_PATH, profile.id)
            }
            end
          >
            <span>Following</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `follow-page-main-button-onpanel follow-page-active-button-panel`
                : `follow-page-main-button-onpanel`
            }
            to={
              pathHomeProfileUser
                ? FOLLOWERS_PAGE_PATH
                : path(USER_FOLLOWER_PAGE_PATH, profile.id)
            }
          >
            <span>Followers</span>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
});

export default FollowPageContent;
