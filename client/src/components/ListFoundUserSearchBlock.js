import { observer } from "mobx-react-lite";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import { PROFILE_PAGE_USER, TWITTER_USER_PAGE } from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";
import useOutsideClick from "../utils/useOutsideClickFunction";

const ListFoundUserSearchBlock = observer(
  ({ userName, showListFoundUsers, onClose }) => {
    const { usersStore } = useContext(Context);
    const navigate = useNavigate();
    const listUsersRef = useRef(null);
    const usersFound = [];
    const usersName = [];

    const getAllUsersName = () => {
      if (usersStore.allUsers) {
        usersStore.allUsers.map((profile) => {
          if (profile.user_name) {
            usersName.push(
              profile.user_name[0].toLowerCase() + profile.user_name.slice(1)
            );
          }
        });
      }
    };

    getAllUsersName();

    const getUsersFound = () => {
      if (userName) {
        usersName.forEach((element) => {
          if (element.includes(userName.toLowerCase())) {
            usersStore.allUsers.map((profile) => {
              if (
                profile.user_name ===
                element[0].toUpperCase() + element.slice(1)
              ) {
                return usersFound.push(profile);
              }
            });
          }
        });
      }
    };

    getUsersFound();

    useOutsideClick(listUsersRef, onClose, showListFoundUsers);

    if (!showListFoundUsers || userName.length === 0) return null;

    return (
      <div className="main-search-wrapper-found-users" ref={listUsersRef}>
        {usersFound.length !== 0 ? (
          <ul className="main-search-list-found-users">
            {usersFound.map((profile) => (
              <li
                key={profile.id}
                className="main-search-found-list-user"
                onClick={() => {
                  if (usersStore.isAuth) {
                    navigate(PROFILE_PAGE_USER + profile.id);
                  } else {
                    navigate(TWITTER_USER_PAGE + profile.id);
                  }
                }}
              >
                <img src={getUserPhoto(profile)} alt="User" />
                <p>{profile.user_name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="main-search-list-found-message">
            Users not found, try again
          </p>
        )}
      </div>
    );
  }
);

export default ListFoundUserSearchBlock;
