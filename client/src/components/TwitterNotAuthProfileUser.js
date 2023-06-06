import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import ProfileUserInfo from "./ProfileUserInfo";
import UserTwits from "./UserTwits";
import { ColorRing } from "react-loader-spinner";

const TwitterNotAuthProfileUser = observer(() => {
  const { user } = useContext(Context);

  if (!user.userPage.id) {
    return (
      <div className="load-spinner">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#1d9bf0", "#2188cc", "#1d9bf0", "#2188cc", "#1d9bf0"]}
        />
      </div>
    );
  }
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
