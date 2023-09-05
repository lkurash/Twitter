import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import { PRIVATE_USERS_PAGE_PATH } from "../utils/constans";
import getAuthUserID from "../utils/getAuthUserID";
import getUserPhoto from "../utils/getUserPhoto";

import ButtonFollowInFollowList from "./buttons/ButtonFollowInFollowList";

const UserFollowingList = observer(() => {
  const { usersStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
    const authUserID = getAuthUserID(usersStore);
  const navigate = useNavigate();

  return (
    <div>
      {usersFollowingsStore.userFollowing.length > 0 ? (
        <ul className="follow-page-main-users">
          {usersFollowingsStore.userFollowing.map((profile) => (
            <li key={profile.id} className="follow-page-main-user">
              <div
                className="follow-page-main-user-info"
                onClick={() => {
                  usersStore.setUserPage({});
                  twitsStore.setUserTwits([]);
                  navigate(PRIVATE_USERS_PAGE_PATH + profile.id);
                }}
              >
                <img src={getUserPhoto(profile)} alt="User" />
                <p className="follow-page-main-user-name">
                  {profile.user_name}
                </p>
              </div>
              {profile.id !== authUserID && (
                <ButtonFollowInFollowList
                  profile={profile}
                  following={profile.following}
                />
              )}
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
