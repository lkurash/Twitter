import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../..";

import userClient from "../../http/userClient";

import getAuthUserID from "../../utils/getAuthUserID";

const FollowButton = observer(
  ({ profile, userFollowingIds, following, classButton }) => {
    const { usersStore } = useContext(Context);
    const { usersFollowingsStore } = useContext(Context);
    const authUserID = getAuthUserID(usersStore);

    const deleteFollowAndgetUsers = async (userFollowId) => {
      await userClient
        .deleteFollowings(authUserID, userFollowId)
        .then((unfollowUser) => {
          usersFollowingsStore.deleteFollowUserInFollowList(unfollowUser);
          usersFollowingsStore.setStartFollowUser({
            id: userFollowId,
            following: false,
          });
        })
        .catch((error) => console.log(error.response.data.message));
    };

    const createFollowAndgetUsers = async (userFollowId) => {
      await userClient
        .createFollowings(authUserID, userFollowId)
        .then((followingUser) => {
          usersFollowingsStore.createFollowUserInFollowList(followingUser);
          usersFollowingsStore.setStartFollowUser({
            id: userFollowId,
            following: true,
          });
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };

    return (
      <>
        {following ? (
          <button
            key={profile.id}
            className={`follow-page-main-button-following ${classButton} button-following-hover`}
            onMouseEnter={() => {
              usersFollowingsStore.setHoverFollowUser(profile.id);
            }}
            onMouseLeave={() => {
              usersFollowingsStore.setHoverFollowUser({});
            }}
            onClick={() => {
              deleteFollowAndgetUsers(profile.id);
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
            className={`follow-page-main-button-following ${classButton} `}
            onClick={() => {
              createFollowAndgetUsers(profile.id);
            }}
          >
            <span>Follow</span>
          </button>
        )}
      </>
    );
  }
);

export default FollowButton;
