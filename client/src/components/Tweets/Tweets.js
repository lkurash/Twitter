import { observer } from "mobx-react-lite";
import { Fragment } from "react";

import { useSelector } from "react-redux";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";

import Tweet from "./Tweet/Tweet";

const Tweets = observer(({message}) => {
  const { tweets, loadingStatus } = useSelector(tweetsStore);

  if (loadingStatus !== "COMPLETE") {
    return null;
  }

  return (
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
                  tweet.retweet ? tweet.userRetweets : tweet.userOriginalTweets
                }
              />
            ))}
          </>
        ) : (
          <div className="tweet-hint-about-lack-tweets">{message}</div>
        )}
      </div>
    </Fragment>
  );
});

export default Tweets;
