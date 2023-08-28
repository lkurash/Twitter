import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import {
  PRIVATE_USERS_PAGE_PATH,
  PUBLIC_USERS_PAGE_PATH,
} from "../utils/constans";

const TwitDesc = ({ twit }) => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="twit-desc">
      {twit.retwit ? (
        <div className="twit-user-name-block">
          <h4
            className="twit-user-name"
            onClick={() => {
              if (usersStore.isAuth) {
                usersStore.setUserPage({});
                twitsStore.setUserTwits([]);
                navigate(PRIVATE_USERS_PAGE_PATH + twit.twitUser.id);
              } else {
                usersStore.setUserPage({});
                twitsStore.setUserTwits([]);
                navigate(`${PUBLIC_USERS_PAGE_PATH}/${twit.twitUser.id}`);
              }
            }}
          >
            {twit.twitUser.user_name}
          </h4>
          <p className="profile-name">{`@${twit.twitUser.user_name}`}</p>
        </div>
      ) : (
        <div className="twit-user-name-block">
          <h4
            className="twit-user-name"
            onClick={() => {
              if (usersStore.isAuth) {
                usersStore.setUserPage({});
                twitsStore.setUserTwits([]);
                navigate(PRIVATE_USERS_PAGE_PATH + twit.user.id);
              } else {
                usersStore.setUserPage({});
                twitsStore.setUserTwits([]);
                navigate(`${PUBLIC_USERS_PAGE_PATH}/${twit.user.id}`);
              }
            }}
          >
            {twit.user.user_name}
          </h4>
          <p className="profile-name">{`@${twit.user.user_name}`}</p>
        </div>
      )}
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
