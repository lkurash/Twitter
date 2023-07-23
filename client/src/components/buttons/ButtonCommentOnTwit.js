import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import CommentForm from "../forms/CommentForm";
import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import "../userTwitPanel.css";
import "../comment.css";
import activeComment from "../Img/active_comment_icon.png";
import notactiveComment from "../Img/notactive_comment_icon.png";

const ButtonCommentOnTwit = observer(({twit}) => {
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
    <div className="user-twit-panel-comments">
      <TooltipUserNotAuth
        tooltipUserNotAuth={tooltipUserNotAuth}
        onCloseTooltip={onCloseTooltip}
        comment
      />
      <div
        className="user-twit-panel-button-comments"
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
          className="user-twit-panel-comments-img"
        />
      </div>
      {twit.countComments > 0 && <p>{twit.countComments}</p>}
      {commentsStore.activeComment.id === twit.id && (
        <CommentForm twit={twit} />
      )}
    </div>
  );
});

export default ButtonCommentOnTwit;
