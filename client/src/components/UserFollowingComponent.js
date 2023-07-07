import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { PROFILE_PAGE_USER } from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";
import ButtonFollowInFollowComponent from "./ButtonFollowInFollowComponent";

const UserFollowingComponent = observer(() => {
  const { user } = useContext(Context);
  const { usersFollow } = useContext(Context);
  const { twits } = useContext(Context);
  const navigate = useNavigate();

  const userFollowingIds = [];

  const getUserFollowingId = () => {
    usersFollow.userFollowing.forEach((follower) => {
      userFollowingIds.push(follower.followUserId);
    });
  };

  getUserFollowingId();

  const checkAndDeleteUserFollowingId = () => {
    if (userFollowingIds.includes(usersFollow.unfollowUser.followUserId)) {
      userFollowingIds.splice(
        userFollowingIds.indexOf(usersFollow.unfollowUser.followUserId),
        1
      );
    }
    if (
      !userFollowingIds.includes(usersFollow.startFollowUser.followUserId) &&
      usersFollow.startFollowUser.followUserId
    ) {
      userFollowingIds.push(usersFollow.startFollowUser.followUserId);
    }
  };
  checkAndDeleteUserFollowingId();

  return (
    <div>
      {usersFollow.userFollowing.length > 0 ? (
        <ul className="follow-page-main-users">
          {usersFollow.userFollowing.map((profile) => (
            <li key={profile.id} className="follow-page-main-user">
              <div
                className="follow-page-main-user-info"
                onClick={() => {
                  user.setUserPage({});
                  twits.setUserTwits([]);
                  navigate(PROFILE_PAGE_USER + profile.followUser.id);
                }}
              >
                <img src={getUserPhoto(profile.followUser)} alt="User" />
                <p className="follow-page-main-user-name">
                  {profile.followUser.user_name}
                </p>
              </div>
              <ButtonFollowInFollowComponent
                profile={profile}
                userId={profile.followUserId}
                userFollowingIds={userFollowingIds}
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
