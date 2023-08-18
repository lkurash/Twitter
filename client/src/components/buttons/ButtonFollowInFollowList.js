import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../..";

import userApi from "../../http/userApi";
import getAuthUserID from "../../utils/getAuthUserID";

const ButtonFollowInFollowList = observer(
  ({ profile, userId, userFollowingIds }) => {
    const { usersStore } = useContext(Context);
    const { usersFollowingsStore } = useContext(Context);
    const authUserID = getAuthUserID(usersStore);

    const deleteFollowAndGetAllUsers = async (userFollowId) => {
      await userApi
        .deleteFollowings(authUserID, userFollowId)
        .catch((error) => console.log(error.response.data.message));
      await userApi
        .getAllUsers()
        .then((users) => usersStore.setAllUsers(users));
    };

    const createFollowAndGetAllUsers = async (userFollowId) => {
      await userApi
        .createFollowings(authUserID, userFollowId)
        .catch((error) => {
          console.log(error.response.data.message);
        });
      await userApi
        .getAllUsers()
        .then((users) => usersStore.setAllUsers(users));
    };

    return (
      <>
        {!usersFollowingsStore.unfollowUsersIds.includes(profile.id) ? (
          <button
            key={profile.id}
            className="follow-page-main-button-following button-following-hover"
            onMouseEnter={() => {
              usersFollowingsStore.setHoverFollowUser(profile.id);
            }}
            onMouseLeave={() => usersFollowingsStore.setHoverFollowUser({})}
            onClick={() => {
              deleteFollowAndGetAllUsers(userId);
              usersFollowingsStore.setUnfollowUsersIds(
                usersFollowingsStore.unfollowUsersIds.concat(profile.id)
              );
            }}
          >
            <span>
              {usersFollowingsStore.hoverFollowUser === profile.id
                ? "Unfollow"
                : "Following"}
            </span>
          </button>
        ) : (
          <button
            type="submit"
            className="follow-page-main-button-following"
            onClick={() => {
              usersFollowingsStore.deleteIdInUnfollowListIds(profile.id);
              createFollowAndGetAllUsers(userId);
              usersFollowingsStore.setStartFollowUser(profile);
            }}
          >
            <span>Follow</span>
          </button>
        )}
      </>
    );
  }
);

export default ButtonFollowInFollowList;
