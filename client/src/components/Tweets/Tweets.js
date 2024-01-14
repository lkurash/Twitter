import { Fragment, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";

import spinner from "../../utils/spinner";

import Tweet from "./Tweet/Tweet";
import ShowMoreTweetsButton from "../buttons/ShowMoreTweetsButton";
import ShowMoreTrendsTweetsButton from "../buttons/ShowMoreTrendsTweetsButton";

const Tweets = ({ message, getMoreTweets, userId, trend }) => {
  const { tweets, loadingStatus } = useSelector(tweetsStore);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loadingStatus === "PENDING") {
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    }
  }, [loadingStatus]);

  if (loadingStatus !== "COMPLETE") {
    return null;
  }

  return (
    <>
      {isLoading ? (
        spinner()
      ) : (
        <Fragment>
          <div className="tweets">
            {tweets ? (
              <>
                {tweets.map((tweet) => (
                  <Tweet
                    tweet={tweet}
                    key={tweet.id}
                    retweet={tweet.retweet}
                    userInfo={
                      tweet.retweet
                        ? tweet.userRetweets
                        : tweet.userOriginalTweets
                    }
                  />
                ))}
              </>
            ) : (
              <div className="tweet-hint-about-lack-tweets">{message}</div>
            )}
          </div>
          {tweets && tweets.length >= 9 && (
            <>
              {trend ? (
                <ShowMoreTrendsTweetsButton trend={trend} />
              ) : (
                <ShowMoreTweetsButton
                  getTweets={getMoreTweets}
                  userId={userId}
                />
              )}
            </>
          )}
        </Fragment>
      )}
    </>
  );
};

export default Tweets;
