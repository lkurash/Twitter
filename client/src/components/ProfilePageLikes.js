import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import ButtonBookmarkOnTwit from "./ButtonBookmarkOnTwit";
import ButtonCommentOnTwit from "./ButtonCommentOnTwit";
import ButtonRetwitOnTwit from "./ButtonRetwitOnTwit";
import ButtonLikeOnTwit from "./ButtonLikeOnTwit";
import undefinedUserPhoto from "./Img/user_photo.jpeg";

const ProfilePageLikes = observer(() => {
  const { twits } = useContext(Context);
  const { user } = useContext(Context);

  const userLikesTwits = [];

  const getUserLikesTwits = () => {
    twits.twits.map((twit) => {
      twit.likes.forEach((like) => {
        if (like.userId === user.userPage.id) {
          userLikesTwits.push(twit);
        }
      });
    });
  };

  getUserLikesTwits();
  return (
    <div className="twits">
      {userLikesTwits.map((twit) => (
        <div key={twit.id} className="twit">
          <div className="content-block" key={twit.id}>
            <div className="user-block-twit" key={twit.id}>
              <div className="user-info">
                <div className="user-info-photo">
                  {twit.User.photo ? (
                    <img
                      src={`http://localhost:5500/${twit.User.photo}`}
                      alt="User"
                    />
                  ) : (
                    <img src={undefinedUserPhoto} alt="User" />
                  )}
                </div>
              </div>
              <div className="twit-desc">
                <h4 className="twit-user-name">{twit.User.user_name}</h4>
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
      {userLikesTwits.length === 0 && <p>No twits</p>}
    </div>
  );
});

export default ProfilePageLikes;
