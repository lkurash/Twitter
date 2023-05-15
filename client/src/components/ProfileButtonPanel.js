import { observer } from "mobx-react-lite";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import {
  PROFILE_PAGE_USER,
  PROFILE_PAGE_USER_ANSWERS,
  PROFILE_PAGE_USER_LIKES,
  PROFILE_PAGE_USER_MEDIA,
} from "../utils/constans";

const ProfileButtonPanel = observer(() => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <div className="user-main-content-button-panel">
        {location === `/profile/${id}` ? (
          <button
            className="user-main-content-twits-button-onpanel active-button-panel"
            type="button"
            onClick={() => navigate(PROFILE_PAGE_USER + id)}
          >
            <span>Twits</span>
          </button>
        ) : (
          <button
            className="user-main-content-twits-button-onpanel"
            type="button"
            onClick={() => navigate(PROFILE_PAGE_USER + id)}
          >
            <span>Twits</span>
          </button>
        )}

        {location === `/profile/answers/${id}` ? (
          <button
            className="user-main-content-answers-button-onpanel active-button-panel"
            type="button"
            onClick={() => navigate(PROFILE_PAGE_USER_ANSWERS + id)}
          >
            <span>Answers</span>
          </button>
        ) : (
          <button
            className="user-main-content-answers-button-onpanel"
            type="button"
            onClick={() => navigate(PROFILE_PAGE_USER_ANSWERS + id)}
          >
            <span>Answers</span>
          </button>
        )}

        {location === `/profile/media/${id}` ? (
          <button
            className="user-main-content-media-button-onpanel active-button-panel"
            type="button"
            onClick={() => navigate(PROFILE_PAGE_USER_MEDIA + id)}
          >
            <span>Media</span>
          </button>
        ) : (
          <button
            className="user-main-content-media-button-onpanel"
            type="button"
            onClick={() => navigate(PROFILE_PAGE_USER_MEDIA + id)}
          >
            <span>Media</span>
          </button>
        )}

        {location === `/profile/likes/${id}` ? (
          <button
            className="user-main-content-likes-button-onpanel active-button-panel"
            type="button"
            onClick={() => navigate(PROFILE_PAGE_USER_LIKES + id)}
          >
            <span>Likes</span>
          </button>
        ) : (
          <button
            className="user-main-content-likes-button-onpanel"
            type="button"
            onClick={() => navigate(PROFILE_PAGE_USER_LIKES + id)}
          >
            <span>Likes</span>
          </button>
        )}
      </div>
      <div className="main-line" />
    </>
  );
});

export default ProfileButtonPanel;
