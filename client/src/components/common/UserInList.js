import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import path from "../../utils/path";
import { PUBLIC_USER_PAGE_PATH, USER_PAGE_PATH } from "../../utils/routs";
import getUserPhoto from "../../utils/getUserPhoto";
import { useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";

const UserInList = observer(({ profile }) => {
  const { isAuth } = useSelector(auth);
  const navigate = useNavigate();

  return (
    <div
      className="user-info-in-user-list"
      onClick={() => {
        if (isAuth) {
          navigate(path(USER_PAGE_PATH, profile.id));
        } else {
          navigate(path(PUBLIC_USER_PAGE_PATH, profile.id));
        }
      }}
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
