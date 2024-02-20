import { Fragment, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { userFollowers } from "../redux/user/user.selectors";

import spinner from "../utils/spinner";
import { loadingSetup } from "../utils/loadingSetup";
import getAuthUserID from "../utils/getAuthUserID";

import FollowButton from "./buttons/FollowButton";
import UserInList from "./common/UserInList";

const UserFollowersList = () => {
  const userFollowersStoreSelector = useSelector(userFollowers);
  const { followers, loadingStatus } = useSelector(userFollowers);
  const authUserID = getAuthUserID();
  const [isLoading, setIsLoading] = useState(false);

  const bindSetup = loadingSetup.setup.bind(userFollowersStoreSelector);

  useEffect(() => {
    bindSetup(setIsLoading);
  }, [loadingStatus]);

  return (
    <div className="user-follow-list">
      {isLoading && spinner()}
      {loadingStatus === "COMPLETE" && (
        <>
          {followers.length > 0 ? (
            <ul className="users">
              {followers.map((profile) => (
                <li className="user" key={profile.id}>
                  <Fragment>
                    <UserInList profile={profile} />

                    <div className="wrapper-button-follow-follow-list">
                      {profile.id !== authUserID && (
                        <FollowButton
                          profile={profile}
                          follow={profile.following}
                          classButton="button-follow-follow-list"
                        />
                      )}
                    </div>
                  </Fragment>
                </li>
              ))}
            </ul>
          ) : (
            <p className="follow-page-main-message-follow">
              You don't have followers
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default UserFollowersList;
