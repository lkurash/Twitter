import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { PROFILE_PAGE_USER } from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";
import ButtonFollowInFollowComponent from "./ButtonFollowInFollowComponent";

const UserFollowingComponent = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const userFollowingId = [];

  const getUserFollowingId = () => {
    user.allUsers.map((allUser) => {
      allUser.Followings.forEach((followUser) => {
        if (user.user.id === followUser.UserId) {
          userFollowingId.push(followUser.followUserId);
        }
      });
    });
  };

  getUserFollowingId();

  const checkAndDeleteUserFollowingId = () => {
    if (userFollowingId.includes(user.unfollowUser.followUserId)) {
      userFollowingId.splice(
        userFollowingId.indexOf(user.unfollowUser.followUserId),
        1
      );
    }
  };

  checkAndDeleteUserFollowingId();
  return (
    <div>
      {user.userFollowing.length > 0 ? (
        <ul className="follow-page-main-users">
          {user.userFollowing.map((profile) => (
            <li key={profile.id} className="follow-page-main-user">
              <div
                className="follow-page-main-user-info"
                onClick={() => navigate(PROFILE_PAGE_USER + profile.followUser.id)}
              >
                <img src={getUserPhoto(profile.followUser)} alt="User" />
                <p className="follow-page-main-user-name">{profile.followUser.user_name}</p>
              </div>
              <ButtonFollowInFollowComponent
                profile={profile}
                userId={profile.followUserId}
                userFollowingId={userFollowingId}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="follow-page-main-message-follow">
          You don't have following
        </p>
      )}
    </div>
  );
});

export default UserFollowingComponent;
