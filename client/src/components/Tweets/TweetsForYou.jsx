import { useSelector } from "react-redux";
import { userProfile } from "../../redux/user/user.selectors";
import { tweetActions } from "../../redux/tweet/tweet.actions";

import Tweets from "./Tweets";
import { useEffect, useState } from "react";

import { tweetsStore } from "../../redux/tweet/tweet.selectors";
import spinner from "../../utils/spinner";
import { loadingSetup } from "../../utils/loadingSetup";

const TweetsForYou = () => {
  const { profile } = useSelector(userProfile);
  const tweetsStoreSelector = useSelector(tweetsStore);
  const { tweets, loadingStatus, moreTweets } = useSelector(tweetsStore);
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
          getMoreTweets={tweetActions.getMoreTweetsForAuthUser}
          userId={profile.id}
        />
      )}
    </>
  );
};

export default TweetsForYou;
