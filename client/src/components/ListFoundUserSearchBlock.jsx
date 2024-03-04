import { useRef } from "react";

import { useSelector } from "react-redux";
import { searchUsers } from "../redux/user/userOptions/userOptions.selectors";

import useOutsideClick from "../utils/useOutsideClickFunction";

import UserInList from "./common/UserInList";

const ListFoundUserSearchBlock = ({
  listFoundUsersVisible,
  onClose,
  loadListUsers,
  setUserName,
}) => {
  const listUsersRef = useRef(null);
  const { users } = useSelector(searchUsers);

  useOutsideClick(listUsersRef, onClose, listFoundUsersVisible);

  const handleUserClick = (profile) => {
    setUserName("");
    onClose();
  };

  return (
    <div
      data-testid="list-found-users"
      className="main-search-wrapper-found-users"
      ref={listUsersRef}
    >
      {users.length > 0 ? (
        <ul className="main-search-list-found-users">
          {users.map((profile) => (
            <li
              className="main-search-found-list-user"
              key={profile.id}
              onClick={() => handleUserClick(profile)}
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
};
export default ListFoundUserSearchBlock;
