import { useDispatch, useSelector } from "react-redux";
import { userOptionsActions } from "../../redux/user/userOptions/userOptions.actions";
import { buttonStateFollow } from "../../redux/buttons/buttons.selectors";

import {
  setHoverButtonFollow,
  setStartFollow,
} from "../../redux/buttons/followButton";

import getAuthUserID from "../../utils/getAuthUserID";

const FollowButton = ({ follow, profile, userFollowingIds, classButton }) => {
  const dispatch = useDispatch();
  const buttonState = useSelector(buttonStateFollow);
  const authUserID = getAuthUserID();

  const deleteFollow = (userFollowId) => {
    dispatch(userOptionsActions.deleteFollowing(authUserID, userFollowId));
  };

  const createFollow = (userFollowId) => {
    dispatch(setStartFollow({ id: userFollowId }));
    dispatch(userOptionsActions.createFollowing(authUserID, userFollowId));
    dispatch(setHoverButtonFollow({ id: null }));
  };

  const buttonName = (profile) => {
    if (buttonState.hoverButtonFollow.id === profile.id) {
      return "Unfollow";
    }
    return "Following";
  };

  return (
    <>
      {follow ? (
        <button
          key={profile.id}
          className={`follow-page-main-button-following ${classButton} button-following-hover`}
          onMouseEnter={() =>
            dispatch(setHoverButtonFollow({ id: profile.id }))
          }
          onMouseLeave={() => dispatch(setHoverButtonFollow({ id: null }))}
          onClick={() => deleteFollow(profile.id)}
        >
          <span>{buttonName(profile)}</span>
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
};

export default FollowButton;
