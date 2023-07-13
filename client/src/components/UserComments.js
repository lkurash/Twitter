import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

import spinner from "../utils/spinner";
import TwitDesc from "./TwitDesc";
import UserPhoto from "./UserPhoto";

const UserComments = observer(() => {
  const { comments } = useContext(Context);

  if (comments.comments.length === 0) return spinner();

  return (
    <>
      {comments.comments ? (
        comments.comments.map((comment) => (
          <div className="twit" key={comment.id}>
            <div className="content-block">
              <div className="user-block-twit">
                <div className="connection-twit-comment-photo">
                  <UserPhoto twit={comment.Twit} />
                  <div className="comment-line" />
                  <UserPhoto twit={comment} />
                </div>
                <div className="comment-desc">
                  <TwitDesc twit={comment.Twit} />
                  {!comment.Twit.img && (
                    <div className="connection-twit-comment-text" />
                  )}
                  <TwitDesc twit={comment} />
                </div>
              </div>
            </div>
            <div className="main-line" />
          </div>
        ))
      ) : (
        <p className="empty-twits">No twits</p>
      )}
    </>
  );
});

export default UserComments;
