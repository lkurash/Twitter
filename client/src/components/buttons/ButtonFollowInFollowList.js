import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../..";

import usersClient from "../../http/usersClient";
import getAuthUserID from "../../utils/getAuthUserID";

const ButtonFollowInFollowList = observer(
  ({ profile, userFollowingIds, following }) => {
    const { usersStore } = useContext(Context);
    const { usersFollowingsStore } = useContext(Context);
    const authUserID = getAuthUserID(usersStore);

    const deleteFollowAndgetUsers = async (userFollowId) => {
      await usersClient
        .deleteFollowings(authUserID, userFollowId)
        .then((unfollowUser) => {
          usersFollowingsStore.deleteFollowUserInFollowList(
            unfollowUser,
          );
        })
        .catch((error) => console.log(error.response.data.message));
    };

    const createFollowAndgetUsers = async (userFollowId) => {
      await usersClient
        .createFollowings(authUserID, userFollowId)
        .then((followingUser) => {
          usersFollowingsStore.createFollowUserInFollowList(followingUser);
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
            className="follow-page-main-button-following button-following-hover"
            onMouseEnter={() => {
              usersFollowingsStore.setHoverFollowUser(profile.id);
            }}
            onMouseLeave={() => usersFollowingsStore.setHoverFollowUser({})}
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
            className="follow-page-main-button-following"
            onClick={() => {
              createFollowAndgetUsers(profile.id);
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
