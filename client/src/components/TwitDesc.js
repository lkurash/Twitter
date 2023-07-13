import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import { PROFILE_PAGE_USER, TWITTER_USER_PAGE } from "../utils/constans";

const TwitDesc = ({ twit }) => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="twit-desc">
      <div className="twit-user-name-block">
        <h4
          className="twit-user-name"
          onClick={() => {
            if (usersStore.isAuth) {
              usersStore.setUserPage({});
              twitsStore.setUserTwits([]);
              navigate(PROFILE_PAGE_USER + twit.User.id);
            } else {
              usersStore.setUserPage({});
              twitsStore.setUserTwits([]);
              navigate(TWITTER_USER_PAGE + twit.User.id);
            }
          }}
        >
          {twit.User.user_name}
        </h4>
        <p className="profile-name">{`@${twit.User.user_name}`}</p>
      </div>
      <p className="twit-text">{twit.text}</p>
      {twit.img && (
        <div className="wrapper-twit-img">
          <img
            src={`http://localhost:5500/${twit.img}`}
            alt=""
            className="twit-img"
          />
        </div>
      )}
    </div>
  );
};
export default TwitDesc;
