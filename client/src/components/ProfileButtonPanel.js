import { observer } from "mobx-react-lite";
import { NavLink, useLocation, useParams } from "react-router-dom";

const ProfileButtonPanel = observer(() => {
  const { id } = useParams();
   const location = useLocation().pathname;

  return (
    <>
      <div className="user-main-content-button-panel">
        <div className="wrapper-button">
          <NavLink
            className={({ isActive, isPending }) =>
              isActive && location ===`/auth/profile/${id}`
                ? `user-main-content-twits-button-onpanel active-button-panel`
                : `user-main-content-twits-button-onpanel`
            }
            to={`/auth/profile/${id}`}
          >
            Twits
          </NavLink>
        </div>
        <div className="wrapper-button">
          <NavLink
            to={`/auth/profile/${id}/answers`}
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
            to={`/auth/profile/${id}/media`}
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
            to={`/auth/profile/${id}/likes`}
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
