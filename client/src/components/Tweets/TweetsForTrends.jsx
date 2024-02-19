import { observer } from "mobx-react-lite";

import Tweets from "./Tweets";
import { useSelector } from "react-redux";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";

const TweetsForTrends = observer(({ trend }) => {
  const { tweets, loadingStatus, moreTweets } = useSelector(tweetsStore);
  return (
    <div className="main-content">
      <Tweets
        tweets={tweets}
        moreTweets={moreTweets}
        message={
          <div className="lack-tweets-message">
            <h2>No tweets yet.</h2>
          </div>
        }
        trend={trend}
      />
    </div>
  );
});

export default TweetsForTrends;
