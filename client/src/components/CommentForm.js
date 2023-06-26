import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "..";
import { createCommentTwitByUser } from "../http/twitsApi";
import getUserPhoto from "../utils/getUserPhoto";
import undefinedUserPhoto from "./Img/user_photo.jpeg";
import close from "./Img/x_icon.png";
import ButtonEmoji from "./ButtonEmoji";

const CommentForm = observer(({ twit }) => {
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const [commentText, setCommentText] = useState("");

  const createComment = async (TwitId) => {
    await createCommentTwitByUser(TwitId, commentText);
    twits.setActiveTwitComment({});
  };
  const createTwitDate = (createdAt) => {
    const date = new Date(createdAt).toString().split(" ");

    return `${date[2]} ${date[1]}.`;
  };

  if (commentText.length > 255) {
    return setCommentText(commentText.slice(0, 254));
  }

  const addEmojiInTwitText = (event) => {
    setCommentText(commentText + event.emoji);
  };

  return (
    <div className="comment-background">
      <div className="comment-form">
        <div
          className="button-close"
          onClick={() => twits.setActiveTwitComment({})}
        >
          <img src={close} alt="close-icon" className="close-icon" />
        </div>
        <div className="comment-form-info">
          <div className="comment-user-info">
            {twit.User.photo ? (
              <img
                alt="User"
                src={`http://localhost:5500/${twit.User.photo}`}
              />
            ) : (
              <img alt="User" src={undefinedUserPhoto} />
            )}
            <div className="comment-line" />
            <img src={getUserPhoto(user.user)} alt="User" />
          </div>
          <div className="comment-text-info">
            <div className="twit-comment">
              <div className="twit-comment-info-user-and-date">
                <h4>{twit.User.user_name}</h4>
                <p className="create-date-twit">{`@${twit.User.user_name}`}</p>
                <p className="create-date-twit">
                  {createTwitDate(twit.createdAt)}
                </p>
              </div>
              <p className="twit-comment-text">{twit.text}</p>
            </div>
            <div className="comment-form-input">
              <textarea
                value={commentText}
                className="twit-form-input-text"
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What's happening?"
              />
            </div>
          </div>
        </div>
        <div className="comment-twit-panel">
          <ButtonEmoji addEmojiInTwitText={addEmojiInTwitText} />
          <button onClick={() => createComment(twit.id)}>
            <span>Answer</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default CommentForm;
