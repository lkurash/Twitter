import { observer } from "mobx-react-lite";
import { NavLink, useParams } from "react-router-dom";

const ProfileButtonPanel = observer(() => {
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
            to={`/home/profile/${id}`}
            end
          >
            Twits
          </NavLink>
        </div>
        <div className="wrapper-button">
          <NavLink
            to={`/home/profile/${id}/answers`}
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
            to={`/home/profile/${id}/media`}
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
            to={`/home/profile/${id}/likes`}
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
