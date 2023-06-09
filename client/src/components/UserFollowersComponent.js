import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { PROFILE_PAGE_USER } from "../utils/constans";
import ButtonFollowInFollowComponent from "./ButtonFollowInFollowComponent";

const UserFollowersComponent = observer(() => {
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const navigate = useNavigate();

  const userFollowingIds = [];

  const getUserFollowingId = () => {
    user.allUsers.map((allUser) => {
      allUser.Followings.forEach((followUser) => {
        if (user.user.id === followUser.followUserId) {
          userFollowingIds.push(allUser.id);
        }
      });
    });
  };

  getUserFollowingId();

  const checkAndDeleteUserFollowingId = () => {
    if (userFollowingIds.includes(user.unfollowUser.UserId)) {
      userFollowingIds.splice(
        userFollowingIds.indexOf(user.unfollowUser.UserId),
        1
      );
    }
    if (
      !userFollowingIds.includes(user.startFollowUser.UserId) &&
      user.startFollowUser.UserId
    ) {
      userFollowingIds.push(user.startFollowUser.UserId);
    }
  };

  checkAndDeleteUserFollowingId();
  return (
    <div>
      {user.userFollowers.length > 0 ? (
        <ul className="follow-page-main-users">
          {user.userFollowers.map((profile) => (
            <li key={profile.id} className="follow-page-main-user">
              <div
                className="follow-page-main-user-info"
                onClick={() => {
                  user.setUserPage({});
                  twits.setUserTwits([]);
                  navigate(PROFILE_PAGE_USER + profile.User.id);
                }}
              >
                <img
                  src={`http://localhost:5500/${profile.User.photo}`}
                  alt="User"
                />
                <p className="follow-page-main-user-name">
                  {profile.User.user_name}
                </p>
              </div>
              <ButtonFollowInFollowComponent
                profile={profile}
                userId={profile.User.id}
                userFollowingIds={userFollowingIds}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="follow-page-main-message-follow">
          You don't have followers
        </p>
      )}
    </div>
  );
});

export default UserFollowersComponent;
