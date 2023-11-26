import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import TwitForm from "./forms/TwitForm";
import TwitsForYou from "./TwitsForYou";
import TwitsWhoYouRead from "./TwitsWhoYouReading";
import { useDispatch } from "react-redux";
import getAuthUserID from "../utils/getAuthUserID";
import { twitsStore } from "../redux/tweet/tweet.selectors";
import { tweetActions } from "../redux/tweet/tweet.actions";

const ContentHomePage = observer(() => {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["twitsWhoReading"]);
  const authUserID = getAuthUserID();

  const [twitsForYouVisible, setTwitsForYouVisible] = useState(true);
  const [twitsWhoReadingVisible, setTwitsWhoReadingVisible] = useState(false);

  useEffect(() => {
    if (cookies.twitsWhoReading === "true") {
      setTwitsWhoReadingVisible(true);
      setTwitsForYouVisible(false);

      dispatch(tweetActions.getTweetsByFollowingUsers(authUserID));
    }
    if (cookies.twitsWhoReading === "false" && twitsForYouVisible) {
      dispatch(tweetActions.getTweetsForAuthUser(authUserID));
    }
  }, [cookies.twitsWhoReading]);

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
                setCookie("twitsWhoReading", "false");
                setTwitsWhoReadingVisible(false);
                setTwitsForYouVisible(true);
              }}
            >
              <span>For you</span>
            </button>
            <div
              className={
                twitsForYouVisible
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
                setCookie("twitsWhoReading", "true");
                setTwitsForYouVisible(false);
                setTwitsWhoReadingVisible(true);
              }}
            >
              <span> You are reading</span>
            </button>
            <div
              className={
                twitsWhoReadingVisible
                  ? "main-button-active"
                  : "main-button-notactive"
              }
            />
          </div>
        </div>
      </div>
      <div className="main-line" />
      <div className="main-content-block main-content-block-mobile">
        <TwitForm />
      </div>
      <div className="main-line" />
      <>
        {twitsForYouVisible && <TwitsForYou />}

        {(twitsWhoReadingVisible || !twitsForYouVisible) && (
          <TwitsWhoYouRead userTwits={twitsStore.userTwits} />
        )}
      </>
    </>
  );
});

export default ContentHomePage;
