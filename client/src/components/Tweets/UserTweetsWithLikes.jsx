import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { userProfileById } from "../../redux/user/user.selectors";
import { tweetActions } from "../../redux/tweet/tweet.actions";

import Tweets from "./Tweets";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";
import { loadingSetup } from "../../utils/loadingSetup";
import spinner from "../../utils/spinner";

const UserTweetsWithLikes = () => {
  const { profile } = useSelector(userProfileById);
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
              <h2>You don’t have any likes yet</h2>{" "}
              <p>
                Tap the heart on any post to show it some love. When you do,
                it’ll show up here.
              </p>
            </div>
          }
          getMoreTweets={tweetActions.getMoreTweetsWithLikes}
          userId={profile.id}
        />
      )}
    </>
  );
};

export default UserTweetsWithLikes;
