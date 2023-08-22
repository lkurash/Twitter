import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";

import { FOLLOWERS_PAGE_PATH, FOLLOWINGS_PAGE_PATH } from "../utils/constans";

import UserFollowersList from "./UserFollowersList";
import UserFollowingList from "./UserFollowingList";

import arrowLeft from "./Img/arrow_left_icon.png";

const ContentFollowPage = observer(() => {
  const { usersStore } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const getClassNameButton = (page) => {
    if (location === `${page}${usersStore.userPage.id}`) {
      return "follow-page-main-button-onpanel follow-page-active-button-panel";
    } else {
      return "follow-page-main-button-onpanel";
    }
  };

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
          <button
            className={getClassNameButton(FOLLOWINGS_PAGE_PATH)}
            type="button"
            onClick={() =>
              navigate(FOLLOWINGS_PAGE_PATH + usersStore.userPage.id)
            }
          >
            <span>Following</span>
          </button>
          <button
            className={getClassNameButton(FOLLOWERS_PAGE_PATH)}
            type="button"
            onClick={() =>
              navigate(FOLLOWERS_PAGE_PATH + usersStore.userPage.id)
            }
          >
            <span>Followers</span>
          </button>
        </div>
      </div>
      {location === `${FOLLOWINGS_PAGE_PATH}${usersStore.userPage.id}` && (
        <UserFollowingList />
      )}
      {location === `${FOLLOWERS_PAGE_PATH}${usersStore.userPage.id}` && (
        <UserFollowersList />
      )}
    </div>
  );
});

export default ContentFollowPage;
