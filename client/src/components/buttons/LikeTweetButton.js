import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";
import { tweetOptionsActions } from "../../redux/tweet/tweetOptions/tweetOptions.actions";

import getAuthUserID from "../../utils/getAuthUserID";

import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeLike from "../Imgs/active_like.png";
import notactiveLike from "../Imgs/notactive_like.png";
import hoverLike from "../Imgs/hover_like.png";

const LikeTweetButton = observer(({ tweet, like, countLikes }) => {
  const { isAuth } = useSelector(auth);
  const dispatch = useDispatch();
  const { tweetsStore } = useContext(Context);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);
  const authUserID = getAuthUserID();

  const createLikeTweet = (tweet) => {
    dispatch(tweetOptionsActions.createLike(authUserID, tweet.id));
  };

  const dislikeTweet = (tweet) => {
    dispatch(tweetOptionsActions.deleteLike(authUserID, tweet.id));
  };

  const imgLikeButton = (tweet) => {
    if (tweet.id === tweetsStore.hoverTweetLike.id) {
      return hoverLike;
    }

    if (like) {
      if (tweet.id === tweetsStore.likedTweet.id) {
        return activeLike;
      }

      return activeLike;
    } else {
      return notactiveLike;
    }
  };

  const onClickLike = (tweet) => {
    if (isAuth) {
      if (like) {
        dislikeTweet(tweet);
      } else {
        createLikeTweet(tweet);
        tweetsStore.setLikedTweet(tweet);
      }
    } else {
      setTooltipUserNotAuth(true);
    }
  };

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <div className="tweet-action-like">
      <TooltipUserNotAuth
        tooltipUserNotAuth={tooltipUserNotAuth}
        onCloseTooltip={onCloseTooltip}
        like
      />
      <div className="tweet-action-button-like">
        <img
          alt="Like"
          key={tweet.id}
          className="tweet-action-like-img"
          src={imgLikeButton(tweet)}
          onMouseEnter={() => tweetsStore.sethoverTweetLike(tweet)}
          onMouseLeave={() => tweetsStore.sethoverTweetLike({})}
          onClick={() => onClickLike(tweet)}
        />
      </div>
      <p className="tweet-action-count-like">{countLikes > 0 && countLikes}</p>
    </div>
  );
});

export default LikeTweetButton;
