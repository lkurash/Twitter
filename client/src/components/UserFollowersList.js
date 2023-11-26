import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";

import getAuthUserID from "../utils/getAuthUserID";

import FollowButton from "./buttons/FollowButton";
import UserInList from "./common/UserInList";
import { useDispatch, useSelector } from "react-redux";
import { userFollowers } from "../redux/user/user.selectors";
import { userActions } from "../redux/user/user.actions";
import { useParams } from "react-router-dom";
import spinner from "../utils/spinner";

const UserFollowersList = observer(() => {
  const dispatch = useDispatch();
  const { followers, loadingStatus } = useSelector(userFollowers);
  const authUserID = getAuthUserID();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    dispatch(userActions.getFollowers(id || authUserID));
    if (loadingStatus === "PENDING" || isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    }
  }, []);

  if (isLoading) {
    return spinner();
  }

  return (
    <div className="user-follow-list">
      {followers.length > 0 ? (
        <ul className="users">
          {followers.map((profile) => (
            <li className="user" key={profile.id}>
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
          You don't have followers
        </p>
      )}
    </div>
  );
});

export default UserFollowersList;
