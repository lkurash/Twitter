import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import getUserPhoto from "../utils/getUserPhoto";
import ButtonBookmarkOnTwit from "./ButtonBookmarkOnTwit";
import ButtonCommentOnTwit from "./ButtonCommentOnTwit";
import ButtonLikeOnTwit from "./ButtonLikeOnTwit";
import ButtonRetwitOnTwit from "./ButtonRetwitOnTwit";

const UserComments = observer(() => {
  const { comments } = useContext(Context);
  const { user } = useContext(Context);

  return (
    <div>
      {comments.comments.map((comment) => (
        <div className="user-main-content-block" key={comment.id}>
          <div>
            <div className="user-block-twit">
              <div className="connection-twit-comment-photo">
                <div className="user-info">
                  <div className="user-info-photo">
                    <img alt="User" src={getUserPhoto(comment.Twit.User)} />
                  </div>
                </div>
                <div className="comment-line" />
                <div className="user-info">
                  <div className="user-info-photo">
                    <img src={getUserPhoto(user.userPage)} alt="User" />
                  </div>
                </div>
              </div>
              <div className="twit-desc">
                <h4 className="twit-user-name">
                  {comment.Twit.User.user_name}
                </h4>
                <p className="twit-text">{comment.Twit.text}</p>
                {comment.Twit.img && (
                  <div className="wrapper-twit-img">
                    <img
                      src={`http://localhost:5500/${comment.Twit.img}`}
                      alt=""
                      className="twit-img"
                    />
                  </div>
                )}
                <div>
                  <div className="connection-twit-comment-text">
                    <h4 className="twit-user-name">
                      {user.userPage.user_name}
                    </h4>
                    <p className="twit-text">{comment.text}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-twit-panel">
              <ButtonCommentOnTwit twit={comment.Twit} />
              <ButtonRetwitOnTwit twit={comment.Twit} />
              <ButtonLikeOnTwit twit={comment.Twit} />
              <ButtonBookmarkOnTwit twit={comment.Twit} />
            </div>
            <div className="main-line" />
          </div>
        </div>
      ))}
      {comments.comments.length === 0 && <p>No comments</p>}
    </div>
  );
});

export default UserComments;
