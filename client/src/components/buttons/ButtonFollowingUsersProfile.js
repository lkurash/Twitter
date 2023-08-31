import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useParams } from "react-router-dom";

import usersClient from "../../http/usersClient";
import getAuthUserID from "../../utils/getAuthUserID";

const ButtonFollowingUsersProfile = observer(({ user, usersFollow }) => {
  const { id } = useParams();
  const authUserID = getAuthUserID(user);
  const [following, setFollowing] = useState(false);
  const followingUser = [];

  const checkFollowingUser = () => {
    usersFollow.userFollowers.map((follower) => {
      if (follower.userId === user.user.id) {
        followingUser.push(follower.userId);
      }
      return followingUser;
    });
  };

  const createFollowing = () => {
    setFollowing(true);
    usersClient.createFollowings(authUserID, user.userPage.id);
    usersClient
      .getFollowingsUser(id)
      .then((followings) => usersFollow.setuserFollowing(followings));
  };

  checkFollowingUser();

  return (
    <>
      {following || followingUser.length > 0 ? (
        <button type="button" className="button-edit-profile">
          <span>Following</span>
        </button>
      ) : (
        <button
          type="button"
          className="button-edit-profile"
          onClick={() => {
            createFollowing();
          }}
        >
          <span>Follow</span>
        </button>
      )}
    </>
  );
});

export default ButtonFollowingUsersProfile;
