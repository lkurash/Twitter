import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { PROFILE_PAGE_USER, TWITTER_USER_PAGE } from "../utils/constans";
import useOutsideClick from "../utils/useOutsideClickFunction";

const ListFoundUserSearchBlock = observer(
  ({ userName, showListFoundUsers, onClose }) => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const listUsersRef = useRef(null);
    const location = useLocation().pathname;
    const usersFound = [];
    const usersName = [];

    const getAllUsersName = () => {
      user.allUsers.map((profile) => {
        if (profile.user_name) {
          usersName.push(profile.user_name);
        }
      });
    };

    getAllUsersName();

    const getUsersFound = () => {
      if (userName) {
        usersName.forEach((element) => {
          if (element.includes(userName)) {
            user.allUsers.map((profile) => {
              if (profile.user_name === element) {
                return usersFound.push(profile);
              }
            });
          }
        });
      }
    };

    getUsersFound();

    useOutsideClick(listUsersRef, onClose, showListFoundUsers);

    if (!showListFoundUsers) return null;
    
    return (
      <div className="main-search-wrapper-found-users" ref={listUsersRef}>
        {usersFound.length > 0 ? (
          <ul className="main-search-list-found-users">
            {usersFound.map((profile) => (
              <>
                {location === "/twitter" ? (
                  <li
                    key={profile.id}
                    className="main-search-found-list-user"
                    onClick={() => navigate(TWITTER_USER_PAGE + profile.id)}
                  >
                    <img
                      src={`http://localhost:5500/${profile.photo}`}
                      alt="User"
                    />
                    <p>{profile.user_name}</p>
                  </li>
                ) : (
                  <li
                    key={profile.id}
                    className="main-search-found-list-user"
                    onClick={() => navigate(PROFILE_PAGE_USER + profile.id)}
                  >
                    <img
                      src={`http://localhost:5500/${profile.photo}`}
                      alt="User"
                    />
                    <p>{profile.user_name}</p>
                  </li>
                )}
              </>
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
