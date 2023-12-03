import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";
import { userProfile } from "../../redux/user/user.selectors";
import { tweetActions } from "../../redux/tweet/tweet.actions";

import spinner from "../../utils/spinner";

import Tweets from "./Tweets";
import ShowMoreTweetsButton from "../buttons/ShowMoreTweetsButton";

import "../main.css";

const TweetsForYou = observer(() => {
  const { tweets, loadingStatus } = useSelector(tweetsStore);
  const { profile } = useSelector(userProfile);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loadingStatus === "PENDING") {
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    }
  }, [loadingStatus]);

  if (isLoading) {
    return spinner();
  }

  return (
    <>
      <Tweets
        message={
          <div className="lack-tweets-message">
            <h2>No tweets yet.</h2> <p>Write first.</p>
          </div>
        }
      />
      {tweets && tweets.length >= 7 && (
        <ShowMoreTweetsButton
          getTweets={tweetActions.getMoreTweetsForAuthUser}
          userId={profile.id}
          store={tweetsStore}
        />
      )}
    </>
  );
});

export default TweetsForYou;