import { useSelector } from "react-redux";

import Tweets from "./Tweets";
import { userProfile } from "../../redux/user/user.selectors";
import { tweetActions } from "../../redux/tweet/tweet.actions";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";

const TweetsWhoYouRead = () => {
  const { profile } = useSelector(userProfile);
  const { tweets, loadingStatus, moreTweets } = useSelector(tweetsStore);

  return (
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
  );
};

export default TweetsWhoYouRead;
