import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";

import getUserPhoto from "../../utils/getUserPhoto";
import getUserPagePath from "../../utils/getUserPagePath";

const UserInList = ({ profile }) => {
  const { isAuth } = useSelector(auth);
  const navigate = useNavigate();

  return (
    <div
      data-testid="founded-user"
      className="user-info-in-user-list"
      onClick={() => navigate(getUserPagePath(isAuth, profile.id))}
    >
      <img src={getUserPhoto(profile)} alt="User" />
      <div className="section-whoyouread-user-name">
        <p className="user-name-list">{profile.user_name}</p>
        <p className="profile-name">{`@${profile.user_name}`}</p>
      </div>
    </div>
  );
};

export default UserInList;
