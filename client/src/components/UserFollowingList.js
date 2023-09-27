import { observer } from "mobx-react-lite";
import { Fragment, useContext } from "react";
import { Context } from "..";

import getAuthUserID from "../utils/getAuthUserID";

import ButtonFollowInFollowList from "./buttons/ButtonFollowInFollowList";
import UserInList from "./common/UserInList";

const UserFollowingList = observer(() => {
  const { usersStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const authUserID = getAuthUserID(usersStore);

  return (
    <div className="user-follow-list">
      {usersFollowingsStore.userFollowing.length > 0 ? (
        <ul className="users">
          {usersFollowingsStore.userFollowing.map((profile) => (
            <li key={profile.id} className="user">
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
          You don't have following
        </p>
      )}
    </div>
  );
});

export default UserFollowingList;
