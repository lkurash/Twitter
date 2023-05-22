import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { async } from "react-input-emoji";
import { Context } from "..";
import { createFollow, deleteFollow, getAllUsers } from "../hhtp/userApi";

const ButtonFollowInFollowComponent = observer(
  ({ profile, userId, userFollowingId }) => {
    const { user } = useContext(Context);

    const deleteFollowAndGetAllUsers = async(userFollowId) => {
      await deleteFollow(userFollowId);
      await getAllUsers().then((data) => user.setAllUsers(data));
    };

    const createFollowAndGetAllUsers = async(userFollowId) => {
      await createFollow(userFollowId);
      await getAllUsers().then((data) => user.setAllUsers(data));
    };

    return (
      <>
        {userFollowingId.includes(userId) ? (
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
            type="submit"
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
