import { Fragment } from "react";

import Tweet from "./Tweet/Tweet";
import ShowMoreTweetsButton from "../buttons/ShowMoreTweetsButton";
import ShowMoreTrendsTweetsButton from "../buttons/ShowMoreTrendsTweetsButton";

const Tweets = ({
  tweets,
  message,
  getMoreTweets,
  userId,
  trend,
  moreTweets,
}) => {
  
  return (
    <Fragment>
      <div className="tweets">
        {tweets.length !== 0 ? (
          <>
            {tweets.map((tweet) => (
              <Tweet
                tweet={tweet}
                key={tweet.id}
                retweet={tweet.retweet}
                userInfo={
                  tweet.retweet ? tweet.userRetweets : tweet.userOriginalTweets
                }
              />
            ))}
          </>
        ) : (
          <div
            className="tweet-hint-about-lack-tweets"
            data-testid="message-empty-tweets"
          >
            {message}
          </div>
        )}
      </div>
      {moreTweets && (
        <>
          {trend ? (
            <ShowMoreTrendsTweetsButton trend={trend} />
          ) : (
            <ShowMoreTweetsButton getTweets={getMoreTweets} userId={userId} />
          )}
        </>
      )}
    </Fragment>
  );
};

export default Tweets;
