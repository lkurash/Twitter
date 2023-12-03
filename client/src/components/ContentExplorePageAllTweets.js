import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";

import { tweetsStore } from "../redux/tweet/tweet.selectors";
import { useSelector } from "react-redux";
import { tweetActions } from "../redux/tweet/tweet.actions";

import spinner from "../utils/spinner";
import getAuthUserID from "../utils/getAuthUserID";

import Tweets from "./Tweets/Tweets";
import ShowMoreTweetsButton from "./buttons/ShowMoreTweetsButton";

const ContentExplorePageAllTweets = observer(() => {
  const { tweets, loadingStatus } = useSelector(tweetsStore);
  const [isLoading, setIsLoading] = useState(true);
  const authUserID = getAuthUserID();

  useEffect(() => {
    if (loadingStatus === "PENDING") {
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    }
  }, [loadingStatus]);

  return (
    <>
      {isLoading ? (
        spinner()
      ) : (
        <Fragment>
          <Tweets
            message={
              <div className="lack-tweets-message">
                <h2>No tweets yet.</h2> <p>Write first.</p>
              </div>
            }
          />
          {tweets && tweets.length >= 7 && (
            <ShowMoreTweetsButton
              getTweets={
                authUserID
                  ? tweetActions.getMoreTweetsForAuthUser
                  : tweetActions.getMoreTweets
              }
              userId={authUserID}
            />
          )}
        </Fragment>
      )}
    </>
  );
});

export default ContentExplorePageAllTweets;
