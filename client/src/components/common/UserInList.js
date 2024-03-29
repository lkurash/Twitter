import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";

import getUserPhoto from "../../utils/getUserPhoto";
import navigateClickOnUser from "../../utils/navigateClickOnUser";

const UserInList = observer(({ profile }) => {
  const { isAuth } = useSelector(auth);
  const navigate = useNavigate();

  return (
    <div
      className="user-info-in-user-list"
      onClick={() => navigate(navigateClickOnUser(isAuth, profile.id))}
    >
      <img src={getUserPhoto(profile)} alt="User" />
      <div className="section-whoyouread-user-name">
        <p className="user-name-list">{profile.user_name}</p>
        <p className="profile-name">{`@${profile.user_name}`}</p>
      </div>
    </div>
  );
});

export default UserInList;
