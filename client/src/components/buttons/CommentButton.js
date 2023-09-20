import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import CommentForm from "../forms/CommentForm";
import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeComment from "../Imgs/active_comment_icon.png";
import notactiveComment from "../Imgs/notactive_comment_icon.png";

const CommentButton = observer(({ twit }) => {
  const { commentsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);

  const imgButtonComment = (twit) => {
    if (twit.id === commentsStore.hoverButtonComment.id) {
      return activeComment;
    }
    if (twit.id === commentsStore.activeComment.id) {
      return activeComment;
    }
    return notactiveComment;
  };

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <div className="twit-action-comments">
      <TooltipUserNotAuth
        tooltipUserNotAuth={tooltipUserNotAuth}
        onCloseTooltip={onCloseTooltip}
        comment
      />
      <div
        className="twit-action-button-comments"
        key={twit.id}
        onClick={() => {
          if (usersStore.isAuth) {
            commentsStore.setActiveComment(twit);
          } else {
            setTooltipUserNotAuth(true);
          }
        }}
        onMouseEnter={() => {
          commentsStore.setHoverButtonComment(twit);
        }}
        onMouseLeave={() => commentsStore.setHoverButtonComment({})}
      >
        <img
          src={imgButtonComment(twit)}
          alt="Comment"
          className="twit-action-comments-img"
        />
      </div>
      {twit.countComments > 0 && <p>{twit.countComments}</p>}
      {commentsStore.activeComment.id === twit.id && (
        <CommentForm twit={twit} />
      )}
    </div>
  );
});

export default CommentButton;
