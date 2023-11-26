import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { USER_PAGE_PATH, PUBLIC_USER_PAGE_PATH } from "../../utils/routs";
import getUserPhoto from "../../utils/getUserPhoto";
import path from "../../utils/path";

import PreviewUserOnTwit from "../common/PreviewUserOnTwit";
import { useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";

const UserPhoto = observer(({ twit, user }) => {
  const { isAuth } = useSelector(auth);
  const [showProfileUser, setShowProfileUser] = useState(false);

  const navigate = useNavigate();

  const onMouseLeave = () => {
    setTimeout(() => {
      setShowProfileUser(false);
    }, 200);
  };

  const onMouseEnter = () => {
    setTimeout(() => {
      setShowProfileUser(true);
    }, 200);
  };

  return (
    <div className="user-info">
      <div
        className="user-info-photo"
        onMouseEnter={() => {
          onMouseEnter(user);
        }}
        onMouseLeave={() => {
          onMouseLeave();
        }}
      >
        <img
          alt="User"
          src={getUserPhoto(user)}
          onClick={() => {
            if (isAuth) {
              navigate(path(USER_PAGE_PATH, user.id));
            } else {
              navigate(path(PUBLIC_USER_PAGE_PATH, user.id));
            }
          }}
        />
        {showProfileUser && (
          <PreviewUserOnTwit
            user={user}
            setShowProfileUser={setShowProfileUser}
          />
        )}
      </div>
    </div>
  );
});
export default UserPhoto;
