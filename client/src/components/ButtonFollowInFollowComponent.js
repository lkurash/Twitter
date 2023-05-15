import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { createFollow, deleteFollow, getAllUsers } from "../hhtp/userApi";

const ButtonFollowInFollowComponent = observer(
  ({ profile, userId, userFollowingId }) => {
    const { user } = useContext(Context);

    const deleteFollowAndGetAllUsers = (userFollowId) => {
      deleteFollow(userFollowId);
      getAllUsers().then((data) => user.setAllUsers(data));
    };

    const createFollowAndGetAllUsers = (userFollowId) => {
      createFollow(userFollowId);
      getAllUsers().then((data) => user.setAllUsers(data));
    };

    return (
      <>
        {userFollowingId.includes(profile.userId) ? (
          <button
            className="follow-page-main-button-following"
            onMouseEnter={() => {
              user.setHoverFollowUser(profile.id);
            }}
            onMouseLeave={() => user.setHoverFollowUser({})}
            onClick={() => {
              deleteFollowAndGetAllUsers(userId);
              user.setUnfollowUser(profile);
            }}
          >
            <span>
              {user.hoverFollowUser === profile.id ? "Unfollow" : "Following"}
            </span>
          </button>
        ) : (
          <button
            className="follow-page-main-button-following"
            onClick={() => {
              createFollowAndGetAllUsers(userId);
              user.setUnfollowUser(profile);
            }}
          >
            <span>Follow</span>
          </button>
        )}
      </>
    );
  }
);

export default ButtonFollowInFollowComponent;
