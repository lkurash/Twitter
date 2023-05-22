import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import "./userTwitPanel.css";
import "./comment.css";
import activeComment from "./Img/active_comment_icon.png";
import notactiveComment from "./Img/notactive_comment_icon.png";
import CommentForm from "./CommentForm";

const ButtonCommentOnTwit = observer((props) => {
  const { twits } = useContext(Context);

  const imgButtonComment = (twit) => {
    if (twit.id === twits.hoverTwitComment.id) {
      return activeComment;
    }
    if (twit.id === twits.activeTwitComment.id) {
      return activeComment;
    }
    return notactiveComment;
  };

  return (
    <div className="user-twit-panel-comments">
      <div
        className="user-twit-panel-button-comments"
        key={props.twit.id}
        onClick={() => {
          twits.setActiveTwitComment(props.twit);
        }}
        onMouseEnter={() => {
          twits.sethoverTwitComment(props.twit);
        }}
        onMouseLeave={() => twits.sethoverTwitComment({})}
      >
        <img src={imgButtonComment(props.twit)} alt="Comment" />
      </div>
      {props.twit.Comments.length > 0 && <p>{props.twit.Comments.length}</p>}
      {twits.activeTwitComment.id === props.twit.id && (
        <CommentForm twit={props.twit} />
      )}
    </div>
  );
});

export default ButtonCommentOnTwit;
