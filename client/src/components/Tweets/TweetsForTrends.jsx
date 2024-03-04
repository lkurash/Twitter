import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";

import { loadingSetup } from "../../utils/loadingSetup";
import spinner from "../../utils/spinner";

import Tweets from "./Tweets";

const TweetsForTrends = ({ trend }) => {
  const tweetsStoreSelector = useSelector(tweetsStore);
  const { tweets, loadingStatus, moreTweets } = useSelector(tweetsStore);
  const [isLoading, setIsLoading] = useState(false);
  const boundedSetup = loadingSetup.setup.bind(tweetsStoreSelector);

  useEffect(() => {
    boundedSetup(setIsLoading);
  }, [loadingStatus]);

  return (
    <div className="main-content">
      {isLoading && spinner()}
      {loadingStatus === "COMPLETE" && (
        <Tweets
          tweets={tweets}
          moreTweets={moreTweets}
          message={
            <div className="lack-tweets-message">
              <h2>No tweets yet.</h2>
            </div>
          }
          trend={trend}
        />
      )}
    </div>
  );
};

export default TweetsForTrends;
