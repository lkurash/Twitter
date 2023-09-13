import { observer } from "mobx-react-lite";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import { USER_PAGE_PATH, PUBLIC_USER_PAGE_PATH } from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";
import path from "../utils/path";
import useOutsideClick from "../utils/useOutsideClickFunction";

const ListFoundUserSearchBlock = observer(
  ({ listFoundUsersVisible, onClose, loadListUsers }) => {
    const { usersStore } = useContext(Context);
    const navigate = useNavigate();
    const listUsersRef = useRef(null);

    useOutsideClick(listUsersRef, onClose, listFoundUsersVisible);

    return (
      <div className="main-search-wrapper-found-users" ref={listUsersRef}>
        {usersStore.foundUsers ? (
          <ul className="main-search-list-found-users">
            {usersStore.foundUsers.map((profile) => (
              <li
                key={profile.id}
                className="main-search-found-list-user"
                onClick={() => {
                  if (usersStore.isAuth) {
                    navigate(path(USER_PAGE_PATH, profile.id));
                  } else {
                    navigate(path(PUBLIC_USER_PAGE_PATH, profile.id));
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
