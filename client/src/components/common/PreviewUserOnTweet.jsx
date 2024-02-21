import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../redux/user/user.selectors";
import { useDispatch, useSelector } from "react-redux";
import { userOptionsActions } from "../../redux/user/userOptions/userOptions.actions";
import { userPreview } from "../../redux/user/userOptions/userOptions.selectors";

import getAuthUserID from "../../utils/getAuthUserID";
import getUserPhoto from "../../utils/getUserPhoto";
import getUserPagePath from "../../utils/getUserPagePath";

import FollowButton from "../buttons/FollowButton";

const PreviewUserOnTweet = observer(({ user, setShowProfileUser }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(auth);
  const { userInfo } = useSelector(userPreview);

  const navigate = useNavigate();

  const authUserID = getAuthUserID();

  useEffect(() => {
    dispatch(userOptionsActions.getPreviewProfile(user.id, authUserID));
  }, [user.id]);

  if (!userInfo || (userInfo && userInfo.id !== user.id)) return false;

  return (
    <div
      className="preview-user-tweet-wrapper"
      onMouseEnter={() => {
        setTimeout(() => {
          setShowProfileUser(true);
        }, 500);
      }}
      onMouseLeave={() => {
        setTimeout(() => {
          setShowProfileUser(false);
        }, 500);
      }}
    >
      <>
        <div className="preview-user">
          <div className="preview-user-header">
            <div className="user-info-photo preview-user-photo">
              <img alt="User" src={getUserPhoto(user)} />
            </div>
            {authUserID !== user.id && authUserID && (
              <div className="wrapper-button-follow-follow-list">
                <FollowButton
                  profile={user}
                  follow={userInfo.following}
                  classButton="button-follow-follow-list"
                />
              </div>
            )}
          </div>
          <div
            className="preview-user-name"
            onClick={() => navigate(getUserPagePath(isAuth, user.id))}
          >
            <h4 className="user-name">{user.user_name}</h4>
            <p className="profile-name">{`@${user.user_name}`}</p>
          </div>
          <p className="preview-user-about">{user.about && user.about}</p>
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
export default PreviewUserOnTweet;
