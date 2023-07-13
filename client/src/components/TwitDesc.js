import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import { PROFILE_PAGE_USER, TWITTER_USER_PAGE } from "../utils/constans";

const TwitDesc = ({ twit }) => {
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="twit-desc">
      <div className="twit-user-name-block">
        <h4
          className="twit-user-name"
          onClick={() => {
            if (user.isAuth) {
              user.setUserPage({});
              twits.setUserTwits([]);
              navigate(PROFILE_PAGE_USER + twit.User.id);
            } else {
              user.setUserPage({});
              twits.setUserTwits([]);
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
