import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import { PROFILE_PAGE_USER_PATH } from "../utils/constans";
import getAuthUserID from "../utils/getAuthUserID";
import getUserPhoto from "../utils/getUserPhoto";

import ButtonFollowInFollowList from "./buttons/ButtonFollowInFollowList";

const UserFollowersList = observer(() => {
  const { usersStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const navigate = useNavigate();
  const authUserID = getAuthUserID(usersStore);

  return (
    <div>
      {usersFollowingsStore.userFollowers.length > 0 ? (
        <ul className="follow-page-main-users">
          {usersFollowingsStore.userFollowers.map((profile) => (
            <li key={profile.id} className="follow-page-main-user">
              <div
                className="follow-page-main-user-info"
                onClick={() => {
                  usersStore.setUserPage({});
                  twitsStore.setUserTwits([]);
                  navigate(PROFILE_PAGE_USER_PATH + profile.User.id);
                }}
              >
                <img src={getUserPhoto(profile.User)} alt="User" />
                <p className="follow-page-main-user-name">
                  {profile.User.user_name}
                </p>
              </div>
              {profile.User.id !== authUserID && (
                <ButtonFollowInFollowList
                  profile={profile}
                  userId={profile.UserId}
                />
              )}
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
