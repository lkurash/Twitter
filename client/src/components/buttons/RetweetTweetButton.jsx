import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";
import { tweetOptionsActions } from "../../redux/tweet/tweetOptions/tweetOptions.actions";

import getAuthUserID from "../../utils/getAuthUserID";

import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeRetweet from "../Imgs/active_retweet_icon.png";
import notactiveRetweet from "../Imgs/notactive_retweet_icon.png";

const RetweetTweetButton = observer(({ tweet, retweet }) => {
  const { isAuth } = useSelector(auth);
  const dispatch = useDispatch();
  const { retweetsStore } = useContext(Context);
  const { infoMessageStore } = useContext(Context);
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

    infoMessageStore.setTextMessage("Retweet.");
    infoMessageStore.setInfoMessageVisible(true);
  };

  const deleteRetweet = async (tweet) => {
    dispatch(tweetOptionsActions.deleteRetweet(tweet.id, authUserID));

    infoMessageStore.setTextMessage("Removed your Retweet.");
    infoMessageStore.setInfoMessageVisible(true);
  };

  const imgRetweetButton = (tweet) => {
    if (tweet.id === retweetsStore.hoverTweetRetweet.id) {
      return activeRetweet;
    }

    if (retweet) {
      if (tweet.id === retweetsStore.tweetRetweet.id) {
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
        retweetsStore.setTweetRetweet(tweet);
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
    <div className="tweet-action-retweet">
      <TooltipUserNotAuth
        tooltipUserNotAuth={tooltipUserNotAuth}
        onCloseTooltip={onCloseTooltip}
        retweet
      />
      <div
        className="tweet-action-button-retweet"
        key={tweet.id}
        onClick={() => onClickRetweet(tweet)}
        onMouseEnter={() => retweetsStore.sethoverTweetRetweet(tweet)}
        onMouseLeave={() => retweetsStore.sethoverTweetRetweet({})}
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
});

export default RetweetTweetButton;
