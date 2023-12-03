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

  const imgOnTweet = (tweet) => {
    if (tweet.id === tweetsStore.hoverTweetLike.id) {
      return hoverLike;
    }

    return notactiveLike;
  };

  const imgOnLikedTweet = (tweet) => {
    if (tweet.id === tweetsStore.likedTweet.id) {
      return activeLike;
    }

    if (tweet.id === tweetsStore.hoverTweetLike.id) {
      return hoverLike;
    }

    return activeLike;
  };

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <div className="tweet-action-like">
      {like ? (
        <div className="tweet-action-button-like">
          <img
            alt="Like"
            key={tweet.id}
            className="tweet-action-like-img"
            src={imgOnLikedTweet(tweet)}
            onMouseEnter={() => {
              tweetsStore.sethoverTweetLike(tweet);
            }}
            onMouseLeave={() => tweetsStore.sethoverTweetLike({})}
            onClick={() => {
              dislikeTweet(tweet);
            }}
          />
        </div>
      ) : (
        <>
          <TooltipUserNotAuth
            tooltipUserNotAuth={tooltipUserNotAuth}
            onCloseTooltip={onCloseTooltip}
            like
          />
          <div
            className="tweet-action-button-like"
            key={tweet.id}
            onClick={() => {
              if (isAuth) {
                createLikeTweet(tweet);
                tweetsStore.setLikedTweet(tweet);
              } else {
                setTooltipUserNotAuth(true);
              }
            }}
            onMouseEnter={() => {
              tweetsStore.sethoverTweetLike(tweet);
            }}
            onMouseLeave={() => tweetsStore.sethoverTweetLike({})}
          >
            <img
              src={imgOnTweet(tweet)}
              alt="Like"
              className="tweet-action-like-img"
            />
          </div>
        </>
      )}
      <p className="tweet-action-count-like">{countLikes > 0 && countLikes}</p>
    </div>
  );
});

export default LikeTweetButton;
