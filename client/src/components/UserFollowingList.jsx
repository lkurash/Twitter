import { Fragment, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { userFollowings } from "../redux/user/user.selectors";

import getAuthUserID from "../utils/getAuthUserID";
import spinner from "../utils/spinner";
import { loadingSetup } from "../utils/loadingSetup";

import FollowButton from "./buttons/FollowButton";
import UserInList from "./common/UserInList";

const UserFollowingList = () => {
  const userFollowingsStoreSelector = useSelector(userFollowings);
  const { followings, loadingStatus } = useSelector(userFollowings);
  const authUserID = getAuthUserID();
  const [isLoading, setIsLoading] = useState(false);
  const boundedSetup = loadingSetup.setup.bind(userFollowingsStoreSelector);

  useEffect(() => {
    boundedSetup(setIsLoading);
  }, [loadingStatus]);

  return (
    <div className="user-follow-list">
      {isLoading && spinner()}
      {loadingStatus === "COMPLETE" && (
        <>
          {followings.length > 0 ? (
            <ul className="users">
              {followings.map((profile) => (
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

export default UserFollowingList;
