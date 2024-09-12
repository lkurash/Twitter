import { Fragment } from "react";

import { useSelector } from "react-redux";
import { auth } from "../redux/user/user.selectors";

import FollowButton from "./buttons/FollowButton";
import UserInList from "./common/UserInList";

const ListWhoReadUserHomePage = ({ users }) => {
  const { isAuth } = useSelector(auth);

  return (
    <>
      <ul className="users">
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
              No users for following
            </p>
          )}
        </>
      </ul>
    </>
  );
};

export default ListWhoReadUserHomePage;
