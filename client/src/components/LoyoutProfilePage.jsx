import { Outlet } from "react-router-dom";

import { useEffect, useState } from "react";

import { auth, userProfileById } from "../redux/user/user.selectors";
import { useSelector } from "react-redux";

import { loadingSetup } from "../utils/loadingSetup";

import ProfileButtonPanel from "./ProfileButtonPanel";
import ProfileUserInfo from "./ProfileUserInfo";
import MainStikyPanel from "./MainStikyPanel";
import loadPageUserInfo from "./loadComponents/loadPageUserInfo";

const LoyoutProfilePage = ({ pathHomeProfileUser }) => {
  const userProfileByIdStore = useSelector(userProfileById);
  const { isAuth } = useSelector(auth);
  const { profile, loadingStatus } = useSelector(userProfileById);
  const [isLoading, setIsLoading] = useState(false);
  const bindSetup = loadingSetup.setup.bind(userProfileByIdStore);

  useEffect(() => {
    bindSetup(setIsLoading);
  }, [loadingStatus]);

  return (
    <>
      {isLoading && loadPageUserInfo(isAuth)}
      {loadingStatus === "COMPLETE" && (
        <>
          <MainStikyPanel
            arrowVisible={true}
            userName={profile.user_name}
            pageName={profile.user_name}
          />

          <>
            <div className="main-content-profile-panel">
              <ProfileUserInfo pathHomeProfileUser={pathHomeProfileUser} />
              <ProfileButtonPanel pathHomeProfileUser={pathHomeProfileUser} />
            </div>
            <Outlet />
          </>
        </>
      )}
    </>
  );
};

export default LoyoutProfilePage;
