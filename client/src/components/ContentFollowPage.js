import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";

import {
  FOLLOWERS_PAGE_PATH,
  FOLLOWINGS_PAGE_PATH,
  USER_FOLLOWER_PAGE_PATH,
  USER_FOLLOWING_PAGE_PATH,
} from "../utils/constans";

import UserFollowersList from "./UserFollowersList";
import UserFollowingList from "./UserFollowingList";

import arrowLeft from "./Img/arrow_left_icon.png";
import path from "../utils/path";

const ContentFollowPage = observer(() => {
  const { usersStore } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const pathHomeProfileUser = location.includes("home");

  return (
    <div>
      <div className="follow-page-header">
        <div className="follow-page-header-page-name">
          <div
            className="main-search-block-button-return"
            onClick={() => navigate(-1)}
          >
            <img src={arrowLeft} alt="Button return" />
          </div>
          {usersStore.userPage.user_name && (
            <div className="follow-page-header-user-name">
              <h2>{usersStore.userPage.user_name}</h2>
              <p>@{usersStore.userPage.user_name}</p>
            </div>
          )}
        </div>

        <div className="user-main-content-button-panel">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `follow-page-main-button-onpanel follow-page-active-button-panel`
                : `follow-page-main-button-onpanel`
            }
            to={
              pathHomeProfileUser
                ? FOLLOWINGS_PAGE_PATH
                : path(USER_FOLLOWING_PAGE_PATH, usersStore.userPage.id)
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
                : path(USER_FOLLOWER_PAGE_PATH, usersStore.userPage.id)
            }
          >
            <span>Followers</span>
          </NavLink>
        </div>
      </div>
      {location.includes("following") && <UserFollowingList />}
      {location.includes("followers") && <UserFollowersList />}
    </div>
  );
});

export default ContentFollowPage;
