import { observer } from "mobx-react-lite";
import ProfileUserInfo from "./ProfileUserInfo";
import UserTwits from "./UserTwits";

const TwitterNotAuthProfileUser = observer(() => (
  <div className="user-main-content">
    <div className="user-main-content-block">
      <div className="user-main-content-profile-panel">
        <ProfileUserInfo />
      </div>
      <div className="main-line" />
      <UserTwits />
    </div>
  </div>
));

export default TwitterNotAuthProfileUser;
