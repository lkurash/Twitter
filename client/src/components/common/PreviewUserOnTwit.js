import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../..";
import { useNavigate } from "react-router-dom";

import { PUBLIC_USER_PAGE_PATH, USER_PAGE_PATH } from "../../utils/constans";
import path from "../../utils/path";
import getAuthUserID from "../../utils/getAuthUserID";
import getUserPhoto from "../../utils/getUserPhoto";
import FollowButton from "../buttons/FollowButton";


const PreviewUserOnTwit = observer(({ user, setShowProfileUser }) => {
  const { usersFollowingsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);

  const navigate = useNavigate();

  const authUserID = getAuthUserID();

  return (
    <div
      className="preview-user-twit-wrapper"
      onMouseEnter={() => {
        setShowProfileUser(true);
      }}
      onMouseLeave={() => {
        setShowProfileUser(false);

        usersFollowingsStore.setStartFollowUser({});
      }}
    >
      <>
        <div
          className="preview-user"
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
        >
          <div className="preview-user-header">
            <div className="user-info-photo preview-user-photo">
              <img alt="User" src={getUserPhoto(user)} />
            </div>
            {authUserID !== user.id && authUserID && (
              <FollowButton
                profile={usersFollowingsStore.startFollowUser}
                following={usersFollowingsStore.startFollowUser.following}
                classButton="button-follow-follow-list"
              />
            )}
          </div>
          <div className="preview-user-name">
            <h4 className="user-name">{user.user_name}</h4>
            <p className="profile-name">{`@${user.user_name}`}</p>
          </div>
          <p className="preview-user-about">{user.about}</p>
          <div className="preview-user-follow-info">
            <span className="preview-user-count-follow">
              {usersFollowingsStore.startFollowUser.followersUsers}
            </span>
            <p>followers</p>
            <span className="preview-user-count-follow">
              {usersFollowingsStore.startFollowUser.followingsUsers}
            </span>
            <p className="preview-user-follow-info-followings">followings</p>
          </div>
        </div>
      </>
    </div>
  );
});
export default PreviewUserOnTwit;
