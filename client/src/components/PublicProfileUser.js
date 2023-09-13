import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";

import ProfileUserInfo from "./ProfileUserInfo";
import UserTwits from "./UserTwits";
import loadPageUserInfo from "./loadComponents/loadPageUserInfo";

const PublicProfileUser = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const { usersStore } = useContext(Context);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  }, [usersStore.userPage.id]);

  if (isLoading || !usersStore.userPage.id) {
    return loadPageUserInfo();
  }

  return (
    <div className="main-content">
      <div className="main-content-block">
        <div className="main-content-profile-panel">
          <ProfileUserInfo />
        </div>
        <div className="main-line" />
        <UserTwits />
      </div>
    </div>
  );
});

export default PublicProfileUser;
