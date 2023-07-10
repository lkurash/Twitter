import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createFollow, getFollowingUser } from "../http/userApi";
import getAuthUserID from "../utils/getAuthUserID";

const ButtonFollowProfile = observer(({ user, usersFollow }) => {
  const { id } = useParams();
  const authUserID = getAuthUserID(user);
  const [following, setFollowing] = useState(false);
  const followingUser = [];

  const checkFollowingUser = () => {
    usersFollow.userFollowers.map((follower) => {
      if (follower.UserId === user.user.id) {
        followingUser.push(follower.UserId);
      }
      return followingUser;
    });
  };

  const createFollowing = () => {
    setFollowing(true);
    createFollow(user.userPage.id);
    getFollowingUser(id).then((allFollowing) =>
      usersFollow.setuserFollowing(allFollowing)
    );
  };

  checkFollowingUser();

  if (authUserID === +id) return null;

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

export default ButtonFollowProfile;
