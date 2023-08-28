import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import twitsClient from "../../http/twitsClient";

import getAuthUserID from "../../utils/getAuthUserID";
import getUserPhoto from "../../utils/getUserPhoto";

import ButtonEmoji from "../buttons/ButtonEmoji";

import close from "../Img/x_icon.png";

const CommentForm = observer(({ twit }) => {
  const { usersStore } = useContext(Context);
  const { commentsStore } = useContext(Context);
  const [commentText, setCommentText] = useState("");
  const authUserID = getAuthUserID(usersStore);

  const createComment = async (twitId) => {
    await twitsClient.createCommentTwitByUser(authUserID, twitId, commentText);
    commentsStore.setActiveComment({});
    await twitsClient.getCountComments(twitId);
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
          onClick={() => commentsStore.setActiveComment({})}
        >
          <img src={close} alt="close-icon" className="close-icon" />
        </div>
        <div className="comment-form-info">
          <div className="comment-user-info">
            <img alt="User" src={getUserPhoto(twit.user)} />
            <div className="comment-line" />
            <img src={getUserPhoto(usersStore.user)} alt="User" />
          </div>
          <div className="comment-text-info">
            <div className="twit-comment">
              <div className="twit-comment-info-user-and-date">
                <h4>{twit.user.user_name}</h4>
                <p className="create-date-twit">{`@${twit.user.user_name}`}</p>
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
