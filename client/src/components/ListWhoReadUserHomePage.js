import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "..";

import userClient from "../http/userClient";

import getAuthUserID from "../utils/getAuthUserID";
import spinner from "../utils/spinner";
import UserInList from "./common/UserInList";

const ListWhoReadUserHomePage = observer(({ users }) => {
  const { usersStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const authUserID = getAuthUserID();

  const createUserFollowings = async (profile) => {
    await userClient.createFollowings(authUserID, profile.id);

    await userClient
      .getWhoNotReadingUsers(authUserID)
      .then((users) => usersStore.setUsersWhoToReadUsers(users));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, []);

  if (isLoading || usersStore.allUsers.length === 0) {
    return spinner();
  }

  return (
    <ul className="users">
      {usersStore.allUsers ? (
        <>
          {users.map((profile) => (
            <li className="user" key={profile.id}>
              <Fragment>
                <UserInList profile={profile} />

                {usersStore.isAuth && (
                  <button
                    className="section-whoyouread-button-follow"
                    onClick={() => {
                      usersFollowingsStore.setStartFollowUser(profile);
                      createUserFollowings(profile);
                    }}
                  >
                    <span>Follow</span>
                  </button>
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
