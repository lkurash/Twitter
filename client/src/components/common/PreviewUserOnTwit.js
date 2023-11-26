import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";
import { useNavigate } from "react-router-dom";

import { PUBLIC_USER_PAGE_PATH, USER_PAGE_PATH } from "../../utils/routs";
import path from "../../utils/path";
import getAuthUserID from "../../utils/getAuthUserID";
import getUserPhoto from "../../utils/getUserPhoto";
import FollowButton from "../buttons/FollowButton";
import { auth } from "../../redux/user/user.selectors";
import { useDispatch, useSelector } from "react-redux";
import { userPreview } from "../../redux/userOptions/userOptions.selectors";
import { userOptionsActions } from "../../redux/userOptions/userOptions.actions";

const PreviewUserOnTwit = observer(({ user, setShowProfileUser }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(auth);
  const { userInfo } = useSelector(userPreview);
  const { usersFollowingsStore } = useContext(Context);

  const navigate = useNavigate();

  const authUserID = getAuthUserID();

  useEffect(() => {
    dispatch(userOptionsActions.getPreviewProfile(user.id, authUserID));
  }, [user.id]);

  if (!userInfo) return false;

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
            if (isAuth) {
              navigate(path(USER_PAGE_PATH, user.id));
            } else {
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
                profile={user}
                follow={userInfo.following}
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
              {userInfo.followersUsers}
            </span>
            <p>followers</p>
            <span className="preview-user-count-follow">
              {userInfo.followingsUsers}
            </span>
            <p className="preview-user-follow-info-followings">followings</p>
          </div>
        </div>
      </>
    </div>
  );
});
export default PreviewUserOnTwit;
