import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { createFollow, deleteFollow, getAllUsers } from "../http/userApi";

const ButtonFollowInFollowComponent = observer(
  ({ profile, userId, userFollowingIds }) => {
    const { user } = useContext(Context);

    const deleteFollowAndGetAllUsers = async (userFollowId) => {
      await deleteFollow(userFollowId);
      await getAllUsers().then((users) => user.setAllUsers(users));
    };

    const createFollowAndGetAllUsers = async (userFollowId) => {
      await createFollow(userFollowId).catch((error) => {
        console.log(error.response.data.message);
      });
      await getAllUsers().then((users) => user.setAllUsers(users));
    };

    return (
      <>
        {userFollowingIds.includes(userId) ? (
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
              user.setStartFollowUser(profile);
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
