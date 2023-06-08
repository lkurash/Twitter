import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import TwitDesc from "./TwitDesc";
import UserPhoto from "./UserPhoto";

const UserComments = observer(() => {
  const { comments } = useContext(Context);

  return (
    <>
      {comments.comments.map((comment) => (
        <div className="twit">
          <div className="content-block">
            <div className="user-block-twit">
              <div className="connection-twit-comment-photo">
                <UserPhoto twit={comment.Twit} />
                <div className="comment-line" />
                <UserPhoto twit={comment} />
              </div>
              <div className="comment-desc">
                <TwitDesc twit={comment.Twit} />
                <div className="connection-twit-comment-text">
                  <TwitDesc twit={comment} />
                </div>
              </div>
            </div>
            <div className="main-line" />
          </div>
        </div>
      ))}
      {comments.comments.length === 0 && (
        <p className="empty-twits">No comments</p>
      )}
    </>
  );
});

export default UserComments;
