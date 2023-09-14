import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import userClient from "../http/userClient";

import { USER_PAGE_PATH, PUBLIC_USER_PAGE_PATH } from "../utils/constans";
import getAuthUserID from "../utils/getAuthUserID";
import getUserPhoto from "../utils/getUserPhoto";
import path from "../utils/path";
import spinner from "../utils/spinner";

const ListWhoReadUserHomePage = observer(({ users }) => {
  const { usersStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const navigate = useNavigate();
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
    <ul className="follow-page-main-users">
      {usersStore.allUsers ? (
        <>
          {users.map((profile) => (
            <li className="follow-page-main-user" key={profile.id}>
              <div
                className="section-read-main-user-info"
                onClick={() => {
                  if (usersStore.isAuth) {
                    navigate(path(USER_PAGE_PATH, profile.id));
                  } else {
                    navigate(path(PUBLIC_USER_PAGE_PATH, profile.id));
                  }
                }}
              >
                <img src={getUserPhoto(profile)} alt="User" />
                <div className="section-read-main-user-name">
                  <p className="user-name">{profile.user_name}</p>
                  <p className="profile-name">{`@${profile.user_name}`}</p>
                </div>
              </div>
              {usersStore.isAuth && (
                <button
                  className="follow-page-main-button-follow"
                  onClick={() => {
                    usersFollowingsStore.setStartFollowUser(profile);
                    createUserFollowings(profile);
                  }}
                >
                  <span>Follow</span>
                </button>
              )}
            </li>
          ))}
          {users.length === 0 && (
            <p className="section-aside-hidden">You are following all users</p>
          )}
        </>
      ) : (
        <p className="section-aside-hidden">No users to read</p>
      )}
    </ul>
  );
});

export default ListWhoReadUserHomePage;
