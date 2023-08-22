import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import {
  PROFILE_PAGE_USERS_PATH,
  PUBLIC_USERS_PAGE_PATH,
} from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";

const UserPhoto = observer(({ twit }) => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="user-info">
      {twit.retwit ? (
        <div
          className="user-info-photo"
          onClick={() => {
            if (usersStore.isAuth) {
              usersStore.setUserPage({});
              twitsStore.setUserTwits([]);
              navigate(PROFILE_PAGE_USERS_PATH + twit.twitUser.id);
            } else {
              usersStore.setUserPage({});
              twitsStore.setUserTwits([]);
              navigate(PUBLIC_USERS_PAGE_PATH + twit.twitUser.id);
            }
          }}
        >
          <img alt="User" src={getUserPhoto(twit.twitUser)} />
        </div>
      ) : (
        <div
          className="user-info-photo"
          onClick={() => {
            if (usersStore.isAuth) {
              usersStore.setUserPage({});
              twitsStore.setUserTwits([]);
              navigate(PROFILE_PAGE_USERS_PATH + twit.user.id);
            } else {
              usersStore.setUserPage({});
              twitsStore.setUserTwits([]);
              navigate(PUBLIC_USERS_PAGE_PATH + twit.user.id);
            }
          }}
        >
          <img alt="User" src={getUserPhoto(twit.user)} />
        </div>
      )}
    </div>
  );
});
export default UserPhoto;
