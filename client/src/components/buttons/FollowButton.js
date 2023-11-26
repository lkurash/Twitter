import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../..";

import getAuthUserID from "../../utils/getAuthUserID";
import { useDispatch } from "react-redux";
import { userOptionsActions } from "../../redux/userOptions/userOptions.actions";

const FollowButton = observer(
  ({ follow, profile, userFollowingIds, classButton }) => {
    const dispatch = useDispatch();

    const { usersFollowingsStore } = useContext(Context);
    const authUserID = getAuthUserID();

    const deleteFollow = (userFollowId) => {
      dispatch(userOptionsActions.deleteFollowing(authUserID, userFollowId));
    };

    const createFollow = (userFollowId) => {
      dispatch(userOptionsActions.createFollowing(authUserID, userFollowId));
    };

    return (
      <>
        {follow ? (
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
              deleteFollow(profile.id);
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
              createFollow(profile.id);
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
