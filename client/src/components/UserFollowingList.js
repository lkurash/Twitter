import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import { PROFILE_PAGE_USER_PATH } from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";
import ButtonFollowInFollowList from "./buttons/ButtonFollowInFollowList";

const UserFollowingList = observer(() => {
  const { usersStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
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
                  navigate(PROFILE_PAGE_USER_PATH + profile.followUser.id);
                }}
              >
                <img src={getUserPhoto(profile.followUser)} alt="User" />
                <p className="follow-page-main-user-name">
                  {profile.followUser.user_name}
                </p>
              </div>
              <ButtonFollowInFollowList
                profile={profile}
                userId={profile.followUserId}
              />
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
