import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import { useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";

import CommentForm from "../forms/CommentForm";
import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeComment from "../Imgs/active_comment_icon.png";
import notactiveComment from "../Imgs/notactive_comment_icon.png";


const CommentButton = observer(({ tweet }) => {
  const { isAuth } = useSelector(auth);
  const { commentsStore } = useContext(Context);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);

  const imgButtonComment = (tweet) => {
    if (tweet.id === commentsStore.hoverButtonComment.id) {
      return activeComment;
    }
    if (tweet.id === commentsStore.activeComment.id) {
      return activeComment;
    }
    return notactiveComment;
  };

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <div className="tweet-action-comments">
      <TooltipUserNotAuth
        tooltipUserNotAuth={tooltipUserNotAuth}
        onCloseTooltip={onCloseTooltip}
        comment
      />
      <div
        className="tweet-action-button-comments"
        key={tweet.id}
        onClick={() => {
          if (isAuth) {
            commentsStore.setActiveComment(tweet);
          } else {
            setTooltipUserNotAuth(true);
          }
        }}
        onMouseEnter={() => {
          commentsStore.setHoverButtonComment(tweet);
        }}
        onMouseLeave={() => commentsStore.setHoverButtonComment({})}
      >
        <img
          src={imgButtonComment(tweet)}
          alt="Comment"
          className="tweet-action-comments-img"
        />
      </div>
      {tweet.countComments > 0 && <p>{tweet.countComments}</p>}
      {commentsStore.activeComment.id === tweet.id && (
        <CommentForm tweet={tweet} />
      )}
    </div>
  );
});

export default CommentButton;
