import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { auth, userListWhoNotReading } from "../redux/user/user.selectors";

import spinner from "../utils/spinner";

import FollowButton from "./buttons/FollowButton";
import UserInList from "./common/UserInList";

const ListWhoReadUserHomePage = observer(({ users }) => {
  const { loadingStatus } = useSelector(userListWhoNotReading);
  const { isAuth } = useSelector(auth);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    <ul className="users">
      {users ? (
        <>
          {users.map((profile) => (
            <li className="user" key={profile.id}>
              <Fragment>
                <UserInList profile={profile} />

                {isAuth && (
                  <FollowButton
                    profile={profile}
                    classButton="section-whoyouread-button-follow"
                  />
                )}
              </Fragment>
            </li>
          ))}
          {users.length === 0 && (
            <p className="section-whoyouread-hint-about-lack-section">
              You are following all users
            </p>
          )}
        </>
      ) : (
        <p className="section-whoyouread-hint-about-lack-section">
          No users to read
        </p>
      )}
    </ul>
  );
});

export default ListWhoReadUserHomePage;
