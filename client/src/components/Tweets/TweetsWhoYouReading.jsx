import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { userProfile } from "../../redux/user/user.selectors";
import { tweetActions } from "../../redux/tweet/tweet.actions";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";

import { loadingSetup } from "../../utils/loadingSetup";
import spinner from "../../utils/spinner";

import Tweets from "./Tweets";

const TweetsWhoYouRead = () => {
  const tweetsStoreSelector = useSelector(tweetsStore);
  const { profile } = useSelector(userProfile);
  const { tweets, loadingStatus, moreTweets } = useSelector(tweetsStore);
  const [isLoading, setIsLoading] = useState(false);
  const boundedSetup = loadingSetup.setup.bind(tweetsStoreSelector);

  useEffect(() => {
    boundedSetup(setIsLoading);
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
          getMoreTweets={tweetActions.getMoreTweetsWhoYouReading}
          userId={profile.id}
        />
      )}
    </>
  );
};

export default TweetsWhoYouRead;
