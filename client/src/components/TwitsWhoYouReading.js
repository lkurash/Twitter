import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { PROFILE_PAGE_USER } from "../utils/constans";
import ButtonBookmarkOnTwit from "./ButtonBookmarkOnTwit";
import ButtonCommentOnTwit from "./ButtonCommentOnTwit";
import ButtonLikeOnTwit from "./ButtonLikeOnTwit";
import ButtonRetwitOnTwit from "./ButtonRetwitOnTwit";
import undefinedUserPhoto from "./Img/user_photo.jpeg";

const TwitsWhoYouRead = observer(({ showTwitsWhoReading }) => {
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const navigate = useNavigate();
  const twitsFollowingUsers = [];

  const getTwitsFollowingUsers = () => {
    user.userFollowing.map((followingUser) => {
      return followingUser.followUser.Twits.forEach((twit) => {
        return twitsFollowingUsers.push(twit);
      });
    });
  };

  getTwitsFollowingUsers();

  if (!showTwitsWhoReading) return null;

  return (
    <div className="twits">
      {twitsFollowingUsers.map((twit) => (
        <div className="user-main-content-block" key={twit.id}>
          <div className="user-block-twit" key={twit.id}>
            <div className="user-info">
              <div
                className="user-info-photo"
                onClick={() => {
                  user.setUserPage({});
                  twits.setUserTwits([]);
                  navigate(PROFILE_PAGE_USER + twit.User.id);
                }}
              >
                {twit.User.photo ? (
                  <img
                    alt="User"
                    src={`http://localhost:5500/${twit.User.photo}`}
                  />
                ) : (
                  <img alt="User" src={undefinedUserPhoto} />
                )}
              </div>
            </div>
            <div className="twit-desc">
              <h4
                className="twit-user-name"
                onClick={() => navigate(PROFILE_PAGE_USER + twit.User.id)}
              >
                {twit.User.user_name}
              </h4>
              <p className="twit-text">{twit.text}</p>
              {twit.img && (
                <div className="wrapper-twit-img">
                  <img
                    src={`http://localhost:5500/${twit.img}`}
                    alt=""
                    className="twit-img"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="user-twit-panel">
            <ButtonCommentOnTwit twit={twit} />
            <ButtonRetwitOnTwit twit={twit} />
            <ButtonLikeOnTwit twit={twit} />
            <ButtonBookmarkOnTwit twit={twit} />
          </div>
          <div className="main-line" />
        </div>
      ))}
      {twitsFollowingUsers.length === 0 && (
        <p className="empty-twits">You don't have following</p>
      )}
    </div>
  );
});

export default TwitsWhoYouRead;
