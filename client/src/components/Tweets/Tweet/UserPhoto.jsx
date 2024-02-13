import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { auth } from "../../../redux/user/user.selectors";

import getUserPhoto from "../../../utils/getUserPhoto";
import navigateClickOnUser from "../../../utils/navigateClickOnUser";

import PreviewUserOnTweet from "../../common/PreviewUserOnTweet";

const UserPhoto = observer(({ tweet, user }) => {
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
          onClick={() => navigate(navigateClickOnUser(isAuth, user.id))}
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
});
export default UserPhoto;
