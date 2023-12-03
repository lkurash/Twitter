import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import tweetAPI from "../../http/tweetAPI";

import getAuthUserID from "../../utils/getAuthUserID";
import getUserPhoto from "../../utils/getUserPhoto";

import EmojiButton from "../buttons/EmojiButton";

import close from "../Imgs/x_icon.png";
import { useSelector } from "react-redux";
import { userProfile } from "../../redux/user/user.selectors";

const CommentForm = observer(({ tweet }) => {
  const { profile } = useSelector(userProfile);
  const { commentsStore } = useContext(Context);
  const { infoMessageStore } = useContext(Context);

  const [commentText, setCommentText] = useState("");

  const authUserID = getAuthUserID();

  const createComment = async (tweetId) => {
    await tweetAPI.createCommentTweetByUser(authUserID, tweetId, commentText);

    infoMessageStore.setTextMessage("Comment has been sent.");
    infoMessageStore.setInfoMessageVisible(true);
    commentsStore.setActiveComment({});
  };

  if (commentText.length > 255) {
    return setCommentText(commentText.slice(0, 254));
  }

  const addEmojiInTweetText = (event) => {
    setCommentText(commentText + event.emoji);
  };

  return (
    <div className="comment-form-wrapper">
      <div className="comment-form">
        <div
          className="button-close"
          onClick={() => commentsStore.setActiveComment({})}
        >
          <img src={close} alt="close-icon" className="close-icon" />
        </div>
        <div className="comment-wrapper-user-info-block">
          <div className="comment-user-info-block">
            <img alt="User" src={getUserPhoto(tweet.userOriginalTweets)} />
            <div className="comment-line" />
            <img src={getUserPhoto(profile)} alt="User" />
          </div>
          <div className="comment-wrapper-tweet-info-block">
            <div className="comment-tweet-info-block">
              <div className="comment-info-username-and-date">
                <h4>{tweet.userOriginalTweets.user_name}</h4>
                <p className="comment-tweet-info-block-desc">{`@${tweet.userOriginalTweets.user_name}`}</p>
                <p className="comment-tweet-info-block-desc">
                  {tweet.tweet_createDate}
                </p>
              </div>
              <p className="comment-tweet-text">{tweet.text}</p>
            </div>
            <div className="comment-wrapper-input">
              <textarea
                value={commentText}
                className="tweet-input-text"
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What's happening?"
              />
            </div>
          </div>
        </div>
        <div className="comment-panel">
          <EmojiButton addEmojiInTweetText={addEmojiInTweetText} />
          <button onClick={() => createComment(tweet.id)}>
            <span>Answer</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default CommentForm;
