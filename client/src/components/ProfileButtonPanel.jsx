import { observer } from "mobx-react-lite";
import { NavLink, useParams } from "react-router-dom";
import {
  USER_PAGE_ANSWERS_PATH,
  USER_PAGE_LIKES_PATH,
  USER_PAGE_PATH,
  USER_PAGE__MEDIA_PATH,
  PROFILE_PAGE_USER_ANSWERS_PATH,
  PROFILE_PAGE_USER_LIKES_PATH,
  PROFILE_PAGE_USER_MEDIA_PATH,
  PROFILE_PAGE_USER_TWEETS_PATH,
} from "../utils/routs";
import path from "../utils/path";

const ProfileButtonPanel = observer(({ pathHomeProfileUser }) => {
  const { id } = useParams();

  const getClassNameActiveButton = (isActive) =>
    isActive
      ? `main-content-tweets-button-onpanel active-button-panel`
      : `main-content-tweets-button-onpanel`;

  return (
    <>
      <div className="main-content-button-panel">
        <div className="wrapper-button">
          <NavLink
            className={({ isActive, isPending }) =>
              getClassNameActiveButton(isActive)
            }
            to={
              pathHomeProfileUser
                ? PROFILE_PAGE_USER_TWEETS_PATH
                : path(USER_PAGE_PATH, id)
            }
            end
          >
            Tweets
          </NavLink>
        </div>
        <div className="wrapper-button">
          <NavLink
            to={
              pathHomeProfileUser
                ? PROFILE_PAGE_USER_ANSWERS_PATH
                : path(USER_PAGE_ANSWERS_PATH, id)
            }
            className={({ isActive, isPending }) =>
              getClassNameActiveButton(isActive)
            }
          >
            Answers
          </NavLink>
        </div>
        <div className="wrapper-button">
          <NavLink
            to={
              pathHomeProfileUser
                ? PROFILE_PAGE_USER_MEDIA_PATH
                : path(USER_PAGE__MEDIA_PATH, id)
            }
            className={({ isActive, isPending }) =>
              getClassNameActiveButton(isActive)
            }
          >
            Media
          </NavLink>
        </div>
        <div className="wrapper-button">
          <NavLink
            to={
              pathHomeProfileUser
                ? PROFILE_PAGE_USER_LIKES_PATH
                : path(USER_PAGE_LIKES_PATH, id)
            }
            className={({ isActive, isPending }) =>
              getClassNameActiveButton(isActive)
            }
          >
            <span>Likes</span>
          </NavLink>
        </div>
      </div>
      <div className="main-line" />
    </>
  );
});

export default ProfileButtonPanel;
