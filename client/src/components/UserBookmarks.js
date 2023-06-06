import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import Bookmark from "./ButtonBookmarkOnTwit";
import Comments from "./ButtonCommentOnTwit";
import Likes from "./ButtonLikeOnTwit";
import Retwit from "./ButtonRetwitOnTwit";
import arrowLeft from "./Img/arrow_left_icon.png";
import undefinedUserPhoto from "./Img/user_photo.jpeg";

const UserBookmarks = observer(() => {
  const { user } = useContext(Context);
  const { favoriteTwits } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="user-main-content-block">
      <div className="page-name">
        <div
          className="main-search-block-button-return"
          onClick={() => navigate(-1)}
        >
          <img src={arrowLeft} alt="Button return" />
        </div>
        <div className="page-name-user-name">
          <h2>{user.user.user_name}</h2>
          <p>@{user.user.user_name}</p>
        </div>
      </div>
      <div className="twits">
        {favoriteTwits.favoriteTwits.map((bookmark) => (
          <div className="user-main-content-block" key={bookmark.Twit.id}>
            <div className="user-block-twit" key={bookmark.Twit.id}>
              <div className="user-info">
                <div className="user-info-photo">
                  {bookmark.Twit.User.photo ? (
                    <img
                      alt="User"
                      src={`http://localhost:5500/${bookmark.Twit.User.photo}`}
                    />
                  ) : (
                    <img alt="User" src={undefinedUserPhoto} />
                  )}
                </div>
              </div>
              <div className="twit-desc">
                <h4 className="twit-user-name">
                  {bookmark.Twit.User.user_name}
                </h4>
                <p className="twit-text">{bookmark.Twit.text}</p>
                {bookmark.Twit.img && (
                  <div className="wrapper-twit-img">
                    <img
                      src={`http://localhost:5500/${bookmark.Twit.img}`}
                      alt="Twit"
                      className="twit-img"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="user-twit-panel">
              <Comments twit={bookmark.Twit} />
              <Retwit twit={bookmark.Twit} />
              <Likes twit={bookmark.Twit} />
              <Bookmark twit={bookmark.Twit} />
            </div>
            <div className="main-line" />
          </div>
        ))}
        {favoriteTwits.favoriteTwits.length === 0 && (
          <p className="empty-twits">No twits</p>
        )}
      </div>
    </div>
  );
});

export default UserBookmarks;