import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { userProfileById } from "../../redux/user/user.selectors";
import { tweetActions } from "../../redux/tweet/tweet.actions";

import Tweets from "./Tweets";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";
import { loadingSetup } from "../../utils/loadingSetup";
import spinner from "../../utils/spinner";

const UserTweetsWithMedia = () => {
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
              <h2>No tweets with media.</h2> <p>Write first.</p>
            </div>
          }
          getMoreTweets={tweetActions.getMoreTweetsWithMedia}
          userId={profile.id}
        />
      )}
    </>
  );
};

export default UserTweetsWithMedia;
