import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

import ProfileUserInfo from "./ProfileUserInfo";
import UserTwits from "./UserTwits";
import spinner from "../utils/spinner";

const TwitterNotAuthProfileUser = observer(() => {
  const { user } = useContext(Context);

  if (!user.userPage.id) return spinner();
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

export default TwitterNotAuthProfileUser;
