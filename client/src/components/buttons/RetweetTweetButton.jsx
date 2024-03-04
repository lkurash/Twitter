import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";
import { tweetOptionsActions } from "../../redux/tweet/tweetOptions/tweetOptions.actions";
import { buttonsStateStore } from "../../redux/buttons/buttons.selectors";
import {
  setHoverRetweetTweet,
  setRetweetedTweet,
} from "../../redux/buttons/buttonsOnTweet";
import {
  setInfoMessageVisible,
  setTextMessage,
} from "../../redux/popupElements/infoMessage";

import getAuthUserID from "../../utils/getAuthUserID";

import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeRetweet from "../Imgs/active_retweet_icon.png";
import notactiveRetweet from "../Imgs/notactive_retweet_icon.png";

const RetweetTweetButton = ({ tweet, retweet }) => {
  const { isAuth } = useSelector(auth);
  const dispatch = useDispatch();
  const buttonState = useSelector(buttonsStateStore);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);

  const authUserID = getAuthUserID();

  const createRetweetTweet = async (tweet) => {
    const formData = new FormData();
    formData.append("text", tweet.text);
    formData.append("tweetUserId", tweet.userId);
    if (tweet.img) {
      formData.append("img", tweet.img);
    }

    dispatch(tweetOptionsActions.createRetweet(authUserID, tweet.id, formData));
    dispatch(setTextMessage("Retweet."));
    dispatch(setInfoMessageVisible(true));
  };

  const deleteRetweet = async (tweet) => {
    dispatch(tweetOptionsActions.deleteRetweet(tweet.id, authUserID));

    dispatch(setTextMessage("Removed your Retweet."));
    dispatch(setInfoMessageVisible(true));
  };

  const imgRetweetButton = (tweet) => {
    if (tweet.id === buttonState.hoverRetweetTweet.id) {
      return activeRetweet;
    }

    if (retweet) {
      if (tweet.id === buttonState.retweetedTweet.id) {
        return activeRetweet;
      }
      return activeRetweet;
    } else {
      return notactiveRetweet;
    }
  };

  const onClickRetweet = (tweet) => {
    if (isAuth) {
      if (retweet) {
        deleteRetweet(tweet);
      } else {
        dispatch(setRetweetedTweet({ id: tweet.id }));
        createRetweetTweet(tweet);
      }
    } else {
      setTooltipUserNotAuth(true);
    }
  };

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <div className="tweet-action-retweet" data-testid="retweet-button">
      <TooltipUserNotAuth
        tooltipUserNotAuth={tooltipUserNotAuth}
        onCloseTooltip={onCloseTooltip}
        retweet
      />
      <div
        className="tweet-action-button-retweet"
        key={tweet.id}
        onClick={() => onClickRetweet(tweet)}
        onMouseEnter={() => dispatch(setHoverRetweetTweet({ id: tweet.id }))}
        onMouseLeave={() => dispatch(setHoverRetweetTweet({ id: null }))}
      >
        <img
          src={imgRetweetButton(tweet)}
          alt="button retweet"
          className="tweet-action-retweet-img"
        />
      </div>

      {tweet.countRetweets > 0 && <p>{tweet.countRetweets}</p>}
    </div>
  );
};

export default RetweetTweetButton;
