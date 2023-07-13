import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";

import { FOLLOWER_PAGE, FOLLOWING_PAGE } from "../utils/constans";
import UserFollowersList from "./UserFollowersList";
import UserFollowingList from "./UserFollowingList";

import arrowLeft from "./Img/arrow_left_icon.png";

const ContentFollowPage = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const getClassNameButton = (page) => {
    if (location === `${page}${user.userPage.id}`) {
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
          {user.userPage.user_name && (
            <div className="follow-page-header-user-name">
              <h2>{user.userPage.user_name}</h2>
              <p>@{user.userPage.user_name}</p>
            </div>
          )}
        </div>

        <div className="user-main-content-button-panel">
          <button
            className={getClassNameButton(FOLLOWER_PAGE)}
            type="button"
            onClick={() => navigate(FOLLOWER_PAGE + user.userPage.id)}
          >
            <span>Followers</span>
          </button>

          <button
            className={getClassNameButton(FOLLOWING_PAGE)}
            type="button"
            onClick={() => navigate(FOLLOWING_PAGE + user.userPage.id)}
          >
            <span>Following</span>
          </button>
        </div>
      </div>
      {location === `${FOLLOWING_PAGE}${user.userPage.id}` && (
        <UserFollowingList />
      )}
      {location === `${FOLLOWER_PAGE}${user.userPage.id}` && (
        <UserFollowersList />
      )}
    </div>
  );
});

export default ContentFollowPage;
