import { Outlet } from "react-router-dom";

import { userProfileById } from "../redux/user/user.selectors";
import { useSelector } from "react-redux";

import ProfileButtonPanel from "./ProfileButtonPanel";
import ProfileUserInfo from "./ProfileUserInfo";

import MainStikyPanel from "./MainStikyPanel";

const LoyoutProfilePage = ({ pathHomeProfileUser }) => {
  const { profile } = useSelector(userProfileById);

  return (
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
  );
};

export default LoyoutProfilePage;
