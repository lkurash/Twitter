import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { tweetsStore } from "../redux/tweet/tweet.selectors";
import { tweetActions } from "../redux/tweet/tweet.actions";
import { useDispatch } from "react-redux";

import getAuthUserID from "../utils/getAuthUserID";

import TweetForm from "./forms/TweetForm";
import TweetsForYou from "./Tweets/TweetsForYou";
import TweetsWhoYouRead from "./Tweets/TweetsWhoYouReading";

const ContentHomePage = observer(() => {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();
  const authUserID = getAuthUserID();

  const [tweetsForYouVisible, setTweetsForYouVisible] = useState(true);
  const [tweetsWhoReadingVisible, setTweetsWhoReadingVisible] = useState(false);

  useEffect(() => {
    if (cookies.tweetsWhoReading === "true") {
      setTweetsWhoReadingVisible(true);
      setTweetsForYouVisible(false);

      dispatch(tweetActions.getTweetsByFollowingUsers(authUserID));
    }
    if (cookies.tweetsWhoReading === "false" && tweetsForYouVisible) {
      dispatch(tweetActions.getTweetsForAuthUser(authUserID));
    }
  }, [cookies.tweetsWhoReading]);

  return (
    <>
      <div className="main-stiky-panel">
        <div className="main-page-name-wrapper">
          <div className="main-page-name">
            <h2>Home</h2>
          </div>
        </div>
        <div className="main-content-button-panel">
          <div className="wrapper-button">
            <button
              type="button"
              className="main-button-foryou"
              onClick={() => {
                setCookie("tweetsWhoReading", "false");
                setTweetsWhoReadingVisible(false);
                setTweetsForYouVisible(true);
              }}
            >
              <span>For you</span>
            </button>
            <div
              className={
                tweetsForYouVisible
                  ? "main-button-active"
                  : "main-button-notactive"
              }
            />
          </div>
          <div className="wrapper-button">
            <button
              type="button"
              className="main-button-whoyouread"
              onClick={() => {
                setCookie("tweetsWhoReading", "true");
                setTweetsForYouVisible(false);
                setTweetsWhoReadingVisible(true);
              }}
            >
              <span> You are reading</span>
            </button>
            <div
              className={
                tweetsWhoReadingVisible
                  ? "main-button-active"
                  : "main-button-notactive"
              }
            />
          </div>
        </div>
      </div>
      <div className="main-content-block main-content-block-mobile">
        <div className="main-line" />
        <TweetForm />
      </div>
      <div className="main-line" />
      <>
        {tweetsForYouVisible && <TweetsForYou />}

        {(tweetsWhoReadingVisible || !tweetsForYouVisible) && (
          <TweetsWhoYouRead userTweets={tweetsStore.userTweets} />
        )}
      </>
    </>
  );
});

export default ContentHomePage;
