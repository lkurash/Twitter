import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

import spinner from "../utils/spinner";

import ProfileUserInfo from "./ProfileUserInfo";
import UserTwits from "./UserTwits";

const PublicProfileUser = observer(() => {
  const { usersStore } = useContext(Context);

  if (!usersStore.userPage.id) return spinner();

  return (
    <div className="user-main-content">
      <div className="user-main-content-block">
        <div className="user-main-content-profile-panel">
          <ProfileUserInfo />
        </div>
        <div className="main-line" />
        <UserTwits />
      </div>
    </div>
  );
});

export default PublicProfileUser;
