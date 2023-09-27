import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import { USER_PAGE_PATH, PUBLIC_USER_PAGE_PATH } from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";
import path from "../utils/path";
import PreviewUserOnTwit from "./common/PreviewUserOnTwit";
import userClient from "../http/userClient";

const UserPhoto = observer(({ twit, user }) => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const [showProfileUser, setShowProfileUser] = useState(false);

  const navigate = useNavigate();

  const checkFollowing = async (id) => {
    await userClient.checkFollowing(id).then((following) => {
      usersFollowingsStore.setStartFollowUser(following);
    });
  };

  const onMouseLeave = () => {
    setTimeout(() => {
      setShowProfileUser(false);
    }, 200);
  };

  const onMouseEnter = () => {
    checkFollowing(user.id);
    setTimeout(() => {
      setShowProfileUser(true);
    }, 200);
  };

  return (
    <div className="user-info">
      <div className="user-info-photo">
        <img
          alt="User"
          src={getUserPhoto(user)}
          onMouseEnter={() => {
            onMouseEnter(user);
          }}
          onMouseLeave={() => {
            onMouseLeave();
          }}
          onClick={() => {
            if (usersStore.isAuth) {
              usersStore.setUserPage({});
              twitsStore.setUserTwits([]);
              navigate(path(USER_PAGE_PATH, user.id));
            } else {
              usersStore.setUserPage({});
              twitsStore.setUserTwits([]);
              navigate(path(PUBLIC_USER_PAGE_PATH, user.id));
            }
          }}
        />
        {showProfileUser && (
          <PreviewUserOnTwit
            user={user}
            setShowProfileUser={setShowProfileUser}
          />
        )}
      </div>
    </div>
  );
});
export default UserPhoto;
