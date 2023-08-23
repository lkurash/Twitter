import { observer } from "mobx-react-lite";
import { NavLink, useParams } from "react-router-dom";
import {
  PROFILE_PAGE_USER_ANSWERS_PATH,
  PROFILE_PAGE_USER_LIKES_PATH,
  PROFILE_PAGE_USER_MEDIA_PATH,
  PROFILE_PAGE_USER_TWITS_PATH,
} from "../utils/constans";

const ProfileButtonPanel = observer(({ pathHomeProfileUser }) => {
  const { id } = useParams();

  return (
    <>
      <div className="user-main-content-button-panel">
        <div className="wrapper-button">
          <NavLink
            className={({ isActive, isPending }) =>
              isActive
                ? `user-main-content-twits-button-onpanel active-button-panel`
                : `user-main-content-twits-button-onpanel`
            }
            to={
              pathHomeProfileUser
                ? PROFILE_PAGE_USER_TWITS_PATH
                : `/profile/${id}`
            }
            end
          >
            Twits
          </NavLink>
        </div>
        <div className="wrapper-button">
          <NavLink
            to={
              pathHomeProfileUser
                ? PROFILE_PAGE_USER_ANSWERS_PATH
                : `/profile/${id}/answers`
            }
            className={({ isActive }) =>
              isActive
                ? `user-main-content-answers-button-onpanel active-button-panel`
                : `user-main-content-answers-button-onpanel`
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
                : `/profile/${id}/media`
            }
            className={({ isActive }) =>
              isActive
                ? `user-main-content-media-button-onpanel active-button-panel`
                : `user-main-content-media-button-onpanel`
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
                : `/profile/${id}/likes`
            }
            className={({ isActive }) =>
              isActive
                ? `user-main-content-likes-button-onpanel active-button-panel`
                : `user-main-content-likes-button-onpanel`
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
