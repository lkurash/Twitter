import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { PROFILE_PAGE_USER } from "../utils/constans";
import ButtonFollowInFollowComponent from "./ButtonFollowInFollowComponent";

const UserFollowersComponent = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const userFollowingId = [];

  const getUserFollowingId = () => {
    user.allUsers.map((allUser) => {
      allUser.followings.forEach((followUser) => {
        if (user.user.id === followUser.userId) {
          userFollowingId.push(allUser.id);
        }
      });
    });
  };

  getUserFollowingId();
  
  const checkAndDeleteUserFollowingId = () => {
    if (userFollowingId.includes(user.unfollowUser.userId)) {
      userFollowingId.splice(
        userFollowingId.indexOf(user.unfollowUser.userId),
        1
      );
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
                onClick={() => navigate(PROFILE_PAGE_USER + profile.User.id)}
              >
                <img
                  src={`http://localhost:5500/${profile.User.photo}`}
                  alt="User"
                />
                <p>{profile.User.user_name}</p>
              </div>
              <ButtonFollowInFollowComponent
                profile={profile}
                userId={profile.User.id}
                userFollowingId={userFollowingId}
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
