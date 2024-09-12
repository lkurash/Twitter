import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { auth } from "../../../redux/user/user.selectors";

import getUserPhoto from "../../../utils/getUserPhoto";
import getUserPagePath from "../../../utils/getUserPagePath";

import PreviewUserOnTweet from "../../common/PreviewUserOnTweet";

const UserPhoto = ({ user }) => {
  const { isAuth } = useSelector(auth);
  const [showProfileUser, setShowProfileUser] = useState(false);

  const navigate = useNavigate();

  const onMouseLeave = () => {
    setTimeout(() => {
      setShowProfileUser(false);
    }, 500);
  };

  const onMouseEnter = () => {
    setTimeout(() => {
      setShowProfileUser(true);
    }, 500);
  };

  return (
    <div className="user-info" data-testid="user-info">
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
          data-testid="user-photo"
          alt="User"
          src={getUserPhoto(user)}
          onClick={() => navigate(getUserPagePath(isAuth, user.id))}
        />
        {showProfileUser && (
          <PreviewUserOnTweet
            user={user}
            setShowProfileUser={setShowProfileUser}
          />
        )}
      </div>
    </div>
  );
};
export default UserPhoto;
