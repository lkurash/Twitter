import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import InputEmoji from "react-input-emoji";
import { Context } from "..";
import { createCommentTwitByUser } from "../hhtp/twitsApi";
import getUserPhoto from "../utils/getUserPhoto";
import TwitPanel from "./common/TwitPanel";
import undefinedUserPhoto from "./Img/user_photo.jpeg";
import close from "./Img/x_icon.png";

const CommentForm = observer(({ twit }) => {
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const [commentText, setCommentText] = useState("");

  const createComment = async (twitId) => {
    await createCommentTwitByUser(twitId, commentText);
    twits.setActiveTwitComment({});
  };
  const createTwitDate = (createdAt) => {
    const date = new Date(createdAt).toString().split(" ");

    return `${date[2]} ${date[1]}.`;
  };

  if (commentText.length > 255) {
    return setCommentText(commentText.slice(0, 254));
  }
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
              <InputEmoji
                cleanOnEnter
                borderRadius="0"
                height="100"
                borderColor="#000000"
                value={commentText}
                placeholder="What is happening?"
                onChange={setCommentText}
              />
            </div>
          </div>
        </div>
        <TwitPanel
          buttonName="Answer"
          className="comment-twit-panel"
          textComment={commentText}
          twitId={twit.id}
          fun={createComment}
        />
      </div>
    </div>
  );
});

export default CommentForm;
