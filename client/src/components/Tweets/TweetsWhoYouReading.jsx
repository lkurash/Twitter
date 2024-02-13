import { observer } from "mobx-react-lite";
import { useSelector } from "react-redux";

import Tweets from "./Tweets";
import { userProfile } from "../../redux/user/user.selectors";
import { tweetActions } from "../../redux/tweet/tweet.actions";

const TweetsWhoYouRead = observer(() => {
  const { profile } = useSelector(userProfile);

  return (
    <Tweets
      message={
        <div className="lack-tweets-message">
          <h2>No tweets yet.</h2> <p>Write first.</p>
        </div>
      }
      getMoreTweets={tweetActions.getMoreTweetsWhoYouReading}
      userId={profile.id}
    />
  );
});

export default TweetsWhoYouRead;
