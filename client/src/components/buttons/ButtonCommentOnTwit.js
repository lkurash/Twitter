import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import CommentForm from "../forms/CommentForm";
import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import "../userTwitPanel.css";
import "../comment.css";
import activeComment from "../Img/active_comment_icon.png";
import notactiveComment from "../Img/notactive_comment_icon.png";

const ButtonCommentOnTwit = observer((props) => {
  const { comments } = useContext(Context);
  const { user } = useContext(Context);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);

  const imgButtonComment = (twit) => {
    if (twit.id === comments.hoverButtonComment.id) {
      return activeComment;
    }
    if (twit.id === comments.activeComment.id) {
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
        key={props.twit.id}
        onClick={() => {
          if (user.isAuth) {
            comments.setActiveComment(props.twit);
          } else {
            setTooltipUserNotAuth(true);
          }
        }}
        onMouseEnter={() => {
          comments.setHoverButtonComment(props.twit);
        }}
        onMouseLeave={() => comments.setHoverButtonComment({})}
      >
        <img
          src={imgButtonComment(props.twit)}
          alt="Comment"
          className="user-twit-panel-comments-img"
        />
      </div>
      {props.twit.Comments.length > 0 && <p>{props.twit.Comments.length}</p>}
      {comments.activeComment.id === props.twit.id && (
        <CommentForm twit={props.twit} />
      )}
    </div>
  );
});

export default ButtonCommentOnTwit;
