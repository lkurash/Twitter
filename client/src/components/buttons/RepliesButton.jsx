import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../../Context";

import { useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";

import CommentForm from "../forms/CommentForm";
import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeComment from "../Imgs/active_comment_icon.png";
import notactiveComment from "../Imgs/notactive_comment_icon.png";

const RepliesButton = observer(({ tweet }) => {
  const { isAuth } = useSelector(auth);
  const { repliesStore } = useContext(Context);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);

  const imgRepliesButton = (tweet) => {
    if (tweet.id === repliesStore.hoverButtonReplies.id) {
      return activeComment;
    }
    if (tweet.id === repliesStore.activeRepliesOnTweet.id) {
      return activeComment;
    }
    return notactiveComment;
  };

  const onClickReplies = (tweet) => {
    if (isAuth) {
      repliesStore.setActiveRepliesOnTweet(tweet);
    } else {
      setTooltipUserNotAuth(true);
    }
  };

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <div className="tweet-action-comments" data-testid="replies-button">
      <TooltipUserNotAuth
        tooltipUserNotAuth={tooltipUserNotAuth}
        onCloseTooltip={onCloseTooltip}
        comment
      />
      <div
        className="tweet-action-button-comments"
        key={tweet.id}
        onClick={() => onClickReplies(tweet)}
        onMouseEnter={() => {
          repliesStore.setHoverButtonReplies(tweet);
        }}
        onMouseLeave={() => repliesStore.setHoverButtonReplies({})}
      >
        <img
          src={imgRepliesButton(tweet)}
          alt="Comment"
          className="tweet-action-comments-img"
        />
      </div>
      {tweet.countComments > 0 && <p>{tweet.countComments}</p>}
      {repliesStore.activeRepliesOnTweet.id === tweet.id && (
        <CommentForm tweet={tweet} />
      )}
    </div>
  );
});

export default RepliesButton;
