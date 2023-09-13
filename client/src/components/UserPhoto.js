import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import { USER_PAGE_PATH, PUBLIC_USER_PAGE_PATH } from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";
import path from "../utils/path";

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
              navigate(path(USER_PAGE_PATH, twit.twit_user.id));
            } else {
              usersStore.setUserPage({});
              twitsStore.setUserTwits([]);
              navigate(path(PUBLIC_USER_PAGE_PATH, twit.twit_user.id));
            }
          }}
        >
          <img alt="User" src={getUserPhoto(twit.twit_user)} />
        </div>
      ) : (
        <div
          className="user-info-photo"
          onClick={() => {
            if (usersStore.isAuth) {
              usersStore.setUserPage({});
              twitsStore.setUserTwits([]);
              navigate(path(USER_PAGE_PATH, twit.user.id));
            } else {
              usersStore.setUserPage({});
              twitsStore.setUserTwits([]);
              navigate(path(PUBLIC_USER_PAGE_PATH, twit.user.id));
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
