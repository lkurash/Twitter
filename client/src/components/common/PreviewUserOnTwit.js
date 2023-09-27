import { observer } from "mobx-react-lite";
import getAuthUserID from "../../utils/getAuthUserID";
import getUserPhoto from "../../utils/getUserPhoto";
import ButtonFollowInFollowList from "../buttons/ButtonFollowInFollowList";
import { useContext} from "react";
import { Context } from "../..";

const PreviewUserOnTwit = observer(({ user, setShowProfileUser }) => {
  const authUserID = getAuthUserID();
  const { usersFollowingsStore } = useContext(Context);

  return (
    <div
      className="preview-user-twit-wrapper"
      onMouseEnter={() => {
        setShowProfileUser(true);
      }}
      onMouseLeave={() => {
        console.log(1);
        setShowProfileUser(false);

        usersFollowingsStore.setStartFollowUser({});
      }}
    >
      <>
        <div className="preview-user">
          <div className="preview-user-header">
            <div className="user-info-photo">
              <img alt="User" src={getUserPhoto(user)} />
            </div>
            {authUserID !== user.id && authUserID && (
              <ButtonFollowInFollowList
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
