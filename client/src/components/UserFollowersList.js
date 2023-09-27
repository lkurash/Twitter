import { observer } from "mobx-react-lite";
import { Fragment, useContext } from "react";
import { Context } from "..";

import getAuthUserID from "../utils/getAuthUserID";

import ButtonFollowInFollowList from "./buttons/ButtonFollowInFollowList";
import UserInList from "./common/UserInList";

const UserFollowersList = observer(() => {
  const { usersFollowingsStore } = useContext(Context);
  const authUserID = getAuthUserID();

  return (
    <div className="user-follow-list">
      {usersFollowingsStore.userFollowers.length > 0 ? (
        <ul className="users">
          {usersFollowingsStore.userFollowers.map((profile) => (
            <li className="user" key={profile.id}>
              <Fragment>
                <UserInList profile={profile} />

                {profile.id !== authUserID && (
                  <ButtonFollowInFollowList
                    profile={profile}
                    following={profile.following}
                    classButton="button-follow-follow-list"
                  />
                )}
              </Fragment>
            </li>
          ))}
        </ul>
      ) : (
        <p className="follow-page-main-message-follow">
          You don't have followers
        </p>
      )}
    </div>
  );
});

export default UserFollowersList;
