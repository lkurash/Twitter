import { Fragment, useEffect, useState } from "react";

import getAuthUserID from "../utils/getAuthUserID";

import FollowButton from "./buttons/FollowButton";
import UserInList from "./common/UserInList";
import { useDispatch, useSelector } from "react-redux";
import { userFollowings } from "../redux/user/user.selectors";
import spinner from "../utils/spinner";
import { userActions } from "../redux/user/user.actions";
import { useParams } from "react-router-dom";

const UserFollowingList = () => {
  const dispatch = useDispatch();
  const { followings, loadingStatus } = useSelector(userFollowings);
  const authUserID = getAuthUserID();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    dispatch(userActions.getFollowings(id || authUserID));
    if (loadingStatus === "PENDING" || isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    }
  }, []);

  if (isLoading || !followings) {
    return spinner();
  }

  return (
    <div className="user-follow-list">
      {followings.length > 0 ? (
        <ul className="users">
          {followings.map((profile) => (
            <li key={profile.id} className="user">
              <Fragment>
                <UserInList profile={profile} />

                {profile.id !== authUserID && (
                  <FollowButton
                    profile={profile}
                    follow={profile.following}
                    classButton="button-follow-follow-list"
                  />
                )}
              </Fragment>
            </li>
          ))}
        </ul>
      ) : (
        <p className="follow-page-main-message-follow">
          You don't have following
        </p>
      )}
    </div>
  );
};

export default UserFollowingList;
