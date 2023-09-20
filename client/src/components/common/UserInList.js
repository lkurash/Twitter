import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

import path from "../../utils/path";
import { PUBLIC_USER_PAGE_PATH, USER_PAGE_PATH } from "../../utils/constans";
import getUserPhoto from "../../utils/getUserPhoto";

const UserInList = observer(({profile}) => {
  const navigate = useNavigate();
  const { usersStore } = useContext(Context);

  return (
    <div
      className="user-info-in-user-list"
      onClick={() => {
        if (usersStore.isAuth) {
          navigate(path(USER_PAGE_PATH, profile.id));
        } else {
          navigate(path(PUBLIC_USER_PAGE_PATH, profile.id));
        }
      }}
    >
      <img src={getUserPhoto(profile)} alt="User" />
      <div className="section-whoyouread-user-name">
        <p className="user-name">{profile.user_name}</p>
        <p className="profile-name">{`@${profile.user_name}`}</p>
      </div>
    </div>
  );
});

export default UserInList;
