import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

import { tweetsStore } from "../redux/tweet/tweet.selectors";
import { tweetActions } from "../redux/tweet/tweet.actions";
import { useDispatch } from "react-redux";

import getAuthUserID from "../utils/getAuthUserID";

import TweetForm from "./forms/TweetForm";
import TweetsForYou from "./Tweets/TweetsForYou";
import TweetsWhoYouRead from "./Tweets/TweetsWhoYouReading";
import MainStikyPanel from "./MainStikyPanel";

const PrivateHomePageContent = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();
  const authUserID = getAuthUserID();
  const ref = useRef();

  const [isLoading, setLoading] = useState(false);

  const [tweetsForYouVisible, setTweetsForYouVisible] = useState(true);
  const [tweetsWhoReadingVisible, setTweetsWhoReadingVisible] = useState(false);

  useEffect(() => {
    setLoading(false);
    if (cookies.tweetsWhoReading === "true") {
      setTweetsWhoReadingVisible(true);
      setTweetsForYouVisible(false);

      dispatch(tweetActions.getTweetsByFollowingUsers(authUserID));
      setLoading(true);
    }
    if (cookies.tweetsWhoReading === "false" && tweetsForYouVisible) {
      dispatch(tweetActions.getTweetsForAuthUser(authUserID));
      setLoading(true);
    }

    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [cookies.tweetsWhoReading]);

  const handleClickedButtonForYou = () => {
    setCookie("tweetsWhoReading", "false");
    setTweetsWhoReadingVisible(false);
    setTweetsForYouVisible(true);
  };

  const handleClickedButtonWhoYouRead = () => {
    setCookie("tweetsWhoReading", "true");
    setTweetsForYouVisible(false);
    setTweetsWhoReadingVisible(true);
  };

  return (
    <div
      className="main-content-block"
      ref={ref}
      data-testid="private-home-page"
    >
      <MainStikyPanel
        homePage={{
          handleClickedButtonForYou,
          handleClickedButtonWhoYouRead,
          tweetsForYouVisible,
          tweetsWhoReadingVisible,
        }}
        pageName={"Home"}
      />
      <div className="main-content-block main-content-block-mobile">
        <div className="main-line" />
        <TweetForm />
      </div>
      <div className="main-line" />
      <>
        {tweetsForYouVisible && isLoading && <TweetsForYou />}

        {(tweetsWhoReadingVisible || !tweetsForYouVisible) && (
          <TweetsWhoYouRead userTweets={tweetsStore.userTweets} />
        )}
      </>
    </div>
  );
};

export default PrivateHomePageContent;
