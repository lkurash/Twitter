import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { tweetActions } from "../../redux/tweet/tweet.actions";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";

import getAuthUserID from "../../utils/getAuthUserID";
import { loadingSetup } from "../../utils/loadingSetup";
import spinner from "../../utils/spinner";

import Tweets from "./Tweets";

const ExploreTweets = () => {
  const tweetsStoreSelector = useSelector(tweetsStore);
  const { tweets, loadingStatus, moreTweets } = useSelector(tweetsStore);
  const authUserID = getAuthUserID();
  const [isLoading, setIsLoading] = useState(false);
  const bindSetup = loadingSetup.setup.bind(tweetsStoreSelector);

  useEffect(() => {
    bindSetup(setIsLoading);
  }, [loadingStatus]);

  return (
    <>
      {isLoading && spinner()}
      {loadingStatus === "COMPLETE" && (
        <Tweets
          tweets={tweets}
          moreTweets={moreTweets}
          message={
            <div className="lack-tweets-message">
              <h2>No tweets yet.</h2> <p>Write first.</p>
            </div>
          }
          getMoreTweets={
            authUserID
              ? tweetActions.getMoreTweetsForAuthUser
              : tweetActions.getMoreTweets
          }
          userId={authUserID}
        />
      )}
    </>
  );
};

export default ExploreTweets;
