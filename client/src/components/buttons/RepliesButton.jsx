import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";
import { buttonsStateStore } from "../../redux/buttons/buttons.selectors";
import {
  setActiveButtonReplies,
  setHoverRepliesTweet,
} from "../../redux/buttons/buttonsOnTweet";

import CommentForm from "../forms/CommentForm";
import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeComment from "../Imgs/active_comment_icon.png";
import notactiveComment from "../Imgs/notactive_comment_icon.png";

const RepliesButton = ({ tweet }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(auth);
  const buttonState = useSelector(buttonsStateStore);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);

  const imgRepliesButton = (tweet) => {
    if (tweet.id === buttonState.hoverRepliesTweet.id) {
      return activeComment;
    }
    if (tweet.id === buttonState.activeButtonReplies.id) {
      return activeComment;
    }
    return notactiveComment;
  };

  const onClickReplies = (tweet) => {
    if (isAuth) {
      dispatch(setActiveButtonReplies({ id: tweet.id }));
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
        onMouseEnter={() => dispatch(setHoverRepliesTweet({ id: tweet.id }))}
        onMouseLeave={() => dispatch(setHoverRepliesTweet({ id: null }))}
      >
        <img
          src={imgRepliesButton(tweet)}
          alt="Comment"
          className="tweet-action-comments-img"
        />
      </div>
      {tweet.countComments > 0 && <p>{tweet.countComments}</p>}
      {buttonState.activeButtonReplies.id === tweet.id && (
        <CommentForm tweet={tweet} />
      )}
    </div>
  );
};

export default RepliesButton;
