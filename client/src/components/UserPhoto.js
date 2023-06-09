import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { PROFILE_PAGE_USER, TWITTER_USER_PAGE } from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";

const UserPhoto = observer(({ twit }) => {
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  return (
    <div className="user-info">
      <div
        className="user-info-photo"
        onClick={() => {
          if (location === `/twitter/profile/${user.userPage.id}`) {
            user.setUserPage({});
            twits.setUserTwits([]);
            navigate(TWITTER_USER_PAGE + twit.User.id);
          } else {
            user.setUserPage({});
            twits.setUserTwits([]);
            navigate(PROFILE_PAGE_USER + twit.User.id);
          }
        }}
      >
        <img alt="User" src={getUserPhoto(twit.User)} />
      </div>
    </div>
  );
});
export default UserPhoto;
