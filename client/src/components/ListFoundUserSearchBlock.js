import { observer } from "mobx-react-lite";
import { useRef } from "react";

import { useSelector } from "react-redux";
import { searchUsers } from "../redux/user/userOptions/userOptions.selectors";

import useOutsideClick from "../utils/useOutsideClickFunction";

import UserInList from "./common/UserInList";

const ListFoundUserSearchBlock = observer(
  ({ listFoundUsersVisible, onClose, loadListUsers, setUserName }) => {
    const listUsersRef = useRef(null);
    const { users } = useSelector(searchUsers);

    useOutsideClick(listUsersRef, onClose, listFoundUsersVisible);

    return (
      <div className="main-search-wrapper-found-users" ref={listUsersRef}>
        {users.length > 0 ? (
          <ul className="main-search-list-found-users">
            {users.map((profile) => (
              <li
                className="main-search-found-list-user"
                key={profile.id}
                onClick={() => {setUserName("");
                onClose()
              }}
              >
                <UserInList profile={profile} />
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
